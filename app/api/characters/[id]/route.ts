import { NextResponse } from "next/server";
import { getCharacters } from "@/lib/hp-api";
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 try{const {id}=await params;const all=await getCharacters();const character=all.find(c=>c.id===id);if(!character)return NextResponse.json({error:"Character not found"},{status:404});return NextResponse.json(character)}
 catch{return NextResponse.json({error:"Unable to load character"},{status:502})}
}
