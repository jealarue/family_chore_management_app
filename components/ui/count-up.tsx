"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function CountUp({
  end,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = 0;
    const endValue = end;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    
    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / durationMs, 1);
      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      
      if (countRef.current !== currentCount) {
        countRef.current = currentCount;
        setCount(currentCount);
      }
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };
    
    frameRef.current = requestAnimationFrame(updateCount);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}