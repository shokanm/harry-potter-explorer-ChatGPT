import { NextResponse } from "next/server";
const url=process.env.SUPABASE_URL; const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
const headers=()=>({"apikey":key!,"Authorization":`Bearer ${key}`,"Content-Type":"application/json"});
export async function GET(){
 if(!url||!key)return NextResponse.json({items:[],configured:false});
 try{const r=await fetch(`${url}/rest/v1/character_views?select=character_id,character_name,views&order=views.desc&limit=6`,{headers:headers(),cache:"no-store"});if(!r.ok)throw 0;return NextResponse.json({items:await r.json(),configured:true});}catch{return NextResponse.json({items:[],configured:true,error:"Database unavailable"},{status:502})}
}
export async function POST(req:Request){
 if(!url||!key)return NextResponse.json({configured:false});
 try{const {characterId,characterName}=await req.json();const lookup=await fetch(`${url}/rest/v1/character_views?character_id=eq.${encodeURIComponent(characterId)}&select=id,views`,{headers:headers(),cache:"no-store"});const rows=await lookup.json();if(rows?.[0])await fetch(`${url}/rest/v1/character_views?id=eq.${rows[0].id}`,{method:"PATCH",headers:{...headers(),Prefer:"return=minimal"},body:JSON.stringify({views:Number(rows[0].views||0)+1})});else await fetch(`${url}/rest/v1/character_views`,{method:"POST",headers:{...headers(),Prefer:"return=minimal"},body:JSON.stringify({character_id:characterId,character_name:characterName,views:1})});return NextResponse.json({ok:true,configured:true});}catch{return NextResponse.json({error:"Could not record view"},{status:500})}
}
