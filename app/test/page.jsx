"use client";

import { useEffect, useState } from "react";
import "./style.css";

export default function GlitchBoxPage() {
  const [glitches, setGlitches] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newGlitches = Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        (_, i) => {
          const isRectangle = Math.random() > 0.5;
          const width = isRectangle
            ? Math.random() * 60 + 10
            : Math.random() * 30 + 10;
          const height = isRectangle
            ? Math.random() * 20 + 5
            : Math.random() * 30 + 10;

          return {
            id: Date.now() + i,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 10}%`, 
            width,
            height,
            color: ["#ff00ff", "#00ffff", "#ff5555"][
              Math.floor(Math.random() * 3)
            ],
            duration: 1000,
          };
        }
      );

      setGlitches((prev) => [...prev, ...newGlitches]);

      newGlitches.forEach((glitch) => {
        setTimeout(() => {
          setGlitches((prev) => prev.filter((g) => g.id !== glitch.id));
        }, glitch.duration);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {glitches.map((glitch) => (
        <div
          key={glitch.id}
          className="absolute animate-glitch-box z-0"
          style={{
            top: glitch.top,
            left: glitch.left,
            width: glitch.width,
            height: glitch.height,
            backgroundColor: glitch.color,
            opacity: 0.7,
            animationDuration: `${glitch.duration}ms`,
          }}
        ></div>
      ))}
    </div>
  );
}
