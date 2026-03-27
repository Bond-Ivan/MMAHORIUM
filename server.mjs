process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());

// =======================================================
// 1. ПОДСЧЁТ ВСЕХ БОЙЦОВ (roster.watch) + КЭШ
// =======================================================
const ROSTER_URL = "https://www.roster.watch/";

async function countFighters() {
  const res = await fetch(ROSTER_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const scripts = document.querySelectorAll('script[type="application/json"]');
  let total = 0;

  scripts.forEach((script) => {
    if (script.textContent && script.textContent.includes("Reactable")) {
      try {
        const data = JSON.parse(script.textContent);
        const fighters = data?.x?.tag?.attribs?.data?.fighter;

        if (fighters && Array.isArray(fighters)) {
          total = fighters.length;
        }
      } catch (e) {
        console.error("Ошибка парсинга JSON roster.watch:", e);
      }
    }
  });

  return total;
}

// Кэш для количества бойцов
let cachedFightersCount = null;
let lastFightersCountUpdate = 0;
const COUNT_CACHE_TTL = 1000 * 60 * 10; // 10 минут

// =======================================================
// 2. P4P И ДЕТАЛИ БОЙЦОВ (ufc.ru / ufc.com) + КЭШ
// =======================================================
const UFC_BASE_URL = "https://www.ufc.ru";
const UFC_RANKINGS_URL = "https://www.ufc.com/rankings";

async function getOfficialP4PList() {
  const res = await fetch(UFC_RANKINGS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
  });
  if (!res.ok) throw new Error(`HTTP Error ufc.com: ${res.status}`);

  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const p4pFighters = [];

  const viewings = document.querySelectorAll(".view-grouping");

  viewings.forEach((group) => {
    const titleEl = group.querySelector(".view-grouping-header");

    if (titleEl) {
      const titleText = titleEl.textContent.trim().toLowerCase();

      if (
        titleText.includes("pound-for-pound") ||
        titleText.includes("вне зависимости от категорий")
      ) {
        let championEl = group.querySelector(".rankings--champions--name a");
        if (!championEl) championEl = group.querySelector("h5 a");

        if (championEl) {
          p4pFighters.push({
            rank: 1,
            name: championEl.textContent.trim(),
            profileUrl: championEl.getAttribute("href") || "",
          });
        }

        const rows = group.querySelectorAll("table tbody tr");
        rows.forEach((row) => {
          const rankEl = row.querySelector(".views-field-weight-class-rank");
          const nameEl = row.querySelector(".views-field-title a");

          if (rankEl && nameEl) {
            const rankText = rankEl.textContent.trim();
            const rankMatch = rankText.match(/\d+/);
            const rank = rankMatch ? parseInt(rankMatch[0], 10) : null;

            const name = nameEl.textContent.trim();
            const profileUrl = nameEl.getAttribute("href") || "";

            if (rank && name && profileUrl) {
              p4pFighters.push({ rank, name, profileUrl });
            }
          }
        });
      }
    }
  });

  const uniqueP4P = [];
  const seenRanks = new Set();

  p4pFighters
    .sort((a, b) => a.rank - b.rank)
    .forEach((fighter) => {
      if (!seenRanks.has(fighter.rank) && uniqueP4P.length < 15) {
        seenRanks.add(fighter.rank);
        uniqueP4P.push(fighter);
      }
    });

  return uniqueP4P;
}

async function getFighterDetails(profileUrl) {
  try {
    const fullUrl = profileUrl.startsWith("http")
      ? profileUrl
      : `${UFC_BASE_URL}${profileUrl}`;

    const res = await fetch(fullUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (!res.ok)
      return { nickname: null, weightClass: null, record: null };

    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const nicknameEl = document.querySelector(
      ".hero-profile__nickname, .field-name-nickname",
    );
    const nickname = nicknameEl
      ? nicknameEl.textContent.replace(/["«»]/g, "").trim()
      : null;

    const weightClassEl = document.querySelector(".hero-profile__division");
    let weightClass = null;
    let record = null;

    if (weightClassEl) {
      // Берём весь текст, схлопываем пробелы и переносы
      const raw = weightClassEl.textContent.replace(/\s+/g, " ").trim();

      // Ищем рекорд вида 23-3-0(В-П-Н) или 23-3-0 (В-П-Н)
      const recordMatch = raw.match(/(\d+-\d+-\d+\s*\(В-П-Н\))/);

      if (recordMatch) {
        record = recordMatch[1].replace(/(\d)\(/, "$1 (");
        const idx = recordMatch.index != null ? recordMatch.index : raw.indexOf(recordMatch[1]);
        weightClass = raw.slice(0, idx).trim();
      } else {
        // Если рекорд не нашли — всё считаем дивизионом
        weightClass = raw;
      }
    }

    return { nickname, weightClass, record };
  } catch (error) {
    console.error(`Ошибка при парсинге ${profileUrl}:`, error.message);
    return { nickname: null, weightClass: null, record: null };
  }
}

// Кэш для P4P
let cachedP4P = [];
let isP4PReady = false;

async function updateP4PData() {
  console.log("Фоновое обновление: Парсим список P4P...");
  try {
    const p4pList = await getOfficialP4PList();
    if (p4pList.length === 0) {
      console.log("ВНИМАНИЕ: Не удалось найти бойцов на сайте UFC");
      return;
    }

    console.log(
      `Фоновое обновление: Найдено ${p4pList.length} бойцов. Собираем детали... (займет около 8 секунд)`,
    );

    const detailedP4P = await Promise.all(
      p4pList.map(async (fighter) => {
        const details = await getFighterDetails(fighter.profileUrl);
        return {
          p4pRank: fighter.rank,
          name: fighter.name,
          nickname: details.nickname || null,
          weightClass: details.weightClass || null,
          record: details.record || null,
        };
      }),
    );

    cachedP4P = detailedP4P;
    isP4PReady = true;
    console.log(
      "Фоновое обновление УСПЕШНО ЗАВЕРШЕНО! Данные закэшированы и готовы к моментальной выдаче.",
    );
  } catch (error) {
    console.error("Ошибка при фоновом обновлении:", error);
  }
}

// =======================================================
// 4. ЭНДПОИНТЫ API
// =======================================================

app.get("/api/ufc-p4p", (req, res) => {
  if (!isP4PReady) {
    return res.status(503).json({
      error:
        "Данные еще собираются, пожалуйста, обновите страницу через несколько секунд",
      status: "loading",
    });
  }

  res.json(cachedP4P);
});

app.get("/api/ufc-count", async (req, res) => {
  try {
    const now = Date.now();

    if (
      cachedFightersCount !== null &&
      now - lastFightersCountUpdate < COUNT_CACHE_TTL
    ) {
      return res.json({ total: cachedFightersCount });
    }

    const total = await countFighters();
    cachedFightersCount = total;
    lastFightersCountUpdate = now;

    res.json({ total });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to count fighters" });
  }
});

// =======================================================
// 5. ЗАПУСК СЕРВЕРА
// =======================================================
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);

  updateP4PData();
  setInterval(updateP4PData, 86400000);
});