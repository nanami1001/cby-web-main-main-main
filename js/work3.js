let expression = '';

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
    } else if (value === 'DEL') {
      expression = expression.slice(0, -1);
    } else if (value === 'C') {
      expression = '';
    } else {
      expression += value;
    }

    display.textContent = expression;
  });
});
document.getElementById("toggle-mode").addEventListener("click", function () {
    window.location.href = "true_solver.html"; // 也可以寫成 ./true_solver.html 或 ../true_solver.html 看實際路徑
});
