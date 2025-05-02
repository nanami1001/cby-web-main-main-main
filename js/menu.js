document.getElementById("menuBtn").addEventListener("click", function () {
    document.getElementById("sideMenu").style.width = "250px";
});

document.getElementById("closeBtn").addEventListener("click", function () {
    document.getElementById("sideMenu").style.width = "0";
});
// 取得當前頁面 URL
const currentPage = window.location.pathname.split("/").pop();

// 定義對應的按鈕 ID
const pageLinks = {
    "index.html": "homeLink",
    "about.html": "aboutLink",
    "futrue.html": "futureLink",
    "work.html": "workLink",
    "other.html": "otherLink"
};

// 如果當前頁面對應到選單中的連結，則加上 active 類別
if (pageLinks[currentPage]) {
    document.getElementById(pageLinks[currentPage]).classList.add("active");
}
