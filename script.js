// Refrence display element
const display = document.getElementById('display');

// Track if we have performed a calculation
let justCalculated = false;

function isOperator(character) {
    return ['+',  '-', '*', '/'].includes (character);  
}

function getlastchar() {
    return display.value.slice(-1);
    
}

function appendToDisplay(value) {
    console.log('button Pressed:', value);

    let currentValue = display.value;

    if (justcalculated && !isNaN(value)) {
        display.value = value;
        justcalculated = false;
        return;
    }
    if (justCalculated && isOperator(value)) {
        display.value = currentValue + value;
        justCalculated = false;
        return;
    }

    // Handles operators
    if (isOperator(value)) {
        // Dont allow operator as first char (exception for minus)
        if (currentValue === '0' && value !== '-') {
            return; //Do nothing
        }

        // if the last character is already an operator, replace if
        if (isOperator(getlastchar())) {
            display.value = currentValue.slice(0, -1) + value;
        }else {
            display.value = currentValue + value;
        }

    } else if (!isNaN(value)) {

        if (currentValue === '0'){
            display.value = value;
        } else {
            display.value = currentValue + value;
        }

    } else if (value === '.') {
        if (currentValue === '0') {
            display.value = currentValue + value; 

        } else {
            // Get the last number in the display (after last operator)
            let parts = currentValue.Split('/[+\-*/');
            let lastNumber = parts[parts.length -1];

            // Only add decimal if number doesn't already have one
            if (!lastNumber.includes('.')) {
                display.value = currentValue + value;
                
            }
        }

} else {
    display.value = currentValue + value;
}

    // Reset the justCalculated flag when user starts typing
    justCalculated = false;


    console.log('Display updated to:', display.value);
}

function clearDisplay() {
    console.log('Clear button Pressed.');

    display.value ='0';
    justCalculated = false;

    display.style.background =rgb(241, 237, 237);
    setTimeout(() => {
        display.style.backgroundColor = '';
    }, 150);


}

function deleteLast() {
    console.log('Backspace button Pressed.');

    let currentValue = display.value;

    // If theres only one character or its 0, reset to 0
    if (currentValue.length <= 1 || currentValue === '0') {
        display.value = '0';
    } else {
        display.value = currentValue.slice (0, -1);
    }

}

function calculate() {
    console.log('Equals button pressed.');

    alert ('Equals button was clicked');
}

document.addEventListener('keydown' , function(event) {
    console.log('key pressed', event.key);

    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.'){
        appendToDisplay('.');
    } else if (event.key === '+'){
        appendToDisplay('+');
    } else if (event.key === '-'){
        appendToDisplay('-');
    } else if (event.key === '*'){
        appendToDisplay('*');
    } else if (event.key === '/'){
        event.preventDefault();
        appendToDisplay('/');  
    }  

    else if (event.key === 'Enter' || event,key === '='){
        calculate();
    } else if (event.key === 'escape' || event.key === 'c' || event.key === 'C'){
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
    
})

document.addEventListener('DOMContentLoaded' , function(){
    console.log('Calculator loaded successfully');
    console.log('Display element', display);

    if (display) {
        console.log('Current display value:', display.value);
    } else {
        console.log('Display element not found');
    }
})