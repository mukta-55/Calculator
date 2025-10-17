const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

function appendValue(value) {
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/'];

  // Prevent multiple operators
  if (operators.includes(value) && operators.includes(lastChar)) return;

  // Prevent multiple decimals
  if (value === '.') {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) return;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const result = eval(display.value);
    if (result !== undefined) {
      addToHistory(display.value + ' = ' + result);
      display.value = result;
    }
  } catch {
    display.value = 'Error';
  }
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark');
}

// Add to history
function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  li.addEventListener('click', () => {
    display.value = entry.split(' = ')[1];
  });
  historyList.prepend(li); // Newest on top
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.'].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    calculateResult();
  } else if (e.key === 'Backspace') {
    backspace();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
