"use client";

import { useCallback, useEffect, useState } from "react";

interface UseCountdownTimerProps {
  initialSeconds?: number;
}

export function useCountdownTimer({
  initialSeconds = 60,
}: UseCountdownTimerProps = {}) {
  const [timer, setTimer] = useState(initialSeconds);

  // Start countdown
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Reset timer to initial value
  const resetTimer = useCallback(() => {
    setTimer(initialSeconds);
  }, [initialSeconds]);

  return {
    timer,
    resetTimer,
  };
}
