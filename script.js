class Calculator {
    constructor(calculatorScreen) {
        this.calculatorScreen = calculatorScreen;
        this.reset();
    }

    reset() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operator = null;
    }

    inputDigit(digit) {
        if (this.waitingForSecondOperand === true) {
            this.displayValue = digit;
            this.waitingForSecondOperand = false;
        } else {
            this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
        }
    }

    inputDecimal(dot) {
        if (this.waitingForSecondOperand === true) return;

        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
        }
    }

    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.displayValue);

        if (this.operator && this.waitingForSecondOperand) {
            this.operator = nextOperator;
            return;
        }

        if (this.firstOperand == null) {
            this.firstOperand = inputValue;
        } else if (this.operator) {
            const result = this.performCalculation(this.operator, this.firstOperand, inputValue);

            this.displayValue = `${parseFloat(result.toFixed(7))}`;
            this.firstOperand = result;
        }

        this.waitingForSecondOperand = true;
        this.operator = nextOperator;
    }

    performCalculation(operator, firstOperand, secondOperand) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    updateDisplay() {
        this.calculatorScreen.value = this.displayValue;
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelector('.calculator-keys').addEventListener('click', event => {
    const { target } = event;

    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        calculator.handleOperator(target.value);
        calculator.updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        calculator.reset();
        calculator.updateDisplay();
        return;
    }

    if (target.value === '.') {
        calculator.inputDecimal(target.value);
    } else {
        calculator.input
