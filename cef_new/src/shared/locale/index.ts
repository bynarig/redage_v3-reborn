import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

// Assuming your locale file is already configured as shown in your question
// and the language is predefined and cannot be changed by the user.

// Function to fetch language data (if needed)
const fetchLanguageData = async (language: string) => {
  try {
    const response = await fetch(`/locales/${language}/translation.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch language data:', error);
    return null;
  }
};

// Function to get translated text
export const translateText = (keys: string[], formatArgs?: any[]): string => {
  const { t } = useTranslation();

  // Construct the key path for i18next
  const keyPath = keys.join('.');

  // Get the translated text
  let translatedText = t(keyPath);

  // If there are format arguments, replace placeholders in the translated text
  if (formatArgs && formatArgs.length > 0) {
    translatedText = translatedText.replace(/{(\d+)}/g, (match, index) => {
      const argIndex = parseInt(index, 10);
      return formatArgs[argIndex] !== undefined ? formatArgs[argIndex] : match;
    });
  }

  return translatedText;
};

// Example usage:
// const translatedText = translateText(['some', 'nested', 'key'], ['arg1', 'arg2']);
// console.log(translatedText);

// If you need to preload a specific language, you can do it like this:
const preloadLanguage = async (language: string) => {
  const languageData = await fetchLanguageData(language);
  if (languageData) {
    i18n.addResourceBundle(language, 'translation', languageData);
    i18n.changeLanguage(language);
  }
};

// Preload the predefined language (e.g., 'ru')
preloadLanguage('ru');

export default translateText;