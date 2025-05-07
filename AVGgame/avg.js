document.addEventListener("DOMContentLoaded", () => {
    const titleScreen = document.getElementById("title-screen");
    const gameContainer = document.getElementById("game-container");
    const startButton = document.getElementById("start-game");
    const dialogueText = document.getElementById("dialogue-text");
    const nextButton = document.getElementById("next-button");

    let dialogueIndex = 0;
    const dialogues = [
        "這是一個視覺小說遊戲。",
        "你將會踏上一場奇幻的冒險。",
        "準備好了嗎？"
    ];

    function typeText(text, element, speed, callback) {
        let index = 0;
        element.textContent = ""; // 清空文本
        const intervalId = setInterval(() => {
            element.textContent += text[index];
            index++;
            if (index === text.length) {
                clearInterval(intervalId); // 當文字顯示完畢，停止動畫
                if (callback) callback(); // 如果有回呼函數，執行
            }
        }, speed);
    }

    startButton.addEventListener("click", () => {
        startButton.classList.add("fade-out"); // 讓按鈕漸淡消失
        setTimeout(() => {
            titleScreen.classList.add("hidden");
            gameContainer.classList.remove("hidden");
            typeText(dialogues[dialogueIndex], dialogueText, 100); // 每個字間隔 100ms 顯示
        }, 1000); // 1 秒後隱藏標題畫面，開始遊戲
    });

    nextButton.addEventListener("click", () => {
        dialogueIndex++;
        if (dialogueIndex < dialogues.length) {
            typeText(dialogues[dialogueIndex], dialogueText, 100); // 每個字間隔 100ms 顯示
        } else {
            dialogueText.textContent = "遊戲結束。";
            nextButton.disabled = true;
        }
    });
});
