import { NextResponse } from "next/server";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

function headers() {
  return {
    apikey: key!,
    "Content-Type": "application/json",
  };
}

export async function GET() {
  if (!url || !key) {
    return NextResponse.json({
      items: [],
      configured: false,
    });
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/character_views?select=character_id,character_name,views&order=views.desc&limit=6`,
      {
        headers: headers(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase GET error:", error);
      throw new Error(error);
    }

    return NextResponse.json({
      items: await response.json(),
      configured: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        items: [],
        configured: true,
        error: "Database unavailable",
      },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  if (!url || !key) {
    return NextResponse.json({
      configured: false,
    });
  }

  try {
    const { characterId, characterName } = await request.json();

    if (!characterId || !characterName) {
      return NextResponse.json(
        { error: "characterId and characterName are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${url}/rest/v1/rpc/increment_character_view`,
      {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          p_character_id: characterId,
          p_character_name: characterName,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase RPC error:", error);
      throw new Error(error);
    }

    return NextResponse.json({
      ok: true,
      configured: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not record view" },
      { status: 500 }
    );
  }
}