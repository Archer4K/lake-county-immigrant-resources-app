import { studyCards, type TestVersion } from "../../citizenship/study-data";
import { generateGeminiJson } from "../gemini";

type Language = "English" | "Español" | "Русский";
type RequestBody = { version?: unknown; questionId?: unknown; response?: unknown; language?: unknown };

const unavailable = {
  English: "AI feedback is not available right now. Use the official answers below to compare your response.",
  Español: "Los comentarios de IA no están disponibles ahora. Use las respuestas oficiales de abajo para comparar su respuesta.",
  Русский: "ИИ-обратная связь сейчас недоступна. Сравните свой ответ с официальными ответами ниже.",
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as RequestBody;
  const version = body.version === "2008" || body.version === "2025" ? body.version as TestVersion : null;
  const questionId = typeof body.questionId === "number" ? body.questionId : null;
  const response = typeof body.response === "string" ? body.response.trim().slice(0, 800) : "";
  const language: Language = body.language === "Español" || body.language === "Русский" ? body.language : "English";
  const card = version && questionId ? studyCards[version].find(item => item.id === questionId) : undefined;
  if (!card || !response) return Response.json({ error: "A valid question and answer are required." }, { status: 400 });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ verdict: "unclear", feedback: unavailable[language], hint: "", mode: "official" });

  const instruction = `You are an encouraging citizenship-test practice coach. Evaluate only whether the learner's response matches one or more supplied official USCIS answers. Reply in ${language}. Do not give legal advice, decide eligibility, create new answers, or claim a response is guaranteed to be accepted by a USCIS officer. Be concise and use plain language. Return strict JSON with verdict (correct, needs-work, or unclear), feedback (one or two sentences), and hint (one short study hint).`;
  try {
    const raw = await generateGeminiJson(
      key,
      `${instruction}\n\nOfficial USCIS question: ${card.question}\nOfficial accepted answers: ${card.answers.join(" | ")}\nLearner response: ${response}`,
      { type: "object", properties: { verdict: { type: "string", enum: ["correct", "needs-work", "unclear"] }, feedback: { type: "string" }, hint: { type: "string" } }, required: ["verdict", "feedback", "hint"] },
      300,
    );
    const result = JSON.parse(raw) as { verdict?: unknown; feedback?: unknown; hint?: unknown };
    if (!(["correct", "needs-work", "unclear"] as string[]).includes(String(result.verdict)) || typeof result.feedback !== "string" || typeof result.hint !== "string") throw new Error("Invalid Gemini response");
    return Response.json({ verdict: result.verdict, feedback: result.feedback.slice(0, 700), hint: result.hint.slice(0, 300), mode: "ai" });
  } catch (error) {
    console.error("Citizenship feedback request failed", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ verdict: "unclear", feedback: unavailable[language], hint: "", mode: "official" });
  }
}
