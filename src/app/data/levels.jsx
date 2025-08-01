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

export default levels;
