import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl({ audioRef, isMuted, setIsMuted }) {
  const [volume, setVolume] = useState(0.5); // Default volume

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("volume");
      if (saved && audioRef.current) {
        const parsed = parseFloat(saved);
        audioRef.current.volume = parsed;
        setVolume(parsed);
      }
    }
  }, [audioRef]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (audioRef.current.muted && newVolume > 0) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("volume", newVolume);
    }
  };

  return (
    <div className="flex items-center gap-2 text-yellow-400 mr-4">
      <button onClick={toggleMute}>
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 accent-yellow-400"
        title="Volume"
      />
    </div>
  );
}
