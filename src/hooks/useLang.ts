import { useTranslation } from 'react-i18next';

export type Lang = 'ru' | 'en' | 'pt' | 'es' | 'zh';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export function useLang() {
  const { t, i18n } = useTranslation();

  const lang = i18n.language as Lang;

  const setLang = (code: Lang) => {
    i18n.changeLanguage(code);
  };

  return { t, lang, setLang };
}