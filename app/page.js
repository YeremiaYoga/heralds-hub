"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee } from "lucide-react";
import MilitaryClock from "@/components/MilitaryClock";

export default function DesktopUI() {
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

  const apps = [
    {
      icon: "/assets/tales_of_dasaron_icon.png",
      label: "Tales_of_Dasaron.exe",
      link: "https://2024.TalesofDasaron.Web.id",
    },
    {
      icon: "/assets/ignite_icon.png",
      label: "Ignite.exe",
      link: "https://Igniteproject.web.id",
    },
    {
      icon: "/assets/6_star.png",
      label: "Compodium.dll",
      link: "https://heraldcompodium.blogspot.com",
    },
    {
      icon: "/assets/admin_log_icon.png",
      label: "Admin_Notes.log",
      link: "https://admin.talesofdasaron.web.id",
    },
    {
      icon: "/assets/glitch_error_icon.png",
      label: "❐❑❏❏❒❒█▊▋▌▇❐❑❒❒",
      link: "",
      glitch: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a2d] via-[#1a2d47] to-[#2c1a3f] text-white flex items-center justify-center">
      <audio
        ref={audioRef}
        src="/assets/background_audio.ogg"
        autoPlay
        loop
        hidden
      />

      <fieldset className="relative w-[90vw] h-[90vh]  bg-gradient-to-br from-[#0a121ecc] via-[#101f33cc] to-[#1a1c2fcc] border-4 border-yellow-400 rounded-xl shadow-2xl px-6 py-8 backdrop-blur-sm overflow-hidden flex flex-col">
        <legend className="px-4 text-yellow-300 font-bold text-2xl">
          Tales of Dasaron
        </legend>

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-30 text-center z-10 relative place-items-center">
            {apps.map((app, index) => (
              <a
                href={app.link}
                key={index}
                onClick={app.glitch ? handleGlitchClick : undefined}
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

        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-4 text-sm border-t border-blue-800 pt-2 z-10">
          <div className="text-yellow-400 font-bold">
            <MilitaryClock />
          </div>
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
