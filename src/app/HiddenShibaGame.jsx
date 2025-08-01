"use client";
import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import levels from "@/app/data/levels";
import GameScreen from "@/app/components/GameScreen";
import LevelSelectScreen from "@/app/components/LevelSelectScreen";
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
        onSelectLevel={(index) => {
          setCurrentLevel(index);
          setCurrentScreen("game");
        }}
        onBack={() => setCurrentScreen("home")} // ← 戻るボタンでホームへ
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
