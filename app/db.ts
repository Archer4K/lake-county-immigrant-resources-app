import { env } from "cloudflare:workers";
import { initialResources, type Resource } from "./resources";

type Row = { id: string; data: string; verified_at: string };
export async function getResources(): Promise<Resource[]> {
  const rows = await env.DB.prepare("SELECT id, data, verified_at FROM resources").all<Row>();
  const merged = new Map(initialResources.map(r => [r.id, r]));
  for (const row of rows.results) merged.set(row.id, { ...JSON.parse(row.data), verifiedAt: row.verified_at });
  return [...merged.values()].sort((a,b) => a.name.localeCompare(b.name));
}
