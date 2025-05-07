// 當網頁內容載入完成後執行主程式
document.addEventListener("DOMContentLoaded", () => {
  // === 取得 DOM 元素 ===
  const gameContainer = document.getElementById("game-container");
  const playButton = document.getElementById("play-button");
  const levelSelect = document.getElementById("level-select");
  const countdownPopup = document.getElementById("rule-popup");
  const countdownEl = document.getElementById("countdown");

  // === 遊戲狀態變數 ===
  let moveCount = 0;           // 移動次數
  let timeCount = 0;           // 經過時間
  let timerInterval;           // 計時器
  const tubes = [];            // 儲存所有試管
  let selectedTube = null;     // 當前選中的試管
  let levelCount = 1;          // 關卡數（顏色種類）

  // 可用的顏色
  const colors = [
    "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown",
    "cyan", "magenta", "lime", "teal", "indigo", "violet", "gold", "silver",
    "maroon", "navy", "olive", "coral",
  ];

  // 當點擊「開始遊戲」按鈕
  playButton.addEventListener("click", () => {
    let counter = 3; // 倒數秒數
    countdownPopup.classList.add("show");     // 顯示倒數視窗
    countdownEl.textContent = counter;

    // 每秒更新倒數
    const countdown = setInterval(() => {
      counter--;
      countdownEl.textContent = counter;

      // 倒數結束
      if (counter === 0) {
        clearInterval(countdown);
        countdownPopup.classList.remove("show");

        // 重設遊戲狀態
        moveCount = 0;
        timeCount = 0;
        document.getElementById("move-count").textContent = moveCount;
        document.getElementById("time-count").textContent = timeCount;

        // 啟動計時器
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          timeCount++;
          document.getElementById("time-count").textContent = timeCount;
        }, 1000);

        // 建立試管與填入顏色
        createTubes();
        fillTubes();
      }
    }, 1000);
  });

  // 當使用者選擇不同關卡
  levelSelect.addEventListener("change", (event) => {
    const selectedLevel = parseInt(event.target.value, 10);
    levelCount = selectedLevel;
    document.getElementById("level-count").textContent = levelCount;
  });

  // 建立試管
  function createTubes() {
    gameContainer.innerHTML = "";
    tubes.length = 0;

    // 建立有顏色的試管
    for (let i = 0; i < levelCount + 1; i++) {
      const tube = document.createElement("div");
      tube.classList.add("tube");
      tube.addEventListener("click", () => selectTube(tube));
      gameContainer.appendChild(tube);
      tubes.push(tube);
    }

    // 再加兩個空試管
    for (let i = 0; i < 2; i++) {
      const emptyTube = document.createElement("div");
      emptyTube.classList.add("tube");
      emptyTube.addEventListener("click", () => selectTube(emptyTube));
      gameContainer.appendChild(emptyTube);
      tubes.push(emptyTube);
    }
  }

  // 隨機填入顏色
  function fillTubes() {
    const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
    const waterBlocks = [];

    // 每個顏色填 4 格
    gameColors.forEach((color) => {
      for (let i = 0; i < 4; i++) {
        waterBlocks.push(color);
      }
    });

    // 打亂順序
    waterBlocks.sort(() => 0.5 - Math.random());

    // 將水倒入前面的試管
    let blockIndex = 0;
    tubes.slice(0, levelCount + 1).forEach((tube) => {
      for (let i = 0; i < 4; i++) {
        if (blockIndex < waterBlocks.length) {
          const water = document.createElement("div");
          water.classList.add("water");
          water.style.backgroundColor = waterBlocks[blockIndex];
          water.style.height = "20%"; // 高度固定
          tube.appendChild(water);
          blockIndex++;
        }
      }
    });
  }

  // 點選試管的行為
  function selectTube(tube) {
    if (selectedTube) {
      if (selectedTube !== tube) pourWater(selectedTube, tube); // 倒水
      selectedTube.classList.remove("selected");
      selectedTube = null;
    } else {
      selectedTube = tube;
      tube.classList.add("selected");
    }
  }

  // 倒水邏輯
  function pourWater(fromTube, toTube) {
    let fromWater = fromTube.querySelector(".water:last-child");
    let toWater = toTube.querySelector(".water:last-child");

    // 若目標是空的，直接倒同顏色過去
    if (!toWater) {
      const color = fromWater ? fromWater.style.backgroundColor : null;
      while (fromWater && fromWater.style.backgroundColor === color && toTube.childElementCount < 4) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
      }
    } else {
      // 若顏色相同才可以倒，且不能超過 4 格
      while (
        fromWater &&
        fromWater.style.backgroundColor === toWater.style.backgroundColor &&
        toTube.childElementCount < 4
      ) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
        toWater = toTube.querySelector(".water:last-child");
      }
    }

    moveCount++; // 增加移動次數
    document.getElementById("move-count").textContent = moveCount;

    checkGameOver(); // 檢查是否通關
  }

  // 判斷是否完成關卡
  function checkGameOver() {
    const allTubesCompleted = tubes.every((tube) => {
      const waters = Array.from(tube.children);
      return (
        waters.length === 0 ||
        (waters.length === 4 && waters.every(w => w.style.backgroundColor === waters[0].style.backgroundColor))
      );
    });

    if (allTubesCompleted) {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert("你已經完成本關卡!");  // ✅ 你可以在這裡改成顯示自訂視窗
        returnToInitialState();      // 回到初始畫面
      }, 500);
    }
  }

  // 重設為初始狀態（收起所有試管）
  function returnToInitialState() {
    clearTubes(); // 清空畫面試管
    moveCount = 0;
    timeCount = 0;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("time-count").textContent = timeCount;
    document.getElementById("level-count").textContent = levelCount;
    selectedTube = null;
  }

  // 清除試管畫面
  function clearTubes() {
    gameContainer.innerHTML = "";
    tubes.length = 0;
  }

  // 重玩遊戲（尚未綁定按鈕）
  function resetGame() {
    moveCount = 0;
    timeCount = 0;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("time-count").textContent = timeCount;
    clearInterval(timerInterval);
    createTubes();
    fillTubes();
  }
});
