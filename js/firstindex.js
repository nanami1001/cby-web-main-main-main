document.addEventListener('DOMContentLoaded', () => {
    const helpBox = document.getElementById('help-box');
    const helpTextEl = document.getElementById('help-text');
    const helpButtons = document.getElementById('help-buttons');
    const yesBtn = document.getElementById('yes-help');
    const noBtn = document.getElementById('no-help');
    const questionList = document.getElementById('question-list');
    const answerBox = document.getElementById('answer-box');
  
    /*if (localStorage.getItem('hasVisitedHelp')) {
      helpBox.style.display = 'none';
      return;
    }*/
  
    const answers = {
      '怎麼開始遊戲？': '怎麼開始遊戲？  請點選首頁的「開始」按鈕，選擇關卡後即可進入遊戲畫面。',
      '網站卡住了怎麼辦？': '網站卡住了怎麼辦？  請嘗試重新整理頁面，或使用不同的瀏覽器再次進入。',
      '可以儲存進度嗎？': '可以儲存進度嗎？  是的，您的遊戲進度會自動儲存在本機瀏覽器中。',
      '畫面顯示異常怎麼辦？': '畫面顯示異常怎麼辦？  請確認您使用的是最新版的 Chrome 或 Edge，並嘗試重新整理頁面。',
      '網站適合在哪些裝置上使用？': '網站適合在哪些裝置上使用？  本網站建議在桌上型或筆記型電腦上使用，部分手機裝置可能顯示不完全。',
      '進度沒保存怎麼辦？': '進度沒保存怎麼辦？  請確認瀏覽器沒有開啟無痕模式，並允許本地儲存（localStorage）功能。',
      '有聲音效果嗎？可以關掉嗎？': '有聲音效果嗎？可以關掉嗎？  目前網站未實作聲音功能，若未來加入會提供開關設定。',
      '遊戲難度可以調整嗎？': '遊戲難度可以調整嗎？  可以，在開始前選擇「關卡」數量即可變更遊戲難度。',
      '每次重新整理會重新開始嗎？': '每次重新整理會重新開始嗎？  若您未完成遊戲，重新整理後會重新開始；通關後資料會自動重置。',
      '這個網站會收集我的資料嗎？': '這個網站會收集我的資料嗎？  不會，所有資料僅儲存在您的裝置本地，不會傳送到伺服器。',
      '如何聯絡作者？': '如何聯絡作者？  如需進一步協助，請聯絡作者：chenbingyu@example.com。',
      '可以離線玩嗎？': '可以離線玩嗎？  是的，大多數功能可在離線狀態下使用，但初次載入需連線。',
      '為什麼我無法拖曳或操作試管？': '為什麼我無法拖曳或操作試管？  請確認您的瀏覽器支援滑鼠點擊操作，並避免使用觸控瀏覽器進行操作。'
    };
  
    let isTyping = false; // 鎖定標記：是否正在打字

function typeText(element, message, callback) {
  if (isTyping) return; // 如果正在打字，忽略本次請求
  isTyping = true;

  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += message.charAt(i);
    i++;
    if (i >= message.length) {
      clearInterval(interval);
      isTyping = false; // 打字完成後解除鎖定
      if (callback) callback();
    }
  }, 50);
}
  
    typeText(helpTextEl, '歡迎來到我的網站！請問您需要幫助嗎？', () => {
      helpButtons.style.display = 'block';
    });
  
    yesBtn.addEventListener('click', () => {
      helpButtons.style.display = 'none';
      typeText(helpTextEl, '很高興為您提供協助！', () => {
        questionList.style.display = 'block';
      });
      localStorage.setItem('hasVisitedHelp', 'true');
    });
  
    noBtn.addEventListener('click', () => {
      helpButtons.style.display = 'none';
      typeText(helpTextEl, '祝您瀏覽愉快！', () => {
        setTimeout(() => {
          helpBox.style.display = 'none';
        }, 2000);
      });
      localStorage.setItem('hasVisitedHelp', 'true');
    });
  
    document.querySelectorAll('.question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = answers[btn.textContent] + '\n\n若仍有問題，歡迎聯絡作者：5b1g0031@stust.edu.tw';
        answerBox.style.display = 'block';
        typeText(answerBox, text);
      });
    });
  });
