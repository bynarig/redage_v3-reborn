import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next if not already initialized
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      debug: false,
      interpolation: {
        escapeValue: false,
      }
    });
}

// Hook-based translation function
export const useTranslateText = () => {
  const { t } = useTranslation();

  return (key: string, formatArgs?: any): string => {
    let translatedText = t(key);

    if (formatArgs && formatArgs.length > 0) {
      translatedText = translatedText.replace(/{(\d+)}/g, (match, index) => {
        const argIndex = parseInt(index, 10);
        return formatArgs[argIndex] !== undefined ? formatArgs[argIndex] : match;
      });
    }

    return translatedText;
  };
};

// Standalone translation function for use outside of React components
export const translateText = (namespace: string, key: string, formatArgs?: any[]): string => {
  try {
    // Try with namespace first
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let translation = i18n.t(fullKey, { ns: namespace });

    // If translation equals the key, it wasn't found - try without namespace
    if (translation === fullKey && namespace) {
      translation = i18n.t(key);
    }

    // Apply format args if provided
    if (formatArgs && formatArgs.length > 0) {
      translation = translation.replace(/{(\d+)}/g, (match, index) => {
        const argIndex = parseInt(index, 10);
        return formatArgs[argIndex] !== undefined ? formatArgs[argIndex] : match;
      });
    }

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return key; // Return the key as fallback in case of error
  }
};

// Function to preload a language
export const preloadLanguage = async (language: string) => {
  try {
    const response = await fetch(`/locales/${language}/translation.json`);
    const data = await response.json();

    if (data) {
      i18n.addResourceBundle(language, 'translation', data);
      i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error('Failed to preload language:', error);
  }
};

// Preload default language
preloadLanguage('ru');

export default translateText;