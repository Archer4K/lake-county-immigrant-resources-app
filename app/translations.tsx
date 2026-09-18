"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "./language";
import { translationStatus } from "./locale";

const cache = new Map<string, Record<string,string>>();
const pending = new Map<string, Promise<Record<string,string>>>();
export function useTranslations(texts: readonly string[]) {
  const { language } = useLanguage();
  const serialized = JSON.stringify([...new Set(texts.filter(Boolean))]);
  const key = language + serialized;
  const [result, setResult] = useState<{key:string;values:Record<string,string>;failed:boolean}>({key:"",values:{},failed:false});
  const [attempt, retry] = useState(0);
  useEffect(() => {
    if (language === "English") return;
    let active = true;
    if (cache.has(key)) {
      setResult({key,values:cache.get(key)!,failed:false});
      return;
    }
    let request = pending.get(key);
    if (!request) {
      request = (async () => {
        const all: string[] = JSON.parse(serialized);
        const values: Record<string,string> = {};
        for (let i=0;i<all.length;i+=24) {
          const texts = all.slice(i,i+24);
          const response = await fetch("/api/translate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language,texts})});
          if (!response.ok) throw new Error("Translation unavailable");
          const data = await response.json() as {translations:string[]};
          if (!Array.isArray(data.translations) || data.translations.length !== texts.length || data.translations.some(s=>typeof s!=="string" || !s.trim())) throw new Error("Incomplete translation");
          texts.forEach((text,index)=>{values[text]=data.translations[index];});
        }
        cache.set(key,values);
        return values;
      })();
      pending.set(key,request);
      void request.finally(()=>pending.delete(key)).catch(()=>{});
    }
    request.then(values=>{if(active)setResult({key,values,failed:false});}).catch(()=>{if(active)setResult({key,values:{},failed:true});});
    return () => {active=false;};
  },[key,serialized,language,attempt]);
  return {
    language,
    failed: result.key === key && result.failed,
    loading: language !== "English" && result.key !== key,
    get: (text:string) => language === "English" ? text : (cache.get(key) || (result.key===key ? result.values : {}))?.[text],
    retry: () => {setResult({key:"",values:{},failed:false});retry(a=>a+1);},
  };
}

export function TranslatedText({text, translations}: {text:string;translations:ReturnType<typeof useTranslations>}) {
  const translated = translations.get(text);
  if (translated) return <>{translated}</>;
  const t = translationStatus[translations.language];
  return <span className="translation-status">{translations.failed ? t.failed : t.loading}{translations.failed && <span> · {t.original}: <span lang="en">{text}</span></span>}</span>;
}
export function TranslationNotice({translations}: {translations:ReturnType<typeof useTranslations>}) {
  if (!translations.failed) return null;
  return <p role="status">{translationStatus[translations.language].failed} <button onClick={translations.retry}>{translationStatus[translations.language].retry}</button></p>;
}
