const KEY = "hp-explorer-favorites";
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
export const toggleFavorite = (id: string) => {
  const current = getFavorites();
  const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
};
