"use client";

import { useState } from "react";
import AdminPage from "./AdminPage";
import SocialPage from "./SocialPage";

export default function AdminContent() {
  const [selectedPage, setSelectedPage] = useState("admin");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full bg-gradient-to-br from-[#0b1a2d] via-[#1a2d47] to-[#2c1a3f]  rounded-2xl shadow-2xl space-y-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-yellow-300 mt-10">
          🔧 App Link Manager
        </h1>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setSelectedPage("admin")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                selectedPage === "admin"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            Admin Page
          </button>
          <button
            onClick={() => setSelectedPage("social")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                selectedPage === "social"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            Social Page
          </button>
        </div>

        {/* Konten */}
        <div className="mt-4">
          {selectedPage === "admin" && <AdminPage />}
          {selectedPage === "social" && <SocialPage />}
        </div>
      </div>
    </div>
  );
}
