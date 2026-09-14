"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type Language = "English" | "Español" | "Русский";
const choices: Language[] = ["English", "Español", "Русский"];
const Context = createContext<{ language: Language; choose: (value: Language) => void }>({ language: "English", choose: () => {} });
export const useLanguage = () => useContext(Context);

const text = {
  English: { prompt: "Choose your language", detail: "You can change it at any time. Your choice will be saved on this device.", directory: "Directory", chat: "Chat helper", pathways: "Immigration pathways", citizenship: "Citizenship study", more: "More resources", call: "Call 211", language: "Site language" },
  Español: { prompt: "Elija su idioma", detail: "Puede cambiarlo cuando quiera. Su elección se guardará en este dispositivo.", directory: "Directorio", chat: "Asistente", pathways: "Opciones de inmigración", citizenship: "Estudiar ciudadanía", more: "Más recursos", call: "Llame al 211", language: "Idioma del sitio" },
  Русский: { prompt: "Выберите язык", detail: "Вы сможете изменить его в любое время. Выбор сохранится на этом устройстве.", directory: "Справочник", chat: "Помощник", pathways: "Иммиграционные пути", citizenship: "Подготовка к гражданству", more: "Другие ресурсы", call: "Позвонить 211", language: "Язык сайта" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");
  const [ready, setReady] = useState(false);
  const [needsChoice, setNeedsChoice] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const saved = window.localStorage.getItem("lake-resource-language");
    if (choices.includes(saved as Language)) setLanguage(saved as Language);
    else setNeedsChoice(true);
    setReady(true);
  }, []);
  useEffect(() => { document.documentElement.lang = language === "Español" ? "es" : language === "Русский" ? "ru" : "en"; }, [language]);
  function choose(value: Language) {
    setLanguage(value);
    window.localStorage.setItem("lake-resource-language", value);
    setNeedsChoice(false);
  }
  return <Context.Provider value={{ language, choose }}>
    {children}
    {ready && needsChoice && !pathname.startsWith("/admin") && <div className="language-overlay"><section className="language-dialog" role="dialog" aria-modal="true" aria-labelledby="choose-language-title"><span className="mark" aria-hidden="true">✳</span><h2 id="choose-language-title">Choose your language<br/><span>Elija su idioma · Выберите язык</span></h2><p>{text.English.detail}</p><div className="language-choices">{choices.map(choice => <button key={choice} onClick={() => choose(choice)} lang={choice === "Español" ? "es" : choice === "Русский" ? "ru" : "en"}>{choice}<span aria-hidden="true">→</span></button>)}</div></section></div>}
  </Context.Provider>;
}

export function SiteNav({ current }: { current: "directory" | "chat" | "pathways" | "citizenship" | "more" }) {
  const { language, choose } = useLanguage();
  const t = text[language];
  return <div className="nav-wrap"><nav className="site-nav" aria-label="Main navigation"><Link href="/" aria-current={current === "directory" ? "page" : undefined}>{t.directory}</Link><Link href="/chat" aria-current={current === "chat" ? "page" : undefined}>{t.chat}</Link><Link href="/pathways" aria-current={current === "pathways" ? "page" : undefined}>{t.pathways}</Link><Link href="/citizenship" aria-current={current === "citizenship" ? "page" : undefined}>{t.citizenship}</Link><Link href="/more" aria-current={current === "more" ? "page" : undefined}>{t.more}</Link><a href="tel:211">{t.call}</a></nav><label className="site-language">{t.language}<select aria-label={t.language} value={language} onChange={e => choose(e.target.value as Language)}>{choices.map(choice => <option key={choice}>{choice}</option>)}</select></label></div>;
}
