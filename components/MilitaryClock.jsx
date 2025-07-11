"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function MilitaryClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-red-500 font-bold">
      <Clock size={16} />
      {time} 
    </div>
  );
}
