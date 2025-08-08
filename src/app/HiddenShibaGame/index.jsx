"use client";
import React, { useEffect, useState } from "react";
import HomeScreen from "@/app/components/HomeScreen";
import GameScreen from "@/app/components/GameScreen";
import LevelSelectScreen from "@/app/components/LevelSelectScreen";
import { camouflagelevels } from "@/app/data/camouflagelevels";
import { dogBreeds } from "@/app/data/dogBreeds";
import DogDex from "@/app/components/DogDex";

// HiddenShibaGame — リファクタ版
// 変更点:
// - import パスを alias(@/app/...) に統一
// - クリア時に先にタイマー停止して記録のズレを防止
// - レベル範囲ガードを追加
// - 進捗保存の処理を読みやすく整理（1回のsetItemに集約）
// - 未使用state(clickPosition)削除
// - 軽微な早期return等でネスト削減

const STORAGE_KEY = "shibaGameProgress";

const HiddenShibaGame = () => {
  const [currentScreen, setCurrentScreen] = useState("home"); // "home" | "levelSelect" | "game"
  const [currentLevel, setCurrentLevel] = useState(0);
  const [foundDogs, setFoundDogs] = useState([]); // number[] (dog.id)
  const [timer, setTimer] = useState(0); // seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [wrongClicks, setWrongClicks] = useState([]); // {id:number, x:number, y:number}[]
  const [imageLoaded, setImageLoaded] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]); // number[]
  const [bestTimes, setBestTimes] = useState({}); // Record<number, number>
  const [discoveredBreeds, setDiscoveredBreeds] = useState([]); // string[] (breedId)
  // --- 進捗読み込み ---
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const progress = JSON.parse(saved);
      setCompletedLevels(progress.completedLevels || []);
      setBestTimes(progress.bestTimes || {});
      setDiscoveredBreeds(progress.discoveredBreeds || []);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("進捗データの読み込みエラー:", err);
      }
    }
  }, []);

  // --- タイマー ---
  useEffect(() => {
    if (!isPlaying || showSuccess) return;
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying, showSuccess]);

  const handleImageLoad = () => setImageLoaded(true);

  // 進捗一括保存（足りないキーは現状値で補完）
  const persistAll = (patch = {}) => {
    try {
      const payload = {
        completedLevels,
        bestTimes,
        discoveredBreeds,
        ...patch,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      if (process.env.NODE_ENV === "development") console.error(e);
    }
  };

  // --- 進捗保存（ベストタイム＆クリア済み）---
  const saveProgress = (levelIndex, time) => {
    setCompletedLevels((prevLevels) => {
      const updatedLevels = prevLevels.includes(levelIndex)
        ? prevLevels
        : [...prevLevels, levelIndex];

      setBestTimes((prevBest) => {
        const isNew = !prevBest[levelIndex] || time < prevBest[levelIndex];
        const updatedBest = {
          ...prevBest,
          [levelIndex]: isNew ? time : prevBest[levelIndex],
        };
        try {
          persistAll({
            completedLevels: updatedLevels,
            bestTimes: updatedBest,
          });
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.error("進捗データの保存エラー:", err);
          }
        }
        return updatedBest;
      });

      return updatedLevels;
    });
  };

  // --- 進捗リセット ---
  const resetProgress = () => {
    if (
      !window.confirm(
        "本当に全ての進捗データをリセットしますか？\nこの操作は取り消せません。"
      )
    )
      return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setCompletedLevels([]);
      setBestTimes({});
      alert("進捗データがリセットされました！");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("進捗データのリセットエラー:", err);
      }
      alert("リセット中にエラーが発生しました。");
    }
  };

  // --- ゲーム制御 ---
  const resetGame = () => {
    setIsPlaying(false);
    setFoundDogs([]);
    setTimer(0);
    setShowSuccess(false);
    setWrongClicks([]);
    setImageLoaded(false);
  };

  const startGame = () => setIsPlaying(true);

  const selectLevel = (levelIndex) => {
    if (
      typeof levelIndex !== "number" ||
      levelIndex < 0 ||
      levelIndex >= camouflagelevels.length
    ) {
      // 範囲外ならホームへ退避
      setCurrentScreen("home");
      return;
    }
    setCurrentLevel(levelIndex);
    resetGame();
    setCurrentScreen("game");
  };

  const nextLevel = () => {
    const lastIndex = camouflagelevels.length - 1;
    if (currentLevel < lastIndex) {
      setCurrentLevel((prev) => prev + 1);
      resetGame();
    } else {
      goToHome();
    }
  };

  const goToHome = () => {
    setCurrentScreen("home");
    resetGame();
  };

  const handleDogClick = (dog, event) => {
    event.stopPropagation();
    if (!dog || foundDogs.includes(dog.id)) return;

    const newFound = [...foundDogs, dog.id];
    setFoundDogs(newFound);

    // 図鑑登録：breedIdが初発見なら追加

    if (dog.breedId && !discoveredBreeds.includes(dog.breedId)) {
      const nextDiscovered = [...discoveredBreeds, dog.breedId];
      setDiscoveredBreeds(nextDiscovered);
      persistAll({ discoveredBreeds: nextDiscovered });
    }

    const safeLevelIndex = Math.min(currentLevel, camouflagelevels.length - 1);
    const targetLevel = camouflagelevels[safeLevelIndex];
    if (!targetLevel) return;

    const allFound = newFound.length === targetLevel.dogs.length;
    if (!allFound) return;

    // クリア: 先にタイマー停止して確定値を使う
    setIsPlaying(false);
    const clearTime = timer;
    saveProgress(safeLevelIndex, clearTime);
    setShowSuccess(true);
  };

  const handleWrongClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const mark = { id: Date.now(), x, y };
    setWrongClicks((prev) => [...prev, mark]);
    setTimeout(() => {
      setWrongClicks((prev) => prev.filter((c) => c.id !== mark.id));
    }, 1200);
  };

  const isNewRecord =
    bestTimes[currentLevel] === undefined
      ? false
      : timer < bestTimes[currentLevel];

  // --- レベル範囲ガード（描画直前）---
  const safeLevelIndex = Math.min(currentLevel, camouflagelevels.length - 1);
  const levelData = camouflagelevels[safeLevelIndex];

  // --- 画面分岐 ---
  if (currentScreen === "home") {
    return (
      <HomeScreen
        completedLevels={completedLevels.length}
        totalLevels={camouflagelevels.length}
        onStartGame={() => selectLevel(0)}
        onLevelSelect={() => setCurrentScreen("levelSelect")}
        onResetProgress={resetProgress}
        onOpenDogDex={() => setCurrentScreen("dogdex")}
      />
    );
  }

  if (currentScreen === "dogdex") {
    return (
      <DogDex
        discovered={discoveredBreeds}
        onBack={() => setCurrentScreen("home")}
      />
    );
  }

  if (currentScreen === "levelSelect") {
    return (
      <LevelSelectScreen
        levels={camouflagelevels}
        completedLevels={completedLevels}
        bestTimes={bestTimes}
        onSelectLevel={selectLevel}
        onBack={() => setCurrentScreen("home")}
      />
    );
  }

  // game
  if (!levelData) {
    // データ不整合があればホームへ退避
    return (
      <HomeScreen
        completedLevels={completedLevels.length}
        totalLevels={camouflagelevels.length}
        onStartGame={() => selectLevel(0)}
        onLevelSelect={() => setCurrentScreen("levelSelect")}
        onResetProgress={resetProgress}
      />
    );
  }

  return (
    <GameScreen
      level={{ ...levelData, index: safeLevelIndex }}
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
