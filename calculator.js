let calculatorHistoryItem = {
        calculation: "",
        result: null
    }

const initialStateItems = {
        entryInputLeftOperand: null, // 0 is fine except if the initial operation is a multiply
                                        // 2/08/22 decided to make it null
        entryInputRightOperand: null,
        entryCurrentOperation: "",  // will be single string '+', '-', '*', '/', '%'
        entryOperationNumberSum: 0,
        entryFieldStartedOperation: false,
        calculatorHistory: [calculatorHistoryItem]
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

    console.log("initializeCalculator() " + getTimeString());

    clearLocalStorage();

    getCalculatorStateFromLocalStorage();

    initalizeInputForm();

    let fieldEntryResult = document.getElementById("field-entry-result");

    // Web Dev Simplified stated that innerHTML is easily hacked, so use textContent
    fieldEntryResult.textContent = calculatorStateItems.entryOperationNumberSum;

    let fieldCalculatorHistory = document.getElementById("field-calculator-history");

    if (calculatorStateItems.calculatorHistory.length >= 1 && calculatorStateItems.calculatorHistory[0].result !== null){
        fieldCalculatorHistory.textContent += '\r\n\r\n';

        calculatorStateItems.calculatorHistory.forEach(element => {
            fieldCalculatorHistory.textContent += element.calculation + ' = ' + element.result + `\r\n`;
        });
    }
    writeCalculatorStateToLocalStorage();

}

function initalizeInputForm() {
  
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
        operationButtonClickedForTwoOperands('/');
      });

    document.getElementById('button-minus').addEventListener('click', (e) => {
        e.preventDefault();
        operationButtonClickedForTwoOperands('-');
    });

    document.getElementById('button-multiply').addEventListener('click', (e) => {
        e.preventDefault();
        operationButtonClickedForTwoOperands('*');
    });

    document.getElementById('button-percent').addEventListener('click', (e) => {
        e.preventDefault();
        operationButtonClickedForOneOperand('%');
    });

    document.getElementById('button-plus').addEventListener('click', (e) => {
        e.preventDefault();
        operationButtonClickedForTwoOperands('+');
    });

    document.getElementById('button-plus-minus').addEventListener('click', (e) => {
        e.preventDefault();
        plusMinusButtonClicked();
    });
    
    document.getElementById('button-1').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(1);
    });

    document.getElementById('button-2').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(2);
    });

    document.getElementById('button-3').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(3);
    });

    document.getElementById('button-4').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(4);
    });

    document.getElementById('button-5').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(5);
    });

    document.getElementById('button-6').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(6);
    });

    document.getElementById('button-7').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(7);
    });

    document.getElementById('button-8').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(8);
    });

    document.getElementById('button-9').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(9);
    });

    document.getElementById('button-0').addEventListener('click', (e) => {
        e.preventDefault();
        numberButtonClickedAction(0);
    });

    document.getElementById('button-period').addEventListener('click', (e) => {
        e.preventDefault();
        periodButtonClicked();
    });

}  // function initalizeInputForm


function calculateAnswer() {
    let fieldEntryResult = document.getElementById("field-entry-result");
    let fieldCalculatorHistory = document.getElementById("field-calculator-history");
    let currentOperation = '';
    let currentSum = 0;

    let currentLeftOperand = calculatorStateItems.entryInputLeftOperand;
    let currentRightOperand = calculatorStateItems.entryInputRightOperand;

    currentLeftOperand  =  (currentLeftOperand.search(".") !== -1) ? +(currentLeftOperand) : parseInt(currentLeftOperand);
    currentRightOperand = (currentRightOperand.search(".") !== -1) ? +(currentRightOperand) : parseInt(currentRightOperand);

    switch (calculatorStateItems.entryCurrentOperation) {
        case '+':
            currentSum = currentLeftOperand + currentRightOperand;
            currentOperation = currentLeftOperand + ' + ' + currentRightOperand;

            break;
    
        case '-':
            currentSum = currentLeftOperand - currentRightOperand;
            currentOperation = currentLeftOperand + ' - ' + currentRightOperand;
            
            break;
    
        case '*':
            currentSum = currentLeftOperand * currentRightOperand;
            currentOperation = currentLeftOperand + ' * ' + currentRightOperand;
            
            break;
    
        case '/':
            currentSum = currentLeftOperand / currentRightOperand;
            currentOperation = currentLeftOperand + ' / ' + currentRightOperand;
            
            break;
    
        case '%':
            currentSum = currentRightOperand / 100;
            currentOperation = currentRightOperand + ' %';
            
            break;
    
        default:
            break;
    }

    fieldEntryResult.textContent = currentSum;

    calculatorStateItems.entryOperationNumberSum = currentSum;
    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryCurrentOperation = null;
    calculatorStateItems.entryFieldStartedOperation = false;

    if (calculatorStateItems.calculatorHistory.length === 1 && calculatorStateItems.calculatorHistory[0].result === null) {
        calculatorStateItems.calculatorHistory.pop();
    }
    calculatorHistoryItem.result = currentSum;
    calculatorHistoryItem.calculation = currentOperation;
    calculatorStateItems.calculatorHistory.push(calculatorHistoryItem);

    fieldCalculatorHistory.textContent = 'Calculator History\r\n\r\n';
    calculatorStateItems.calculatorHistory.forEach(element => {
        fieldCalculatorHistory.textContent += element.calculation + ' = ' + element.result + `\r\n`;
    });

    writeCalculatorStateToLocalStorage();

} // function calculateAnswer


function numberButtonClickedAction(buttonNumber) {
    getCalculatorStateFromLocalStorage();
    let fieldEntryResult = document.getElementById("field-entry-result");
    console.log(`\n ${buttonNumber}  pressed ${getTimeString()}`);

    if (calculatorStateItems.entryFieldStartedOperation === true) {

        if (calculatorStateItems.entryInputRightOperand != null) {
            console.log("RightOperand.toString() typeof < " + typeof calculatorStateItems.entryInputRightOperand.toString());
            console.log("buttonNumber.toString() typeof < " + typeof buttonNumber.toString());
            //console.log("parseInt RightOperand + parseInt buttonNumber typeof < " + typeof (parseInt(calculatorStateItems.entryInputRightOperand) + parseInt(buttonNumber)));
            console.log("RightOperand.toString + buttonNumber.toString() = <" + (calculatorStateItems.entryInputRightOperand.toString() + buttonNumber.toString()) + ">");
            fieldEntryResult.textContent = calculatorStateItems.entryInputRightOperand.toString() + buttonNumber.toString();
            calculatorStateItems.entryInputRightOperand = calculatorStateItems.entryInputRightOperand.toString() + buttonNumber.toString();
        }
        else {
            console.log(`calculatorStateItems.entryInputRightOperand == null     Is this Truthy?`);
        }
    }
    else {
        console.log(`calculatorStateItems.entryFieldStartedOperation  !==  true`);
        calculatorStateItems.entryFieldStartedOperation = true;
        fieldEntryResult.textContent = buttonNumber.toString();
        calculatorStateItems.entryInputRightOperand = buttonNumber.toString();
    }

    writeCalculatorStateToLocalStorage();
}


function operationButtonClickedForTwoOperands(currentOperation) {
    let fieldEntryResult = document.getElementById("field-entry-result");

    console.log(`operationButtonClickedForTwoOperands for ${currentOperation} operation ${getTimeString()}`);

    if (calculatorStateItems.entryInputRightOperand != null) {
        console.log(`calculatorStateItems.entryInputRightOperand <${calculatorStateItems.entryInputRightOperand}> ${getTimeString()}`);

        calculatorStateItems.entryInputLeftOperand = calculatorStateItems.entryInputRightOperand;
        calculatorStateItems.entryCurrentOperation = currentOperation;
        fieldEntryResult.textContent = calculatorStateItems.entryInputLeftOperand + '  ' + currentOperation;
    }
    else {
        console.log(`calculatorStateItems.entryInputRightOperand == null`);
    }

    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryFieldStartedOperation = false;

    writeCalculatorStateToLocalStorage();
}

function operationButtonClickedForOneOperand(currentOperation) {
    let fieldEntryResult = document.getElementById("field-entry-result");

    console.log(`operationButtonClickedForOneOperand for ${currentOperation} operation ${getTimeString()}`);

    console.log(`calculatorStateItems.entryInputRightOperand <${calculatorStateItems.entryInputRightOperand}> ${getTimeString()}`);

    // This is stating that if Actor had pressed a [Number A] Operation [Number B] % 
    //   then the 1st [Number A] Operation is canceled
    //    and [Number B] is acted upon as a Percent in 
    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryCurrentOperation = currentOperation;

    fieldEntryResult.textContent = calculatorStateItems.entryInputRightOperand + '  ' + currentOperation;

    calculateAnswer();

    writeCalculatorStateToLocalStorage();
}


function clearButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    calculatorStateItems = initialStateItems;

    fieldEntryResult.textContent = 0;

    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryCurrentOperation = null;
    calculatorStateItems.entryOperationNumberSum = null;
    calculatorStateItems.entryFieldStartedOperation = false;

    writeCalculatorStateToLocalStorage();
    // clearLocalStorage();
}


function periodButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Period Button clicked number point number";
}


function plusMinusButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Plus / Minus Button clicked to reverse number negativity";
}

function resultFieldClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "result Field clicked";
}

function clearLocalStorage() {
    localStorage.clear();
    calculatorStateItems = initialStateItems;
    console.log(`clearLocalStorage ${getTimeString()}`);
}

function getCalculatorStateFromLocalStorage() {

    calculatorStateLocalStorage = JSON.parse(localStorage.getItem('calculatorStateLocalStorage')) || initialStateItems;
    // console.log(`calculatorStateLocalStorage <${calculatorStateLocalStorage}>`);
    (calculatorStateLocalStorage !== null) ? calculatorStateItems = calculatorStateLocalStorage : 
        console.log('<<< calculatorStateLocalStorage is null  ' + getTimeString());

}

function writeCalculatorStateToLocalStorage() {
    localStorage.setItem('calculatorStateLocalStorage', JSON.stringify(calculatorStateItems));
}

