import { env } from "cloudflare:workers";
import { categories } from "../../resources";

export async function POST(request: Request) {
  let data: Record<string,string>;
  try { data = await request.json(); } catch { return Response.json({error:"Invalid request"},{status:400}); }
  const required = ["name","category","languages","address","phone","website","hours","description","contactEmail"];
  if (required.some(k => typeof data[k] !== "string" || !data[k].trim() || data[k].length > 500) || !categories.includes(data.category)) return Response.json({error:"Missing or invalid fields"},{status:400});
  try { const u = new URL(data.website); if(!["http:","https:"].includes(u.protocol)) throw Error(); } catch { return Response.json({error:"Invalid website"},{status:400}); }
  if (!/^\S+@\S+\.\S+$/.test(data.contactEmail)) return Response.json({error:"Invalid email"},{status:400});
  const entry = {name:data.name.trim(),categories:[data.category],languages:data.languages.split(",").map(x=>x.trim()).filter(Boolean),address:data.address.trim(),city:"",zip:(data.address.match(/\b\d{5}\b/)||[])[0]||"",county:"Lake",phone:data.phone.trim(),website:data.website.trim(),hours:data.hours.trim(),appointment:data.appointment||"Call to confirm",description:data.description.trim(),source:"Organization submission"};
  try { await env.DB.prepare("INSERT INTO submissions (resource_id,data,contact_email,submitted_at,status) VALUES (?,?,?,?,?)").bind(data.resourceId||null,JSON.stringify(entry),data.contactEmail.trim(),new Date().toISOString(),"pending").run(); return Response.json({ok:true}); } catch { return Response.json({error:"Could not save request"},{status:503}); }
}
