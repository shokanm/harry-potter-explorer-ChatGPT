import { Suspense } from "react";
import ChatClient from "@/components/ChatClient";
export default function Chat(){return <main className="section"><div className="container"><div className="eyebrow">AI bonus</div><h2>Talk to the wizarding world</h2><p className="lead" style={{marginLeft:0}}>Choose a character and start a fictional, in-character conversation. LLM requests are sent only from the server.</p><div style={{marginTop:28}}><Suspense fallback={<div className="state">Preparing chat…</div>}><ChatClient/></Suspense></div></div></main>}
