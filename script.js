const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

let firstNumber = '';
let secondNumber = '';
let operator = '';
let displayValue = '';

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}


function updateDisplay(value) {
    if (displayValue === "Error: Division by zero") {
        displayValue = '';
    }
    displayValue += value;
    display.textContent = displayValue;
}

function clearDisplay() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    displayValue = '';
    display.textContent = '0';
}

function handleOperator(op) {
    if (firstNumber === '') {
        firstNumber = displayValue;
    } else if (operator !== '') {
        secondNumber = displayValue;
        firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    }
    operator = op;
    displayValue = '';
}

function handleEquals() {
    if (firstNumber !== '' && operator !== '' && displayValue !== '') {
        secondNumber = displayValue;
        displayValue = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
        display.textContent = displayValue;
        firstNumber = displayValue;
        secondNumber = '';
        operator = '';
    }
}


buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const clickedButton = btn.textContent;

        if (btn.id === 'clear') {
            clearDisplay();
            return;
        }
        if (btn.id === 'delete') {
            if (display.textContent.length === 1) {
                display.textContent = '0';
            } else {
                display.textContent = display.textContent.slice(0, -1);
            }
            displayValue = display.textContent;
            return;
        }
        if (btn.id === 'equal') {
            handleEquals();
            return;
        }

        if (btn.dataset.action) {
            handleOperator(clickedButton);
            return;
        }

        updateDisplay(clickedButton);
    });
});