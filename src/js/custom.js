$(document).ready(function(){
// DRY wrapper function
function appendStyleSheet() {
  $('head').append('<link rel="stylesheet" href="css/invert.css" type="text/css" id="invert-stylesheet"/>'); 
}
// append the style sheet on load if the cookie is set to true

$("a#switch").click(function () {
    if (Cookies.get('invert') != 'true') {

        appendStyleSheet();      
        Cookies.set('invert', 'true', {path: '/'}); // set the cookie to true
    }       
    else {
        // remove the high-contrast style
        Cookies.set('invert', 'false', {path: '/'});
        $("#invert-stylesheet").remove();

    }
});
if (Cookies.get('invert') == 'true') {
  appendStyleSheet();      
}
else {
  $("#invert-stylesheet").remove();
}
});