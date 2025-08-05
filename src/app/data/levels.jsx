const levels = [
  {
    name: "木星の大赤斑",
    backgroundImage: "/images/jupiter-storm.jpg",
    difficulty: "かんたん",
    dogs: [
      { id: 1, x: 12, y: 34, size: 35, hint: "嵐の渦の中心部" },
      { id: 2, x: 67, y: 78, size: 32, hint: "雲の帯の境界線" },
      { id: 3, x: 89, y: 15, size: 38, hint: "高圧地帯の陰" },
    ],
  },
  {
    name: "オーロラの森",
    backgroundImage: "/images/aurora-forest.jpg",
    difficulty: "ふつう",
    dogs: [
      { id: 4, x: 8, y: 23, size: 28, hint: "緑の光の帯の下" },
      { id: 5, x: 31, y: 67, size: 30, hint: "針葉樹の陰" },
      { id: 6, x: 58, y: 12, size: 26, hint: "磁気嵐の中" },
      { id: 7, x: 74, y: 84, size: 29, hint: "雪原の起伏" },
    ],
  },
  {
    name: "火星の峡谷",
    backgroundImage: "/images/mars-canyon.jpg",
    difficulty: "むずかしい",
    dogs: [
      { id: 8, x: 4, y: 89, size: 22, hint: "岩石層の割れ目" },
      { id: 9, x: 26, y: 7, size: 25, hint: "酸化鉄の堆積物" },
      { id: 10, x: 49, y: 63, size: 20, hint: "古代河川の跡" },
      { id: 11, x: 71, y: 29, size: 24, hint: "風化した岩壁" },
      { id: 12, x: 95, y: 18, size: 23, hint: "地層の境界" },
    ],
  },
  {
    name: "深海の熱水噴出孔",
    backgroundImage: "/images/deep-sea-vent.jpg",
    difficulty: "とてもむずかしい",
    dogs: [
      { id: 13, x: 2, y: 5, size: 18, hint: "硫黄の煙の中" },
      { id: 14, x: 18, y: 92, size: 16, hint: "チムニーの陰" },
      { id: 15, x: 34, y: 38, size: 19, hint: "熱水の流れ" },
      { id: 16, x: 52, y: 71, size: 15, hint: "微生物マットの下" },
      { id: 17, x: 68, y: 14, size: 17, hint: "鉱物沈殿の隙間" },
      { id: 18, x: 91, y: 83, size: 18, hint: "海底の起伏" },
    ],
  },
  {
    name: "量子もつれの迷宮",
    backgroundImage: "/images/quantum-maze.jpg",
    difficulty: "超むずかしい",
    dogs: [
      { id: 19, x: 1, y: 3, size: 15, hint: "波動関数の収束点" },
      { id: 20, x: 14, y: 27, size: 14, hint: "確率雲の境界" },
      { id: 21, x: 29, y: 8, size: 13, hint: "スピンの反転領域" },
      { id: 22, x: 41, y: 74, size: 16, hint: "もつれ状態の中心" },
      { id: 23, x: 56, y: 45, size: 12, hint: "観測者効果の陰" },
      { id: 24, x: 63, y: 19, size: 15, hint: "デコヒーレンスの境界" },
      { id: 25, x: 77, y: 89, size: 14, hint: "シュレディンガーの箱" },
      { id: 26, x: 93, y: 11, size: 13, hint: "多世界解釈の分岐" },
    ],
  },
  {
    name: "ブラックホール事象の地平面",
    backgroundImage: "/images/black-hole-horizon.jpg",
    difficulty: "地獄級",
    dogs: [
      { id: 27, x: 2, y: 4, size: 12, hint: "シュワルツシルト半径" },
      { id: 28, x: 7, y: 96, size: 11, hint: "ホーキング放射" },
      { id: 29, x: 15, y: 23, size: 10, hint: "潮汐力の歪み" },
      { id: 30, x: 28, y: 67, size: 13, hint: "降着円盤の内縁" },
      { id: 31, x: 35, y: 4, size: 12, hint: "重力赤方偏移" },
      { id: 32, x: 47, y: 88, size: 11, hint: "時空の特異点近傍" },
      { id: 33, x: 54, y: 31, size: 10, hint: "情報パラドックス" },
      { id: 34, x: 66, y: 72, size: 12, hint: "エルゴ球の境界" },
      { id: 35, x: 73, y: 16, size: 11, hint: "フレームドラッギング" },
      { id: 36, x: 89, y: 37, size: 13, hint: "虚時間の領域" },
    ],
  },
];

export default levels;
