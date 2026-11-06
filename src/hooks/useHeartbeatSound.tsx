import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { getAudioContext, playHeartbeat } from "@/lib/heartbeat";

type Ctx = { enabled: boolean; toggle: () => void; play: () => void; pulse: number };
const HeartbeatContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "leadvela-sound";
const COOLDOWN_MS = 520;

export function HeartbeatProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false); // initially OFF
  const [pulse, setPulse] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "on") setEnabled(true);
  }, []);

  const play = useCallback(() => {
    const now = performance.now();
    if (now - last.current < COOLDOWN_MS) return; // no overlapping beats
    last.current = now;
    setPulse((p) => p + 1); // visual response always; sound only when enabled
    if (enabled) playHeartbeat();
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      if (next) {
        // unlock audio inside the user gesture (required on iOS/Android)
        const c = getAudioContext();
        if (c?.state === "suspended") void c.resume();
        last.current = performance.now();
        setPulse((p) => p + 1);
        playHeartbeat();
      }
      return next;
    });
  }, []);

  return <HeartbeatContext.Provider value={{ enabled, toggle, play, pulse }}>{children}</HeartbeatContext.Provider>;
}

export function useHeartbeatSound() {
  const ctx = useContext(HeartbeatContext);
  if (!ctx) throw new Error("useHeartbeatSound must be used inside HeartbeatProvider");
  return ctx;
}
