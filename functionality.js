class Calculator {
  constructor(previousValueTextElement, currentValueTextElement) {
    this.previousValueTextElement = previousValueTextElement;
    this.currentValueTextElement = currentValueTextElement;
    this.clear();
  }

  clear = function () {
    this.currentValue = "";
    this.previousValue = "";
    this.operation = undefined;
  };

  deleteValue = function () {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  };
  appendNumber = function (number) {
    if (number === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  };
  chooseOperation = function (operation) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = "";
  };
  compute = function () {
    let computation;
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentValue = computation;
    this.operation = undefined;
    this.previousValue = "";
  };
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay = function () {
    this.currentValueTextElement.innerText = this.getDisplayNumber(
      this.currentValue
    );
    if (this.operation != null) {
      this.previousValueTextElement.innerText = `${this.getDisplayNumber(
        this.previousValue
      )} ${this.operation}`;
    } else {
      this.previousValueTextElement.innerText = "";
    }
  };
}

const calculator = new Calculator(
  previousValueTextElement,
  currentValueTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
  calculator.deleteValue();
  calculator.updateDisplay();
});

const one = document.querySelector(".one");
const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousValueTextElement = document.querySelector(
  "[data-previous-value]"
);
const currentValueTextElement = document.querySelector("[data-current-value]");
