"use client";
import React from "react";
import Image from "next/image";
import { dogBreeds } from "@/app/data/dogBreeds";

const RarityBadge = ({ rarity }) => (
  <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 text-white">
    {rarity}
  </span>
);

export default function DogDex({ discovered = [], onBack = () => {} }) {
  const total = dogBreeds.length;
  const found = discovered.length;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">柴犬図鑑</h1>
          <button
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            onClick={onBack}
          >
            戻る
          </button>
        </div>

        <p className="mb-4">
          発見数：{found} / {total}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dogBreeds.map((b) => {
            const isFound = discovered.includes(b.id);
            const img = isFound ? b.image : b.silhouette;
            const name = isFound ? b.name : "？？？";

            return (
              <div
                key={b.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-black/20">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className={
                      isFound ? "object-cover" : "object-cover opacity-60"
                    }
                    priority={false}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-semibold">{name}</div>
                  <RarityBadge rarity={b.rarity} />
                </div>
                {isFound ? (
                  <div className="text-xs text-white/70 mt-1">{b.hint}</div>
                ) : (
                  <div className="text-xs text-white/40 mt-1">
                    未発見の柴犬…
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
