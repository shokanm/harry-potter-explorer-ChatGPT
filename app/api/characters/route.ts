import { NextRequest, NextResponse } from "next/server";
import { getCharacters } from "@/lib/hp-api";
export async function GET(req:NextRequest){
 try{
  const params=req.nextUrl.searchParams; const q=(params.get("q")||"").trim().toLowerCase(); const house=(params.get("house")||"").trim().toLowerCase();
  const page=Math.max(1,Number(params.get("page")||1)); const limit=Math.min(24,Math.max(1,Number(params.get("limit")||12)));
  let items=await getCharacters();
  if(q) items=items.filter(c=>c.name.toLowerCase().includes(q));
  if(house) items=items.filter(c=>c.house.toLowerCase()===house);
  const total=items.length; const start=(page-1)*limit;
  return NextResponse.json({items:items.slice(start,start+limit),page,limit,total,totalPages:Math.ceil(total/limit)});
 }catch(e){ return NextResponse.json({error:"Unable to load characters right now."},{status:502}); }
}
