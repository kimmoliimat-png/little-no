export type SaveData = {
  version: 1;
  stars: Record<string, number>;
  last: number;
  muted: boolean;
};

const KEY = "little-no-v1";
const EMPTY: SaveData = { version: 1, stars: {}, last: 1, muted: false };

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY, stars: {} };
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    return {
      version: 1,
      stars: parsed.stars && typeof parsed.stars === "object" ? parsed.stars : {},
      last: typeof parsed.last === "number" ? parsed.last : 1,
      muted: !!parsed.muted,
    };
  } catch {
    return { ...EMPTY, stars: {} };
  }
}

export function writeSave(data: SaveData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* iframe / private mode */
  }
}
