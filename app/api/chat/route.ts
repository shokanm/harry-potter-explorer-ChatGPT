import { NextResponse } from "next/server";
const personas:Record<string,string>={
 "Harry Potter":"brave, modest, loyal and direct",
 "Hermione Granger":"brilliant, precise, curious and principled",
 "Severus Snape":"dry, restrained, intimidating and sharply intelligent",
 "Albus Dumbledore":"calm, thoughtful, warm and fond of layered wisdom"
};
export async function POST(req:Request){
 try{
  const {character,message,history=[]}=await req.json();
  if(!message||!character)return NextResponse.json({error:"Missing character or message"},{status:400});
  const key=process.env.OPENAI_API_KEY;
  if(!key)return NextResponse.json({reply:`AI mode is ready for ${character}, but OPENAI_API_KEY is not configured yet. Add it to .env.local or your deployment secrets to enable live conversations.`,configured:false});
  const system=`You are role-playing ${character} from the Harry Potter fictional universe for an educational fan app. Stay in character with a ${personas[character]||"distinctive, immersive"} voice. Never claim to be the real person or a real-world sentient being. Keep replies concise and avoid fabricated canon facts; when uncertain, say so in character.`;
  const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:system},...history.slice(-8),{role:"user",content:message}],temperature:.85,max_tokens:280})});
  if(!response.ok) return NextResponse.json({error:"LLM provider request failed"},{status:502});
  const data=await response.json(); return NextResponse.json({reply:data.choices?.[0]?.message?.content||"No response",configured:true});
 }catch{return NextResponse.json({error:"Unable to process chat"},{status:500})}
}
