import { NextRequest, NextResponse } from "next/server";
import { getSpells } from "@/lib/hp-api";
export async function GET(req:NextRequest){try{const q=(req.nextUrl.searchParams.get("q")||"").toLowerCase();let items=await getSpells();if(q)items=items.filter(s=>s.name.toLowerCase().includes(q)||s.description.toLowerCase().includes(q));return NextResponse.json({items});}catch{return NextResponse.json({error:"Unable to load spells"},{status:502})}}
