document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("theme-selector");
  const themeLink = document.getElementById("theme-style");

  // 判斷是否在子目錄（依你的資料夾結構調整判斷條件）
  const currentPath = window.location.pathname;
  // 這裡你是用 ../css/ ，看起來子頁都在一個子目錄
  // 例如假設子頁路徑含 /pages/ 就是子頁，改成適合你的
  const isInSubFolder = currentPath.includes("/pages/") || currentPath.split("/").length > 3;

  // CSS 檔案路徑前綴，子頁用 ../css/，主頁用 css/
  const cssPathPrefix = isInSubFolder ? "../css/" : "css/";

  // 主題對應 CSS 檔名
  const themes = {
    default: "index.css",
    sakura: "sakura.css",
    beach: "beach.css"
  };

  // 套用主題函式
  function applyTheme(themeName) {
    const fileName = themes[themeName] || themes["default"];
    themeLink.setAttribute("href", cssPathPrefix + fileName);
    localStorage.setItem("theme", themeName);
  }

  // 初始化讀取並套用主題
  const savedTheme = localStorage.getItem("theme") || "default";
  themeSelector.value = savedTheme;
  applyTheme(savedTheme);

  // 當使用者變更主題時，立即套用並儲存
  themeSelector.addEventListener("change", () => {
    applyTheme(themeSelector.value);
  });

  // 監聽 localStorage 變更事件，可實現多分頁即時同步
  window.addEventListener("storage", (event) => {
    if (event.key === "theme" && event.newValue) {
      applyTheme(event.newValue);
      themeSelector.value = event.newValue;
    }
  });
});
