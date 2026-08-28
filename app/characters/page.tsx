import { Suspense } from "react";
import CharactersClient from "@/components/CharactersClient";
export default function Characters(){return <main className="section"><div className="container"><div className="eyebrow">Wizarding directory</div><h2>Characters</h2><p className="lead" style={{marginLeft:0}}>Search the wizarding world by name or Hogwarts house. Data is fetched through our own server layer.</p><Suspense fallback={<div className="state">Loading…</div>}><CharactersClient/></Suspense></div></main>}
