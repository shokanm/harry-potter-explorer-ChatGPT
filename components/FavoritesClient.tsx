"use client";
import { useEffect, useState } from "react";
import { Character } from "@/types/hp";
import { getFavorites } from "@/lib/favorites";
import CharacterCard from "./CharacterCard";
export default function FavoritesClient(){
 const [items,setItems]=useState<Character[]>([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{const ids=getFavorites(); if(!ids.length){setLoading(false);return;} try{const results=await Promise.all(ids.map(async id=>{const r=await fetch(`/api/characters/${id}`);return r.ok?await r.json():null}));setItems(results.filter(Boolean));}finally{setLoading(false)}})()},[]);
 return loading?<div className="state">Reading your enchanted list…</div>:items.length?<div className="grid-3">{items.map(c=><CharacterCard character={c} key={c.id}/>)}</div>:<div className="state">No favorites yet. Tap the heart on any character.</div>
}
