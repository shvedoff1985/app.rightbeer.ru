$('.box-login').on('input', function () {
    if($("#phone-mask").val().length == 18) {
        $('#submit-mask').removeAttr('disabled');
    }else{
        $('#submit-mask').attr('disabled', 'disabled');
    }
});


$('.PIN').on('input', function () {
	console.log($("#pin-mask").val().length);
    if($("#pin-mask").val().length == 7) {
        alert('Успешно');
    }
});

function login() {
	$("#overlay").css("display", 'block');
	$("#overlay").css("height", windowheight-55);
   	$(".PIN").css("margin-top", (windowheight-$(".PIN").height())/2 - 55-72 );
}

function CloseOverlay() {
	$("#overlay").css("display", 'none');
}