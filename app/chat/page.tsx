"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Resource = { id: string; name: string; phone: string; website: string; description: string };
type Message = { role: "user" | "assistant"; text: string; resources?: Resource[]; mode?: "ai" | "directory" };
type Language = "English" | "Español" | "Русский";

const welcome: Record<Language, string> = {
  English: "Hi! Tell me what you need, and I’ll help find Lake County resources.",
  Español: "¡Hola! Dígame qué necesita y le ayudaré a encontrar recursos en el condado de Lake.",
  Русский: "Здравствуйте! Расскажите, какая помощь вам нужна, и я найду ресурсы округа Лейк.",
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Language>("English");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: welcome.English }]);
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("lake-resource-language");
    if (saved === "Español" || saved === "Русский") setLang(saved);
  }, []);

  function changeLanguage(value: Language) {
    setLang(value);
    window.localStorage.setItem("lake-resource-language", value);
  }

  async function send(text = input) {
    const question = text.trim();
    if (!question || busy) return;
    const history = messages.slice(-6).map(({ role, text: priorText }) => ({ role, text: priorText }));
    setInput("");
    setError("");
    setMessages(current => [...current, { role: "user", text: question }]);
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, language: lang, history }),
      });
      if (!response.ok) throw new Error("Chat unavailable");
      const reply = await response.json() as { text: string; resources: Resource[]; mode: "ai" | "directory" };
      setMessages(current => [...current, { role: "assistant", ...reply }]);
    } catch {
      setError("The helper is temporarily unavailable. Call 211 for local assistance.");
    } finally { setBusy(false); }
  }

  function listen() {
    const browser = window as typeof window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const SpeechRecognition = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!SpeechRecognition) { setError("Voice input is unavailable in this browser."); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "Español" ? "es-US" : lang === "Русский" ? "ru-RU" : "en-US";
    recognition.onresult = event => { setInput(event.results[0][0].transcript); setRecording(false); };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
    setRecording(true);
    recognition.start();
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "Español" ? "es-US" : lang === "Русский" ? "ru-RU" : "en-US";
    window.speechSynthesis.speak(utterance);
  }

  return <main className="chat-page">
    <nav className="site-nav" aria-label="Main navigation"><Link href="/">Directory</Link><Link href="/chat" aria-current="page">Chat helper</Link><Link href="/more">More resources</Link><a href="tel:211">Call 211</a></nav>
    <header><div className="eyebrow">LAKE COUNTY · ILLINOIS</div><h1>Ask the resource helper</h1><p>Ask in English, Spanish, or Russian. Confirm services directly with each organization.</p><label>Language <select value={lang} onChange={event => changeLanguage(event.target.value as Language)}><option>English</option><option>Español</option><option>Русский</option></select></label></header>
    <section className="chat-card" aria-label="Resource chat">
      <div className="chat-messages" aria-live="polite">{messages.map((item, index) => <div key={index} className={item.role === "user" ? "from-user" : "from-helper"}>
        <p>{item.text}</p>
        {item.role === "assistant" && <><button className="read-aloud" onClick={() => speak(item.text)}>🔊 Read aloud</button>{item.resources?.map(resource => <article className="chat-resource" key={resource.id}><strong>{resource.name}</strong><span>{resource.description}</span><div><a href={`tel:${resource.phone.startsWith("211") ? "211" : resource.phone.replace(/[^\d]/g, "")}`}>Call {resource.phone}</a><a href={resource.website} target="_blank" rel="noopener noreferrer">Website ↗</a></div></article>)}</>}
      </div>)}{busy && <div className="from-helper"><p>Finding resources…</p></div>}</div>
      <div className="chat-suggestions" aria-label="Suggested questions">{["I need legal help", "Find food assistance", "Where can I take ESL classes?", "What forms can I apply for?", "I may lose my housing"].map(prompt => <button key={prompt} onClick={() => send(prompt)} disabled={busy}>{prompt}</button>)}</div>
      <div className="chat-entry"><input value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter") send(); }} placeholder="Type your question…" aria-label="Your question" maxLength={1000}/><button onClick={listen} aria-label={recording ? "Listening" : "Speak your question"} aria-pressed={recording}>{recording ? "●" : "🎙"}</button><button className="primary" onClick={() => send()} disabled={busy}>{busy ? "…" : "Send"}</button></div>
      {error && <p role="alert" className="chat-error">{error}</p>}
      <small>Voice starts only when you press the microphone. Review the text before sending. When AI is available, your question is sent to Google Gemini. Please avoid names, case numbers, or other private details. This helper is not legal advice. For urgent local help, <a href="tel:211">call 211</a>.</small>
    </section>
  </main>;
}

type SpeechRecognitionLike = {
  lang: string;
  onresult: (event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
};
