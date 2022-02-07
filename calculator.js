
let calculatorStateItems = {
        entryFieldState: "Type in your 5th number",
        entryFieldNumber: 0,
        calculatorHistory: [{
            calculation: "1 - 2",
            result: -1
        }]
    };

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
    //clearLocalStorage();

}

function initalizeInputForm() {
    console.log('initalizeInputForm button-equal calculateAnswer @ ' + getTimeString());

    document.getElementById('button-equal').addEventListener('click', (e) => {
      e.preventDefault();
      calculateAnswer();
    });
  
    document.getElementById('field-entry-result').addEventListener('click', (e) => {
      e.preventDefault();
      resultFieldClicked();

    });

    let fieldEntryResult = document.getElementById("field-entry-result");

    // Web Dev Simplified stated that innerHTML is easily hacked, so use textContent
    fieldEntryResult.textContent = calculatorStateItems.entryFieldState;

}

function calculateAnswer() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "Equal Button clicked to calculateAnswer";
}

function resultFieldClicked() {
    let fieldEntryResult = document.getElementById("field-entry-result");

    fieldEntryResult.textContent = "result Field clicked";
}

function clearLocalStorage() {
    localStorage.clear();
}

function getCalculatorStateFromLocalStorage() {

    calculatorStateLocalStorage = JSON.parse(localStorage.getItem('calculatorStateLocalStorage')) || 
        {   entryFieldState: "Type in your 1st number - getCalculatorState",
            entryFieldNumber: 0,
            calculatorHistory: [{
                calculation: "1 + 1",
                result: 2
            }]
        };

    if (calculatorStateLocalStorage !== null) { 
        calculatorStateItems = calculatorStateLocalStorage;
    }
    else {
        console.log('<<< calculatorStateLocalStorage is null  ' + getTimeString());
    }

}

function writeCalculatorStateToLocalStorage() {
    localStorage.setItem('calculatorStateLocalStorage', JSON.stringify(calculatorStateItems));
}

