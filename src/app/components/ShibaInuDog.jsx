import React, { useEffect, useRef } from "react";

const ShibaInuDog = ({
  dog = { x: 0, y: 0, size: 40 },
  isFound = false,
  onClick = () => {},
}) => {
  const audioRef = useRef(null);

  // 音声を事前読み込み
  useEffect(() => {
    audioRef.current = new Audio("/sounds/dog.mp3"); // public/sounds/dog.mp3 に配置
    audioRef.current.volume = 0.3;
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 犬クリック時の処理
  const handleDogClick = (e) => {
    onClick(e); // 元のクリック処理（座標判定など）

    // 音を鳴らす
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // 最初から
      audioRef.current
        .play()
        .catch((err) => console.log("音声再生エラー:", err));
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-700 ease-out ${
        isFound ? "z-50" : "z-20"
      }`}
      style={{
        left: `${dog.x}%`,
        top: `${dog.y}%`,
        width: `${dog.size}px`,
        height: `${dog.size}px`,
        transform: isFound
          ? "scale(1.5) translateY(-15px)"
          : "scale(1) rotate(0deg)",
      }}
      onClick={handleDogClick}
    >
      <div className="relative w-full h-full group">
        {/* 宇宙柴犬アバター */}
        <div
          className="w-full h-full rounded-full transition-all duration-700 overflow-hidden"
          style={{
            border: isFound
              ? "3px solid #FFD700"
              : "2px solid rgba(255,255,255,0.3)",
            boxShadow: isFound
              ? "0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.4)"
              : "0 0 10px rgba(139,69,19,0.3)",
            filter: isFound
              ? "brightness(1.2) saturate(1.4)"
              : "brightness(0.7) contrast(0.9) saturate(0.6)",
            opacity: isFound ? 1 : 0.75,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-700"
            style={{
              filter: isFound
                ? "brightness(1.3)"
                : "brightness(0.8) grayscale(0.3)",
            }}
          >
            <img
              src="images/dog3.jpg"
              alt="柴犬"
              style={{
                width: `${dog.size * 0.45}px`,
                height: `${dog.size * 0.45}px`,
                objectFit: "contain",
                transition: "transform 0.3s ease, filter 0.3s ease",
                opacity: isFound ? 1 : 0.6,
                filter: isFound
                  ? "brightness(1.3) saturate(1.4)"
                  : "brightness(0.5) contrast(0.8) saturate(0.4)",
              }}
              className={isFound ? "scale-110" : ""}
            />
          </div>
        </div>

        {/* 見つかった時のエフェクト */}
        {isFound && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-16 h-16 border-2 border-yellow-400/50 rounded-full animate-ping"></div>
            <div
              className="absolute w-20 h-20 border-2 border-orange-400/30 rounded-full animate-ping"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute w-24 h-24 border-2 border-red-400/20 rounded-full animate-ping"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShibaInuDog;
