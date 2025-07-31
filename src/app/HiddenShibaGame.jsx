"use client";
import React, { useState, useEffect } from "react";
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
import Image from "next/image";

// レベルデータを直接定義
const levels = [
  {
    name: "桜の公園",
    backgroundImage:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=800&fit=crop",
    difficulty: "かんたん",
    dogs: [
      { id: 1, x: 15, y: 65, size: 45, hint: "ベンチの近く" },
      { id: 2, x: 78, y: 45, size: 40, hint: "桜の木の下" },
    ],
  },
  {
    name: "神秘の森",
    backgroundImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop",
    difficulty: "ふつう",
    dogs: [
      { id: 3, x: 25, y: 70, size: 35, hint: "苔むした岩の近く" },
      { id: 4, x: 65, y: 55, size: 32, hint: "シダの茂み" },
      { id: 5, x: 88, y: 75, size: 38, hint: "木漏れ日の中" },
    ],
  },
  {
    name: "古い町並み",
    backgroundImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
    difficulty: "ふつう",
    dogs: [
      { id: 6, x: 10, y: 78, size: 40, hint: "石垣の隙間" },
      { id: 7, x: 45, y: 82, size: 32, hint: "階段の陰" },
      { id: 8, x: 72, y: 68, size: 35, hint: "古い看板の後ろ" },
      { id: 9, x: 90, y: 85, size: 30, hint: "路地の向こう" },
    ],
  },
  {
    name: "夕暮れのビーチ",
    backgroundImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    difficulty: "むずかしい",
    dogs: [
      { id: 10, x: 20, y: 75, size: 40, hint: "流木の陰" },
      { id: 11, x: 55, y: 65, size: 35, hint: "砂丘の向こう" },
      { id: 12, x: 85, y: 80, size: 32, hint: "夕日の中" },
    ],
  },
  {
    name: "雄大な山岳",
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    difficulty: "とてもむずかしい",
    dogs: [
      { id: 13, x: 15, y: 60, size: 28, hint: "岩陰の奥" },
      { id: 14, x: 40, y: 70, size: 25, hint: "高山植物の間" },
      { id: 15, x: 68, y: 55, size: 22, hint: "遠くの尾根" },
      { id: 16, x: 92, y: 75, size: 26, hint: "雲の合間" },
    ],
  },
];

// 全てのコンポーネントをこのファイル内に定義（インポートエラーを避けるため）

const HomeScreen = ({
  completedLevels = 0,
  totalLevels = 0,
  onStartGame = () => {},
  onLevelSelect = () => {},
}) => {
  const achievementRate =
    totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cover bg-center responsive-bg"></div>

      <style jsx>{`
        .responsive-bg {
          background-image: url("/images/img-mobile.png");
          background-size: cover;
          background-position: center;
        }

        @media (min-width: 1024px) {
          .responsive-bg {
            background-image: url("/images/img-desktop.png");
          }
        }
      `}</style>

      {/* メインコンテンツ */}
      <div className="relative z-10 w-full max-w-4xl text-center p-6">
        {/* ロゴとタイトル */}
        <div className="mb-12">
          <div
            className="w-40 h-40 mx-auto mb-6 rounded-full p-[4px] animate-fade-in"
            style={{
              background: "linear-gradient(135deg, #ff8800, #ff00ff)",
              boxShadow:
                "0 0 20px 6px rgba(255, 136, 0, 0.6), 0 0 40px 10px rgba(255, 0, 255, 0.4)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl bg-white">
              <Image
                src="/images/dog.jpg"
                alt="SIBAINUwo Logo"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-8xl font-extrabold mb-4 bg-gradient-to-b from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg tracking-widest">
            SIBAINU
          </h1>
          <p className="text-lg font-bold text-white/90">
            風景の中から柴犬を探し出そう！
          </p>
        </div>

        {/* ボタン */}
        <div className="flex flex-col gap-6 max-w-md mx-auto ">
          <button
            onClick={onStartGame}
            className="w-4/5 mx-auto py-4 font-bold text-2xl text-black rounded-full relative overflow-hidden transition-transform hover:scale-105"
            style={{
              border: "4px solid transparent",
              borderRadius: "3rem",
              background:
                "linear-gradient(90deg, #efc416ff, #e020a0ff) padding-box, linear-gradient(90deg, #ffdd55 70%, #ff66cc) border-box",
              boxShadow:
                "0 0 15px rgba(255, 221, 85, 0.8), 0 0 30px rgba(255, 136, 0, 0.6), 0 0 50px rgba(255, 102, 204, 0.4)",
            }}
          >
            🚀 ゲームスタート
          </button>
          <button
            onClick={onLevelSelect}
            className="w-4/5 mx-auto py-4 font-bold text-2xl text-white rounded-full relative overflow-hidden transition-transform hover:scale-105"
            style={{
              border: "4px solid transparent",
              borderRadius: "3rem", // 丸み
              background:
                "linear-gradient(90deg, #ff3366, #9933ff) padding-box, linear-gradient(90deg, #ffdd55 70%, #ff66cc, #9933ff) border-box",
              boxShadow:
                "0 0 15px rgba(255, 51, 102, 0.8), 0 0 30px rgba(255, 102, 204, 0.6), 0 0 50px rgba(153, 51, 255, 0.4)",
            }}
          >
            🏆 レベル選択
          </button>
        </div>

        {/* 成績パネル */}
        <div className="mt-10 backdrop-blur-md bg-white/10 rounded-xl p-6 shadow-lg border border-white/20 max-w-md mx-auto">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-center gap-2">
            ⭐ あなたの成績
          </h3>
          <div className="grid grid-cols-3 gap-6 text-white">
            <div>
              <p className="text-3xl font-bold">{completedLevels}</p>
              <p className="text-sm opacity-80">クリア済み</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{totalLevels}</p>
              <p className="text-sm opacity-80">全レベル</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{achievementRate}%</p>
              <p className="text-sm opacity-80">達成率</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// レベル選択画面
const LevelSelectScreen = ({
  levels = [],
  completedLevels = [],
  bestTimes = {},
  onSelectLevel = () => {},
  onGoHome = () => {},
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-600 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-extrabold text-white"> レベル選択</h2>
          <button
            onClick={onGoHome}
            className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition"
          >
            ⬅ ホーム
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {levels.map((level, index) => {
            const isCompleted = completedLevels.includes(index);
            const isLocked = index > 0 && !completedLevels.includes(index - 1);

            return (
              <div
                key={index}
                onClick={() => !isLocked && onSelectLevel(index)}
                className={`relative rounded-2xl overflow-hidden shadow-lg transform transition hover:scale-105 ${
                  isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <img
                  src={level.backgroundImage}
                  alt={level.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">
                    レベル {index + 1}: {level.name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {level.difficulty}・柴犬 {level.dogs?.length || 0}匹
                  </p>
                </div>

                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 px-3 py-1 rounded-lg text-sm font-bold">
                    ✅ クリア
                  </div>
                )}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    🔒
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 柴犬コンポーネント
const ShibaInuDog = ({
  dog = { x: 0, y: 0, size: 40 },
  isFound = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={`absolute cursor-pointer transition-all duration-700 ${
        isFound ? "z-50" : "z-20"
      }`}
      style={{
        left: `${dog.x}%`,
        top: `${dog.y}%`,
        width: `${dog.size}px`,
        height: `${dog.size}px`,
        transform: isFound ? "scale(1.5) translateY(-20px)" : "scale(1)",
        filter: isFound ? "none" : "brightness(0.8) contrast(0.9)",
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full group">
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face"
          alt="柴犬"
          className={`w-full h-full rounded-full object-cover shadow-lg border-2 ${
            isFound
              ? "border-yellow-400 shadow-yellow-300/50"
              : "border-white/50 hover:border-yellow-300"
          } transition-all duration-500`}
          style={{
            filter: isFound ? "brightness(1.1) saturate(1.2)" : "none",
          }}
        />

        {isFound && (
          <>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce z-50">
              🎉 見つけた！
            </div>
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/20 to-orange-300/20 animate-pulse"></div>
          </>
        )}

        {!isFound && (
          <div className="absolute inset-0 rounded-full bg-yellow-400/0 group-hover:bg-yellow-400/20 transition-all duration-300"></div>
        )}
      </div>
    </div>
  );
};

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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              柴犬探しゲーム
            </h1>
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
                  美しい風景を読み込んでいます...
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
        {isPlaying && (
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
        )}
      </div>
    </div>
  );
};

// メインコンポーネント
const HiddenShibaGame = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [foundDogs, setFoundDogs] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const [wrongClicks, setWrongClicks] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [bestTimes, setBestTimes] = useState({});

  // ローカルストレージから進捗を読み込む
  useEffect(() => {
    const savedProgress = localStorage.getItem("shibaGameProgress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
      setBestTimes(progress.bestTimes || {});
    }
  }, []);

  // 進捗を保存
  const saveProgress = (levelIndex, time) => {
    const newCompletedLevels = [...completedLevels];
    if (!newCompletedLevels.includes(levelIndex)) {
      newCompletedLevels.push(levelIndex);
    }

    const newBestTimes = { ...bestTimes };
    const isNewRecord =
      !newBestTimes[levelIndex] || time < newBestTimes[levelIndex];
    if (isNewRecord) {
      newBestTimes[levelIndex] = time;
    }

    setCompletedLevels(newCompletedLevels);
    setBestTimes(newBestTimes);

    localStorage.setItem(
      "shibaGameProgress",
      JSON.stringify({
        completedLevels: newCompletedLevels,
        bestTimes: newBestTimes,
      })
    );

    return isNewRecord;
  };

  // タイマー機能
  useEffect(() => {
    let interval;
    if (isPlaying && !showSuccess) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showSuccess]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDogClick = (dog, event) => {
    event.stopPropagation();
    if (!foundDogs.includes(dog.id)) {
      const newFoundDogs = [...foundDogs, dog.id];
      setFoundDogs(newFoundDogs);
      setClickPosition({ x: event.clientX, y: event.clientY });

      if (newFoundDogs.length === levels[currentLevel].dogs.length) {
        setTimeout(() => {
          const isNewRecord = saveProgress(currentLevel, timer);
          setShowSuccess(true);
          setIsPlaying(false);
        }, 500);
      }
    }
  };

  const handleWrongClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const newWrongClick = { id: Date.now(), x, y };
    setWrongClicks([...wrongClicks, newWrongClick]);

    setTimeout(() => {
      setWrongClicks((prev) =>
        prev.filter((click) => click.id !== newWrongClick.id)
      );
    }, 1500);
  };

  const startGame = () => {
    setIsPlaying(true);
    setFoundDogs([]);
    setTimer(0);
    setShowSuccess(false);
    setWrongClicks([]);
    setImageLoaded(false);
  };

  const selectLevel = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setCurrentScreen("game");
    startGame();
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      startGame();
    }
  };

  const goToHome = () => {
    setCurrentScreen("home");
    setIsPlaying(false);
    setFoundDogs([]);
    setTimer(0);
    setShowSuccess(false);
  };

  const isNewRecord =
    bestTimes[currentLevel] && timer < bestTimes[currentLevel];

  if (currentScreen === "home") {
    return (
      <HomeScreen
        completedLevels={completedLevels.length}
        totalLevels={levels.length}
        onStartGame={() => {
          setCurrentLevel(0);
          setCurrentScreen("game");
          startGame();
        }}
        onLevelSelect={() => setCurrentScreen("levelSelect")}
      />
    );
  }

  if (currentScreen === "levelSelect") {
    return (
      <LevelSelectScreen
        levels={levels}
        completedLevels={completedLevels}
        bestTimes={bestTimes}
        onSelectLevel={selectLevel}
        onGoHome={goToHome}
      />
    );
  }

  return (
    <GameScreen
      level={{ ...levels[currentLevel], index: currentLevel }}
      foundDogs={foundDogs}
      timer={timer}
      isPlaying={isPlaying}
      showSuccess={showSuccess}
      wrongClicks={wrongClicks}
      imageLoaded={imageLoaded}
      isNewRecord={isNewRecord}
      onImageLoad={handleImageLoad}
      onDogClick={handleDogClick}
      onWrongClick={handleWrongClick}
      onStartGame={startGame}
      onGoHome={goToHome}
      onNextLevel={nextLevel}
    />
  );
};

export default HiddenShibaGame;
