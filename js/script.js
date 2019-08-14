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

// reference each checkbox input, as well as the cost, and day and time
// from each input’s parent `label` element, and store those values in variables, or in an object as
// key value pairs.

// const $activities = $('.activities input');  //put all the activities into a collection
// const checkboxCostValues = [];  //array of prices
// const checkboxInputValues = [];  //array of checkboxes' input values


// const totalCost = 0;
// for ( let i = 0; i< checkboxCostValues.length; i++) {
//   totalCost += checkboxCostValues(i);
// }

// //console.log(totalCost);

// // $activities.each(function(index,element) {
// //   const cost = document.querySelectorAll('.activities input')[index].getAttribute("data-cost");  
// //   console.log(x);
// // })




// for ( let i = 0; i < $activities.length; i ++) {   //loop through activities collection
//   checkboxInputValues.push($activities[i].value);    //add values of each activity to the checkboxInputValues array
//   const cost = document.querySelectorAll('.activities input')[i].getAttribute("data-cost");  //get attribute 'cost' content
//   //let num = parseInt(cost, 10);
//   checkboxCostValues.push(num);   //add each cost to the array of costs
// }

// console.log(checkboxCostValues);


// Create a DOM element, store it in a global variable and append it to the `.activity` section. You
// can view the elements tab in the Chrome DevTools to check that your element is in the DOM.
// Create a global variable to store total activity cost — initially set to 0 — don't use const since
// you want to update this as needed.

const totalCostElement = '<h2></h2>';
let totalCost = 0;
$('.activities').append(totalCostElement);   //append new element to the dom
let selectedDayAndTime = ' ';  //here we store date and time of checked element


// Add a change event listener to the activity section. Inside the listener, it will be helpful to have
// a variable to reference the DOM `input` element that was just clicked.

$('.activities').change(function (event) {      //event handler for change events in activities section
  let cost = $(event.target).attr("data-cost");   //get value of attribute data-cost, which is cost
  cost = cost.match(/\d+/g);         //removing $ sign, leaving just a number
  cost = parseInt(cost, 10);

  let isChecked = $(event.target).is(':checked');   //isChecked stores true if target is checked

  if(isChecked) {
     totalCost += cost;
     selectedDayAndTime = $(event.target).attr("data-day-and-time");   //set date and time to the variable above
     //console.log(selectedDayAndTime);
  } else {
    totalCost -= cost;
  }
  $('h2').text (`Total: $ ${totalCost}`); //add text with total cost to h2 created above

  
})

// First, does the activity occur at the same day and time as the activity that was just
// clicked? We can check this by seeing if the activity in the current loop iteration has a
// `data-day-and-time` attribute that is equal to the `data-day-and-time` attribute of the
// element that was just clicked.
// ● Second, is the activity is different than the activity that was just clicked? We can check
// this by seeing if the activity that was just clicked is not equal to the activity in the
// current loop iteration.

const array = document.querySelectorAll('.activities input');


// $.each( $('.activities input'), function( index, value ){
//     const currentDayAndTime = $(this).attr("data-day-and-time");
//     if (currentDayAndTime.toUpperCase() === selectedDayAndTime.toUpperCase()) {
//       console.log('match');
//     }
//     // console.log(typeof currentDayAndTime);
//     // console.log(typeof selectedDayAndTime);
//   })
//   //console.log(currentElement);

  for(let i = 1; i < array.length; i++) {
    const currentDayAndTime = array[i].getAttribute("data-day-and-time");
    currentDayAndTime.toString();
    currentDayAndTime.toLowerCase();
    console.log(currentDayAndTime);
    //console.log(typeof selectedDayAndTime);
  }