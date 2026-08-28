"use client";
import Link from "next/link";
import { Heart, UserRound } from "lucide-react";
import { Character } from "@/types/hp";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";

export default function CharacterCard({character}:{character:Character}){
 const [fav,setFav]=useState(false);
 useEffect(()=>setFav(getFavorites().includes(character.id)),[character.id]);
 return <article className="card">
  <Link href={`/characters/${character.id}`}>
   {character.image?<img className="character-image" src={character.image} alt={character.name}/>:<div className="character-placeholder"><UserRound size={44}/></div>}
  </Link>
  <div className="card-pad"><div className="character-meta"><div><div className="tag">{character.house||"No house"}</div><h3 style={{margin:"8px 0"}}><Link href={`/characters/${character.id}`}>{character.name}</Link></h3><div className="muted">Patronus: {character.patronus||"Unknown"}</div></div>
  <button className={`favorite ${fav?"on":""}`} aria-label="Toggle favorite" onClick={()=>setFav(toggleFavorite(character.id).includes(character.id))}><Heart size={21} fill={fav?"currentColor":"none"}/></button></div></div>
 </article>
}
