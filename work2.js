document.addEventListener("DOMContentLoaded", () => {
  // 選取主要的 DOM 元素
  const gameContainer = document.getElementById("game-container");
  const playButton = document.getElementById("play-button");
  const levelSelect = document.getElementById("level-select");
  let moveCount = 0;
  let timeCount = 0;
  let timerInterval;

  // 按下 PLAY 按鈕後執行的動作
  playButton.addEventListener("click", () => {
    // 重設移動次數和時間
    moveCount = 0;
    timeCount =-3;
    document.getElementById("move-count").textContent = moveCount;
    document.getElementById("time-count").textContent = timeCount;

    // 清除現有計時器
    clearInterval(timerInterval);

    // 啟動新的計時器
    timerInterval = setInterval(() => {
      timeCount++;
      document.getElementById("time-count").textContent = timeCount;
    }, 1000);

    // 初始化遊戲
    tubes.length = 0;
    createTubes();
    fillTubes();
  });

    
    // 所有可用的顏色
    const colors = [
      "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown",
      "cyan", "magenta", "lime", "teal", "indigo", "violet", "gold", "silver",
      "maroon", "navy", "olive", "coral",
    ];

    // 儲存所有試管的陣列
    const tubes = [];

    // 儲存被選取的試管
    let selectedTube = null;

    // 預設關卡為第 1 關
    let levelCount = 1;

    // 切換關卡並更新顯示
    function chooseLevel(level) {
      levelCount = level;
      document.getElementById("level-count").textContent = levelCount;
    }

    // 當下拉選單變動時，選擇對應的關卡
    levelSelect.addEventListener("change", (event) => {
      const selectedLevel = parseInt(event.target.value, 10);
      chooseLevel(selectedLevel);
    });

    // 檢查遊戲狀態（是否完成）
    function checkGameState() {
      // 判斷某一個試管是否為同一顏色且有 4 格
      const allSameColor = (tube) => {
        const waters = Array.from(tube.children);
        return (
          waters.length === 4 &&
          waters.every(
            (water) =>
              water.style.backgroundColor === waters[0].style.backgroundColor
          )
        );
      };

      // 計算完成的試管數
      let completedTubes = 0;
      tubes.forEach((tube) => {
        if (allSameColor(tube)) {
          completedTubes++;
        }
      });
      document.getElementById("completed-tubes-count").textContent =
        completedTubes;

      // 若所有試管皆為空或同色，則視為過關
      if (
        tubes.every((tube) => tube.childElementCount === 0 || allSameColor(tube))
      ) {
        if (levelCount === 10) {
          alert("恭喜!你已經完成所有挑戰!!");
        } else {
          alert("你已經完成本關卡!");
          levelCount++;
          document.getElementById("level-count").textContent = levelCount;
          document.getElementById("completed-tubes-count").textContent = 0;
          chooseLevel(levelCount);
          createTubes();
          fillTubes();
        }
      }
    }

    // 執行倒水的邏輯
    function pourWater(fromTube, toTube) {
      let fromWater = fromTube.querySelector(".water:last-child");
      let toWater = toTube.querySelector(".water:last-child");
    
      if (!toWater) {
        const color = fromWater ? fromWater.style.backgroundColor : null;
        while (
          fromWater &&
          fromWater.style.backgroundColor === color &&
          toTube.childElementCount < 4
        ) {
          toTube.appendChild(fromWater);
          fromWater = fromTube.querySelector(".water:last-child");
        }
      } else {
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
    
      // 在每次水移動後檢查遊戲是否結束
      checkGameOver();
    }
    
    function checkGameOver() {
      // 檢查是否所有試管都完成
      const allTubesCompleted = tubes.every((tube) => {
        const waters = Array.from(tube.children);
        return (
          waters.length === 0 || waters.every(water => water.style.backgroundColor === waters[0].style.backgroundColor)
        );
      });
    
      // 如果所有試管都完成且顏色一致，則遊戲結束
      if (allTubesCompleted) {
        // 等待顏色改變後再判斷
        setTimeout(() => {
          alert("恭喜！你已經完成所有挑戰！");
          resetGame();  // 或者執行重設遊戲邏輯
        }, 500); // 延遲時間可以根據需要調整
      }
    }
    
    function resetGame() {
      // 遊戲結束後重置遊戲狀態
      moveCount = 0;
      timeCount = 0;
      document.getElementById("move-count").textContent = moveCount;
      document.getElementById("time-count").textContent = timeCount;
      tubes.length = 0;
      createTubes();
      fillTubes();
    }
    
    // 處理試管點擊的邏輯
    function selectTube(tube) {
      if (selectedTube) {
        if (selectedTube !== tube) {
          pourWater(selectedTube, tube); // 嘗試倒水
        }
        selectedTube.classList.remove("selected");
        selectedTube = null;
      } else {
        selectedTube = tube;
        tube.classList.add("selected");
      }
    }

    // 建立試管的 DOM 元素
    function createTubes() {
      gameContainer.innerHTML = "";
      tubes.length = 0;

      // 為每個顏色建立一根試管
      for (let i = 0; i < levelCount + 1; i++) {
        const tube = document.createElement("div");
        tube.classList.add("tube");
        tube.addEventListener("click", () => selectTube(tube));
        gameContainer.appendChild(tube);
        tubes.push(tube);
      }

      // 增加兩根空試管作為緩衝
      for (let i = 0; i < 2; i++) {
        const emptyTube = document.createElement("div");
        emptyTube.classList.add("tube");
        emptyTube.addEventListener("click", () => selectTube(emptyTube));
        gameContainer.appendChild(emptyTube);
        tubes.push(emptyTube);
      }
    }

    // 將顏色水塊填入試管
    function fillTubes() {
      const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
      const waterBlocks = [];

      // 為每種顏色建立 4 個水塊
      gameColors.forEach((color) => {
        for (let i = 0; i < 4; i++) {
          waterBlocks.push(color);
        }
      });

      // 打亂水塊順序
      waterBlocks.sort(() => 0.5 - Math.random());

      // 分發水塊到試管
      let blockIndex = 0;
      tubes.slice(0, levelCount + 1).forEach((tube) => {
        for (let i = 0; i < 4; i++) {
          if (blockIndex < waterBlocks.length) {
            const water = document.createElement("div");
            water.classList.add("water");
            water.style.backgroundColor = waterBlocks[blockIndex];
            water.style.height = "20%";
            tube.appendChild(water);
            blockIndex++;
          }
        }
      });
    }

    // 點擊開始遊戲按鈕時初始化遊戲
    playButton.addEventListener("click", () => {
      const popup = document.getElementById("rule-popup");
      const countdownEl = document.getElementById("countdown");
    
      let counter = 3;
      popup.classList.add("show");
      countdownEl.textContent = counter;
    
      const countdown = setInterval(() => {
        counter--;
        countdownEl.textContent = counter;
    
        if (counter === 0) {
          clearInterval(countdown);
          popup.classList.remove("show");
    
          // 開始遊戲
          tubes.length = 0;
          createTubes();
          fillTubes();
        }
      }, 1000);
    });
    function checkGameOver() {
  // 檢查所有試管的狀態，看看是否所有試管都完成或是空的
  const allTubesCompleted = tubes.every((tube) => {
    // 檢查每根試管內的顏色是否一致
    const waters = Array.from(tube.children);
    return (
      waters.length === 0 || waters.every(water => water.style.backgroundColor === waters[0].style.backgroundColor)
    );
  });

  // 如果所有試管都完成（顏色一致），則遊戲結束
  if (allTubesCompleted) {
    alert("恭喜！你已經完成所有挑戰！");
    resetGame();  // 或者執行重設遊戲邏輯
  }
}

function resetGame() {
  // 遊戲結束後重置遊戲狀態（例如重新開始遊戲，或顯示下一關）
  moveCount = 0;
  timeCount = 0;
  document.getElementById("move-count").textContent = moveCount;
  document.getElementById("time-count").textContent = timeCount;
  tubes.length = 0;
  createTubes();
  fillTubes();
}

  });
