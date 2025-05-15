// 生成乘法表的函數
function myFunction() {
    var n = document.getElementById('numberInput').value;
    var str = "<table>";

    for (let i = 1; i <= n; i++) {
        str += "<tr>";
        for (let j = 1; j <= n; j++) {
            // 如果是第一列（j == 1），套用藍色樣式
            if (j === 1) {
                str += `<td class="highlight"> ${i} * ${j} = ${i * j}</td>`;
            } else {
                str += `<td> ${i} * ${j} = ${i * j}</td>`;
            }
        }
        str += "</tr>";
    }
    str += "</table>";

    document.getElementById("myId").innerHTML = str;
}

// 左上角彈出選單開啟
document.getElementById("menu-button").addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "250px";
});

// 左上角彈出選單關閉
document.getElementById("close-button").addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "0";
});
