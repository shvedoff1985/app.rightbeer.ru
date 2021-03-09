let tabbar;

window.onload = function() {
   tabbar = $(document).height();
   $("#tabbar").css("top",tabbar-72);

};

setInterval(function(){
	$("#layout").css("height",$(document).height()-55);
	if(tabbar < $(document).height()) {
		$("#tabbar").css("top",$(document).height()-72);
	}
}, 100);