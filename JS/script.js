class Calculator {
    constructor(previousValueElement, currentValueElement) {
        this.previousValueElement = previousValueElement
        this.currentValueElement = currentValueElement
        this.clear()
    }

    // For clearing all numbers
    clear() {
        this.previousValue = ''
        this.currentValue = ''
        this.operation = undefined
    }

    // For deleting single number
    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    // When user clicks on a number
    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    // For when user choose an operation
    chooseOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = ''
    }

    // Compute numbers when clicks on equal button
    compute() {
        let computation
        const prev = parseFloat(this.previousValue)
        const curr = parseFloat(this.currentValue)
        if (prev === isNaN || curr === isNaN) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case 'x':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return;
        }

        // Reset operation and previous after compute
        this.currentValue = computation
        this.operation = undefined
        this.previousValue = ''
    }

    // Updating display
    updateDisplay() {
        this.currentValueElement.innerText = this.currentValue
        if (this.operation != null) {
            this.previousValueElement.innerText = `${this.previousValue} ${this.operation}`
        } else {
            this.previousValueElement.innerText = this.previousValue
        }

    }

}

// Helpers
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
const previousValueElement = document.querySelector('[data-previous-value]');
const currentValueElement = document.querySelector('[data-current-value]');
const deleteButton = document.querySelector('[data-delete]');
const cleanAllButton = document.querySelector('[data-clean-all]');

const calculator = new Calculator(previousValueElement, currentValueElement)

// appending numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// clear the calculator
cleanAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

// adding operations
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// compute by clicking equal button
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

// deleting the last number when user clicks on delete button
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})