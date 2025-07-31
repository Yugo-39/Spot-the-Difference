// HomeScreen.jsx
export default function HomeScreen({
  completedLevels = 0,
  totalLevels = 0,
  onStartGame = () => {},
  onLevelSelect = () => {},
}) {
  const achievementRate =
    totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-red-600 relative overflow-hidden">
      {/* 背景の光の模様 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] animate-pulse"></div>

      {/* 中央コンテンツ */}
      <div className="relative z-10 max-w-sm w-full bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-[2rem] p-8 shadow-2xl border border-white/10 text-center">
        {/* ロゴ */}
        <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center shadow-lg ring-4 ring-purple-500/50 mb-6">
          <img src="/shiba-icon.png" alt="Shiba Inu" className="w-20 h-20" />
        </div>

        {/* タイトル */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          SIBAINUwo
        </h1>
        <p className="text-white/80 text-sm mt-2">
          美しい風景の中から可愛い柴犬たちを探し出そう！
        </p>

        {/* ボタン */}
        <div className="mt-6 space-y-4">
          <button
            onClick={onStartGame}
            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 font-bold text-lg text-black shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-transform"
          >
            🚀 ゲームスタート
          </button>
          <button
            onClick={onLevelSelect}
            className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 font-bold text-lg text-white shadow-lg hover:scale-105 hover:shadow-pink-400/50 transition-transform"
          >
            🏆 レベル選択
          </button>
        </div>

        {/* 成績パネル */}
        <div className="mt-6 backdrop-blur-md bg-white/5 rounded-xl p-4 shadow-inner border border-white/10">
          <h3 className="text-yellow-300 font-bold flex items-center justify-center gap-2 mb-4">
            ⭐ あなたの成績
          </h3>
          <div className="grid grid-cols-3 text-white">
            <div>
              <p className="text-xl font-bold">{completedLevels}</p>
              <p className="text-xs opacity-80">クリア済み</p>
            </div>
            <div>
              <p className="text-xl font-bold">{totalLevels}</p>
              <p className="text-xs opacity-80">全レベル</p>
            </div>
            <div>
              <p className="text-xl font-bold">{achievementRate}%</p>
              <p className="text-xs opacity-80">達成率</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
