let tabbar;

window.onload = function() {
   tabbar = $(document).height();
   $("#tabbar").css("top",tabbar-72);
   windowheight = document.documentElement.clientHeight;
   windowwidth = $(document).width();
   $("#overlay").css("height", windowheight-55);
   $(".PIN").css("margin-top", (windowheight-$(".PIN").height())/2 - 55-72 );
};

setInterval(function(){
    $("#layout").css("height",$(document).height()-55);
    if(tabbar < $(document).height()) {
        $("#tabbar").css("top",$(document).height()-72);
    }
}, 100);
