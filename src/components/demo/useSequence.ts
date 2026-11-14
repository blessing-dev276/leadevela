import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs a list of callbacks on a timeline and reports how many have fired.
 *
 * Every timer is tracked so a restart or an unmount clears the pending ones;
 * without that, replaying a demo leaves the previous run's timers firing into
 * a component that has already moved on.
 */
export function useSequence() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const run = useCallback(
    (steps: { at: number; do?: () => void }[]) => {
      clear();
      setStep(0);
      setRunning(true);
      steps.forEach((s, i) => {
        timers.current.push(
          setTimeout(() => {
            s.do?.();
            setStep(i + 1);
            if (i === steps.length - 1) setRunning(false);
          }, s.at),
        );
      });
    },
    [clear],
  );

  const reset = useCallback(() => {
    clear();
    setStep(0);
    setRunning(false);
  }, [clear]);

  return { step, running, run, reset };
}
