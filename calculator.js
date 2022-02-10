let calculatorHistoryItem = {
        calculation: "",
        result: null
    }

const initialStateItems = {
        entryInputLeftOperand: null, // 0 is fine except if the initial operation is a multiply
                                        // 2/08/22 decided to make it null
        entryInputRightOperand: null,
        entryCurrentOperator: "",  // will be single string '+', '-', '*', '/', '%'
        entryFieldIsMultiDigitNumber: false,
        operationNumberSum: 0,
        operationIsContinousFunction: false,
        operationRunningHistory: "",
        calculatorHistory: [calculatorHistoryItem],
        addCommaBeforePeriod: null
    };

let calculatorStateItems = initialStateItems;

initialStateItems.addCommaBeforePeriod = function(floatNumber) {
    var str = floatNumber.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

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

    // clearLocalStorage();

    getCalculatorStateFromLocalStorage();

    initalizeInputForm();

    let fieldEntryResult = document.getElementById("field-entry-result");

    // Web Dev Simplified stated that innerHTML is easily hacked, so use textContent
    fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.operationNumberSum );

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
      calculateRunningSum();
      calculateFinalSum();
    });

    document.getElementById('button-divide').addEventListener('click', (e) => {
        e.preventDefault();
        operatorButtonClickedForTwoOperands('/');
      });

    document.getElementById('button-minus').addEventListener('click', (e) => {
        e.preventDefault();
        operatorButtonClickedForTwoOperands('-');
    });

    document.getElementById('button-multiply').addEventListener('click', (e) => {
        e.preventDefault();
        operatorButtonClickedForTwoOperands('*');
    });

    document.getElementById('button-percent').addEventListener('click', (e) => {
        e.preventDefault();
        operatorButtonClickedForOneOperand('%');
    });

    document.getElementById('button-plus').addEventListener('click', (e) => {
        e.preventDefault();
        operatorButtonClickedForTwoOperands('+');
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

function calculateRunningSum() {
    let fieldEntryResult = document.getElementById("field-entry-result");
    let currentOperation = '';
    let currentSum = 0;

    let currentLeftOperand = calculatorStateItems.entryInputLeftOperand;
    let currentRightOperand = calculatorStateItems.entryInputRightOperand;

    currentLeftOperand  =  (currentLeftOperand.search(".") !== -1) ? +(currentLeftOperand) : parseInt(currentLeftOperand);
    currentRightOperand = (currentRightOperand.search(".") !== -1) ? +(currentRightOperand) : parseInt(currentRightOperand);

    console.log(`\n  --- calculateRunningSum for ${calculatorStateItems.entryCurrentOperator}`);
    switch (calculatorStateItems.entryCurrentOperator) {
        case '+':
            currentSum = currentLeftOperand + currentRightOperand;
            currentOperation = (calculatorStateItems.operationRunningHistory === "")  ? 
            initialStateItems.addCommaBeforePeriod(currentLeftOperand) + ' + ' + 
            initialStateItems.addCommaBeforePeriod(currentRightOperand) : ' + ' +
            initialStateItems.addCommaBeforePeriod(currentRightOperand);

            break;
    
        case '-':
            currentSum = currentLeftOperand - currentRightOperand;
            currentOperation = (calculatorStateItems.operationRunningHistory === "") ? 
            initialStateItems.addCommaBeforePeriod(currentLeftOperand) + ' - ' + 
            initialStateItems.addCommaBeforePeriod(currentRightOperand) : ' - ' +
            initialStateItems.addCommaBeforePeriod(currentRightOperand);
            
            break;
    
        case '*':
            currentSum = currentLeftOperand * currentRightOperand;
            currentOperation = (calculatorStateItems.operationRunningHistory === "") ? 
            initialStateItems.addCommaBeforePeriod(currentLeftOperand) + ' * ' + 
            initialStateItems.addCommaBeforePeriod(currentRightOperand) : ' * ' +
            initialStateItems.addCommaBeforePeriod(currentRightOperand);
            
            break;
    
        case '/':
            currentSum = currentLeftOperand / currentRightOperand;
            currentOperation = (calculatorStateItems.operationRunningHistory === "") ? 
                    initialStateItems.addCommaBeforePeriod(currentLeftOperand) + ' / ' + 
                    initialStateItems.addCommaBeforePeriod(currentRightOperand) : ' / ' +
                    initialStateItems.addCommaBeforePeriod(currentRightOperand);
            
            break;
    
        case '%':
            currentSum = currentRightOperand / 100;
            currentOperation = currentRightOperand + ' %';
            
            break;
    
        default:
            fieldEntryResult.textContent = "Unknown math Operator";        
            break;
    }

    calculatorStateItems.operationNumberSum = currentSum;
    fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.operationNumberSum );

    /*  L 11 + R 22
        currentOperation = currentLeftOperand + ' * ' + currentRightOperand;
        currentOperation = 11 + 22
        calculatorStateItems.operationNumberSum = 33
        calculatorStateItems.operationRunningHistory = 11 + 22
        client pressed - then a 47

        next time here
        currentOperation = 33 + 47
        calculatorStateItems.operationNumberSum = 80

        Then calculatorStateItems.operationRunningHistory will be 11 + 22 33 + 47

     */
    console.log(`--- B4 calculatorStateItems.operationRunningHistory ${calculatorStateItems.operationRunningHistory}`);
    calculatorStateItems.operationRunningHistory += currentOperation;
    console.log(`--- A3 calculatorStateItems.operationRunningHistory ${calculatorStateItems.operationRunningHistory}`);

}  // function calculateRunningSum


function calculateFinalSum() {
    let fieldCalculatorHistory = document.getElementById("field-calculator-history");

    if (calculatorStateItems.calculatorHistory.length === 1 && calculatorStateItems.calculatorHistory[0].result === null) {
        calculatorStateItems.calculatorHistory.pop();
    }
    calculatorHistoryItem.result = initialStateItems.addCommaBeforePeriod( calculatorStateItems.operationNumberSum );
    calculatorHistoryItem.calculation = calculatorStateItems.operationRunningHistory;

    calculatorStateItems.calculatorHistory.push(calculatorHistoryItem);

    fieldCalculatorHistory.textContent = 'Calculator History\r\n\r\n';
    calculatorStateItems.calculatorHistory.forEach(element => {
        fieldCalculatorHistory.textContent += element.calculation + ' = ' + element.result + `\r\n`;
    });

    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryCurrentOperator = "";
    calculatorStateItems.entryFieldIsMultiDigitNumber = false;
    calculatorStateItems.operationIsContinousFunction = false;
    calculatorStateItems.operationRunningHistory = "";

    // don't clear property calculatorStateItems.operationNumberSum or .calculatorHistory

    writeCalculatorStateToLocalStorage();

} // function calculateFinalSum


function numberButtonClickedAction(buttonNumber) {
    getCalculatorStateFromLocalStorage();
    let fieldEntryResult = document.getElementById("field-entry-result");
    
    console.log(`\n ${buttonNumber}  pressed ${getTimeString()}`);

    if (calculatorStateItems.entryFieldIsMultiDigitNumber === true) {

        if (calculatorStateItems.entryInputRightOperand != null) {
            console.log("RightOperand.toString() typeof < " + typeof calculatorStateItems.entryInputRightOperand);
            console.log("buttonNumber.toString() typeof < " + typeof buttonNumber.toString());
            //console.log("parseInt RightOperand + parseInt buttonNumber typeof < " + typeof (parseInt(calculatorStateItems.entryInputRightOperand) + parseInt(buttonNumber)));
            console.log("RightOperand.toString + buttonNumber.toString() = <" + (calculatorStateItems.entryInputRightOperand + buttonNumber.toString()) + ">");
            
            calculatorStateItems.entryInputRightOperand = calculatorStateItems.entryInputRightOperand + buttonNumber.toString();
            fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod(calculatorStateItems.entryInputRightOperand);
        }
        else {
            console.log(`calculatorStateItems.entryInputRightOperand == null     Is this Truthy?`);
        }
    }
    else {
        console.log(`calculatorStateItems.entryFieldIsMultiDigitNumber  !==  true`);
        calculatorStateItems.entryFieldIsMultiDigitNumber = true;
        fieldEntryResult.textContent = buttonNumber.toString();
        calculatorStateItems.entryInputRightOperand = buttonNumber.toString();
    }

    writeCalculatorStateToLocalStorage();
}  // function numberButtonClickedAction


function operatorButtonClickedForTwoOperands(currentOperator) {
    let fieldEntryResult = document.getElementById("field-entry-result");

    console.log(`\n operationButtonClickedForTwoOperands for ${currentOperator} operation ${getTimeString()}`);

    if (calculatorStateItems.entryInputRightOperand != null) {

        console.log(`- calculatorStateItems.entryInputRightOperand <${calculatorStateItems.entryInputRightOperand}> ${getTimeString()}`);

        /*  L 11 + R 22
            Actor pressed Operator button + - * /
        */
        if (calculatorStateItems.entryInputLeftOperand != null) {
            console.log(`-- TRUE calculatorStateItems.operationIsContinousFunction <${calculatorStateItems.operationIsContinousFunction}> ${getTimeString()}`);

            calculatorStateItems.operationIsContinousFunction = true;

            // This sums the 1st two Operands / numbers that the Actor typed in with the "previous" Operation.
            calculateRunningSum();
            
            // for a multiple number operation this sets the Operator for the next Operand.  
            // i.e. the Operator button the Actor just pressed is currently acting like an Equal sign on the previous 2 Operands
            calculatorStateItems.entryInputLeftOperand = calculatorStateItems.operationNumberSum.toString();
            calculatorStateItems.entryCurrentOperator = currentOperator;

            fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.operationNumberSum ) + '  ' + currentOperator;

        }
        else {
            console.log(`-- False calculatorStateItems.operationIsContinousFunction <${calculatorStateItems.operationIsContinousFunction}> ${getTimeString()}`);
            
            calculatorStateItems.entryInputLeftOperand = calculatorStateItems.entryInputRightOperand;
            calculatorStateItems.entryCurrentOperator = currentOperator;
            fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.entryInputLeftOperand ) + '  ' + currentOperator;

        }
    }
    else {
        console.log(`- calculatorStateItems.entryInputRightOperand == null`);
    }

    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryFieldIsMultiDigitNumber = false;

    writeCalculatorStateToLocalStorage();

}  // function operatorButtonClickedForTwoOperands


function operatorButtonClickedForOneOperand(currentOperation) {
    let fieldEntryResult = document.getElementById("field-entry-result");

    console.log(`\n operationButtonClickedForOneOperand for ${currentOperation} operation ${getTimeString()}`);

    console.log(`calculatorStateItems.entryInputRightOperand <${calculatorStateItems.entryInputRightOperand}> ${getTimeString()}`);

    // This is stating that if Actor had pressed a [Number A] Operation [Number B] % 
    //   then the 1st [Number A] Operation is canceled
    //    and [Number B] is acted upon as a Percent in 
    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryCurrentOperator = currentOperation;

    fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.entryInputRightOperand ) + '  ' + currentOperation;

    calculateRunningSum();
    calculateFinalSum();

    writeCalculatorStateToLocalStorage();

}  // function operatorButtonClickedForOneOperand


function clearButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    calculatorStateItems = initialStateItems;

    fieldEntryResult.textContent = 0;

    calculatorStateItems.entryInputLeftOperand = null;
    calculatorStateItems.entryInputRightOperand = null;
    calculatorStateItems.entryCurrentOperator = "";
    calculatorStateItems.operationNumberSum = null;
    calculatorStateItems.entryFieldIsMultiDigitNumber = false;

    writeCalculatorStateToLocalStorage();
    // clearLocalStorage();
}


function periodButtonClicked() {
    getCalculatorStateFromLocalStorage();
    let fieldEntryResult = document.getElementById("field-entry-result");
    
    console.log(`\n    periodButtonClicked()  pressed ${getTimeString()}`);

    console.log("RightOperand.toString + buttonNumber.toString() = <" + calculatorStateItems.entryInputRightOperand + "." + ">");
    
    calculatorStateItems.entryInputRightOperand = (calculatorStateItems.entryInputRightOperand != null) ? calculatorStateItems.entryInputRightOperand + "." : "0.";
    fieldEntryResult.textContent = initialStateItems.addCommaBeforePeriod( calculatorStateItems.entryInputRightOperand );

    writeCalculatorStateToLocalStorage();
}


function plusMinusButtonClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Plus / Minus Button clicked to reverse number negativity";
}

function resultFieldClicked() {
     // YAGNI
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

