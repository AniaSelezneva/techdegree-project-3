//focus on name field
$("#name").focus();
//hide 'other' input field
$("form #other-title").css('display', 'none');

$("#title").change(function() {  //change in the title field
    if ($('#title').val() == "other") {   
     $("form #other-title").css('display', 'block');
    } else {
      $("form #other-title").css('display', 'none');
    }
  }
)

$('#color').prepend($('<option id="select-warning">Please select a color</option>'));
$('#select-warning').hide();

function hideColorsAndShowMessage () {
//hide all the options in color select
$("#color").each (function(element) {
    $(this).hide();
  });
//add option that says to choose the design
  $('#colors-js-puns').append('<select id="remove-me-later"><option value="no_design_message">Please select a T-shirt theme</option><select>');
}
  
//when something is chosen from the "Design" menu, "Color" appears normally again
function showColors() {
  hideColorsAndShowMessage();
  $("#design").change(function() {   //here is a change in 'design' field
  $('#remove-me-later').remove();    //remove the message 'select a theme'

      if ($('#design').val() !== "Select Theme") {   //if chosen design value is a real design an not 'select theme' message
      $("#color").each (function(element) {    
        $(this).show();                              //options are shown
           
      });
    } else {
        hideColorsAndShowMessage();
    }
  });
}
showColors();

  function showJSPunsColors (){
  
  $('#color option').remove();   //remove all the color options

  $('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');  //append needed color options to the dom
  $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> ');
  $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option> ');

}

function showILoveJSColors () {

  $('#color option').remove();   //remove all the color options

  $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');    //append needed color options to the dom
  $('#color').append('<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> ');
  $('#color').append('<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> ');
}

$('#design').on ('change', () => {
  if ($( "#design option:selected" ).val() == 'js puns') { 
    showJSPunsColors();
  } else if ($( "#design option:selected" ).val() == 'heart js') {
    showILoveJSColors();
  }
})


const totalCostElement = '<h2></h2>';
let totalCost = 0;
$('.activities').append(totalCostElement);   //append new element to the dom


$('.activities').change(function (event) {      //event handler for change events in activities section
  let $clicked = $(event.target);       //checkbox that triggered the event
  let cost = $clicked.attr("data-cost");              //get value of attribute data-cost, which is cost
  cost = cost.match(/\d+/g);         //removing $ sign, leaving just a number
  cost = parseInt(cost, 10);         //this ia all dealing with the cost


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

$('p').hide();     //hide addictional payment information 



$("#payment").change(function() {   //here is a change in 'design' field

  $( '#payment [value="select method"]' ).hide();   //hide the 'select payment method' option
  
  const chosenPayment = this.value;      //get value of chosen payment method, it is chosenPayment
  const $creditCard = $('#credit-card');   //get a hold of credit card div
  const $paypal = $('p').eq(0);
  const $bitcoin = $('p').eq(1);
  
  //console.log($payPal);
  if ( chosenPayment === 'paypal' ) {
    $creditCard.hide();
    $bitcoin.hide();
    $paypal.show();

  } else if ( chosenPayment === 'bitcoin') {
    $creditCard.hide();
    $paypal.hide();
    $bitcoin.show();

  }else {
    $paypal.hide();
    $bitcoin.hide();
    $creditCard.show();

  }
 
});


let errorMessage= document.createElement("span");  //create a span element where we will ad error message

function addErrorSpan (node, message, isValid) {      //create a function that adds message to this span element, hides and shows if needed 
  errorMessage.textContent = message;  
  const parent = node.parentElement;
  const sibling = node.nextSibling;
  parent.insertBefore(errorMessage, sibling); 
  errorMessage.style.display = 'none';
         if (!isValid) {
        errorMessage.style.display = 'block';

        node.style["boxShadow"] = "0 0 3px #CC0000"; //change css style to red
        node.style.margin = "10px";

      } else {
        errorMessage.style.display = 'none';
        
        node.style["boxShadow"] = "";
        node.style.margin = "";
      }    
}

function isValidName () {
  const nameInputField = document.getElementById('name');
  const errorMessage = 'Please type any name.';
  nameInputField.addEventListener("input", () => {
    const text = nameInputField.value;
    const isValid = /^(?!\s*$).+/.test(text);           //not an empty string
    addErrorSpan (nameInputField, errorMessage, isValid);
  });
}

function isValidEmail () {
  const emailInputField = document.getElementById('mail');
  const errorMessage = 'Please type a valid email.';
  emailInputField.addEventListener("input", () => {
    const text = emailInputField.value;
    const isValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(text);
     addErrorSpan (emailInputField, errorMessage, isValid);
     
  })
}

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
          value.style.margin = "10px";
          });

      } else {
        errorMessage.style.display = 'none';
        
        $('.activities input').each ( function( index, value ) {
          value.style["boxShadow"] = ""; //change css style to red
          value.style.margin = "";
          });
      }  
  
})
}

function isValidCreditCardNumber () {
  const creditCardInputField = document.getElementById('cc-num');
  const errorMessage = 'Please check your credit card number, it should contain between 13 and 16 digits.';
  let isValid;
  creditCardInputField.addEventListener("input", () => {
    let text = creditCardInputField.value;
    isValid = /^(\d){13,16}$/.test(text);
    addErrorSpan (creditCardInputField, errorMessage, isValid); 
  })
 
}

function isValidZip () {
  const zipInputField = document.getElementById('zip');
  const errorMessage = 'Please check your zip, it should contain 5 digits.';
  let isValid;
  zipInputField.addEventListener("input", () => {
    let text = zipInputField.value;
    isValid = /^(\d){5}$/.test(text);
    addErrorSpan (zipInputField, errorMessage, isValid);
  }) 
}

function isValidCVV () {
  const cvvInputField = document.getElementById('cvv');
  const errorMessage = 'Please check your CVV, it should be 3 digits long.';
  let isValid;
  cvvInputField.addEventListener("input", () => {
    let text = cvvInputField.value;
    isValid = /^(\d){3}$/.test(text);
    addErrorSpan (cvvInputField, errorMessage, isValid);
  }) 
}

isValidName();
isValidEmail();
isValidActivity();
isValidCreditCardNumber ();
isValidZip ();
isValidCVV ();