const calculator = {
  displayValue: "0",
  number: null,//number
  pendingNumber: false,//pendingNumber
  operation: null,
  percentNumber: null
};

function display(){
  document.getElementById("display").textContent = calculator.displayValue;
}


const keyPress = document.getElementById("calculator");
keyPress.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  } 
  if (target.classList.contains("keyNumber")) {
    inputNumber(target.value);
    display();
  } else if (target.value === ".") {
    inputDecimal(target.value);
    display();
  } else if (["+", "-", "*", "/", "="].includes(target.value)) {
    inputOperation(target.value);
    display();
  } else if (target.value === "allClear") {
    reset();
    display();  
  } else if (target.value === "backspace") {
    backspace();
    display();
  } else if (target.value === "%") {
    percent();
    display();
  }
  });

function inputNumber(number) {
  if (calculator.pendingNumber === true) {
    calculator.displayValue = number;
    calculator.pendingNumber = false;
  } else if (calculator.displayValue === "0") {
    calculator.displayValue = number;
  } else {
    calculator.displayValue = calculator.displayValue + number;
  }
}

function inputDecimal(decimal) {
  if (calculator.pendingNumber === true) {
    calculator.displayValue = "0.";
    calculator.pendingNumber = false;
    return;
  }
  if (!calculator.displayValue.includes(decimal)) {
    calculator.displayValue += decimal;
  }
}

function inputOperation(nextOperation) {
  //debugger;
  const secondNumber = parseFloat(calculator.displayValue);
  if (calculator.operation && calculator.pendingNumber) {
    calculator.operation = nextOperation;
    return;
  }
  if (calculator.number === null) {
    calculator.number = secondNumber;
  } else if (calculator.operation) {
    const result = calculate(calculator.number, secondNumber, calculator.operation);
    calculator.displayValue = `${parseFloat(result.toFixed(8))}`;
    calculator.number = result;
  }
  calculator.pendingNumber = true;
  calculator.operation = nextOperation;
}

function calculate(firstNumber, secondNumber, operation) {
  if (operation === "+") {
    return firstNumber + secondNumber;
  } else if (operation === "-") {
    return firstNumber - secondNumber;
  } else if (operation === "*") {
    return firstNumber * secondNumber;
  } else if (operation === "/") {
    if (secondNumber === 0) {
      alert("Divide by 0 is not allowed");
      return;
    }
    return firstNumber / secondNumber;
  }
  return secondNumber;
}

function reset() {
  calculator.displayValue = "0";
  calculator.number = null;
  calculator.pendingNumber = null;
  calculator.operation = null;
  calculator.percentNumber = null;
}

function backspace() {
  calculator.displayValue = calculator.displayValue.slice(0, -1);
}

function percent() {
  calculator.displayValue = calculator.number * calculator.displayValue / 100;
}


  



