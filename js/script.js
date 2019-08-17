/******************************************
Hi. I am going for "Exceeds Expectations" grade, but if it doesn't exceed I will be okay with "Meets Expectations" grade.
Inputs have different error messages depending on the error and they have "real time" validation messages.
Thank you.
******************************************/

$("#name").focus();     //focus on name field
$("form #other-title").css('display', 'none');   //hide 'other' input field

//when there is some change in the title field we show or hide 'other' input field depending on the selected option
$("#title").change(function() {  
    if ($('#title').val() == "other") {   
     $("form #other-title").css('display', 'block');
    } else {
      $("form #other-title").css('display', 'none');
    }
  }
)

$('#color').prepend($('<option id="select-warning">Please select a color</option>'));  //add option 'select color' to colors
$('#select-warning').hide();
$('#colors-js-puns').hide();  //hide the "Color" label and select menu 

//function that hides all the color options and shows a message 'select a theme'
function hideColorsAndShowMessage () {
$("#color").each (function(element) { 
    $(this).hide();
  });
  $('#colors-js-puns').
    append('<select id="remove-me-later"><option value="no_design_message">Please select a T-shirt theme</option><select>');
} 
  
//when something is chosen from the "Design" menu, "Color" appears normally again
function showColors() {
  hideColorsAndShowMessage();
  $("#design").change(function() { 
  $('#colors-js-puns').show();     //show the "Color" label and select menu   
  $('#remove-me-later').remove();    //remove the message 'select a theme'

      if ($('#design').val() !== "Select Theme") {   //if chosen design value is a real design an not 'select theme' message
      $("#color").each (function(element) {    
        $(this).slideDown();                              //options are shown          
      });
    } else {
        hideColorsAndShowMessage();
        $('#select-warning').hide();
        $('#colors-js-puns').hide();  //hide the "Color" label and select menu 
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


  let $selectedDayAndTime = $clicked.attr("data-day-and-time");    //here we store date and time of checked element   ???????????????????????????????????????????
  let isChecked = $(event.target).is(':checked');   //isChecked is a bool stores true if target is checked

  if(isChecked) {
     totalCost += cost;
  } else {
    totalCost -= cost;
  }
  $('h2').text (`Total: $ ${totalCost}`); //add text with total cost to h2 created above
  
  const inputs = document.querySelectorAll('.activities input');  //array of all activities input that exist in the list
  //ocument.querySelectorAll(".activities input").checked = false;
  
  //loop through all activity checkboxes array
  for(let i = 0; i < inputs.length; i++) {
    
       let currentDayAndTime = inputs[i].getAttribute("data-day-and-time");  //current day and time attribute

       if (currentDayAndTime === $selectedDayAndTime) { //if currently chosen dayAndTime matches any in the array
          //
       if (isChecked) {
          //      If the clicked activity was checked, then set the matching activity element's `disabled`
  //property to `true`
          inputs[i].disabled = true;   //hide looped checkbox in activity
          //console.log(selectedDayAndTime);
        $clicked.prop('disabled',false);      //show clicked item
      } else if (!isChecked){
//      If the clicked activity was unchecked, then set the matching activity element's `disabled`
//property to `false`.
          inputs[i].disabled = false;
      }
      
     }
   }
  })

$('p').hide();  //initially hide payment info for paypal and bitcoin

let creditCardIsChosen = false;     //will check if credit card is chosen
//when there is a change in 'design' field...
$("#payment").change(function() { 
  $( '#payment [value="select method"]' ).hide();   //hide the 'select payment method' option
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

//span element where we will store error message when some information is not valid
let errorMessage= document.createElement("span");  
errorMessage.style.cpadding = '20px';
errorMessage.style.color = 'white';
errorMessage.style.marginBottom = '15px';
errorMessage.style.backgroundColor = '#c42555';

//add message to this span element, hide and show when needed needed 
function addErrorSpan (node, message, isValid) {     
  errorMessage.innerHTML = message;  
  const parent = node.parentElement;
  const sibling = node.nextSibling;
  parent.insertBefore(errorMessage, sibling); 
  //parent.insertBefore(emptyMessage, sibling);
  errorMessage.style.display = 'none';
  if (!isValid) {   //if not valid
    errorMessage.style.display = 'block';
    node.style["boxShadow"] = "0 0 3px #CC0000"; //change css style to red
  } else if (isValid) {    //if valid
    errorMessage.style.display = 'none'; 
    node.style["boxShadow"] = "";
  } 
}

//checking if a name field is not empty
let validateName = false; 
function isValidName () {
  const nameInputField = document.getElementById('name');
  const errorMessage = 'Please type any name.';
  const messageForEmpty = "A name field can't be empty.";    //message for empty input field
  nameInputField.addEventListener("input", () => {
    let userInput = nameInputField.value;
    let isValid = /^(?!\s*$).+/.test(userInput);           //not an empty string
    validateName = isValid;
    const emptyString = /^ *$/;          //empty 
    let isEmpty = emptyString.test(userInput); 
    if (isEmpty) {        //check if the input is empty
      addErrorSpan (nameInputField, messageForEmpty, isValid);    //show the message for empty input
    } else if(!isEmpty) {
      addErrorSpan (nameInputField, errorMessage, isValid); 
    }

  });
}

//checking if an email is valid
let validateMail = false;
function isValidEmail () {
  const emailInputField = document.getElementById('mail');
  const errorMessage = 'Please type a valid email.';
  emailInputField.addEventListener("input", () => {
     let userInput = emailInputField.value;
     let isValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(userInput);
     const messageForEmpty = "Email field can't be empty.";     //message for empty input field
     validateMail = isValid;
     const emptyString = /^ *$/;              //empty 
     let isEmpty = emptyString.test(userInput);  //check if the input is empty
     if (isEmpty) {
      addErrorSpan (emailInputField, messageForEmpty, isValid);      //show the message for empty input
     } else if(!isEmpty) {
      addErrorSpan (emailInputField, errorMessage, isValid);
     }
 
  })
}

//checking if some activities are chosen
let validateActivity = false;
function isValidActivity () {

  $('.activities').change(function (event) {
  const checkboxes=document.querySelectorAll('.activities input');
  let isValid;
  let checkbox;
  for(let i=0; i < checkboxes.length; i++)
  {
      checkbox = checkboxes[i];
      if(checkbox.checked)
      {
          isValid = true;
      }
  }

  errorMessage.textContent = 'Please choose some activities.';  
  const parent = document.querySelector('.activities');
  const sibling = document.querySelectorAll('legent')[1];
  parent.insertBefore( errorMessage, sibling); 
  errorMessage.style.display = 'none';
         if (!isValid) {
        errorMessage.style.display = 'block';
        
        $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = "0 0 3px #CC0000"; //change css style to red
          });
        validateActivity = isValid;

      } else {
        errorMessage.style.display = 'none';
        
        $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = "";
          });
          validateActivity = isValid;
      }  
  
})
}

let validateCreditCardNum = false;
function isValidCreditCardNumber () {
  const creditCardInputField = document.getElementById('cc-num');
  const errorMessage = `Please check your credit card number, <br> it should contain between 13 and 16 digits.`;
  const messageForEmpty = "A number field field can't be empty.";     //message for empty input field
  creditCardInputField.addEventListener("input", () => {
    let userInput = creditCardInputField.value;
    let isValid = /^(\d){13,16}$/.test(userInput);
    validateCreditCardNum = isValid;
    const emptyString = /^ *$/;         //empty 
     let isEmpty = emptyString.test(userInput);
    if (isEmpty) {                           //check if the input is empty
      addErrorSpan (creditCardInputField, messageForEmpty , isValid);   //show the message for empty input
     } else if(!isEmpty) {
      addErrorSpan (creditCardInputField, errorMessage, isValid); 
     }
  })
 
}

//checking if zip is valid
let validateZip = false;
function isValidZip () {
  const zipInputField = document.getElementById('zip');
  const errorMessage = 'Please check your zip, it should contain 5 digits.';
  const messageForEmpty = "A zip field can't be empty.";         //message for empty input field
  zipInputField.addEventListener("input", () => {
    let userInput = zipInputField.value;
    let isValid = /^(\d){5}$/.test(userInput);
    addErrorSpan (zipInputField, errorMessage, isValid);
    validateZip = isValid;
     const emptyString = /^ *$/;       //empty 
    let isEmpty = emptyString.test(userInput);
   if (isEmpty) {         //check if the input is empty
     addErrorSpan (zipInputField, messageForEmpty , isValid);   //show the message for empty input
    } else if(!isEmpty) {
     addErrorSpan (zipInputField, errorMessage, isValid); 
    }

  }) 
}

//cheching if a design is chosen
let validateCVV = false;
function isValidCVV () {
  const cvvInputField = document.getElementById('cvv');
  const errorMessage = 'Please check your CVV, it should be 3 digits long.';
  const messageForEmpty = "A CVV field can't be empty.";    //message for empty input field
  cvvInputField.addEventListener("input", () => {
    let userInput = cvvInputField.value;
    let isValid = /^(\d){3}$/.test(userInput);
    addErrorSpan (cvvInputField, errorMessage, isValid);
    validateCVV = isValid;
    const emptyString = /^ *$/;   //empty 
    let isEmpty = emptyString.test(userInput);
    if (isEmpty) {                 //check if the input is empty
     addErrorSpan (cvvInputField, messageForEmpty , isValid);  //show the message for empty input
    } else if(!isEmpty) {
     addErrorSpan (cvvInputField, errorMessage, isValid); 
    }

  }) 
}

let validateTshirt = false;
function isValidTshirt () {
  const input = document.querySelector('#design');
  let isValid = true;
  const message = 'Please pick a T-shirt design.';

  $('#design').on('change', function() { 
      if ($('#design').val() === "Select Theme") {   
        isValid = false;
        validateTshirt = isValid;
        addErrorSpan (input, message, isValid);
      } else {
        isValid = true;
        validateTshirt = isValid;
        addErrorSpan (input, message, isValid);
      }
    }
  )
}

isValidName (); isValidEmail (); isValidActivity (); isValidTshirt (); isValidCreditCardNumber (); isValidZip (); isValidCVV ();

let cardInfo = false;
function isCreditCardNeeded (){
  if (creditCardIsChosen === true) {    //if credit card is chosen
    if ( validateCreditCardNum === true && validateZip === true && validateCVV === true) {  //check number, zip and cvv
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
    if (validateName === true && validateMail === true && validateActivity === true && cardInfo === true) {
      result = true;
    } else {
      result = false;
    }
  }

//event listener for button click
document.querySelector('button').addEventListener('click', (event) => { 
  submit();
  console.log(result);
})
