"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const CamouflageShibaInuDog = ({
  dog = { x: 0, y: 0, size: 40 },
  isFound = false,
  onClick = () => {},
  showPulse = false,
  backgroundType = "forest",
}) => {
  const audioRef = useRef(null);
  const dogRef = useRef(null);
  const [mouseDistance, setMouseDistance] = useState(1000);
  const [isNearby, setIsNearby] = useState(false);

  const RING = 0; // 枠の太さ(px)
  const SILHOUETTE = "/images/dogs/silhouette.png";

  // 音声の事前読み込み
  useEffect(() => {
    const audio = new Audio("/sounds/dog.mp3");
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // マウス近接判定（rAFで間引き）
  useEffect(() => {
    let ticking = false;
    const handle = (e) => {
      if (ticking || !dogRef.current || isFound) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = dogRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.hypot(dx, dy);
        setMouseDistance(distance);
        setIsNearby(distance < 100);
        ticking = false;
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [isFound]);

  // カモフラージュの見た目
  const getCamouflageStyle = () => {
    const baseOpacity = Math.max(
      0.15,
      Math.min(0.8, (100 - mouseDistance) / 100 + 0.2)
    );
    const styles = {
      forest: {
        filter: `hue-rotate(40deg) saturate(0.8) brightness(0.7) contrast(0.9) blur(${
          isNearby ? 0 : 0.8
        }px)`,
        opacity: isFound ? 1 : showPulse ? 0.6 : baseOpacity,
        mixBlendMode: isFound ? "normal" : "multiply",
      },
      desert: {
        filter: `sepia(0.7) brightness(1.1) contrast(0.8) saturate(1.2) blur(${
          isNearby ? 0 : 1
        }px)`,
        opacity: isFound ? 1 : showPulse ? 0.5 : baseOpacity * 0.8,
        mixBlendMode: isFound ? "normal" : "overlay",
      },
      snow: {
        filter: `brightness(1.4) contrast(0.6) saturate(0.3) blur(${
          isNearby ? 0 : 1.2
        }px)`,
        opacity: isFound ? 1 : showPulse ? 0.4 : baseOpacity * 0.7,
        mixBlendMode: isFound ? "normal" : "screen",
      },
      library: {
        filter: `grayscale(0.6) contrast(1.1) brightness(0.8) blur(${
          isNearby ? 0 : 0.6
        }px)`,
        opacity: isFound ? 1 : showPulse ? 0.5 : baseOpacity,
        mixBlendMode: isFound ? "normal" : "darken",
      },
      night: {
        filter: `brightness(0.4) contrast(1.3) saturate(0.4) blur(${
          isNearby ? 0 : 1
        }px)`,
        opacity: isFound ? 1 : showPulse ? 0.3 : baseOpacity * 0.6,
        mixBlendMode: isFound ? "normal" : "multiply",
      },
    };
    return styles[backgroundType] || styles.forest;
  };

  // クリック時の動作
  const handleDogClick = (e) => {
    onClick(e);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const imageSrc = isFound ? dog.image || SILHOUETTE : SILHOUETTE;

  return (
    <div
      ref={dogRef}
      className={`absolute cursor-pointer transition-all duration-1000 ease-out ${
        isFound ? "z-50" : "z-20"
      }`}
      style={{
        left: `${dog.x}%`,
        top: `${dog.y}%`,
        width: `${dog.size}px`,
        height: `${dog.size}px`,
        transform: isFound
          ? "scale(1.5) translateY(-15px)"
          : isNearby
          ? "scale(1.05)"
          : "scale(1)",
      }}
      onClick={handleDogClick}
    >
      {/* 波紋エフェクト */}
      {isNearby && !isFound && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="absolute rounded-full border-2 border-white/30 animate-ping"
            style={{
              width: `${dog.size + 20}px`,
              height: `${dog.size + 20}px`,
            }}
          />
          <div
            className="absolute rounded-full border-2 border-blue-300/20 animate-ping"
            style={{
              width: `${dog.size + 40}px`,
              height: `${dog.size + 40}px`,
              animationDelay: "0.3s",
            }}
          />
        </div>
      )}

      {/* 枠と中の画像 */}
      <div
        className={`relative w-full h-full rounded-full transition-all duration-1000 overflow-visible ${
          showPulse && !isFound ? "animate-pulse" : ""
        }`}
        style={{
          border: isFound
            ? `${RING}px solid #FFD700`
            : isNearby
            ? `${RING}px solid rgba(255,255,255,0.6)`
            : `${RING}px solid rgba(255,255,255,0.2)`,
          boxShadow: isFound
            ? "0 0 25px rgba(255,215,0,0.9), 0 0 50px rgba(255,215,0,0.5)"
            : isNearby
            ? "0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2)"
            : "0 0 5px rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            position: "absolute",
            inset: RING,
            backgroundColor: "transparent",
            ...getCamouflageStyle(),
          }}
        >
          <Image
            src={imageSrc}
            alt="柴犬"
            fill
            sizes="100%"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>

        {/* スポットライト */}
        {isFound && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              animation: "spotlight 2s ease-out",
            }}
          />
        )}
      </div>

      {/* 発見アニメーション */}
      {isFound && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-16 h-16 border-2 border-yellow-400/50 rounded-full animate-ping" />
          <div
            className="absolute w-20 h-20 border-2 border-orange-400/30 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="absolute w-24 h-24 border-2 border-red-400/20 rounded-full animate-ping"
            style={{ animationDelay: "0.4s" }}
          />
          <div className="absolute text-yellow-400 text-lg font-bold animate-bounce">
            発見！
          </div>
        </div>
      )}

      {/* 近接ヒント */}
      {isNearby && !isFound && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-80 pointer-events-none whitespace-nowrap">
          何かいる...？
        </div>
      )}

      <style jsx>{`
        @keyframes spotlight {
          0% {
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0) 0%,
              transparent 70%
            );
          }
          50% {
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.5) 0%,
              transparent 70%
            );
          }
          100% {
            background: radial-gradient(
              circle,
              rgba(255, 255, 255, 0.3) 0%,
              transparent 70%
            );
          }
        }
      `}</style>
    </div>
  );
};

export default CamouflageShibaInuDog;
