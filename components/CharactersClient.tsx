"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Character } from "@/types/hp";
import CharacterCard from "./CharacterCard";

const houseList=["All","Gryffindor","Slytherin","Ravenclaw","Hufflepuff"];
export default function CharactersClient(){
 const params=useSearchParams();
 const [items,setItems]=useState<Character[]>([]); const [q,setQ]=useState(""); const [house,setHouse]=useState(params.get("house")||"All"); const [page,setPage]=useState(1); const [totalPages,setTotalPages]=useState(1); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
 useEffect(()=>{ const t=setTimeout(async()=>{setLoading(true);setError("");try{const qs=new URLSearchParams({q,page:String(page),limit:"12"});if(house!=="All")qs.set("house",house);const r=await fetch(`/api/characters?${qs}`);if(!r.ok)throw 0;const d=await r.json();setItems(d.items);setTotalPages(d.totalPages||1);}catch{setError("The portraits are moving again. Please try once more.");}finally{setLoading(false)}},250);return()=>clearTimeout(t)},[q,house,page]);
 const changeHouse=(h:string)=>{setHouse(h);setPage(1)};
 return <>
  <div className="toolbar"><input className="search" value={q} onChange={e=>{setQ(e.target.value);setPage(1)}} placeholder="Search witches & wizards..."/></div>
  <div className="toolbar">{houseList.map(h=><button key={h} className={`chip ${house===h?"active":""}`} onClick={()=>changeHouse(h)}>{h}</button>)}</div>
  {loading?<div className="state">Summoning characters…</div>:error?<div className="state">{error}</div>:items.length===0?<div className="state">No characters matched your search.</div>:<div className="grid-3">{items.map(c=><CharacterCard character={c} key={c.id}/>)}</div>}
  <div className="actions">{page>1&&<button className="btn" onClick={()=>setPage(p=>p-1)}>← Previous</button>}<span className="muted" style={{alignSelf:"center"}}>Page {page} of {totalPages}</span>{page<totalPages&&<button className="btn btn-primary" onClick={()=>setPage(p=>p+1)}>Next →</button>}</div>
 </>
}
