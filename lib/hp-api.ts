import { Character, Spell } from "@/types/hp";

const BASE = "https://hp-api.onrender.com/api";

async function hpFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`HP API failed with ${res.status}`);
  return res.json() as Promise<T>;
}

export const getCharacters = () => hpFetch<Character[]>("/characters");
export const getSpells = () => hpFetch<Spell[]>("/spells");
