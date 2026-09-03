let ctx: AudioContext | null = null;
let muted = false;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  ac();
}

function beep(freq: number, dur: number, type: OscillatorType, gain: number) {
  if (muted) return;
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(c.destination);
  o.start();
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  o.stop(c.currentTime + dur);
}

export function sayNo(ok: boolean) {
  if (muted) return;
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(ok ? 220 : 140, now);
  o.frequency.exponentialRampToValueAtTime(ok ? 180 : 90, now + 0.18);
  g.gain.setValueAtTime(0.06, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  o.connect(g);
  g.connect(c.destination);
  o.start(now);
  o.stop(now + 0.23);
}

export function tapSound() {
  beep(520, 0.05, "triangle", 0.03);
}
export function winSound() {
  beep(320, 0.08, "square", 0.04);
  setTimeout(() => beep(420, 0.1, "square", 0.04), 90);
}
export function failSound() {
  sayNo(false);
}
export function setMuted(v: boolean) {
  muted = !!v;
}
