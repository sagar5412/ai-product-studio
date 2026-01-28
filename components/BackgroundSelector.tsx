"use client";

import { useState } from "react";

interface BackgroundSelectorProps {
  onSelect: (background: string) => void;
  selectedBackground: string;
}

const PRESET_BACKGROUNDS = [
  {
    id: "white-studio",
    name: "White Studio",
    color: "bg-gray-50",
    ring: "ring-gray-200",
  },
  {
    id: "kitchen-counter",
    name: "Kitchen",
    color: "bg-orange-50",
    ring: "ring-orange-200",
  },
  {
    id: "living-room",
    name: "Living Room",
    color: "bg-stone-100",
    ring: "ring-stone-200",
  },
  {
    id: "outdoor-garden",
    name: "Garden",
    color: "bg-green-50",
    ring: "ring-green-200",
  },
  {
    id: "office-desk",
    name: "Office",
    color: "bg-slate-100",
    ring: "ring-slate-200",
  },
  {
    id: "marble-surface",
    name: "Marble",
    color: "bg-zinc-100",
    ring: "ring-zinc-200",
  },
  {
    id: "beach-sunset",
    name: "Beach",
    color: "bg-amber-50",
    ring: "ring-amber-200",
  },
  {
    id: "modern-minimal",
    name: "Minimal",
    color: "bg-neutral-100",
    ring: "ring-neutral-200",
  },
];

export default function BackgroundSelector({
  onSelect,
  selectedBackground,
}: BackgroundSelectorProps) {
  const [customPrompt, setCustomPrompt] = useState("");

  const handleCustomSubmit = () => {
    if (customPrompt.trim()) {
      onSelect(`custom:${customPrompt.trim()}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESET_BACKGROUNDS.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className={`
              relative group p-4 rounded-xl border transition-all duration-200 text-left
              ${
                selectedBackground === bg.id
                  ? "border-black shadow-sm ring-1 ring-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <div
              className={`w-full aspect-video rounded-lg ${bg.color} mb-3 border border-black/5`}
            ></div>
            <span
              className={`text-sm font-medium ${selectedBackground === bg.id ? "text-gray-900" : "text-gray-600"}`}
            >
              {bg.name}
            </span>
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Background
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            placeholder="Describe any scene (e.g., 'A cozy coffee shop')"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
          />
          <button
            onClick={handleCustomSubmit}
            disabled={!customPrompt.trim()}
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
