// Grab elements
var calcBtn = document.getElementById('calcBtn');
var calc = document.getElementById('calc');
var closeX = document.getElementById('closeX');
var result = document.getElementById('result');

// Variables
var currentVal = '0';
var prevVal = '';
var op = null;
var reset = false;

// Toggle calculator
calcBtn.onclick = function () {
    calc.classList.toggle('visible');
    if (calc.classList.contains('visible')) {
        calcBtn.innerText = 'Hide Calc';
    } else {
        calcBtn.innerText = 'Calculator';
    }
};

// Close calculator
closeX.onclick = function () {
    calc.classList.remove('visible');
    calcBtn.innerText = 'Calculator';
};

// Add number
function addNum(num) {
    if (reset) {
        currentVal = num;
        reset = false;
    } else {
        // Don't add multiple decimal points
        if (num === '.' && currentVal.includes('.')) return;

        // Replace initial zero
        if (currentVal === '0' && num !== '.') {
            currentVal = num;
        } else {
            currentVal += num;
        }
    }
    updateDisplay();
}

// Add operator
function addOp(operator) {
    // Calculate if there's already an operation
    if (op !== null) {
        calculate();
    }

    prevVal = currentVal;
    op = operator;
    reset = true;
}

// Calculate result
function calculate() {
    if (op === null || reset) return;

    var num1 = parseFloat(prevVal);
    var num2 = parseFloat(currentVal);
    var answer;

    // Division by zero check
    if (op === '/' && num2 === 0) {
        alert("Can't divide by zero!");
        clearAll();
        return;
    }

    // Do the math
    switch (op) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            answer = num1 / num2;
            break;
        case '%':
            answer = num1 % num2;
            break;
    }

    // Fix floating point weirdness
    if (answer) {
        answer = Math.round(answer * 1000000) / 1000000;
        currentVal = answer.toString();
    }

    op = null;
    prevVal = '';
    reset = true;
    updateDisplay();
}

// Clear everything
function clearAll() {
    currentVal = '0';
    prevVal = '';
    op = null;
    updateDisplay();
}

// Backspace
function backspace() {
    if (currentVal.length === 1) {
        currentVal = '0';
    } else {
        currentVal = currentVal.slice(0, -1);
    }
    updateDisplay();
}

// Update display
function updateDisplay() {
    // Format large numbers but keep it simple
    var displayVal = currentVal;

    // Add commas for thousands, but only if there's no decimal point
    if (!displayVal.includes('.')) {
        try {
            displayVal = parseInt(displayVal).toLocaleString();
        } catch (e) {
            // if it fails, just show the raw value
            displayVal = currentVal;
        }
    }

    result.textContent = displayVal;
}

// Handle keyboard input
document.addEventListener('keydown', function (e) {
    // Only do stuff if calculator is visible
    if (!calc.classList.contains('visible')) return;

    var key = e.key;

    // Numbers and decimal
    if (/^[0-9.]$/.test(key)) {
        addNum(key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        addOp(key);
    }
    // Equals
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Clear
    else if (key === 'Escape') {
        clearAll();
    }
    // Backspace
    else if (key === 'Backspace') {
        backspace();
    }
    // Percent 
    else if (key === '%') {
        addOp('%');
    }
});