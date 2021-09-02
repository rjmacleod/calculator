// == GLOBAL VARIABLES ==

// Selecting elements
const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit')
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalsButton = document.querySelector('#equals');
const decimalButton = document.querySelector('#decimal');

// Display
let displayValue = "0";

// Calculator Memory
let n1 = "";
let n2 = "";
let prev2 = "";
let needInput = false; // for after an operator has been pressed, but
                       // before a n2 has been input
let operator = "";
let needsClear = false;
let hasDecimal = false;
let lastInputEquals = false;

// Button Events
digitButtons.forEach(button => {
    const digit = Number(button.getAttribute('id'));  
    button.onclick = () => {
        if(!needsClear) {
            if(needInput) {
                displayValue = "";
                hasDecimal = false;
            }
            populateDisplayWithDigit(digit);
            needInput = false;
        }
    }
})

operatorButtons.forEach(button => {
    const operation = button.getAttribute('id');
    button.onclick = () => {
        if(!needsClear) {
            if(n1 == "") {
                n1 = displayValue;
                operator = operation;
                needInput = true;
            }
            else if(needInput) { // we have n1 but waiting for n2 to be input
                operator = operation;
            }
            else { //  we have n1 and displayValue has 2nd number
                n2 = displayValue; // n2 is what is displayed
                displayValue = operate(operator, n1, n2); // display result
                trimResultLength();
                display.textContent = displayValue;
                n1 = displayValue; // set n1 equal to result
                n2 = "";
                operator = operation; // button just pressed is new operator
                needInput = true;
                hasDecimal = false;
            }
        }
    }
})

clearButton.onclick = () => {
    displayValue = "0";
    n1 = "";
    n2 = "";
    prev2 = "";
    operator = "";
    lastOperator = "";
    display.textContent = displayValue;
    needsClear = false;
    hasDecimal = false;
}

equalsButton.onclick = () => {
    if(!needsClear && n1 != "" && !needInput && operator != "") {
        n2 = displayValue; // n2 is what is displayed
        resolveEqualsButton();
    }
    else if(lastInputEquals) {
        operator = lastOperator
        n2 = prev2;
        resolveEqualsButton();
    }
}

decimalButton.onclick = () => {
    if(!needsClear && !hasDecimal) {
        displayValue += ".";
        display.textContent = displayValue;
        hasDecimal = true;
    }
}

// Display Functions
// =================
function populateDisplayWithDigit(digit) {
    if(displayValue == "0") {
        displayValue = "";
    }
    displayValue += digit;
    display.textContent = displayValue;
}

// Takes a number and makes it less than 9 char in length
// or displays NaN if too large
function trimResultLength() {
    if(Number.isInteger(displayValue)) {
        if(String(displayValue).length > 9) {
            console.error("Integer too large to display");
            displayValue = "NaN";
            needsClear = true;
            return;
        }
    }
    else if (String(displayValue).length > 9) {
        displayValue = roundDecimalValue(displayValue);
    }
}

// Takes a number with a decimal value and trims so the whole
// number is less than 9 char in length
function roundDecimalValue(n) {
    let integerDigits = 0;
    let x = Math.floor(n);
    while(x > 0) {
        console.log("x = " + x);
        x = Math.floor(x/10);
        integerDigits++;
    }
    if(n < 1) {
        integerDigits = 1;
    }
    let decimalDigits = 8 - integerDigits;
    let roundingFactor = Math.pow(10, decimalDigits);
    let output = Math.round(n * roundingFactor) / roundingFactor;
    return output;
}

// Calculator Logic Functions
// ==========================
function resolveEqualsButton() {
    displayValue = operate(operator, n1, n2); // display result
    trimResultLength();
    display.textContent = displayValue;
    n1 = displayValue; // set n1 equal to result
    prev2 = n2; // save n2 in case 
    n2 = "";
    lastOperator = operator;
    operator = "";
    needInput = true;
    hasDecimal = false;
    lastInputEquals = true;
}

function add(a, b) {
    console.log("a= " + a + ", b= " + b);
    output = Number(a) + Number(b);
    console.log(output);
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if(Number(b) != 0) {
        return Number(a) / Number(b);
    } else {
        needsClear = true;
        console.error("Divide by zero error!");
        return "NaN";
    }
}

function operate(operator, a, b) {
    // console.log("operator: " + operator + ", n1: " + n1 + ", n2: " + n2);
    switch(operator) {
        case("plus"):
            return add(a, b);
            break;
        case("minus"):
            return subtract(a, b);
            break;
        case("times"):
            return multiply(a, b);
            break;
        case("dividedBy"):
            return divide(a, b);
            break;
    }
}