//focus on name field
$("#name").focus();
//hide 'other' input field
$("form #other-title").css('display', 'none');

$('#color').prepend($('<option id="select-warning">Please select a color</option>'));
$('#select-warning').hide();

//$('div#colors-js-puns').append('<span>Some text</span>');

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
          $clicked.prop('disabled',false);    //hide clicked item
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

//regex.test(string);
const $name = $('#name').val();

var errorMessage= document.createElement("span");
errorMessage.textContent = "Please type any name.";
const parent = document.querySelector('fieldset');
const sibling = document.querySelector('[for="mail"]');
parent.insertBefore(errorMessage, sibling); 
errorMessage.style.display = 'none';

function isValidName () {
  const nameInputField = document.getElementById('name');
  nameInputField.addEventListener("input", () => {
    let text = nameInputField.value;
    const isValid = /^(.|\s)*\S(.|\s)*$/.test(text);


      if (!isValid) {
        errorMessage.style.display = 'block';
      } else {
        errorMessage.style.display = 'none';
      }
    
});
}

function isValidEmail () {
  const emailInputField = document.getElementById('mail');
  emailInputField.addEventListener("input", () => {
    let text = emailInputField.value;
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(text);
  })
}

function isValidActivity () {

  $('.activities').change(function (event) {
  const checkboxes=document.querySelectorAll('.activities input');
  let checked;
  for(let i=0; i < checkboxes.length; i++)
  {
      if(checkboxes[i].checked)
      {
          checked = true;
      }
  }
   if(checked) { console.log ('thank you');}
   else {console.log('please chek smth');}
})
}

function isValidCreditCardNumber () {
  const creditCardInputField = document.getElementById('cc-num');
  creditCardInputField.addEventListener("input", () => {
    let text = creditCardInputField.value;
    return /^(\d){13,16}$/.test(text);
  })
}

function isValidZip () {
  const zipInputField = document.getElementById('zip');
  zipInputField.addEventListener("input", () => {
    let text = zipInputField.value;
    return /^(\d){5}$/.test(text);
  }) 
}

function isValidCVV () {
  const cvvInputField = document.getElementById('cvv');
  cvvInputField.addEventListener("input", () => {
    let text = cvvInputField.value;
    return /^(\d){3}$/.test(text);
  }) 
}

isValidName();




