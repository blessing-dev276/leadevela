/**
 * Synthesizes an original, soft "du-DUM" heartbeat with the Web Audio API.
 * Two low thumps ~150ms apart, each = pitch-dropping sine + low-passed noise.
 * Whole effect < 400ms, no reverb tail, no high tones.
 */
let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

function getNoise(c: AudioContext) {
  if (noiseBuffer) return noiseBuffer;
  const len = Math.floor(c.sampleRate * 0.15);
  noiseBuffer = c.createBuffer(1, len, c.sampleRate);
  const d = noiseBuffer.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuffer;
}

function thump(c: AudioContext, out: AudioNode, t: number, o: { f0: number; f1: number; peak: number; decay: number }) {
  // Body: sine sweeping down
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(o.f0, t);
  osc.frequency.exponentialRampToValueAtTime(o.f1, t + o.decay);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(o.peak, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.decay);
  osc.connect(g).connect(out);
  osc.start(t);
  osc.stop(t + o.decay + 0.02);

  // Texture: low-passed noise for the natural "thud"
  const n = c.createBufferSource();
  n.buffer = getNoise(c);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 140;
  lp.Q.value = 0.7;
  const ng = c.createGain();
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(o.peak * 0.9, t + 0.008);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + o.decay * 0.7);
  n.connect(lp).connect(ng).connect(out);
  n.start(t);
  n.stop(t + o.decay);
}

export const BEAT_GAP_MS = 150;

export function playHeartbeat(volume = 0.55) {
  const c = getAudioContext();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  const t = c.currentTime + 0.01;
  const master = c.createGain();
  master.gain.value = volume;
  // Final safety low-pass keeps everything warm and below ~200Hz
  const guard = c.createBiquadFilter();
  guard.type = "lowpass";
  guard.frequency.value = 200;
  master.connect(guard).connect(c.destination);
  thump(c, master, t, { f0: 70, f1: 42, peak: 0.55, decay: 0.11 }); // "du"
  thump(c, master, t + BEAT_GAP_MS / 1000, { f0: 62, f1: 34, peak: 0.85, decay: 0.16 }); // "DUM"
}
