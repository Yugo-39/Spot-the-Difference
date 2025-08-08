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
  Heart,
  Sparkles,
  Search,
  PawPrint,
  Dog,
} from "lucide-react";
import { useState, useEffect } from "react";
import CamouflageShibaInuDog from "@/app/components/CamouflageShibaInuDog";
import { dogBreeds } from "@/app/data/dogBreeds";
// カモフラージュ対応ゲーム画面コンポーネント
const CamouflageGameScreen = ({
  level = { dogs: [], name: "", index: 0, backgroundType: "forest" },
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
  const [encouragementLevel, setEncouragementLevel] = useState(0);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementMessage, setEncouragementMessage] = useState("");
  const [lastFoundTime, setLastFoundTime] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const breedMap = Object.fromEntries(dogBreeds.map((b) => [b.id, b]));
  const resolvedDogs = level.dogs.map((d) => ({
    ...d,
    image: breedMap[d.breedId]?.image, // ここで画像を入れる
  }));

  // 🔍 カモフラージュ特有の機能
  const [searchMode, setSearchMode] = useState("normal"); // normal, thermal, magnify
  const [showSearchTip, setShowSearchTip] = useState(false);

  // 🎯 応援メッセージ（カモフラージュ版）
  const camouflageEncouragementMessages = [
    {
      time: 15,
      level: 1,
      messages: [
        "隠れ上手な柴犬たちですね！👀",
        "よく観察すれば必ず見つかります 🔍",
        "背景に溶け込んでいるかも... ✨",
        "小さな違いに注目してみて 💡",
      ],
      icon: "🕵️",
    },
    {
      time: 30,
      level: 2,
      messages: [
        "マウスを動かすと見えやすくなるかも... 🌊",
        "影の部分をじっくりチェック 🔍",
        "色や形の微妙な違いを探して 🎨",
        "耳を澄ませて、音のヒントも... 🎵",
      ],
      icon: "💡",
    },
    {
      time: 50,
      level: 3,
      messages: [
        "素晴らしい集中力です！もう少し 🌟",
        "きっとすぐそこに隠れてます ⭐",
        "プロの探偵みたいですね 🔍",
        "最後まで諦めないで！応援してます ❤️",
      ],
      icon: "🏆",
    },
  ];

  // 応援システムのタイマー管理（カモフラージュ版）
  useEffect(() => {
    if (!isPlaying || showSuccess) {
      setEncouragementLevel(0);
      setShowEncouragement(false);
      setLastFoundTime(timer);
      setShowPulse(false);
      setShowSearchTip(false);
      return;
    }

    const timeSinceLastFound = timer - lastFoundTime;

    // 検索のヒント表示
    if (timeSinceLastFound >= 20 && !showSearchTip) {
      setShowSearchTip(true);
    }

    camouflageEncouragementMessages.forEach((encourage, index) => {
      if (timeSinceLastFound >= encourage.time && encouragementLevel <= index) {
        setEncouragementLevel(index + 1);

        const randomMessage =
          encourage.messages[
            Math.floor(Math.random() * encourage.messages.length)
          ];

        setEncouragementMessage(`${encourage.icon} ${randomMessage}`);
        setShowEncouragement(true);

        setTimeout(() => {
          setShowEncouragement(false);
        }, 4000); // カモフラージュは少し長めに表示

        if (index === 2) {
          setShowPulse(true);
        }
      }
    });
  }, [
    timer,
    isPlaying,
    showSuccess,
    lastFoundTime,
    encouragementLevel,
    showSearchTip,
  ]);

  // 柴犬発見時の処理
  useEffect(() => {
    if (foundDogs.length > 0) {
      setLastFoundTime(timer);
      setEncouragementLevel(0);
      setShowPulse(false);
    }
  }, [foundDogs.length, timer]);

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

  const getCurrentHint = () => {
    const remainingDogs = level.dogs.filter(
      (dog) => !foundDogs.includes(dog.id)
    );
    if (remainingDogs.length > 0) {
      return remainingDogs[0].hint;
    }
    return "";
  };

  // 🎨 背景タイプ別のテーマカラー
  const getThemeColors = () => {
    const themes = {
      forest: {
        primary: "from-green-600 via-emerald-600 to-teal-700",
        accent: "from-green-100 to-emerald-100",
        text: "text-green-700",
      },
      desert: {
        primary: "from-yellow-600 via-orange-600 to-red-700",
        accent: "from-yellow-100 to-orange-100",
        text: "text-orange-700",
      },
      snow: {
        primary: "from-blue-600 via-cyan-600 to-purple-700",
        accent: "from-blue-100 to-cyan-100",
        text: "text-blue-700",
      },
      library: {
        primary: "from-amber-600 via-yellow-600 to-orange-700",
        accent: "from-amber-100 to-yellow-100",
        text: "text-amber-700",
      },
      night: {
        primary: "from-purple-600 via-indigo-600 to-blue-700",
        accent: "from-purple-100 to-indigo-100",
        text: "text-purple-700",
      },
      watercolor: {
        primary: "from-pink-600 via-purple-600 to-indigo-700",
        accent: "from-pink-100 to-purple-100",
        text: "text-pink-700",
      },
    };
    return themes[level.backgroundType] || themes.forest;
  };

  const themeColors = getThemeColors();

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-white flex-1 flex flex-col overflow-hidden">
        {/* 🏆 ゲームヘッダー（テーマカラー対応） */}
        <div
          className={`bg-gradient-to-r ${themeColors.primary} text-white p-4 shadow-lg`}
        >
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onGoHome}
              className="bg-white/20 backdrop-blur hover:bg-white/30 p-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
            </button>
            {/* 🔍 検索モード切替（カモフラージュ特有） */}
            {showSearchTip && (
              <div className="flex gap-2">
                <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-sm">
                  <Search className="w-4 h-4 inline mr-1" />
                  マウスを動かして探索
                </div>
              </div>
            )}
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

        {/* 📱 応援メッセージ表示エリア */}
        {showEncouragement && isPlaying && (
          <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white p-3 text-center animate-bounce shadow-lg border-b-2 border-white/30">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-200 animate-pulse" />
              <span className="font-bold text-lg">{encouragementMessage}</span>
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
            </div>
          </div>
        )}

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
                <p className="text-gray-600 text-lg flex ">
                  <Dog />
                  ローディング中...
                  <PawPrint />
                  <PawPrint />
                  <PawPrint />
                </p>
              </div>
            </div>
          )}

          {/* 🚀 ゲーム開始オーバーレイ */}
          {!isPlaying && !showSuccess && imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur p-8 rounded-2xl text-center max-w-md shadow-2xl border border-white/20">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🕵️‍♀️</div>
                  <h2
                    className={`text-3xl font-bold mb-2 bg-gradient-to-r ${themeColors.primary} bg-clip-text text-transparent`}
                  >
                    レベル {level.index + 1}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {level.name}
                  </h3>
                  <div
                    className={`inline-block bg-gradient-to-r ${themeColors.accent} px-3 py-1 rounded-full text-sm font-medium ${themeColors.text}`}
                  >
                    {level.difficulty}
                  </div>
                </div>
                <p className="mb-2 text-gray-700">
                  この場所に
                  <span className="font-bold text-purple-500">
                    {level.dogs.length}匹
                  </span>
                  の柴犬が巧妙に隠れています！
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  背景に溶け込んでいるので、じっくり観察してね 🔍
                </p>
                <p className="text-xs text-amber-600 mb-6 font-medium">
                  💡 ヒント: マウスを動かすと見つけやすくなるよ
                </p>
                <button
                  onClick={onStartGame}
                  className={`bg-gradient-to-r ${themeColors.primary} hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto`}
                >
                  <Search className="w-5 h-5" />
                  探偵開始
                </button>
              </div>
            </div>
          )}

          {/* 🎮 カモフラージュゲームエリア */}
          {imageLoaded && isPlaying && (
            <div className="relative w-full h-full" onClick={onWrongClick}>
              {resolvedDogs.map((dog) => (
                <CamouflageShibaInuDog
                  key={dog.id}
                  dog={dog}
                  backgroundType={level.backgroundType}
                  isFound={foundDogs.includes(dog.id)}
                  onClick={(e) => onDogClick(dog, e)}
                  showPulse={/* 必要なら */ false}
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

          {/* 🎉 成功オーバーレイ */}
          {showSuccess && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur p-8 rounded-2xl text-center transform scale-110 shadow-2xl border border-white/20">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2
                    className={`text-4xl font-bold mb-2 bg-gradient-to-r ${themeColors.primary} bg-clip-text text-transparent`}
                  >
                    探偵ミッション完了！
                  </h2>
                  <p className="text-xl mb-2 text-gray-700">
                    隠れていた全ての柴犬を発見しました！
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-2xl font-bold text-gray-800">
                      {formatTime(timer)}
                    </span>
                  </div>
                  {isNewRecord && (
                    <div
                      className={`bg-gradient-to-r ${themeColors.accent} px-4 py-2 rounded-full mb-4`}
                    >
                      <span className={`${themeColors.text} font-bold`}>
                        🏆 新記録達成！
                      </span>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-4">
                    <span className="text-green-700 font-bold">
                      🕵️‍♀️ 素晴らしい観察力です！
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={onGoHome}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    ホーム
                  </button>
                  {level.index < 5 && (
                    <button
                      onClick={onNextLevel}
                      className={`bg-gradient-to-r ${themeColors.primary} hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2`}
                    >
                      次の場所へ <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 💡 特別ヒント表示（応援システムの一部） */}
        {isPlaying &&
          encouragementLevel >= 2 &&
          getRemainingHints().length > 0 && (
            <div
              className={`bg-gradient-to-r ${themeColors.accent} border-t border-yellow-200 p-4 text-center`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-800">探偵のヒント</span>
              </div>
              <p className={`${themeColors.text} font-medium`}>
                {getCurrentHint()}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default CamouflageGameScreen;
