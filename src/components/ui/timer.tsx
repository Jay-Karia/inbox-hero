import { useState, useEffect, useRef } from "react";

interface TimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
}

export default function Timer({ durationMinutes, onTimeUp }: TimerProps) {
  // Store the start time and end time in refs to ensure they don't change on re-renders
  const endTimeRef = useRef<number>(Date.now() + durationMinutes * 60 * 1000);

  // Track if the timer is active
  const [isActive, setIsActive] = useState(true);
  // Display time left
  const [displayTime, setDisplayTime] = useState(durationMinutes * 60);

  // Reference to the interval to ensure it's not affected by re-renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval if the timer is active
    if (isActive) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const secondsLeft = Math.max(
          0,
          Math.floor((endTimeRef.current - now) / 1000)
        );

        // Update the display time
        setDisplayTime(secondsLeft);

        // Check if time is up
        if (secondsLeft <= 0) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          onTimeUp();
        }
      }, 100); // Update more frequently for smoother display
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onTimeUp]); // Only re-run if isActive or onTimeUp changes

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="text-2xl font-bold text-white">
      {formatTime(displayTime)}
    </div>
  );
}
