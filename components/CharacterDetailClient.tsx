"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, UserRound } from "lucide-react";
import { Character } from "@/types/hp";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

export default function CharacterDetailClient({id}:{id:string}){
 const [c,setC]=useState<Character|null>(null);const [error,setError]=useState("");const [fav,setFav]=useState(false);
 useEffect(()=>{(async()=>{try{const r=await fetch(`/api/characters/${id}`);if(!r.ok)throw 0;const d=await r.json();setC(d);setFav(getFavorites().includes(id));fetch('/api/views',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({characterId:id,characterName:d.name})}).catch(()=>{});}catch{setError("Character not found or unavailable.")}})()},[id]);
 if(error)return <div className="state">{error}</div>;if(!c)return <div className="state">Opening the archive…</div>;
 const wand=[c.wand?.wood,c.wand?.core,c.wand?.length?`${c.wand.length} inches`:""].filter(Boolean).join(" · ")||"Unknown";
 const data=[["House",c.house||"Unknown"],["Born",c.dateOfBirth||String(c.yearOfBirth||"Unknown")],["Species",c.species||"Unknown"],["Ancestry",c.ancestry||"Unknown"],["Patronus",c.patronus||"Unknown"],["Actor",c.actor||"Unknown"],["Role",c.hogwartsStaff?"Hogwarts staff":c.hogwartsStudent?"Hogwarts student":"Wizarding world"],["Status",c.alive?"Alive":"Deceased"],["Wand",wand]];
 return <div className="detail"><div>{c.image?<img className="character-image" src={c.image} alt={c.name}/>:<div className="character-placeholder"><UserRound/></div>}</div><div><div className="tag">{c.house||"Wizarding world"}</div><h2>{c.name}</h2>{c.alternate_names?.length>0&&<p className="muted">Also known as {c.alternate_names.join(", ")}</p>}<div className="actions" style={{justifyContent:"flex-start"}}><button className={`btn ${fav?"btn-primary":""}`} onClick={()=>setFav(toggleFavorite(c.id).includes(c.id))}><Heart size={16} fill={fav?"currentColor":"none"}/>{fav?"Saved":"Add to favorites"}</button><Link className="btn" href={`/chat?character=${encodeURIComponent(c.name)}`}><MessageCircle size={16}/>Talk to {c.name.split(" ")[0]}</Link></div><div className="info-grid">{data.map(([k,v])=><div className="info" key={k}><small>{k}</small>{v}</div>)}</div></div></div>
}
