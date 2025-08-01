// src/app/components/LevelSelectScreen.jsx
"use client";
import React from "react";

export default function LevelSelectScreen({
  levels,
  completedLevels,
  bestTimes,
  onSelectLevel,
  onBack,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">レベル選択</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {levels.map((level, index) => (
          <div
            key={index}
            onClick={() => onSelectLevel(index)}
            className="cursor-pointer bg-white/10 rounded-lg p-4 shadow hover:bg-white/20 transition"
          >
            <img
              src={level.backgroundImage}
              alt={level.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-3">{level.name}</h2>
            <p className="text-sm opacity-80">{level.difficulty}</p>
            {completedLevels.includes(index) && (
              <p className="text-green-400 font-bold mt-1">クリア済み</p>
            )}
            {bestTimes[index] && (
              <p className="text-yellow-300 mt-1">
                ベストタイム: {bestTimes[index]} 秒
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-white/20 rounded hover:bg-white/30 transition"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
