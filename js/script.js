//focus on name field
$("#name").focus();
//hide 'other' input field
$("form #other-title").css('display', 'none');

$('#color').prepend($('<option id="select-warning">Please select a color</option>'));
$('#select-warning').hide();
<<<<<<< HEAD

//$('div#colors-js-puns').append('<span>Some text</span>');
=======
>>>>>>> a67e47a7bc96a9adb355e159e4bb2f062e3b9dad

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
<<<<<<< HEAD
  
  $('#color option').remove();   //hide all the color options
=======
  $('#select-warning').show();
      
  $('#color [value=tomato]').hide();
  $('#color [value=steelblue]').hide();
  $('#color [value=dimgrey]').hide();
>>>>>>> a67e47a7bc96a9adb355e159e4bb2f062e3b9dad

  $('#color').append('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>');  //append needed color options to the dom
  $('#color').append('<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> ');
  $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option> ');

}

function showILoveJSColors () {
<<<<<<< HEAD

  $('#color option').remove();   //hide all the color options
=======
  $('#select-warning').show();
    
  $('#color [value=cornflowerblue]').hide();
  $('#color [value=darkslategrey]').hide();
  $('#color [value=gold]').hide();
>>>>>>> a67e47a7bc96a9adb355e159e4bb2f062e3b9dad

  $('#color').append('<option value="tomato">Tomato (I &#9829; JS shirt only)</option>');
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