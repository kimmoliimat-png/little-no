import type { GameObject, Level, Rect, Sim } from "./types.ts";
import { WORLD_H, WORLD_W } from "./types.ts";

const NO_W = 34;
const NO_H = 40;
const GRAVITY = 1400;
const WALK = 78;
const MAX_FALL = 620;
const COYOTE = 0.08;
const HIT_PAD = 28;

export function aabb(a: Rect, b: Rect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function contains(box: Rect, x: number, y: number) {
  return x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function objById(level: Level, id: string) {
  return level.objects.find((o) => o.id === id);
}

export function isTappable(o: GameObject) {
  return ["plank", "fan", "lid", "stairs", "soup", "magnet", "belt"].includes(o.type);
}

type Solid = Rect & { kind: string; belt?: GameObject };

export function solidBoxes(level: Level): Solid[] {
  const boxes: Solid[] = [];
  for (const p of level.platforms) boxes.push({ ...p, kind: "plat" });
  for (const o of level.objects) {
    if (o.type === "plank" && o.placed) boxes.push({ x: o.x, y: o.y, w: o.w, h: o.h, kind: "plank" });
    if (o.type === "soup" && o.frozen) boxes.push({ x: o.x, y: o.y, w: o.w, h: 18, kind: "ice" });
    if (o.type === "lid" && o.closed && o.cover) {
      boxes.push({ x: o.cover.x, y: o.cover.y, w: o.cover.w, h: o.cover.h, kind: "lid" });
    }
    if (o.type === "metal") boxes.push({ x: o.x, y: o.y, w: o.w, h: o.h, kind: "metal" });
    if (o.type === "belt" && o.on) boxes.push({ x: o.x, y: o.y, w: o.w, h: o.h, kind: "belt", belt: o });
    if (o.type === "stairs" && o.on) {
      const rise = Math.max(16, o.rise || 80);
      const span = Math.max(o.w, 40);
      const steps = Math.max(8, Math.ceil(rise / 12));
      const stepW = Math.max(28, span / steps + 18);
      for (let i = 0; i < steps; i++) {
        const t = i / Math.max(1, steps - 1);
        boxes.push({ x: o.x + t * (span - stepW), y: o.y - t * rise, w: stepW, h: 12, kind: "stairs" });
      }
    }
  }
  return boxes;
}

export function hazardBoxes(level: Level): (Rect & { kind: string })[] {
  const boxes: (Rect & { kind: string })[] = [];
  for (const o of level.objects) {
    if (o.type === "hazard") {
      const cover = o.coveredBy ? objById(level, o.coveredBy) : null;
      if (cover && cover.closed) continue;
      boxes.push({ x: o.x + 6, y: o.y + 4, w: o.w - 12, h: o.h - 8, kind: o.kind || "hazard" });
    }
    if (o.type === "soup" && !o.frozen) {
      boxes.push({ x: o.x + 8, y: o.y + 4, w: o.w - 16, h: o.h, kind: "soup" });
    }
  }
  return boxes;
}

function iceBoxes(level: Level): Rect[] {
  const boxes: Rect[] = [];
  for (const o of level.objects) {
    if (o.type === "ice" && o.on) boxes.push(o);
    if (o.type === "soup" && o.frozen) boxes.push({ x: o.x, y: o.y - 6, w: o.w, h: 18 });
  }
  return boxes;
}

export function hitTestInteractive(level: Level, x: number, y: number) {
  const list = level.objects.filter(isTappable);
  let best: GameObject | null = null;
  let bestD = 99999;
  for (const o of list) {
    const box = { x: o.x - HIT_PAD, y: o.y - HIT_PAD, w: o.w + HIT_PAD * 2, h: o.h + HIT_PAD * 2 };
    if (contains(box, x, y)) {
      const cx = o.x + o.w / 2;
      const cy = o.y + o.h / 2;
      const d = (cx - x) * (cx - x) + (cy - y) * (cy - y);
      if (d < bestD) { bestD = d; best = o; }
    }
  }
  return best;
}

function applyVerb(obj: GameObject | null) {
  if (!obj) return false;
  if (obj.type === "plank") { obj.placed = !obj.placed; return true; }
  if (obj.type === "fan" || obj.type === "magnet" || obj.type === "belt" || obj.type === "stairs") {
    obj.on = !obj.on; return true;
  }
  if (obj.type === "lid") { obj.closed = !obj.closed; return true; }
  if (obj.type === "soup") { obj.frozen = !obj.frozen; return true; }
  return false;
}

function createNo(spawn: { x: number; y: number }) {
  return { x: spawn.x, y: spawn.y, w: NO_W, h: NO_H, vx: WALK, vy: 0, grounded: false, coyote: 0, facing: 1, say: "NO" };
}

export function createSim(levelData: Level): Sim {
  const level = structuredClone(levelData);
  return { level, no: createNo(level.spawn), status: "play", time: 0, verbs: 0, fails: 0, history: [JSON.stringify({ level, no: createNo(level.spawn) })], endLine: "", failKind: "", stars: 0 };
}

function snapshot(sim: Sim) {
  return JSON.stringify({ level: sim.level, no: { x: sim.no.x, y: sim.no.y, vx: sim.no.vx, vy: sim.no.vy, grounded: sim.no.grounded, facing: sim.no.facing }, status: "play", time: sim.time, verbs: sim.verbs });
}

function restore(sim: Sim, raw: string) {
  const s = JSON.parse(raw);
  sim.level = s.level;
  Object.assign(sim.no, s.no);
  sim.status = "play";
  sim.time = s.time;
  sim.verbs = s.verbs;
  sim.endLine = "";
  sim.failKind = "";
}

export function interactAt(sim: Sim, x: number, y: number) {
  if (sim.status !== "play") return false;
  const obj = hitTestInteractive(sim.level, x, y);
  const changed = applyVerb(obj);
  if (changed) {
    sim.verbs += 1;
    sim.history.push(snapshot(sim));
    if (sim.history.length > 30) sim.history.shift();
  }
  return changed;
}

export function tapObj(sim: Sim, id: string) {
  const o = sim.level.objects.find((x) => x.id === id);
  if (!o) return false;
  return interactAt(sim, o.x + o.w / 2, o.y + o.h / 2);
}

export function undo(sim: Sim) {
  if (sim.history.length < 2) return false;
  sim.history.pop();
  restore(sim, sim.history[sim.history.length - 1]!);
  return true;
}

function fail(sim: Sim, kind: string) {
  if (sim.status !== "play") return;
  sim.status = "fail";
  sim.fails += 1;
  sim.failKind = kind || "no";
  sim.endLine = sim.level.failLine || "STILL NO.";
  sim.no.vy = -220;
  sim.no.vx = 40;
  sim.no.say = "NO";
}

function win(sim: Sim) {
  if (sim.status !== "play") return;
  sim.status = "win";
  sim.endLine = sim.level.winLine || "NO.";
  sim.no.vx = 0;
  sim.no.say = sim.time < 8 ? "ok" : "NO";
  sim.stars = starCount(sim);
}

export function starCount(sim: Sim) {
  let s = 1;
  if (sim.fails === 0) s += 1;
  if (sim.time < 12 && sim.verbs <= 4) s += 1;
  return clamp(s, 1, 3);
}

function resolveWorld(sim: Sim, dt: number) {
  const n = sim.no;
  if (sim.status !== "play") {
    n.vy = Math.min(MAX_FALL, n.vy + GRAVITY * dt * 0.3);
    return;
  }
  n.vy = Math.min(MAX_FALL, n.vy + GRAVITY * dt);
  for (const o of sim.level.objects) {
    if (o.type === "fan" && o.on) {
      const pad = { x: o.x - 6, y: o.y - 8, w: o.w + 12, h: o.h + 16 };
      if (aabb(n, pad) && n.grounded) {
        n.vy = -Math.max(620, (o.power || 500) * 1.1);
        n.grounded = false;
      }
      const range = Math.max(90, o.range || 176);
      const cone = { x: o.x - 8, y: o.y - 88, w: range, h: 160 };
      if (aabb(n, cone) && !n.grounded) {
        n.vx += (o.dir || 1) * Math.max(80, (o.power || 500) * 0.25) * dt;
        n.vy -= 500 * dt;
      }
    }
    if (o.type === "magnet" && o.on) {
      for (const m of sim.level.objects) {
        if (!m.parked) continue;
        m.x += (m.parked.x - m.x) * Math.min(1, 10 * dt);
        m.y += (m.parked.y - m.y) * Math.min(1, 10 * dt);
      }
    }
  }
  if (n.grounded) n.vx += (WALK - n.vx) * Math.min(1, 8 * dt);
  n.vx = clamp(n.vx, -260, 280);
  let onIce = false;
  for (const ice of iceBoxes(sim.level)) {
    if (aabb({ x: n.x, y: n.y + n.h - 4, w: n.w, h: 8 }, ice)) onIce = true;
  }
  if (onIce) n.vx += 40 * dt;
  n.x += n.vx * dt;
  n.y += n.vy * dt;
  const solids = solidBoxes(sim.level);
  n.grounded = false;
  for (const s of solids) {
    if (!aabb(n, s)) continue;
    const overlapX = Math.min(n.x + n.w, s.x + s.w) - Math.max(n.x, s.x);
    const overlapY = Math.min(n.y + n.h, s.y + s.h) - Math.max(n.y, s.y);
    if (overlapX < 0 || overlapY < 0) continue;
    const stepH = n.y + n.h - s.y;
    if (stepH > 0 && stepH <= 40 && n.vy >= -80) {
      n.y = s.y - n.h;
      n.vy = 0;
      n.grounded = true;
      n.coyote = COYOTE;
      if (s.kind === "belt" && s.belt?.on) n.x += (s.belt.dir || 1) * (s.belt.speed || 100) * dt;
      continue;
    }
    if (overlapY <= overlapX + 1) {
      if (n.y + n.h / 2 < s.y + s.h / 2) {
        n.y = s.y - n.h;
        if (n.vy > 0) n.vy = 0;
        n.grounded = true;
        n.coyote = COYOTE;
        if (s.kind === "belt" && s.belt?.on) n.x += (s.belt.dir || 1) * (s.belt.speed || 100) * dt;
      } else {
        n.y = s.y + s.h;
        if (n.vy < 0) n.vy = 0;
      }
    } else {
      if (n.x + n.w / 2 < s.x + s.w / 2) n.x = s.x - n.w;
      else n.x = s.x + s.w;
      n.vx *= 0.2;
    }
  }
  if (!n.grounded) n.coyote = Math.max(0, n.coyote - dt);
  if (n.x < -20 || n.x > WORLD_W + 10 || n.y > WORLD_H + 40) {
    fail(sim, "void");
    return;
  }
  n.x = clamp(n.x, -16, WORLD_W - 8);
  for (const hz of hazardBoxes(sim.level)) {
    if (aabb(n, hz)) {
      fail(sim, hz.kind);
      return;
    }
  }
  if (aabb(n, sim.level.goal)) win(sim);
}

export function step(sim: Sim, dt: number) {
  dt = clamp(dt, 0, 0.033);
  if (sim.status === "play") sim.time += dt;
  resolveWorld(sim, dt);
  return sim.status;
}

export type ScriptAct = { time: number; act: string };

export function runHeadless(level: Level, script: ScriptAct[], seconds = 20) {
  const sim = createSim(level);
  const dt = 1 / 60;
  const max = Math.ceil(seconds / dt);
  let si = 0;
  for (let i = 0; i < max; i++) {
    const t = i * dt;
    while (si < script.length && script[si]!.time <= t) {
      const a = script[si++]!;
      if (a.act === "undo") undo(sim);
      else tapObj(sim, a.act);
    }
    step(sim, dt);
    if (sim.status !== "play") break;
  }
  return sim;
}
