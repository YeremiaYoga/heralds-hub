"use client";

import { useEffect, useState } from "react";
import { FileText, Flame, BookOpen, Star, Coffee } from "lucide-react";
import MilitaryClock from "@/components/MilitaryClock";

export default function DesktopUI() {
  const apps = [
    {
      icon: <FileText size={48} className="text-yellow-400" />, // Gold tone
      label: "Tales_of_Dasaron.exe",
      link: "https://2024.TalesofDasaron.Web.id",
    },
    {
      icon: <Flame size={48} className="text-yellow-400" />,
      label: "Ignite.exe",
      link: "https://Igniteproject.web.id",
    },
    {
      icon: <Star size={48} className="text-yellow-400" />,
      label: "Compodium.dll",
      link: "#",
    },
    {
      icon: <BookOpen size={48} className="text-yellow-400" />,
      label: "Admin_Notes.log",
      link: "https://admin.talesofdasaron.web.id",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1a2d] text-white flex items-center justify-center p-4">
      <fieldset className="relative bg-[#102136] text-white w-full max-w-5xl h-[720px] border-4 border-blue-800 rounded-md px-6 py-8">
        <legend className="px-4 text-blue-300 font-bold text-xl">
          Tales of Dasaron
        </legend>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-center mt-10 z-10 relative">
          {apps.map((app, index) => (
            <a
              href={app.link}
              key={index}
              className="flex flex-col items-center space-y-3 group hover:text-yellow-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-40 h-40 border-2 border-blue-800 bg-[#1c2f47] flex items-center justify-center">
                {app.icon}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-300">
                {app.label}
              </div>
            </a>
          ))}
        </div>

        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-4 text-sm border-t border-blue-800 pt-2 z-10">
          <div className="text-yellow-400 font-bold">
            <MilitaryClock />
          </div>
          <a
            href="https://ko-fi.com/candlenote"
            className="flex items-center gap-2 border border-yellow-400 px-3 py-1 rounded hover:bg-yellow-400 hover:text-black transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Coffee size={16} />
            Kofi
          </a>
        </div>
      </fieldset>
    </div>
  );
}
