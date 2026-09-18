"use client";
import { hindiChat } from "../hindi";

import { useEffect, useRef, useState } from "react";
import { SiteNav, useLanguage, type Language } from "../language";
import { useTranslations, TranslatedText } from "../translations";

type Resource = { id: string; name: string; phone: string; website: string; description: string };
import { locale, translationStatus } from "../locale";

type Message = { language?: Language; role: "user" | "assistant"; text: string; resources?: Resource[]; mode?: "ai" | "directory" };

const welcome: Record<Language, string> = {
  हिन्दी: "नमस्ते! बताएँ कि आपको क्या चाहिए। मैं लेक काउंटी के संसाधन खोजने में मदद करूँगा।",
  English: "Hi! Tell me what you need, and I’ll help find Lake County resources.",
  Español: "¡Hola! Dígame qué necesita y le ayudaré a encontrar recursos en el condado de Lake.",
  Русский: "Здравствуйте! Расскажите, какая помощь вам нужна, и я найду ресурсы округа Лейк.",
};
const copy = {
  हिन्दी: hindiChat,
  English: { title:"Ask the resource helper", intro:"Ask in English, Spanish, Russian, or Hindi. Confirm services directly with each organization.", finding:"Finding resources…", read:"Read aloud", call:"Call", website:"Website", send:"Send", placeholder:"Type your question…", question:"Your question", speak:"Speak your question", listening:"Listening", unavailable:"The helper is temporarily unavailable. Call 211 for local assistance.", noVoice:"Voice input is unavailable in this browser.", note:"Voice starts only when you press the microphone. Review the text before sending. When AI is available, your question is sent to Google Gemini. Please avoid names, case numbers, or other private details. This helper is not legal advice. For urgent local help, call 211.", suggestions:["I need legal help","Find food assistance","Where can I take ESL classes?","What forms can I apply for?","I may lose my housing"] },
  Español: { title:"Pregunte al asistente", intro:"Pregunte en inglés, español, ruso o hindi. Confirme los servicios directamente con cada organización.", finding:"Buscando recursos…", read:"Escuchar", call:"Llamar", website:"Sitio web", send:"Enviar", placeholder:"Escriba su pregunta…", question:"Su pregunta", speak:"Hacer una pregunta por voz", listening:"Escuchando", unavailable:"El asistente no está disponible. Llame al 211 para obtener ayuda local.", noVoice:"La entrada de voz no está disponible en este navegador.", note:"La voz se activa solo al pulsar el micrófono. Revise el texto antes de enviarlo. Si la IA está disponible, su pregunta se envía a Google Gemini. Evite nombres, números de caso y datos privados. Esto no es asesoría legal. Para ayuda urgente, llame al 211.", suggestions:["Necesito ayuda legal","Busco ayuda con alimentos","¿Dónde hay clases de inglés?","¿Qué formularios puedo solicitar?","Podría perder mi vivienda"] },
  Русский: { title:"Спросите помощника", intro:"Задайте вопрос на английском, испанском, русском или хинди. Уточняйте услуги непосредственно в организации.", finding:"Ищем ресурсы…", read:"Прослушать", call:"Позвонить", website:"Сайт", send:"Отправить", placeholder:"Введите вопрос…", question:"Ваш вопрос", speak:"Задать вопрос голосом", listening:"Слушаем", unavailable:"Помощник временно недоступен. Позвоните 211 за местной помощью.", noVoice:"Голосовой ввод недоступен в этом браузере.", note:"Микрофон включается только после нажатия. Проверьте текст перед отправкой. Когда ИИ доступен, вопрос отправляется Google Gemini. Не указывайте имена, номера дел и личные сведения. Это не юридическая консультация. Если помощь нужна срочно, позвоните 211.", suggestions:["Нужна юридическая помощь","Нужна помощь с продуктами","Где найти курсы английского?","Какие формы можно подать?","Я могу потерять жильё"] },
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { language: lang } = useLanguage();
  const t = copy[lang];
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const requestRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const translated = useTranslations(messages.flatMap(m=>m.resources?.map(r=>r.description)||[]));
  useEffect(() => {
    setError("");
    setBusy(false);
    setRecording(false);
    return () => {
      requestRef.current?.abort();
      recognitionRef.current?.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  },[lang]);

  async function send(text = input) {
    const question = text.trim();
    if (!question || busy) return;
    const history = messages.slice(-6).map(({ role, text: priorText }) => ({ role, text: priorText }));
    setInput("");
    setError("");
    setMessages(current => [...current, { role: "user", text: question, language: lang }]);
    setBusy(true);
    const controller = new AbortController();
    requestRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, language: lang, history }), signal: controller.signal,
      });
      if (!response.ok) throw new Error("Chat unavailable");
      const reply = await response.json() as { text: string; resources: Resource[]; mode: "ai" | "directory" };
      if (!controller.signal.aborted) setMessages(current => [...current, { role: "assistant", ...reply, language: lang }]);
    } catch {
      if (!controller.signal.aborted) setError("unavailable");
    } finally { if (!controller.signal.aborted) setBusy(false); }
  }

  function listen() {
    if (recording) { recognitionRef.current?.abort(); setRecording(false); return; }
    const browser = window as typeof window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const SpeechRecognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!SpeechRecognition) { setError("noVoice"); return; }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = locale[lang];
    recognition.onresult = event => { setInput(event.results[0][0].transcript); setRecording(false); };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    setRecording(true);
    try { recognition.start(); } catch { setRecording(false); setError("noVoice"); }
  }

  function speak(text: string, spokenLanguage: Language = lang) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale[spokenLanguage];
    window.speechSynthesis.speak(utterance);
  }

  return <main className="chat-page">
    <SiteNav current="chat" />
    <header><div className="eyebrow">{lang === "हिन्दी" ? "लेक काउंटी · इलिनॉय" : lang === "Русский" ? "ОКРУГ ЛЕЙК · ИЛЛИНОЙС" : lang === "Español" ? "CONDADO DE LAKE · ILLINOIS" : "LAKE COUNTY · ILLINOIS"}</div><h1>{t.title}</h1><p>{t.intro}</p></header>
    <section className="chat-card" aria-label={t.title}>
      <p className="more-note">{translationStatus[lang].past}</p><div className="chat-messages" aria-live="polite">{messages.length === 0 && <div className="from-helper"><p>{welcome[lang]}</p></div>}{messages.map((item, index) => <div key={index} className={item.role === "user" ? "from-user" : "from-helper"}>
        <p lang={locale[item.language || lang]}>{item.text}</p>
        {item.role === "assistant" && <><button className="read-aloud" onClick={() => speak(item.text, item.language)}>🔊 {t.read}</button>{item.resources?.map(resource => <article className="chat-resource" key={resource.id}><strong>{resource.name}</strong><span><TranslatedText text={resource.description} translations={translated}/></span><div><a href={`tel:${resource.phone.startsWith("211") ? "211" : resource.phone.replace(/[^\d]/g, "")}`}>{t.call} {resource.phone}</a><a href={resource.website} target="_blank" rel="noopener noreferrer">{t.website} ↗</a></div></article>)}</>}
      </div>)}{busy && <div className="from-helper"><p>{t.finding}</p></div>}</div>
      <div className="chat-suggestions" aria-label={t.question}>{t.suggestions.map(prompt => <button key={prompt} onClick={() => send(prompt)} disabled={busy}>{prompt}</button>)}</div>
      <div className="chat-entry"><input value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter") send(); }} placeholder={t.placeholder} aria-label={t.question} maxLength={1000}/><button onClick={listen} aria-label={recording ? t.listening : t.speak} aria-pressed={recording}>{recording ? "●" : "🎙"}</button><button className="primary" onClick={() => send()} disabled={busy}>{busy ? "…" : t.send}</button></div>
      {error && <p role="alert" className="chat-error">{error === "noVoice" ? t.noVoice : t.unavailable}</p>}
      <small>{t.note}</small>
    </section>
  </main>;
}

type SpeechRecognitionLike = {
  lang: string;
  onresult: (event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  abort: () => void;
};
