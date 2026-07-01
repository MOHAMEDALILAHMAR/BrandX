import { useEffect, useState } from 'react';

export function useCounter(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.min(Math.round(eased * target), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}
