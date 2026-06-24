const buttons = document.querySelector(".buttons");
const calculateBtn = document.querySelector(".equal");
let display = document.querySelector(".display");
let expression = "";
let currentVal = 0;
let answerDisplayed = false;
const operators = ["+", "-", "*", "/", "%"];
const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
function isOperator(val) {
    return operators.includes(val);
}
function delKey() {
    let newexpression = expression.slice(0, -1);
    expression = newexpression;
    display.value = expression;
    return;
}
function check(e, value) {


    let lastvalue = "";

    if (expression) {
        lastvalue = expression[expression.length - 1];
    }

    if (expression === "" && isOperator(value)) {
        return;
    }

    if (isOperator(lastvalue) && isOperator(value)) {
        return;

    }
    if (value === '.' && lastvalue === '.') {
        return;
    }


    if (value === "AC") {
        expression = "";
        display.value = expression;
        return;

    }

    else if (value === "DEL") {
        if (expression) {
           
            delKey()
        }
    }

    else if (!(e.target.classList.contains("equal"))) {
        expression += value;
        display.value = expression;
    }
    else if (value === "=") {
        calculate();
        return;

    }

    if (answerDisplayed && !isOperator(value)) {
        expression = value;
        display.value = expression;
        answerDisplayed = false;
        return;
    }
}
buttons.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const value = e.target.textContent;
    check(e, value);
});
function calculate() {

    let operator;
    for (let op of operators) {
        if (expression.includes(op)) {
            operator = op;
            break
        }
    }
    console.log(operator);
    let parts = expression.split(operator);
    let num1 = Number(parts[0]);
    let num2 = Number(parts[1]);
    if (num2 === 0 && operator === "/") {
        display.value = "Error";
        expression = "";
        return;
    }

    switch (operator) {
        case "+":
            currentVal = num1 + num2;
            break;
        case "-":
            currentVal = num1 - num2;
            break;

        case "*":
            currentVal = num1 * num2;
            break;
        case "/":
            currentVal = num1 / num2;
            break;

        case "%":
            currentVal = num1 % num2;
            break;

    }

    display.value = currentVal;
    expression = currentVal.toString();
    answerDisplayed = true;


}
window.addEventListener("keyup", function (elem) {
    let key = elem.key;
    let ele;
    console.log(key)
    for (ele in num) {
        if (key === ele) {
            expression += key;
            display.value = expression;
            break;
        }
    }

    let operator;
    for (let op of operators) {
        if (key === op) {
            expression += key;
            display.value = expression;
            break
        }
    }
    if (key === "Enter") {
        calculate();
    }
    if(key==="Backspace"){
        delKey();
    }


})





