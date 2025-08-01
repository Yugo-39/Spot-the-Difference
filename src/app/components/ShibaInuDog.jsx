import React from "react";

const ShibaInuDog = ({
  dog = { x: 0, y: 0, size: 40 },
  isFound = false,
  onClick = () => {},
}) => {
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
      onClick={onClick}
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
          {/* 柴犬の絵文字/アイコン */}
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
                width: `${dog.size * 0.6}px`,
                height: `${dog.size * 0.6}px`,
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
              className={isFound ? "scale-110" : ""}
            />
          </div>

          {/* 宇宙ヘルメットエフェクト */}
          <div
            className="absolute inset-1 rounded-full border-2 transition-all duration-700"
            style={{
              borderColor: isFound
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.2)",
              background: isFound
                ? "radial-gradient(circle, rgba(255,255,255,0.1) 30%, transparent 70%)"
                : "radial-gradient(circle, rgba(255,255,255,0.05) 30%, transparent 70%)",
            }}
          />
        </div>

        {isFound && (
          <>
            {/* 発見ポップアップ */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce z-50 border-2 border-white/30">
              <div className="flex items-center gap-1">
                <span>🚀</span>
                <span>発見！</span>
                <span>✨</span>
              </div>
            </div>

            {/* 宇宙エフェクト */}
            <div className="absolute inset-0 rounded-full">
              {/* キラキラエフェクト */}
              <div className="absolute -top-2 -right-2 text-yellow-300 text-xl animate-pulse">
                ✨
              </div>
              <div className="absolute -bottom-2 -left-2 text-blue-300 text-lg animate-pulse delay-300">
                ⭐
              </div>
              <div className="absolute -top-2 -left-2 text-purple-300 text-sm animate-pulse delay-500">
                🌟
              </div>
              <div className="absolute -bottom-2 -right-2 text-pink-300 text-lg animate-pulse delay-700">
                💫
              </div>
            </div>

            {/* 宇宙塵エフェクト */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 animate-pulse"></div>
          </>
        )}

        {/* ホバーエフェクト */}
        {!isFound && (
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </div>
    </div>
  );
};

export default ShibaInuDog;
