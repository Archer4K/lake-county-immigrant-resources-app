export const languages = ["English", "Español", "Русский", "हिन्दी"] as const;
export type Language = typeof languages[number];
export const locale: Record<Language,string> = { English:"en-US", Español:"es-US", Русский:"ru-RU", हिन्दी:"hi-IN" };
export function validLanguage(value: unknown): Language { return languages.includes(value as Language) ? value as Language : "English"; }
export function label(language: Language, en: string, es: string, ru: string, hi: string) {
  return ({English:en,Español:es,Русский:ru,हिन्दी:hi})[language];
}
export const languageNames: Record<Language, Record<string,string>> = {
 English:{English:"English",Spanish:"Spanish",Russian:"Russian",Polish:"Polish",Hindi:"Hindi"},
 Español:{English:"Inglés",Spanish:"Español",Russian:"Ruso",Polish:"Polaco",Hindi:"Hindi"},
 Русский:{English:"Английский",Spanish:"Испанский",Russian:"Русский",Polish:"Польский",Hindi:"Хинди"},
 हिन्दी:{English:"अंग्रेज़ी",Spanish:"स्पेनिश",Russian:"रूसी",Polish:"पोलिश",Hindi:"हिंदी"},
};
export const translationStatus = {
 English:{loading:"Translating…",failed:"Translation is unavailable. Try again or view the original.",retry:"Try translation again",original:"Original text",study:"Study translation (not official)",past:"Earlier messages keep their original language.",feedback:"Check your answer again for feedback in this language."},
 Español:{loading:"Traduciendo…",failed:"La traducción no está disponible. Reintente o vea el original.",retry:"Reintentar traducción",original:"Texto original",study:"Traducción de estudio (no oficial)",past:"Los mensajes anteriores conservan su idioma original.",feedback:"Revise su respuesta de nuevo para recibir comentarios en este idioma."},
 Русский:{loading:"Переводим…",failed:"Перевод недоступен. Повторите попытку или откройте оригинал.",retry:"Повторить перевод",original:"Исходный текст",study:"Учебный перевод (неофициальный)",past:"Предыдущие сообщения сохраняют исходный язык.",feedback:"Проверьте ответ ещё раз, чтобы получить отзыв на этом языке."},
 हिन्दी:{loading:"अनुवाद हो रहा है…",failed:"अनुवाद उपलब्ध नहीं है। फिर कोशिश करें या मूल पाठ देखें।",retry:"अनुवाद की दोबारा कोशिश करें",original:"मूल पाठ",study:"अध्ययन अनुवाद (आधिकारिक नहीं)",past:"पुराने संदेश अपनी मूल भाषा में रहेंगे।",feedback:"इस भाषा में प्रतिक्रिया पाने के लिए उत्तर फिर जाँचें।"},
};
