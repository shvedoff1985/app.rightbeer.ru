let tabbar;

window.onload = function() {
   tabbar = $(document).height();
   $("#tabbar").css("top",tabbar-72);
   windowheight = document.documentElement.clientHeight;
   windowwidth = $(document).width();
   $("#overlay").css("height", windowheight);
   $("#error_code").css("height", windowheight);
   $(".PIN").css("margin-top", (windowheight-$(".PIN").height())/2 - 55-72 );
   $(".block").css("margin-top", (windowheight-$(".PIN").height())/2 - 55-72 );
};

setInterval(function(){
    if (Page == 'login') {
        $("#layout").css("height",$(document).height()-55);
    }else{
        $("#layout").css("height",'unset');
    }

    if(tabbar < $(document).height()) {
        //$("#tabbar").css("top",$(document).height()-72);
    }
}, 100);
