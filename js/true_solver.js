
  let input = "";

function appendNum(num) {
  input += num.toString();
  updateDisplay(input);
}

function appendRandom() {
  const rand = Math.floor(Math.random() * 10);
  input += rand.toString();
  updateDisplay(input);
}

function delInput() {
  input = input.slice(0, -1);
  updateDisplay(input || "請輸入臭臭數字");
}

function clearInput() {
  input = "";
  updateDisplay("請輸入臭臭數字");
  document.getElementById("result").innerText = "";
}

function updateDisplay(text) {
  document.getElementById("display").innerText = text;
}

const digits = [1,1,4,5,1,4];
const operators = ["+", "-", "*", "/", "%", "**"];

function submitTarget() {
  const target = parseFloat(input);
  const resultDiv = document.getElementById("result");

  if (isNaN(target)) {
    resultDiv.innerText = "請輸入有效數字";
    return;
  }

  const expressions = new Set();

  function dfs(index, expr) {
    if (index === digits.length) {
      try {
        const value = eval(expr);
        if (Math.abs(value - target) < 1e-6) {
          expressions.add(expr);
        }
      } catch (_) {}
      return;
    }

    for (let i = index + 1; i <= digits.length; i++) {
      const part = digits.slice(index, i).join("");
      if (index === 0) {
        dfs(i, part);
      } else {
        for (const op of operators) {
          dfs(i, expr + op + part);
        }
      }
    }
  }

  dfs(0, "");

  if (expressions.size > 0) {
    const sorted = [...expressions].sort((a,b) => a.length - b.length);
    resultDiv.innerHTML = `✅ <strong>${sorted[0]}</strong>`;
  } else {
    resultDiv.innerHTML = "❌ 不夠臭無法用 1,1,4,5,1,4 組合";
  }
}
document.getElementById("toggle-mode").addEventListener("click", () => {
    location.href = "work3.html";
  });
  