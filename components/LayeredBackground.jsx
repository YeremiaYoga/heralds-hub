"use client";

import { useEffect, useRef } from "react";
import "./layeredBackground.css";

const layers = [
  {
    src: "/assets/background_inside/layer_8.webp",
    idle: true,
    idleX: 1.2,
    idleY: 0.1,
  },
  {
    src: "/assets/background_inside/layer_7.webp",
    idle: false,
    idleX: 0.2,
    idleY: 0.2,
    twinkle: true,
  },
  {
    src: "/assets/background_inside/layer_6.png",
    idle: true,
    idleX: 1,
    idleY: 0,
  },
  { src: "/assets/background_inside/layer_5.webp", idle: false },
  {
    src: "/assets/background_inside/layer_4.webp",
    idle: true,
    idleX: 0.8,
    idleY: 0,
  },
  {
    src: "/assets/background_inside/layer_3.webp",
    idle: true,
    idleX: 0.5,
    idleY: 0.2,
  },
  {
    src: "/assets/background_inside/layer_2.webp",
    idle: true,
    idleX: 0.6,
    idleY: 1.2,
  },
  { src: "/assets/background_inside/layer_1.webp", idle: false },
];

export default function LayeredBackground() {
  const containerRef = useRef(null);
  const timeRef = useRef(0);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    >
      <div className="">
        {layers.map((layer, index) => {
          const isLayer6 = index === 2;
          const baseTransform = "translate(0px, 0px)";
          const scaleTransform = isLayer6 ? " scale(1)" : "";

          return (
            <img
              key={index}
              src={layer.src}
              alt={`layer-${index}`}
              className={`bg-layer absolute top-0 left-0 will-change-transform
        ${layer.twinkle ? "twinkle-stars" : ""}
        ${
          isLayer6
            ? "object-contain rotate-layer h-[150%] w-[150%]"
            : "object-cover w-full h-full"
        }

      `}
              style={{
                transform: baseTransform + scaleTransform,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
