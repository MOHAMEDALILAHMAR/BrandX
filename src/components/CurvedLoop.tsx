import { useRef, useEffect, useState, useMemo } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  imgSrc?: string;
}

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  direction = 'left',
  interactive = true,
  imgSrc,
}: CurvedLoopProps) => {
  const parts = useMemo(() => {
    const segments = marqueeText.split('✦').filter(Boolean).map(s => s.trim());
    const result: { type: 'text' | 'img'; value: string }[] = [];
    segments.forEach((seg, i) => {
      result.push({ type: 'text', value: seg });
      if (imgSrc && i < segments.length - 1) {
        result.push({ type: 'img', value: imgSrc });
      }
    });
    return result;
  }, [marqueeText, imgSrc]);

  const text = useMemo(() => {
    const raw = parts.map(p => p.type === 'text' ? p.value : ' ').join('  ');
    const hasTrailing = /\s|\u00A0$/.test(raw);
    return (hasTrailing ? raw.replace(/\s+$/, '') : raw) + '\u00A0';
  }, [parts]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const offsetRef = useRef(0);

  const repeats = useMemo(() => {
    if (!textWidth) return 3;
    return Math.ceil((window.innerWidth * 2) / textWidth) + 2;
  }, [textWidth]);

  const totalText = useMemo(() => Array(repeats).fill(text).join(''), [text, repeats]);

  useEffect(() => {
    if (trackRef.current) {
      setTextWidth(trackRef.current.scrollWidth / repeats);
    }
  }, [text, repeats]);

  useEffect(() => {
    if (!textWidth) return;
    const wrapPoint = textWidth;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        offsetRef.current += delta;
        if (offsetRef.current <= -wrapPoint) offsetRef.current += wrapPoint;
        if (offsetRef.current > 0) offsetRef.current -= wrapPoint;
        setOffset(offsetRef.current);
      }
      requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [textWidth, speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    offsetRef.current += dx;
    const wrapPoint = textWidth;
    if (offsetRef.current <= -wrapPoint) offsetRef.current += wrapPoint;
    if (offsetRef.current > 0) offsetRef.current -= wrapPoint;
    setOffset(offsetRef.current);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="curved-loop-jacket"
      style={{ cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <div className="curved-loop-track" ref={trackRef} style={{ transform: `translateX(${offset}px)` }}>
        <span className={`curved-loop-text ${className || ''}`}>
          {Array(repeats).fill(null).flatMap((_, idx) =>
            parts.map((p, i) =>
              p.type === 'text'
                ? <span key={`${idx}t${i}`}>{p.value}</span>
                : <img key={`${idx}i${i}`} src={p.value} alt="" className="curved-loop-img" />
            )
          )}
        </span>
      </div>
    </div>
  );
};

export default CurvedLoop;
