import {
  Play,
  Trophy,
  Star,
  Home,
  Lock,
  CheckCircle,
  ChevronRight,
  Target,
  Camera,
  Clock,
  Lightbulb,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import ShibaInuDog from "@/app/components/ShibaInuDog";

// ゲーム画面コンポーネント
const GameScreen = ({
  level = { dogs: [], name: "", index: 0 },
  foundDogs = [],
  timer = 0,
  isPlaying = false,
  showSuccess = false,
  wrongClicks = [],
  imageLoaded = false,
  isNewRecord = false,
  onImageLoad = () => {},
  onDogClick = () => {},
  onWrongClick = () => {},
  onStartGame = () => {},
  onGoHome = () => {},
  onNextLevel = () => {},
}) => {
  const [showHints, setShowHints] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getRemainingHints = () => {
    return level.dogs
      .filter((dog) => !foundDogs.includes(dog.id))
      .map((dog, index) => ({ hint: dog.hint, index: index + 1 }));
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-white flex-1 flex flex-col overflow-hidden">
        {/* ゲームヘッダー */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onGoHome}
              className="bg-white/20 backdrop-blur hover:bg-white/30 p-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
            </button>
            <div className="w-11 h-11"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">
                レベル {level.index + 1}: {level.name}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timer)}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
              <Target className="w-5 h-5" />
              <span className="font-semibold">
                {foundDogs.length}/{level.dogs.length} 匹
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={level.backgroundImage}
            alt={level.name}
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={onImageLoad}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <Camera className="w-16 h-16 text-gray-400 animate-pulse mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  宇宙を読み込んでいます...
                </p>
              </div>
            </div>
          )}

          {/* ゲーム開始オーバーレイ */}
          {!isPlaying && !showSuccess && imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur p-8 rounded-2xl text-center max-w-md shadow-2xl border border-white/20">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🚀</div>
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    レベル {level.index + 1}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {level.name}
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                    {level.difficulty}
                  </div>
                </div>
                <p className="mb-2 text-gray-700">
                  この宇宙空間に
                  <span className="font-bold text-purple-500">
                    {level.dogs.length}匹
                  </span>
                  の宇宙柴犬が隠れています！
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  星々の間を探索して、全部見つけてくださいね 🔍
                </p>
                <button
                  onClick={onStartGame}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  探索開始
                </button>
              </div>
            </div>
          )}

          {/* ゲームエリア */}
          {imageLoaded && isPlaying && (
            <div className="relative w-full h-full" onClick={onWrongClick}>
              {level.dogs.map((dog) => (
                <ShibaInuDog
                  key={dog.id}
                  dog={dog}
                  isFound={foundDogs.includes(dog.id)}
                  onClick={(e) => onDogClick(dog, e)}
                />
              ))}

              {wrongClicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-red-500 text-6xl font-bold animate-ping pointer-events-none"
                  style={{
                    left: `${click.x}%`,
                    top: `${click.y}%`,
                    transform: "translate(-50%, -50%)",
                    textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  ❌
                </div>
              ))}
            </div>
          )}

          {/* 成功オーバーレイ */}
          {showSuccess && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur p-8 rounded-2xl text-center transform scale-110 animate-bounce shadow-2xl border border-white/20">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent">
                    ミッション完了！
                  </h2>
                  <p className="text-xl mb-2 text-gray-700">
                    全ての宇宙柴犬を発見しました！
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-2xl font-bold text-gray-800">
                      {formatTime(timer)}
                    </span>
                  </div>
                  {isNewRecord && (
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
                      <span className="text-purple-700 font-bold">
                        🏆 新記録達成！
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={onGoHome}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    ホーム
                  </button>
                  {level.index < 4 && (
                    <button
                      onClick={onNextLevel}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      次の宇宙へ <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ヒントセクション */}
        {isPlaying && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-200 flex-shrink-0">
            {/* ヒント表示切り替えボタン */}
            <div className="p-3 text-center border-b border-indigo-100">
              <button
                onClick={toggleHints}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto text-sm"
              >
                <Lightbulb className="w-4 h-4" />
                <span>
                  {showHints
                    ? "ヒントを隠す"
                    : `ヒントを見る (${getRemainingHints().length})`}
                </span>
                {showHints ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                {showHints ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* ヒント内容 */}
            {showHints && (
              <div className="p-4 animate-in slide-in-from-top-2 duration-300 max-h-48 overflow-y-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="text-2xl">🛸</div>
                    <p className="text-base font-bold text-gray-700">
                      宇宙探索のヒント
                    </p>
                  </div>

                  {getRemainingHints().length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-full mx-auto">
                      {getRemainingHints().map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-white to-indigo-50 p-3 rounded-lg shadow-md border border-indigo-200/50 hover:shadow-lg transition-all hover:scale-105"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                              {foundDogs.length + index + 1}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                              未発見
                            </span>
                          </div>
                          <p className="text-xs font-medium text-gray-700 leading-relaxed">
                            {item.hint}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
                      <div className="text-3xl mb-1">🎯</div>
                      <p className="text-green-700 font-bold text-base">
                        全ての宇宙柴犬を発見済みです！
                      </p>
                      <p className="text-green-600 text-xs mt-1">
                        素晴らしい探索能力です 🌟
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
