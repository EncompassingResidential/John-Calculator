console.log("hello world ");

let fieldEntryResult = document.getElementById("field-entry-result");

// Web Dev Simplified stated that innerHTML is easily hacked, so use textContent
fieldEntryResult.textContent = "Entry numbers and Values go here";
