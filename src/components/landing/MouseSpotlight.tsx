"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MouseSpotlightProps {
  children: ReactNode;
  className?: string;
  color?: string;
  size?: number;
  intensity?: number;
}

export function MouseSpotlight({
  children,
  className,
  color = "rgba(34, 211, 238, 0.15)",
  size = 400,
  intensity = 1,
}: MouseSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const tick = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: hovered ? intensity : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
