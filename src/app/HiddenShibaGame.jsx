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

  // 進捗を保存（関数型更新で競合回避）
  const saveProgress = (levelIndex, time) => {
    setCompletedLevels((prevLevels) => {
      const updatedLevels = prevLevels.includes(levelIndex)
        ? prevLevels
        : [...prevLevels, levelIndex];

      setBestTimes((prevBest) => {
        const isNewRecord =
          !prevBest[levelIndex] || time < prevBest[levelIndex];
        const updatedBest = {
          ...prevBest,
          [levelIndex]: isNewRecord ? time : prevBest[levelIndex],
        };

        localStorage.setItem(
          "shibaGameProgress",
          JSON.stringify({
            completedLevels: updatedLevels,
            bestTimes: updatedBest,
          })
        );

        return updatedBest;
      });

      return updatedLevels;
    });
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
    setIsPlaying(false);
  };

  const handleDogClick = (dog, event) => {
    event.stopPropagation();
    if (!foundDogs.includes(dog.id)) {
      const newFoundDogs = [...foundDogs, dog.id];
      setFoundDogs(newFoundDogs);
      setClickPosition({ x: event.clientX, y: event.clientY });

      if (newFoundDogs.length === levels[currentLevel].dogs.length) {
        setTimeout(() => {
          saveProgress(currentLevel, timer);
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
    setWrongClicks((prev) => [...prev, newWrongClick]);

    setTimeout(() => {
      setWrongClicks((prev) =>
        prev.filter((click) => click.id !== newWrongClick.id)
      );
    }, 1500);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setFoundDogs([]);
    setTimer(0);
    setShowSuccess(false);
    setWrongClicks([]);
    setImageLoaded(false);
  };

  // 実際にゲームを開始する関数
  const startGame = () => {
    setIsPlaying(true); // ← true でゲーム開始
  };

  const selectLevel = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setCurrentScreen("game");

    resetGame();
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
      resetGame();
    } else {
      goToHome();
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
    !bestTimes[currentLevel] || timer < bestTimes[currentLevel];

  // ホーム画面
  if (currentScreen === "home") {
    return (
      <HomeScreen
        completedLevels={completedLevels.length}
        totalLevels={levels.length}
        onStartGame={() => {
          setCurrentLevel(0);
          setCurrentScreen("game");
          // startGame();
          resetGame();
        }}
        onLevelSelect={() => setCurrentScreen("levelSelect")}
      />
    );
  }

  // レベル選択画面
  if (currentScreen === "levelSelect") {
    return (
      <LevelSelectScreen
        levels={levels}
        completedLevels={completedLevels}
        bestTimes={bestTimes}
        onSelectLevel={selectLevel} // ← startGame()呼ぶように修正済み
        onBack={() => setCurrentScreen("home")}
      />
    );
  }

  // ゲーム画面
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
