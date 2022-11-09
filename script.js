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
        return "ERROR";
    } else {
        return result;
    }
}

function updateOperand(operand, newDigit) {
    if ((operand.toString(10).length == 10) || (operand == "ERROR")) {
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

function buttonReaction () {
    if (!isNaN(this.id)) {
        if (operatorWasEnteredLast) {
            operand2 = updateOperand(operand2, this.id);
            updateScreen(operand2);
        } else if (equalWasPressedLast) {
            operand1 = 0;
            equalWasPressedLast = false;
            operand1 = updateOperand(operand1, this.id);
            updateScreen(operand1);
        } else {
            operand1 = updateOperand(operand1, this.id);
            updateScreen(operand1);
        }
    } else if (this.id == '.') {
        digitToComeDecimals = true;
    } else if (['+', '-', 'x', '/'].indexOf(this.id) >= 0) {
        if (operatorWasEnteredLast) {
            operand1 = calculate (operand1, operand2, operator);
            updateScreen(operand1);
            operand2 = 0;
        }
        operator = this.id;
        operatorWasEnteredLast = true;
        equalWasPressedLast = false;
        digitToComeDecimals = false;
    } else if (this.id == '=') {
        if (operand2) {
            operand1 = calculate (operand1, operand2, operator);
            updateScreen(operand1);
            operand2 = 0;
        } 
        operatorWasEnteredLast = false;
        equalWasPressedLast = true;
        digitToComeDecimals = false;
    } else if (this.id == 'delete') {
        if (operatorWasEnteredLast) {
            operand2 = Number(operand2.toString(10).slice(0, -1));
            updateScreen(operand2);
        } else {
            operand1 = Number(operand1.toString(10).slice(0, -1));
            updateScreen(operand1);
        }
    } else if (this.id == 'negative') {
        if (operatorWasEnteredLast) {
            operand2 *= -1;
            updateScreen(operand2);
        } else {
            operand1 *= -1;
            updateScreen(operand1);
        }
    } else if (this.id == 'clear') {
        if (operatorWasEnteredLast) {
            operand2 = 0;
            updateScreen(operand2);
        } else {
            operand1 = 0;
            updateScreen(operand1);
        }
    } else if (this.id == 'reset') {
        resetAll();
        updateScreen('0');
    }
}

// INITIALIZATION
let operand1, operand2, operator, digitToComeDecimals, operatorWasEnteredLast, equalWasPressedLast;
resetAll();

// BUTTONS ACTIVATION
const buttons = document.querySelectorAll("button");
for (let button of buttons) {
    button.addEventListener("click", buttonReaction);
}
