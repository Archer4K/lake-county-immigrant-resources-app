type GeminiModel = {
  name?: string;
  supportedGenerationMethods?: string[];
};

type GeminiModelsResponse = { models?: GeminiModel[] };
type GeminiContentResponse = { candidates?: { content?: { parts?: { text?: string }[] } }[] };

function modelScore(name: string) {
  let score = 0;
  if (name.includes("flash-lite")) score += 100;
  else if (name.includes("flash")) score += 60;
  if (!name.includes("preview") && !name.includes("exp")) score += 30;
  if (name.includes("3.")) score += 10;
  if (name === "gemini-3.8-flash") score -= 50;
  return score;
}

async function availableFlashModels(key: string) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=100", {
      headers: { "x-goog-api-key": key },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!response.ok) return ["gemini-3.8-flash"];
    const data = await response.json() as GeminiModelsResponse;
    const names = (data.models || [])
      .filter(item => item.supportedGenerationMethods?.includes("generateContent"))
      .map(item => item.name?.replace(/^models\//, "") || "")
      .filter(name => name.includes("flash") && !/(image|audio|tts|live)/.test(name))
      .sort((a, b) => modelScore(b) - modelScore(a));
    return [...new Set([...names, "gemini-3.8-flash"])];
  } catch {
    return ["gemini-3.8-flash"];
  }
}

export async function generateGeminiJson(key: string, prompt: string, responseSchema: object, maxOutputTokens: number) {
  const models = await availableFlashModels(key);
  const failures: string[] = [];

  for (const model of models.slice(0, 5)) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json", responseSchema, maxOutputTokens },
        }),
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      });
      if (!response.ok) {
        const detail = (await response.text()).replace(/\s+/g, " ").slice(0, 300);
        failures.push(`${model} returned ${response.status}: ${detail}`);
        continue;
      }
      const data = await response.json() as GeminiContentResponse;
      const text = data.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("") || "";
      if (text) return text;
      failures.push(`${model} returned an empty response`);
    } catch (error) {
      failures.push(`${model}: ${error instanceof Error ? error.message : "request failed"}`);
    }
  }

  throw new Error(failures.join(" | ").slice(0, 1200) || "No compatible Gemini Flash model was available");
}
