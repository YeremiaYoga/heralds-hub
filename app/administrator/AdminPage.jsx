"use client";

import { useEffect, useState } from "react";

const fetchApps = async () => {
  const res = await fetch("/api/admin/data");

  if (res.status === 401) {
    window.location.href = "/administrator/login";
    return [];
  }

  const json = await res.json();

  return json;
};

const updateApps = async (apps) => {
  await fetch("/api/admin/data", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apps),
  });
};

export default function AdminPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchApps();
      setApps(data);
      setLoading(false);
    };

    load();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...apps];
    updated[index][field] = value;
    setApps(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateApps(apps);
    setSaving(false);
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a2d] via-[#1a2d47] to-[#2c1a3f] py-12 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-yellow-300">
          🔧 App Link Manager
        </h1>

        <div className="space-y-8">
          {apps.map((app, index) => (
            <div
              key={index}
              className="bg-[#1e293b] border border-blue-700 rounded-xl p-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="col-span-2 flex items-center gap-4 mt-4">
                  {app.icon && (
                    <div className="flex items-center gap-4 bg-slate-800 rounded-lg px-4 py-2 shadow">
                      <img
                        src={app.icon}
                        alt="App icon"
                        className="w-20 h-20 object-contain rounded"
                      />
                      <p className="text-lg font-semibold text-yellow-300">
                        {app.label}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Label</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2"
                    value={app.label}
                    onChange={(e) =>
                      handleChange(index, "label", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Link</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2"
                    value={app.link}
                    onChange={(e) =>
                      handleChange(index, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-500"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
