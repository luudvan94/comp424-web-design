function lockScrolling() {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
}

function unlockScrolling() {
    $('html, body').css({
        overflow: 'scroll',
        height: 'auto'
    });
}

$(document).ready(function () {
    var b = $("#menu-expand");
    var l = $("#menu");
    
    l.height('7vh');
  
    b.click(function() {
    
      if(l.hasClass('open')) {
        l.removeClass('open');
        l.height('7vh');
      } else {
        l.addClass('open');
        l.height('auto');
      }
    
    });
});