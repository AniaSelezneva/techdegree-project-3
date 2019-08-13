//focus on name field
$("#name").focus();
//hide 'other' input field
$("form #other-title").css('display', 'none');

$('#color').prepend($('<option id="select-warning">Please select a T-shirt theme</option>'));
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
  $('#remove-me-later').remove();    //remove the message j'select a theme'

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
  $('#select-warning').show();
      
  $('#color [value=tomato]').hide();
  $('#color [value=steelblue]').hide();
  $('#color [value=dimgrey]').hide();

  $('#color [value=cornflowerblue]').show();
  $('#color [value=darkslategrey]').show();
  $('#color [value=gold]').show();

}

function showILoveJSColors () {
  $('#select-warning').show();
    
  $('#color [value=cornflowerblue]').hide();
  $('#color [value=darkslategrey]').hide();
  $('#color [value=gold]').hide();

  $('#color [value=tomato]').show();
  $('#color [value=steelblue]').show();
  $('#color [value=dimgrey]').show();
}

$('#design').on ('change', () => {
  if ($( "#design option:selected" ).val() == 'js puns') { 
    showJSPunsColors();
  } else if ($( "#design option:selected" ).val() == 'heart js') {
    showILoveJSColors();
  }
})
