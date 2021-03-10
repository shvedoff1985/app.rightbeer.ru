let pin;

$('.box-login').on('input', function () {
    if($("#phone-mask").val().length == 18) {
        $('#submit-mask').removeAttr('disabled');
    }else{
        $('#submit-mask').attr('disabled', 'disabled');
    }
});

function login() {
	$("#overlay").css("display", 'block');
	$("#overlay").css("height", windowheight-55);
   	$(".PIN").css("margin-top", (windowheight-$(".PIN").height())/2 - 55-72 );

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://smsc.ru/sys/send.php?login=shvedoff1985&psw=b12132ff02dd8e140df8fa5c59c23df1&phones='+$("#phone-mask").val()+'&mes=code&call=1&fmt=3', false);
    xhr.send();
    if (xhr.status != 200) {
    } else {
        pin = JSON.parse(xhr.responseText);
    }
}

$('.PIN').on('input', function () {
    if($("#pin-mask").val().length == 11) {
        pincode = $("#pin-mask").val();
        pincode = pincode.split('-').join('');
        if (pincode == pin.code) {
            window.location.replace('profile.html');
        }else{
            alert('Неверный код');
        }
    }
});


function CloseOverlay() {
	$("#overlay").css("display", 'none');
}
