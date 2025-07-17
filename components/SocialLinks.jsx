"use client";

import {
  Youtube,
  Twitch,
  Github,
  Twitter,
  MessageCircleMore,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa"; 

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-end gap-4 text-yellow-400 mr-2">
      <a
        href="https://www.youtube.com/@TalesOfDasaron"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white hover:scale-110 transition-transform"
      >
        <Youtube className="w-8 h-8" />
      </a>
      <a
        href="https://www.twitch.tv/candlenote"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white hover:scale-110 transition-transform"
      >
        <Twitch className="w-8 h-8" />
      </a>

      <a
        href="https://discord.gg/Gnn3e9T8gh"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white hover:scale-110 transition-transform"
      >
       <FaDiscord className="w-8 h-8" />
      </a>

      <span className="opacity-40 cursor-not-allowed">
        <Twitter className="w-8 h-8" />
      </span>


      <span className="opacity-40 cursor-not-allowed">
        <Github className="w-8 h-8" />
      </span>
    </div>
  );
}
