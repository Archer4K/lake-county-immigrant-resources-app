"use client";
import { useEffect, useState } from "react";
type Item={id:string;resourceId:string|null;data:Record<string,unknown>;contactEmail:string;submittedAt:string};
export default function Review(){
  const [items,setItems]=useState<Item[]>([]),[message,setMessage]=useState("");
  const load=()=>fetch("/api/admin/submissions").then(r=>r.json()).then(d=>setItems(Array.isArray(d)?d:[])).catch(()=>setMessage("Could not load requests."));
  useEffect(()=>{void load()},[]);
  async function decide(id:string,decision:string){const r=await fetch("/api/admin/submissions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,decision})});if(r.ok){setMessage(decision==="approve"?"Resource approved and published.":"Request rejected.");load()}else setMessage("Could not save decision.")}
  return <main className="admin-shell"><a href="/">← Directory</a><h1>Resource review</h1><p>Check each request with the organization before approval. Approved entries appear in the public directory.</p><p role="status">{message}</p>{items.length===0?<p>No pending requests.</p>:items.map(item=><article className="admin-item" key={item.id}><h2>{String(item.data.name)}</h2><p>{item.resourceId?`Update to ${item.resourceId}`:"New resource"} · Submitted {item.submittedAt.slice(0,10)} · {item.contactEmail}</p><dl>{Object.entries(item.data).filter(([k])=>k!=="source").map(([k,v])=><div key={k} style={{display:"contents"}}><dt>{k}</dt><dd>{Array.isArray(v)?v.join(", "):String(v)}</dd></div>)}</dl><div className="admin-actions"><button onClick={()=>decide(item.id,"approve")}>Approve</button><button onClick={()=>decide(item.id,"reject")}>Reject</button></div></article>)}</main>
}
