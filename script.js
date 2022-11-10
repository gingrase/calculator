function calculate (a, b, op) {
    let result = 0;
    switch (op) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case 'x':
            result = a * b;
            break;
        case '/':
            if (b != 0) {
                result = a / b;
            } else {
                return "ERROR";
            }
    }
    if (result.toString(10).length >= 10) {
        const resultSplit = result.toString(10).split(".");
        if (resultSplit[0].length >= 10) {
            return "ERROR";
        } else {
            const decimalSize = 9 - resultSplit[0].length;
            return resultSplit[0] + '.' + resultSplit[1].slice(0, decimalSize);
        } 
    } else {
        return result;
    }
}

function updateOperand(operand, newDigit) {
    if (operand.toString(10).length == 10) {
        return operand;
    } else if (operand == "ERROR") {
        return "ERROR";
    } else if (digitToComeDecimals) {
        digitToComeDecimals = false;
        if (operand % 1 == 0) {
            return Number(operand + '.' + newDigit);
        }
    }
    return Number(operand + newDigit);
}

function updateScreen(value) {
    const screenCont = document.querySelector(".screenContainer");
    screenCont.removeChild(document.querySelector("#screen"));
    
    const newText = document.createElement('div');
    newText.textContent = (value);
    newText.setAttribute('id', 'screen');
    screenCont.appendChild(newText);
}

function resetAll() {
    operand1 = 0;
    operand2 = 0;
    operator = '';
    operatorWasEnteredLast = false;
    equalWasPressedLast = false;
    digitToComeDecimals = false;
}

function numberEntered (id) {
    if (operatorWasEnteredLast) {
        operand2 = updateOperand(operand2, id);
        updateScreen(operand2);
    } else if (equalWasPressedLast) {
        operand1 = 0;
        equalWasPressedLast = false;
        operand1 = updateOperand(operand1, id);
        updateScreen(operand1);
    } else {
        operand1 = updateOperand(operand1, id);
        updateScreen(operand1);
    }
}

function operatorEntered (id) {
    if (operatorWasEnteredLast) {
        operand1 = calculate (operand1, operand2, operator);
        updateScreen(operand1);
        operand2 = 0;
    }
    operator = id;
    operatorWasEnteredLast = true;
    equalWasPressedLast = false;
    digitToComeDecimals = false;
}

function equalEntered () {
    if (operand2) {
        operand1 = calculate (operand1, operand2, operator);
        updateScreen(operand1);
        operand2 = 0;
    } 
    operatorWasEnteredLast = false;
    equalWasPressedLast = true;
    digitToComeDecimals = false;
}

function deleteEntered () {
    if (operatorWasEnteredLast) {
        operand2 = Number(operand2.toString(10).slice(0, -1));
        updateScreen(operand2);
    } else {
        operand1 = Number(operand1.toString(10).slice(0, -1));
        updateScreen(operand1);
    }
}

function clearEntered () {
    if (operatorWasEnteredLast) {
        operand2 = 0;
        updateScreen(operand2);
    } else {
        operand1 = 0;
        updateScreen(operand1);
    }
}

function negativeEntered () {
    if (operatorWasEnteredLast) {
        operand2 *= -1;
        updateScreen(operand2);
    } else {
        operand1 *= -1;
        updateScreen(operand1);
    }
}

function buttonReaction () {
    if (!isNaN(this.id)) {
        numberEntered(this.id);
    } else if (this.id == '.') {
        digitToComeDecimals = true;
    } else if (['+', '-', 'x', '/'].indexOf(this.id) >= 0) {
        operatorEntered(this.id);
    } else if (this.id == '=') {
        equalEntered();
    } else if (this.id == 'delete') {
        deleteEntered();
    } else if (this.id == 'negative') {
        negativeEntered();
    } else if (this.id == 'clear') {
        clearEntered();        
    } else if (this.id == 'reset') {
        resetAll();
        updateScreen('0');
    }
}

function keyReaction (key) {  
    if (!isNaN(key)) {
        numberEntered(key);
    } else if (key == '.') {
        digitToComeDecimals = true;
    } else if (['+', '-', 'x', '/'].indexOf(key) >= 0) {
        operatorEntered(key);
    } else if (key == '=') { 
        equalEntered();
    } else if (key == 'd') { // Delete
        deleteEntered();
    } else if (key == 'n') { // Negate
        negativeEntered(); 
    } else if (key == 'c') { // Clear
        clearEntered();        
    } else if (key == 'r') { // Reset
        resetAll();
        updateScreen('0');
    }
}


// INITIALIZATION
let operand1;
let operand2;
let operator;
let digitToComeDecimals;
let operatorWasEnteredLast;
let equalWasPressedLast;
resetAll();

// BUTTONS ACTIVATION
const buttons = document.querySelectorAll("button");
for (let button of buttons) {
    button.addEventListener("click", buttonReaction);
}

// KEY ACTIVATION
window.addEventListener("keypress", (event) => {keyReaction(event.key);}, true);
  
