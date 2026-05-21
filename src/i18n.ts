import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/translation.ru.json';
import en from './locales/en/translation.en.json';
import pt from './locales/pt/translation.pt.json';
import es from './locales/es/translation.es.json';
import zh from './locales/zh/translation.zh.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    zh: { translation: zh },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;