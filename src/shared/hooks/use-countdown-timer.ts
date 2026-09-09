'use client';

import { useCallback, useEffect, useState } from 'react';

const OTP_RESEND_COOLDOWN = 60;
const OTP_RESEND_END_TIME_KEY = 'otp-resend-end-time';

export function useCountdownTimer() {
  const [timer, setTimer] = useState(0);

  /**
   * Calculates the remaining cooldown time from the persisted end timestamp.
   * The timestamp allows the cooldown to survive page refreshes.
   */
  const calculateRemainingTime = useCallback(() => {
    const endTime = localStorage.getItem(OTP_RESEND_END_TIME_KEY);

    if (!endTime) {
      return 0;
    }

    const remainingTime = Math.ceil((Number(endTime) - Date.now()) / 1000);

    if (remainingTime <= 0) {
      localStorage.removeItem(OTP_RESEND_END_TIME_KEY);
      return 0;
    }

    return remainingTime;
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      setTimer(calculateRemainingTime());
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [calculateRemainingTime]);

  /**
   * Starts a new cooldown and persists its end time
   * so the timer cannot be bypassed by refreshing the page.
   */
  const resetTimer = useCallback(() => {
    const endTime = Date.now() + OTP_RESEND_COOLDOWN * 1000;

    localStorage.setItem(OTP_RESEND_END_TIME_KEY, endTime.toString());

    setTimer(OTP_RESEND_COOLDOWN);
  }, []);

  return {
    timer,
    resetTimer,
  };
}
