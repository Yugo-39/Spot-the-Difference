const levels = [
  {
    name: "地球",
    backgroundImage:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=800&fit=crop",
    difficulty: "かんたん",
    dogs: [
      { id: 1, x: 15, y: 65, size: 45, hint: "クレーターの縁" },
      { id: 2, x: 78, y: 45, size: 40, hint: "月面車の陰" },
    ],
  },
  {
    name: "星雲の奥地",
    backgroundImage:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&h=800&fit=crop",
    difficulty: "ふつう",
    dogs: [
      { id: 3, x: 25, y: 70, size: 35, hint: "ガスの渦の中" },
      { id: 4, x: 65, y: 55, size: 32, hint: "新星の輝きの後ろ" },
      { id: 5, x: 88, y: 75, size: 38, hint: "宇宙塵の雲" },
    ],
  },
  {
    name: "宇宙ステーション",
    backgroundImage:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1200&h=800&fit=crop",
    difficulty: "ふつう",
    dogs: [
      { id: 6, x: 10, y: 78, size: 40, hint: "ソーラーパネルの隙間" },
      { id: 7, x: 45, y: 82, size: 32, hint: "ドッキングポートの陰" },
      { id: 8, x: 72, y: 68, size: 35, hint: "アンテナの後ろ" },
      { id: 9, x: 90, y: 85, size: 30, hint: "モジュールの向こう" },
    ],
  },
  {
    name: "土星の環",
    backgroundImage:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1200&h=800&fit=crop",
    difficulty: "むずかしい",
    dogs: [
      { id: 10, x: 20, y: 75, size: 40, hint: "氷の破片の間" },
      { id: 11, x: 55, y: 65, size: 35, hint: "環の隙間" },
      { id: 12, x: 85, y: 80, size: 32, hint: "衛星の陰" },
    ],
  },
  {
    name: "銀河系の中心",
    backgroundImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    difficulty: "とてもむずかしい",
    dogs: [
      { id: 13, x: 15, y: 60, size: 28, hint: "ブラックホールの重力場" },
      { id: 14, x: 40, y: 70, size: 25, hint: "星間物質の渦" },
      { id: 15, x: 68, y: 55, size: 22, hint: "遠い恒星系" },
      { id: 16, x: 92, y: 75, size: 26, hint: "時空の歪み" },
    ],
  },
];

export default levels;
