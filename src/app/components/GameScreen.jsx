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
} from "lucide-react";
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
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getRemainingHints = () => {
    return level.dogs
      .filter((dog) => !foundDogs.includes(dog.id))
      .map((dog) => dog.hint);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* ゲームヘッダー */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onGoHome}
              className="bg-white/20 backdrop-blur hover:bg-white/30 p-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
            </button>
            {/* <h1 className="text-2xl font-bold flex items-center gap-2">
              柴犬探しゲーム
            </h1> */}
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

        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
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
                  風景を読み込んでいます...
                </p>
              </div>
            </div>
          )}

          {/* ゲーム開始オーバーレイ */}
          {!isPlaying && !showSuccess && imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur p-8 rounded-2xl text-center max-w-md shadow-2xl border border-white/20">
                <div className="mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=80&h=80&fit=crop&crop=face"
                    alt="柴犬"
                    className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
                  />
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    レベル {level.index + 1}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {level.name}
                  </h3>
                  <div className="inline-block bg-gradient-to-r from-orange-100 to-red-100 px-3 py-1 rounded-full text-sm font-medium text-orange-700">
                    {level.difficulty}
                  </div>
                </div>
                <p className="mb-2 text-gray-700">
                  この美しい風景の中に
                  <span className="font-bold text-orange-500">
                    {level.dogs.length}匹
                  </span>
                  の可愛い柴犬が隠れています！
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  よく観察して、全部見つけてくださいね 🔍
                </p>
                <button
                  onClick={onStartGame}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <Play className="w-5 h-5" />
                  ゲーム開始
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
                    素晴らしい！
                  </h2>
                  <p className="text-xl mb-2 text-gray-700">
                    全ての柴犬を見つけました！
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
                      次のレベル <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ヒントセクション */}
        {/* {isPlaying && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-t border-yellow-200">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-2xl">💡</div>
                <p className="text-lg font-bold text-gray-700">ヒント</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {getRemainingHints().map((hint, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-yellow-200 to-orange-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-yellow-300/50"
                  >
                    {hint}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default GameScreen;
