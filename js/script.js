DOMQuad
const firstOption = document.querySelector('#design option');  //get first option which should be removed later
//when something is chosen from the "Design" menu, "Color" appears normally again
function showColors() {
  hideColorsAndShowMessage();
  $("#design").change(function() { 
  $('#colors-js-puns').show();     //show the "Color" label and select menu   
  $('#remove-me-later').remove();    //remove the message 'select a theme'

      if ($('#design').val() !== "Select Theme") {   //if chosen design value is a real design an not 'select theme' message
      $("#color").each (function(element) {    
        $(this).slideDown(); 
        firstOption.remove();  //remove 'chose theme' option        
      });
    } 
  });
}

showColors();

//show colors when 'js puns' is chosen
function showJSPunsColors (){
$('#color option').remove();   //remove all the color options
$('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'); 
$('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> ');
$('#color').append('<option value="gold">Gold (JS Puns shirt only)</option> ');
}

//show colors when 'i love js' is chosen
function showILoveJSColors () {
  $('#color option').remove();   //remove all the color options
  $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');    //append needed color options to the dom
  $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> ');
  $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> ');
}

//when there is some change in design field show colors depending on the chosen option
$('#design').on ('change', () => {
  if ($( "#design option:selected" ).val() == 'js puns') { 
    showJSPunsColors();
  } else if ($( "#design option:selected" ).val() == 'heart js') {
    showILoveJSColors();
  }
})

const totalCostElement = '<h2></h2>';      //a new element to store total cost of activities  
let totalCost = 0;
$('.activities').append(totalCostElement);   //append new element 

//when there is a change in activities section, get a 'data-cost' attribute of chosen option and make it a number
$('.activities').change(function (event) {     
  let $clicked = $(event.target);       
  let cost = $clicked.attr("data-cost");              
  cost = cost.match(/\d+/g);        
  cost = parseInt(cost, 10);         
  let $selectedDayAndTime = $clicked.attr("data-day-and-time");    //date and time of checked element  
  let isChecked = $(event.target).is(':checked');   //isChecked is true if target is checked

  if(isChecked) {
     totalCost += cost;
  } else {
    totalCost -= cost;
  }
  $('h2').text (`Total: $ ${totalCost}`); //add text with total cost to h2 created above
  
  const inputs = document.querySelectorAll('.activities input');  //array of all activities that exist in the list
  for(let i = 0; i < inputs.length; i++) {
       let currentDayAndTime = inputs[i].getAttribute("data-day-and-time");  //current day and time attribute
       if (currentDayAndTime === $selectedDayAndTime) { //if currently chosen dayAndTime matches any in the array
       if (isChecked) {
          //      If the clicked activity was checked, then set the matching activity element's `disabled` property to `true`
          inputs[i].disabled = true;   //hide current checkbox in activity
        $clicked.prop('disabled',false);      //show clicked item
      } else if (!isChecked){ //If the clicked activity was unchecked, set the matching activity element's `disabled` property to `false`.
          inputs[i].disabled = false;
      }
    }
  }
})

$('p').hide();  //initially hide payment info for paypal and bitcoin

$( '#payment [value="select method"]' ).remove();   //remove the 'select payment method' option

let creditCardIsChosen = true;     //will check if credit card is chosen
//when there is a change in 'design' field...
$("#payment").change(function() { 
  const chosenPayment = this.value;      //get value of chosen payment method
  const $creditCard = $('#credit-card');  
  const $paypal = $('p').eq(0);
  const $bitcoin = $('p').eq(1);
  if ( chosenPayment === 'paypal' ) {
    $creditCard.hide();
    $bitcoin.hide();
    $paypal.show();
    creditCardIsChosen = false;
  } else if ( chosenPayment === 'bitcoin') {
    $creditCard.hide();
    $paypal.hide();
    $bitcoin.show();
    creditCardIsChosen = false;
  }else {
    $paypal.hide();
    $bitcoin.hide();
    $creditCard.show();
    creditCardIsChosen = true;
  }
});

//span element where error message about invalid info will be stored
let errorMessage= document.createElement("span");  
errorMessage.style.cpadding = '20px';
errorMessage.style.color = 'white';
errorMessage.style.marginBottom = '15px';
errorMessage.style.backgroundColor = '#c42555';

//add message to this span element, hide and show when needed 
function addErrorSpan (node, message, isValid) {     
  errorMessage.innerHTML = message;  
  const parent = node.parentElement;
  const sibling = node.nextSibling;
  parent.insertBefore(errorMessage, sibling); 
  errorMessage.style.display = 'none';
  if (!isValid) {   //if not valid
    node.style.borderColor = 'red';
    errorMessage.style.display = 'block';
    node.style["boxShadow"] = "0 0 3px #CC0000";
  } else if (isValid) {    
    node.style.borderColor = 'green';
    errorMessage.style.display = 'none'; 
    node.style["boxShadow"] = "";
  } 
}

function checkIfEmpty (nameInputField, messageForEmpty, errorMessage, isValid) {
    const emptyString = /^ *$/;          //empty 
    let userInput = nameInputField.value;
    let isEmpty = emptyString.test(userInput); 
    if (isEmpty) {        //check if the input is empty
      addErrorSpan (nameInputField, messageForEmpty, isValid);    //show the message for empty input
    } else if(!isEmpty) {
      addErrorSpan (nameInputField, errorMessage, isValid); 
    }
}
//checking if a name field is not empty and valid
let validName = false; 
function isValidName () {
  const nameInputField = document.getElementById('name');
  const errorMessage = 'Please type any name.';
  const messageForEmpty = "A name field can't be empty.";    //message for empty input field
  nameInputField.addEventListener("input", () => {
    let userInput = nameInputField.value;
    let isValid = /^(?!\s*$).+/.test(userInput);           //not an empty string
    validName = isValid;
    checkIfEmpty(nameInputField, messageForEmpty, errorMessage, isValid);
  });
}

//checking if an email is valid
let validMail = false;
function isValidEmail () {
  const emailInputField = document.getElementById('mail');
  const errorMessage = 'Please type a valid email.';
  emailInputField.addEventListener("input", () => {
     let userInput = emailInputField.value;
     let isValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(userInput);
     const messageForEmpty = "Email field can't be empty.";     //message for empty input field
     validMail = isValid;
     checkIfEmpty (emailInputField, messageForEmpty, errorMessage, isValid);
  })
}

//checking if some activities are chosen
let validActivity = false;
function isValidActivity () {
  $('.activities').change(function (event) {
  const checkboxes=document.querySelectorAll('.activities input');
  let isValid;
  let checkbox;
  for(let i=0; i < checkboxes.length; i++){
      checkbox = checkboxes[i];
      if(checkbox.checked)
      {
          isValid = true;
      }
  }
  errorMessage.textContent = 'Please choose some activities.';  
  const parent = document.querySelector('.activities');
  const sibling = document.querySelectorAll('legend')[4];
  parent.insertBefore( errorMessage, sibling); 
  errorMessage.style.display = 'none';
         if (!isValid) {
        errorMessage.style.display = 'block'; 
        $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = "0 0 3px #CC0000"; //change css style to red
          });
        validActivity = isValid;
      } else {
        errorMessage.style.display = 'none';      
        $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = "";
          });
          validActivity = isValid;
      }  
  })
}

let validCreditCardNum = false;
function isValidCreditCardNumber () {
  const creditCardInputField = document.getElementById('cc-num');
  const errorMessage = `Please check your credit card number, <br> it should contain between 13 and 16 digits.`;
  const messageForEmpty = "A number field field can't be empty.";     //message for empty input field
  creditCardInputField.addEventListener("input", () => {
    let userInput = creditCardInputField.value;
    let isValid = /^(\d){13,16}$/.test(userInput);
    validCreditCardNum = isValid;
    checkIfEmpty (creditCardInputField, messageForEmpty, errorMessage, isValid);
  })
}

//checking if zip is valid
let validZip = false;
function isValidZip () {
  const zipInputField = document.getElementById('zip');
  const errorMessage = 'Please check your zip, it should contain 5 digits.';
  const messageForEmpty = "A zip field can't be empty.";         //message for empty input field
  zipInputField.addEventListener("input", () => {
    let userInput = zipInputField.value;
    let isValid = /^(\d){5}$/.test(userInput);
    addErrorSpan (zipInputField, errorMessage, isValid);
    validZip = isValid;
    checkIfEmpty(zipInputField, messageForEmpty, errorMessage, isValid);
  }) 
}

//checking if a design is chosen
let validCVV = false;
function isValidCVV () {
  const cvvInputField = document.getElementById('cvv');
  const errorMessage = 'Please check your CVV, it should be 3 digits long.';
  const messageForEmpty = "A CVV field can't be empty.";    //message for empty input field
  cvvInputField.addEventListener("input", () => {
    let userInput = cvvInputField.value;
    let isValid = /^(\d){3}$/.test(userInput);
    addErrorSpan (cvvInputField, errorMessage, isValid);
    validCVV = isValid;
    checkIfEmpty(cvvInputField, messageForEmpty, errorMessage, isValid);
  }) 
}

let validTshirt = false;
function isValidTshirt () {
  const input = document.querySelector('#design');
  const message = 'Please pick a T-shirt design.';

  $('#design').on('change', function() { 
      if ($('#design').val() == "Select Theme") {   
        let isValid = false;
        validTshirt = isValid;
        addErrorSpan (input, message, isValid);
      } else {
        let isValid = true;
        validTshirt = isValid;
        addErrorSpan (input, message, isValid);
      }
    }
  )
}

isValidName (); isValidEmail (); isValidActivity (); isValidTshirt (); isValidCreditCardNumber (); isValidZip (); isValidCVV ();

let cardInfo = false;
function isCreditCardNeeded (){
  if (creditCardIsChosen === true) {    //if credit card is chosen
    if ( validCreditCardNum === true && validZip === true && validCVV === true) {  //check number, zip and cvv
      cardInfo = true;
    } else {
      cardInfo = false;
    } 
  } else if (creditCardIsChosen === false){
    cardInfo = true;             //it should be true since credit card is not chosen
  }
}

//function to return true if everything is valid or false if something is not
let result = false;
function submit () {
    event.preventDefault();
    isCreditCardNeeded();
    if (validName === true && validMail === true && validActivity === true && validTshirt == true && cardInfo === true) {
      result = true;
    } else {
      result = false;
      //change border color depending on what is invalid
      if (validName == false) {
        $('#name').css('borderColor', 'red');
        $('#name').attr('placeholder', 'Please enter a name...');
      }
      if (validMail == false) {
        $('#mail').css('borderColor', 'red');
        $('#mail').attr('placeholder', 'Please enter an email...');
      }
      if (validActivity == false) {
        $('.activities label').css('borderColor', 'red');

        errorMessage.textContent = 'Please choose some activities.';      //show message to choose some activity
        const parent = document.querySelector('.activities');
        const sibling = document.querySelectorAll('legend')[4];
        parent.insertBefore( errorMessage, sibling); 
        errorMessage.style.display = 'none';
        errorMessage.style.display = 'block'; 

      } 
      if (validCreditCardNum === false) {
        $('#cc-num').css('borderColor', 'red');
        $('#cc-num').attr('placeholder', 'Enter a credit card number...');
      }
      if (validZip === false) {
        $('#zip').css('borderColor', 'red');
        $('#zip').attr('placeholder', 'Enter zip...');
      } 
      if (validCVV === false) {
        $('#cvv').css('borderColor', 'red');
        $('#cvv').attr('placeholder', 'Enter cvv...');
      }
      if (validActivity == false) {
         $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = "0 0 3px #CC0000"; //change css style to red
          });
      }
      if (validTshirt == false) {
        $('#design').css('borderColor', 'red');
      }
    }
  }

//event listener for button click
document.querySelector('button').addEventListener('click', (event) => { 
    submit();
  if(result) {   //if everything is valid
    document.querySelector('form').submit();
  } else if (!result) {    
    event.preventDefault();
    console.log('not valid');
  }
})
>>>>>>> 2cd091c85a34aa6d66e991474740c7f2af021095
