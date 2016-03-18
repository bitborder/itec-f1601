jQuery("document").ready(function($){
    
    var nav = $('.navbar');
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 136) {
            nav.addClass("collapse");
        } else {
            nav.removeClass("collapse");
        }
    });
 
});