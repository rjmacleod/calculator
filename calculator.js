// Selecting elements
const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit')
const clearnButton = document.querySelector('#clear');

// Global variables
let displayValue = "";

// Button Events
digitButtons.forEach(button => {
    const digit = Number(button.getAttribute('id'));
    button.onclick = () => populateDisplayWithDigit(digit);
})
clearnButton.onclick = () => {
    displayValue = "";
    display.textContent = displayValue;
}

// Display Functions
function populateDisplayWithDigit(digit) {
    displayValue += digit;
    display.textContent = displayValue;
}

// Calculator Logic Functions
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
    if(b != 0) {
        return a / b;
    } else {
        console.error("Divide by zero error!");
    }
}

function operate(operator, a, b) {
    switch(operator) {
        case(add):
            return add(a, b);
            break;
        case(subtract):
            return subtract(a, b);
            break;
        case(multiply):
            return multiply(a, b);
            break;
        case(divide):
            return divide(a, b);
            break;
    }
}