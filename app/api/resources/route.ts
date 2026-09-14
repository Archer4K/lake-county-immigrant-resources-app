import { getResources } from "../../db";
export async function GET() { try { return Response.json(await getResources()); } catch { return Response.json({ error:"Directory temporarily unavailable" },{status:503}); } }
