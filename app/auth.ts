import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "lake_admin";
const ADMIN_CONTEXT = "lake-county-resource-admin-v1";

function key(): string { const token=process.env.KV_REST_API_TOKEN; if(!token) throw new Error("Admin storage not configured"); return token; }
function signature(value:string):string { return createHmac("sha256",key()).update(value).digest("hex"); }
function safeEqual(a:string,b:string):boolean { const x=Buffer.from(a),y=Buffer.from(b); return x.length===y.length && timingSafeEqual(x,y); }

export function validLogin(password:string):boolean {
  if(!password) return false;
  try { return safeEqual(password, signature(ADMIN_CONTEXT)); } catch { return false; }
}
export async function setAdminSession():Promise<void> {
  const expiry=Date.now()+8*60*60*1000;
  const payload=`admin|${expiry}`;
  const value=Buffer.from(`${payload}|${signature(payload)}`).toString("base64url");
  (await cookies()).set(COOKIE,value,{httpOnly:true,secure:true,sameSite:"lax",path:"/",maxAge:8*60*60});
}
export async function isAdmin():Promise<boolean> {
  const value=(await cookies()).get(COOKIE)?.value;
  if(!value)return false;
  try {const [label,expires,sig]=Buffer.from(value,"base64url").toString().split("|"); const payload=`${label}|${expires}`; return label==="admin" && Number(expires)>Date.now() && !!sig && safeEqual(sig,signature(payload));}catch{return false;}
}
