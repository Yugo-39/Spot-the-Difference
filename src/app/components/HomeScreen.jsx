// HomeScreen.jsx
import Image from "next/image";
export default function HomeScreen({
  completedLevels = 0,
  totalLevels = 0,
  onStartGame = () => {},
  onLevelSelect = () => {},
}) {
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
              borderRadius: "3rem",
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
}
