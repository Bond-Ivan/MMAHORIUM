import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';

const dir = 'src/components/Pages/Fighters/fighters';
const files = readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = readFileSync(filePath, 'utf-8');

  // Удаляем импорты картинок
  content = content.replace(/^import \w+ from ["'].*public\/(.+?)["'];?\n/gm, '');

  // Заменяем `${VariableName}` на "/FileName.webp"
  // Ищем паттерн img: `${SomeName}` и заменяем на img: "/SomeName.webp"
  content = content.replace(/img:\s*`\$\{(\w+)\}`/g, (_, varName) => {
    return `img: "/${varName}.webp"`;
  });

  writeFileSync(filePath, content);
  console.log(`✓ ${file}`);
}