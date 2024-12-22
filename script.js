let currentInput = '0';
let history = [];

function appendNumber(number) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateScreen();
}

function appendOperator(operator) {
    if (currentInput === '' || currentInput === 'Error') return;
    if (operator === '+/-') {
        currentInput = currentInput.charAt(0) === '-' ? currentInput.slice(1) : '-' + currentInput;
    } else {
        currentInput += operator;
    }
    updateScreen();
}

function clearScreen() {
    currentInput = '0';
    updateScreen();
}

function updateScreen() {
    document.getElementById('screen').textContent = currentInput;
}

function calculate() {
    try {
        let result = eval(currentInput.replace('×', '*').replace('÷', '/').replace('%', '/100'));
        history.push(`${currentInput} = ${result}`);
        currentInput = result.toString();
        updateScreen();
        updateHistory();
    } catch {
        currentInput = 'Error';
        updateScreen();
    }
}

function updateHistory() {
    let historyElement = document.getElementById('history');
    historyElement.innerHTML = history.join('<br>');
}

function clearHistory() {
    history = [];
    updateHistory();
}

function toggleHistory() {
    let historyElement = document.getElementById('history');
    if (historyElement.style.display === 'none') {
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    }
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function backspace() {
    if (currentInput !== '0' && currentInput !== 'Error') {
        currentInput = currentInput.slice(0, -1) || '0';
        updateScreen();
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        appendOperator('/');
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearScreen();
    } else if (key === '.') {
        appendOperator('.');
    } else if (key === '(') {
        appendOperator('(');
    } else if (key === ')') {
        appendOperator(')');
    }
});
