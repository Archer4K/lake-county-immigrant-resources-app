import { initialResources, type Resource } from "./resources";

export async function redis(command: string, ...args: (string | number)[]): Promise<unknown> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Redis is not configured");
  const response = await fetch(url, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([command, ...args]), cache: "no-store",
  });
  const data = await response.json() as { result?: unknown; error?: string };
  if (!response.ok || data.error) throw new Error(data.error || "Redis unavailable");
  return data.result;
}

export function parseHash(raw: unknown): Record<string,string> {
  if (!Array.isArray(raw)) return {};
  const result: Record<string,string> = {};
  for (let i=0;i<raw.length;i+=2) if(typeof raw[i]==="string" && typeof raw[i+1]==="string") result[raw[i]]=raw[i+1];
  return result;
}

export async function getResources(): Promise<Resource[]> {
  const merged = new Map(initialResources.map(r => [r.id, r]));
  try {
    const overrides = parseHash(await redis("HGETALL", "lake:resources"));
    for (const [id, value] of Object.entries(overrides)) merged.set(id, JSON.parse(value));
  } catch { /* The source-checked starter directory remains available if storage is down. */ }
  return [...merged.values()].sort((a,b) => a.name.localeCompare(b.name));
}
