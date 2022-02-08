
const initialStateItems = {
        entryInputLeftOperand: 0, // 0 is fine except if the initial operation is a multiply
        entryInputRightOperand: 0,
        entryOperationNumberSum: 0,
        entryFieldStartedOperation: false,
        calculatorHistory: [{
            calculation: "1 - 2",
            result: -1
        }]
    };

let calculatorStateItems = initialStateItems;

initializeCalculator();

function getDateString() {
    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

    const today = new Date();
    const dayOfWeek = today.getDay();

    let date = (today.getMonth().toString().padStart(1, '0') + 1) +
                '-' + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
                '-' + today.getFullYear();

    return daylist[dayOfWeek] + " " + date;
}

function getTimeString() {
    let today = new Date();

    return today.getHours() + ":"  + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes() + ":" + (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
}

function initializeCalculator() {
    console.log(`initializeCalculator() at ${getTimeString()}`);

    getCalculatorStateFromLocalStorage();

    initalizeInputForm();

    writeCalculatorStateToLocalStorage();

}

function initalizeInputForm() {
    console.log('initalizeInputForm button-equal calculateAnswer @ ' + getTimeString());
  
    document.getElementById('field-entry-result').addEventListener('click', (e) => {
        e.preventDefault();
        resultFieldClicked();
    });
  
    document.getElementById('button-clear-reset').addEventListener('click', (e) => {
        e.preventDefault();
        clearButtonClicked();
    });
    
    document.getElementById('button-equal').addEventListener('click', (e) => {
      e.preventDefault();
      calculateAnswer();
    });

    document.getElementById('button-divide').addEventListener('click', (e) => {
        e.preventDefault();
        divideButtonClicked();
      });

    document.getElementById('button-minus').addEventListener('click', (e) => {
        e.preventDefault();
        subtractButtonClicked();
    });

    document.getElementById('button-multiply').addEventListener('click', (e) => {
        e.preventDefault();
        multiplyButtonClicked();
    });

    document.getElementById('button-percent').addEventListener('click', (e) => {
        e.preventDefault();
        percentButtonClicked();
    });

    document.getElementById('button-plus').addEventListener('click', (e) => {
        e.preventDefault();
        addButtonClicked();
    });

    document.getElementById('button-plus-minus').addEventListener('click', (e) => {
        e.preventDefault();
        plusMinusButtonClicked();
    });
    
    document.getElementById('button-1').addEventListener('click', (e) => {
        e.preventDefault();
        oneButtonClicked();
    });

    document.getElementById('button-2').addEventListener('click', (e) => {
        e.preventDefault();
        twoButtonClicked();
    });

    document.getElementById('button-3').addEventListener('click', (e) => {
        e.preventDefault();
        threeButtonClicked();
    });

    document.getElementById('button-4').addEventListener('click', (e) => {
        e.preventDefault();
        fourButtonClicked();
    });

    document.getElementById('button-5').addEventListener('click', (e) => {
        e.preventDefault();
        fiveButtonClicked();
    });

    document.getElementById('button-6').addEventListener('click', (e) => {
        e.preventDefault();
        sixButtonClicked();
    });

    document.getElementById('button-7').addEventListener('click', (e) => {
        e.preventDefault();
        sevenButtonClicked();
    });

    document.getElementById('button-8').addEventListener('click', (e) => {
        e.preventDefault();
        eightButtonClicked();
    });

    document.getElementById('button-9').addEventListener('click', (e) => {
        e.preventDefault();
        nineButtonClicked();
    });

    document.getElementById('button-0').addEventListener('click', (e) => {
        e.preventDefault();
        zeroButtonClicked();
    });

    document.getElementById('button-period').addEventListener('click', (e) => {
        e.preventDefault();
        periodButtonClicked();
    });

    let fieldEntryResult = document.getElementById("field-entry-result");

    // Web Dev Simplified stated that innerHTML is easily hacked, so use textContent
    fieldEntryResult.textContent = calculatorStateItems.entryInputLeftOperand;

}

function calculateAnswer() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Equal Button clicked to calculateAnswer";
}


function numberButtonClickedAction(buttonNumber) {
    getCalculatorStateFromLocalStorage();
    let fieldEntryResult = document.getElementById("field-entry-result");
    console.log(` ${buttonNumber}  pressed ${getTimeString()}`);

    calculatorStateItems.entryFieldStartedOperation = true;

    fieldEntryResult.textContent = buttonNumber;
    calculatorStateItems.entryInputRightOperand = buttonNumber;

    writeCalculatorStateToLocalStorage();
}

function oneButtonClicked() {
    numberButtonClickedAction(1);
}

function twoButtonClicked() {
    numberButtonClickedAction(2);
}

function threeButtonClicked() {
    numberButtonClickedAction(3);
}

function fourButtonClicked() {
    numberButtonClickedAction(4);
}

function fiveButtonClicked() {
    numberButtonClickedAction(5);
}

function sixButtonClicked() {
    numberButtonClickedAction(6);
}

function sevenButtonClicked() {
    numberButtonClickedAction(7);
}

function eightButtonClicked() {
    numberButtonClickedAction(8);
}

function nineButtonClicked() {
    numberButtonClickedAction(9);
}

function zeroButtonClicked() {
    numberButtonClickedAction(0);
}


function addButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Add Button clicked to add previous sum by next number";
}


function clearButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    calculatorStateItems = initialStateItems;

    fieldEntryResult.textContent = calculatorStateItems.entryOperationNumberSum;
    calculatorStateItems.entryFieldStartedOperation = false;

    console.log(` AC button pressed ${getTimeString()}`);

    clearLocalStorage();
}

function divideButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Divide Button clicked to divide previous sum by next number";
}

function multiplyButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Multiply Button clicked to multiply previous sum by next number";
}


function percentButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Percent % Button clicked to divide number by 100";
}


function periodButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Period Button clicked number point number";
}


function plusMinusButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Plus / Minus Button clicked to reverse number negativity";
}

function subtractButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Subtract Button clicked to subtract previous sum by next number";
}

function resultFieldClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "result Field clicked";
}

function clearLocalStorage() {
    localStorage.clear();
}

function getCalculatorStateFromLocalStorage() {

    calculatorStateLocalStorage = JSON.parse(localStorage.getItem('calculatorStateLocalStorage')) || initialStateItems;

    (calculatorStateLocalStorage !== null) ? calculatorStateItems = calculatorStateLocalStorage : 
        console.log('<<< calculatorStateLocalStorage is null  ' + getTimeString());

}

function writeCalculatorStateToLocalStorage() {
    localStorage.setItem('calculatorStateLocalStorage', JSON.stringify(calculatorStateItems));
}

