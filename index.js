const calculatorKeys = document.querySelector('.calculator-keys');


const calculator = {
    displayValue: "0",
    firstOperand: null,
    operator: null,
    isWaitingForSecondOperand: false,
}

function inputDigit(digit) {
    const { displayValue, isWaitingForSecondOperand } = calculator;

    if (isWaitingForSecondOperand === true) {
        calculator.isWaitingForSecondOperand = false;
        calculator.displayValue = digit;
    } else {
        calculator.displayValue = ((displayValue === '0') ? digit : (displayValue + digit));
    }
}

function inputDecimal(dot) {
    if (calculator.isWaitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.isWaitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function updateDisplay() {
    const display = document.querySelector(".display");
    display.value = calculator.displayValue;
}
updateDisplay();

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
    }

    return secondOperand;
}

function handleOperator(nextOperator) {
    const { firstOperand, operator, displayValue, isWaitingForSecondOperand } = calculator;

    const inputValue = parseFloat(displayValue);

    if (operator && isWaitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if ((firstOperand === null) && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.isWaitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.isWaitingForSecondOperand = false;
}

calculatorKeys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    inputDigit(target.value);

    updateDisplay();
});