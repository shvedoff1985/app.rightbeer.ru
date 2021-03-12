let User = false;
    First_exit = false;
    Page = 'login';

if (localStorage.account == "login") {
    User=true;
    Page='profile';
    profile();
}

//Главный прелоудер
if(!First_exit) {setTimeout(function(){$("#preload-main").css("display", "none");}, 1350);}else{}


$(document).ready ( function(){
    if (!User && Page == 'login') {

        //Название страницы
        $(".name-layout .name").html('Авторизация');

        //Загрузка контента
        $("#layout").html(
        '<div class="logo">\
            <img src="files/images/logo-light.png" width="200">\
        </div>\
        <div class="box-login">\
            <div class="input-group">\
                <label>Введите номер телефона</label>\
                <input id="phone-mask" type="" name="" placeholder="+7 (___) ___-__-__">\
            </div>\
            <div class="input-group">\
                <input id="submit-mask" type="submit" class="shadow-box" name="" value="Войти" disabled="disabled">\
            </div>\
            <div class="back-call">\
                <a  href="tel:+79998886655">Обратная связь</a>\
            </div>\
        </div>'
        );

        //Подгрузка оверлея
        $("#overlay").html(
        '<div class="PIN">\
			<div class="input-group">\
				<label>Введите код подтверждения (последние 4 цифры входящего звонка)</label>\
				<input id="pin-mask" type="" name="" placeholder="_-_-_-_">\
			</div>\
		</div>\
		<div class="close"><i class="far fa-times-circle"></i></div>'
        );

        //Код страницы Login
        let pin;

        $('.box-login').on('input', function () {
            if($("#phone-mask").val().length == 18) {
                $('#submit-mask').removeAttr('disabled');
            }else{
                $('#submit-mask').attr('disabled', 'disabled');
            }
        });


        $(function() {
          $('#submit-mask').click(function() {
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
          });
          $('#overlay .close').click(function() {
              $("#overlay").css("display", 'none');
          });
        });

        $('.PIN').on('input', function () {
            if($("#pin-mask").val().length == 7) {
                pincode = $("#pin-mask").val();
                pincode = pincode.split('-').join('');
                pin = pin.code;
                pin = pin.substr(2, 6);
                console.log(pin.code+'-'+pin);
                if (pincode == pin) {
                    localStorage.account = 'login';
                    $("#overlay").css("display", 'none');
                    $("#overlay").html('');
                    profile();
                }else{
                    alert('Неверный код');
                }
            }
        });

        //Подгрузка маски
        var phoneMask = IMask(document.getElementById('phone-mask'), {mask: '+7 (000) 000-00-00'});
		var regExpMask = IMask(document.getElementById('pin-mask'), {mask: '0-0-0-0'});
    }
});

function login() {
    Page = 'login';

    if (!User && Page == 'login') {

        //Название страницы
        $(".name-layout .name").html('Авторизация');

        //Загрузка контента
        $("#layout").html(
        '<div class="logo">\
            <img src="files/images/logo-light.png" width="200">\
        </div>\
        <div class="box-login">\
            <div class="input-group">\
                <label>Введите номер телефона</label>\
                <input id="phone-mask" type="" name="" placeholder="+7 (___) ___-__-__">\
            </div>\
            <div class="input-group">\
                <input id="submit-mask" type="submit" class="shadow-box" name="" value="Войти" disabled="disabled">\
            </div>\
            <div class="back-call">\
                <a  href="tel:+79998886655">Обратная связь</a>\
            </div>\
        </div>'
        );

        //Подгрузка оверлея
        $("#overlay").html(
        '<div class="PIN">\
			<div class="input-group">\
				<label>Введите код подтверждения (последние 4 цифры входящего звонка)</label>\
				<input id="pin-mask" type="" name="" placeholder="_-_-_-_">\
			</div>\
		</div>\
		<div class="close"><i class="far fa-times-circle"></i></div>'
        );

        //Код страницы Login
        let pin;

        $('.box-login').on('input', function () {
            if($("#phone-mask").val().length == 18) {
                $('#submit-mask').removeAttr('disabled');
            }else{
                $('#submit-mask').attr('disabled', 'disabled');
            }
        });


        $(function() {
          $('#submit-mask').click(function() {
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
          });
          $('#overlay .close').click(function() {
              $("#overlay").css("display", 'none');
          });
        });

        $('.PIN').on('input', function () {
            if($("#pin-mask").val().length == 7) {
                pincode = $("#pin-mask").val();
                pincode = pincode.split('-').join('');
                pin = pin.code;
                pin = pin.substr(2, 6);
                console.log(pin.code+'-'+pin);
                if (pincode == pin) {
                    profile();
                }else{
                    alert('Неверный код');
                }
            }
        });

        //Подгрузка маски
        var phoneMask = IMask(document.getElementById('phone-mask'), {mask: '+7 (000) 000-00-00'});
		var regExpMask = IMask(document.getElementById('pin-mask'), {mask: '0-0-0-0'});
    }
}


function profile() {
    Page = 'profile';

    //Название страницы
    $(".name-layout .name").html('Профиль');
    $(".name-layout .name").html('Профиль');

    //Загрузка контента
    $("#layout").html(
    '<div class="logo">\
        <img src="files/images/logo-light.png" width="200">\
    </div>'
    );

    $(".button").removeClass('active');
    $("#tabbar .login").html(
    '<div onclick="profile()" class="button active">\
        <div class="icon"><i class="fas fa-barcode"></i></div>\
        <div class="name">Профиль</div>\
    <div>'
    );


    $("#tabbar .login").addClass('profile');
    $("#tabbar .login .button").addClass('active');
    $(".button .profile").removeClass('login');


}
