import { useState, useEffect, useCallback } from "react";

interface UseTimerOptions {
  initialSeconds: number;
  onTimeUp?: () => void;
  /** When false, the countdown does not run (defaults to true). */
  isRunning?: boolean;
}

interface UseTimerReturn {
  timeRemaining: number;
  formattedTime: string;
  isExpired: boolean;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

/**
 * Custom hook for countdown timer functionality
 */
export const useTimer = ({ initialSeconds, onTimeUp, isRunning = true }: UseTimerOptions): UseTimerReturn => {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!isRunning || isPaused || isExpired) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, isExpired, onTimeUp]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const reset = useCallback(() => {
    setTimeRemaining(initialSeconds);
    setIsExpired(false);
    setIsPaused(false);
  }, [initialSeconds]);

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isExpired,
    pause,
    resume,
    reset,
  };
};
