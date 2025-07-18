"use client";

import { useEffect, useState } from "react";
import {
  Youtube,
  Twitch,
  Github,
  Twitter,
  MessageCircleMore,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const iconMap = {
  youtube: Youtube,
  twitch: Twitch,
  github: Github,
  twitter: Twitter,
  discord: FaDiscord,
  message: MessageCircleMore,
};

export default function SocialLinks() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/apps?type=social", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data) {
          setLinks(data);
        }
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div className="flex flex-col items-end gap-4 text-yellow-400 mr-2">
      {links.map((link, i) => {
        const Icon = iconMap[link.icon?.toLowerCase()];
        if (!Icon) return null;

        const isDisabled = !link.url;

        return isDisabled ? (
          <span
            key={i}
            className="opacity-40 cursor-not-allowed"
           
          >
            <Icon className="w-8 h-8" />
          </span>
        ) : (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-transform"
        
          >
            <Icon className="w-8 h-8" />
          </a>
        );
      })}
    </div>
  );
}
