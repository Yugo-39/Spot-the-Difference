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
        <img
          src="images/dog2.png"
          alt="柴犬"
          className="w-full h-full object-cover rounded-full transition-all duration-700"
          style={{
            border: isFound ? "3px solid gold" : "none",
            boxShadow: isFound ? "0 0 15px rgba(255,215,0,0.7)" : "none",
            filter: isFound
              ? "brightness(1.1) saturate(1.3)"
              : "brightness(0.6) contrast(0.8) saturate(0.5) blur(0.5px)",
            opacity: isFound ? 1 : 0.7,
            mixBlendMode: isFound ? "normal" : "multiply",
          }}
        />

        {isFound && (
          <>
            {/* 見つけたポップ */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-base font-bold shadow-lg animate-bounce z-50">
              🎉 見つけた！
            </div>
            {/* 光のリング */}
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-yellow-300/30 animate-pulse"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShibaInuDog;
