"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee, Volume2 } from "lucide-react";
import MilitaryClock from "@/components/MilitaryClock";
import GlitchEffect from "@/components/GlitchEffect";
import SocialLinks from "../components/SocialLinks";

import LayeredBackground from "@/components/LayeredBackground";
import VolumeControl from "@/components/VolumeControl";
import { apps } from "@/data/apps";

// import { fetchApps } from "@/lib/jsonbin";

const fetchApps = async () => {
  const res = await fetch("/api/apps");
  if (!res.ok) return [];

  const json = await res.json();

  return json;
};

export default function DesktopUI() {
  const [apps, setApps] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    fetchApps().then(setApps);
  }, []);
  const audioRef = useRef(null);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.loop = true;
        audioRef.current.play().catch((e) => {
          console.warn("Autoplay still blocked:", e);
        });
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasInteracted]);

  const handleGlitchClick = (e) => {
    e.preventDefault();
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a2d] via-[#1a2d47] to-[#2c1a3f] text-white flex items-center justify-center">
      <audio
        ref={audioRef}
        src="/assets/background_audio.ogg"
        autoPlay
        loop
        hidden
      />
      <div className="absolute inset-0 z-50 pointer-events-none">
        <GlitchEffect />
      </div>
      <div className="absolute inset-0 z-50 pointer-events-none">
        <GlitchEffect side="right" />
      </div>
      <fieldset className="relative w-[90vw] h-[90vh] border-4 border-yellow-400 rounded-xl shadow-2xl px-6  backdrop-blur-sm overflow-hidden flex flex-col">
        <LayeredBackground />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <SocialLinks />
        </div>
        <legend className="px-4 text-yellow-300 font-bold text-2xl">
          Tales of Dasaron
        </legend>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-30 text-center z-10 relative place-items-center">
            {apps.map((app, index) => (
              <a
                href={app.link}
                key={index}
                onClick={(e) => {
                  if (app.glitch) {
                    handleGlitchClick?.(e);
                  }

                  if (audioRef.current) {
                    audioRef.current.muted = true;
                  }

                  if (setIsMuted) {
                    setIsMuted(true);
                  }

                  localStorage.setItem("muted", "true");
                }}
                className={`flex flex-col items-center space-y-3 group transition-all duration-200 hover:scale-105 ${
                  app.glitch ? "hover:text-red-400" : "hover:text-yellow-300"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`w-50 h-50 flex items-center justify-center relative ${
                    app.glitch
                      ? ""
                      : "rounded-lg border-2 border-blue-800 bg-[#1c2f47] shadow-md group-hover:ring-2"
                  } ${
                    app.glitch
                      ? "group-hover:ring-red-500"
                      : "group-hover:ring-yellow-500"
                  }`}
                >
                  {app.icon && (
                    <img
                      src={app.icon}
                      alt={app.label}
                      className={`object-contain ${
                        app.glitch ? "w-50 h-50" : "w-40 h-40"
                      }`}
                    />
                  )}

                  {app.glitch && (
                    <span className="absolute text-6xl text-red-500 font-bold">
                      ?̸̔̉?̸̉͑
                    </span>
                  )}
                </div>

                <div
                  className={`text-xl font-bold text-white transition ${
                    app.glitch
                      ? "group-hover:text-red-400"
                      : "group-hover:text-yellow-300"
                  }`}
                >
                  {app.label}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-2 left-0 right-0 px-4 text-sm border-t border-blue-800 pt-2 z-10">
          <div className="relative w-full h-full flex justify-end items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold">
              <MilitaryClock />
            </div>

            <VolumeControl audioRef={audioRef} isMuted={isMuted} setIsMuted={setIsMuted} />
            <a
              href="https://ko-fi.com/candlenote"
              className="flex items-center gap-2 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition font-semibold text-2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Coffee size={24} />
              <span>Kofi</span>
            </a>
          </div>
        </div>
      </fieldset>
      {showError && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded shadow-xl z-50 animate-pulse border-2 border-red-800 font-mono text-sm">
          Error #500 - In❐ern❐l E❐❐or Detected : Nu❐ber 8589869056 un❐ble to ❐e
          read.
        </div>
      )}
    </div>
  );
}
