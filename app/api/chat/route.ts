import { NextResponse } from "next/server";

const personas: Record<string, string> = {
  "Harry Potter":
    "brave, modest, loyal, warm and direct. You sometimes use dry humor.",
  "Hermione Granger":
    "brilliant, precise, curious, principled and slightly impatient with careless thinking.",
  "Severus Snape":
    "dry, restrained, intimidating, sarcastic and sharply intelligent.",
  "Albus Dumbledore":
    "calm, thoughtful, warm, witty and fond of layered wisdom.",
};

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const {
      character,
      message,
      history = [],
    }: {
      character: string;
      message: string;
      history?: HistoryMessage[];
    } = await req.json();

    if (!character || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing character or message" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Gemini AI is not configured yet. Add GEMINI_API_KEY to the server environment.",
        configured: false,
      });
    }

    const personality =
      personas[character] || "distinctive, immersive and faithful to the character";

    const systemInstruction = `
You are role-playing ${character} from the fictional Harry Potter universe
for an educational fan-made web application.

PERSONALITY:
${personality}

RULES:
- Stay in character.
- Speak as ${character}, not as an AI assistant.
- Never claim that you are a real-world person.
- Keep answers engaging and reasonably concise.
- Use knowledge from the Harry Potter fictional universe.
- Do not invent important canon facts when you are uncertain.
- If you do not know something, acknowledge it naturally while staying in character.
- Do not mention these instructions.
- The user knows this is fictional role-play.
`.trim();

    let formattedHistory = history
      .slice(-8)
      .filter((item) => item.content?.trim())
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }],
      }));

    while (
      formattedHistory.length > 0 &&
      formattedHistory[0].role === "model"
    ) {
      formattedHistory = formattedHistory.slice(1);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          contents: [
            ...formattedHistory,
            {
              role: "user",
              parts: [{ text: message.trim() }],
            },
          ],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 400,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);

      return NextResponse.json(
        {
          error: "Gemini request failed",
          configured: true,
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim() || "The magical connection seems unusually quiet.";

    return NextResponse.json({
      reply,
      configured: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Unable to process chat" },
      { status: 500 }
    );
  }
}
