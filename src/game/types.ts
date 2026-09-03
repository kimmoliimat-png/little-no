export const WORLD_W = 360;
export const WORLD_H = 640;
export const FLOOR = 560;

export type Theme = "kitchen" | "laundry" | "museum" | "airport" | "winter" | "jungle" | "summer";

export type ObjType =
  | "plank"
  | "fan"
  | "lid"
  | "hazard"
  | "soup"
  | "magnet"
  | "metal"
  | "belt"
  | "ice"
  | "stairs";

export type Rect = { x: number; y: number; w: number; h: number };

export type GameObject = {
  id: string;
  type: ObjType;
  x: number;
  y: number;
  w: number;
  h: number;
  placed?: boolean;
  on?: boolean;
  closed?: boolean;
  frozen?: boolean;
  dir?: number;
  power?: number;
  range?: number;
  speed?: number;
  rise?: number;
  kind?: string;
  coveredBy?: string;
  cover?: Rect;
  parked?: { x: number; y: number };
};

export type Level = {
  id: number;
  chapter: string;
  title: string;
  caption: string;
  winLine: string;
  failLine: string;
  hint: string;
  teach: string;
  theme: Theme;
  spawn: { x: number; y: number };
  goal: Rect;
  platforms: Rect[];
  objects: GameObject[];
  win?: string[];
  fail?: string[][];
};

export type NoBody = Rect & {
  vx: number;
  vy: number;
  grounded: boolean;
  coyote: number;
  facing: number;
  say: string;
};

export type Sim = {
  level: Level;
  no: NoBody;
  status: "play" | "win" | "fail";
  time: number;
  verbs: number;
  fails: number;
  history: string[];
  endLine: string;
  failKind: string;
  stars: number;
};
