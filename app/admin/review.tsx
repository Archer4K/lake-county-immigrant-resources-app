"use client";
import { SiteNav, useLanguage } from "../language";
import { adminCopy } from "./copy";
import { useEffect, useState } from "react";
type Item={id:string;resourceId:string|null;data:Record<string,unknown>;contactEmail:string;submittedAt:string};
export default function Review(){
  const {language}=useLanguage();const t=adminCopy[language];
  const [items,setItems]=useState<Item[]>([]),[message,setMessage]=useState("");
  const load=()=>fetch("/api/admin/submissions").then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>setMessage("load"));
  useEffect(()=>{void load()},[]);
  async function decide(id:string,decision:string){const r=await fetch("/api/admin/submissions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,decision})});if(r.ok){setMessage(decision==="approve"?"approved":"rejected");load()}else setMessage("save")}
  return <main className="admin-shell"><SiteNav current="directory"/><h1>{t.title}</h1><p>{t.check}</p><p>{t.original}</p><p role="status">{message ? t[message as keyof typeof t] : ""}</p>{items.length===0?<p>{t.empty}</p>:items.map(item=><article className="admin-item" key={item.id}><h2>{String(item.data.name)}</h2><p>{item.resourceId?`${t.update} ${item.resourceId}`:t.new} · {t.submitted} {item.submittedAt.slice(0,10)} · {item.contactEmail}</p><dl>{Object.entries(item.data).filter(([k])=>k!=="source").map(([k,v])=><div key={k} style={{display:"contents"}}><dt>{k}</dt><dd>{Array.isArray(v)?v.join(", "):String(v)}</dd></div>)}</dl><div className="admin-actions"><button onClick={()=>decide(item.id,"approve")}>{t.approve}</button><button onClick={()=>decide(item.id,"reject")}>{t.reject}</button></div></article>)}</main>
}
