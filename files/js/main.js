let User = false;
    First_exit = false;
    Page = 'login';

if (localStorage.account == "login") {
    User=true;
    Page='profile';
    profile();
}else{
    User=false;
    Page='login';
    login();
}

//Главный прелоудер
if(!First_exit) {setTimeout(function(){$("#preload-main").css("display", "none");}, 1350);}else{}


$(document).ready ( function(){
    if (!User && Page == 'login') {
        //Атрибут Page для layout
        $('#layout').removeAttr('page');
        $('#layout').attr('page', 'login');

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
        //Атрибут Page для layout
        $('#layout').removeAttr('page');
        $('#layout').attr('page', 'login');

        $("metajs").html('');

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

    //Нижний юлок
    $(".button").removeClass('active');
    $("#tabbar .login.profile").html(
    '<div onclick="login()" class="button active">\
        <div class="icon"><i class="far fa-user-circle"></i></div>\
        <div class="name">Войти</div>\
    <div>'
    );
}


function profile() {
    Page = 'profile';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'profile');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Профиль');

    //Загрузка контента
    $("#layout").html(
    '<div class="logo">\
        <img src="files/images/logo-light.png" width="200">\
    </div>'
    );
    console.log(localStorage.account);
    //Нижний юлок
    $(".button").removeClass('active');
    if (localStorage.account == "login") {
        $("#tabbar .login.profile").html(
        '<div onclick="profile()" class="button">\
            <div class="icon"><i class="fas fa-barcode"></i></div>\
            <div class="name">Профиль</div>\
        <div>'
        );
        $(".name-layout .exit").html('<i class="fas fa-sign-out-alt"></i>');
    }else{
        $("#tabbar .login.profile").html(
        '<div onclick="login()" class="button">\
            <div class="icon"><i class="far fa-user-circle"></i></div>\
            <div class="name">Войти</div>\
        </div>'
        );
    }
    $("#tabbar .login .button").addClass('active');
}

function news() {
    Page = 'news';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'news');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Новости');
    //Загрузка контента
    $("#layout").html(
    '<div class="card">\
        Card\
    </div>'
    );


    //Нижний юлок
    $(".button").removeClass('active');
    if (localStorage.account == "login") {
        $("#tabbar .login.profile").html(
        '<div onclick="profile()" class="button">\
            <div class="icon"><i class="fas fa-barcode"></i></div>\
            <div class="name">Профиль</div>\
        <div>'
        );
        $(".name-layout .exit").html('<i class="fas fa-sign-out-alt"></i>');
    }else{
        $("#tabbar .login.profile").html(
        '<div onclick="login()" class="button">\
            <div class="icon"><i class="far fa-user-circle"></i></div>\
            <div class="name">Войти</div>\
        </div>'
        );
    }
    $("#tabbar .news .button").addClass('active');
}



function stocks() {
    Page = 'stocks';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'stocks');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Акции');
    //Загрузка контента
    $("#layout").html(
    '<div class="logo">\
        <img src="files/images/logo-light.png" width="200">\
    </div>'
    );


    //Нижний юлок
    $(".button").removeClass('active');
    if (localStorage.account == "login") {
        $("#tabbar .login.profile").html(
        '<div onclick="profile()" class="button">\
            <div class="icon"><i class="fas fa-barcode"></i></div>\
            <div class="name">Профиль</div>\
        <div>'
        );

        $(".name-layout .exit").html('<i class="fas fa-sign-out-alt"></i>');
    }else{
        $("#tabbar .login.profile").html(
        '<div onclick="login()" class="button">\
            <div class="icon"><i class="far fa-user-circle"></i></div>\
            <div class="name">Войти</div>\
        </div>'
        );
    }
    $("#tabbar .stocks .button").addClass('active');
}


function map() {
    Page = 'map';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'map');

    //Название страницы
    $(".name-layout .name").html('Карты');
    //Загрузка контента
    $("#layout").html(
    '<div id="map" style="width: 100%; height: 100%"></div>'
    );
    $("metajs").html(
    '<script src="https://api-maps.yandex.ru/2.1/?apikey=4589713e-a8e5-4019-bd5a-e4de5fb76b1d&lang=ru_RU" type="text/javascript"></script>'
    );



    //Функции map.js
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

        options = {
            maximumAge: 30000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        var onSuccess = function(position) {
            ymaps.ready(init);

            function init() {
                var geolocation = ymaps.geolocation,

                    myMap = new ymaps.Map('map', {
                        center: [position.coords.latitude, position.coords.longitude],
                        zoom: 17
                    }, {
                        searchControlProvider: 'yandex#search'
                    });

                    placemark1 = new ymaps.Placemark([51.648817, 39.195831], {
                        hintContent: "Воронеж, 20 летия октября, 66"
                    }, {
                        preset: "islands#greenShoppingIcon"
                    });

                    placemark2 = new ymaps.Placemark([51.693753, 39.144978], {
                        hintContent: "Воронеж, 45 СтрДивизии, 226"
                    }, {
                        preset: "islands#greenShoppingIcon"
                    });

                    placemark3 = new ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
                        hintContent: "Воронеж, 45 СтрДивизии, 226"
                    }, {
                        preset: "islands#geolocationIcon"
                    });

                myMap.geoObjects.add(placemark1).add(placemark2).add(placemark3)
            }
        };



        function onError(error) {
            alert('????');
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    }


    //Нижний юлок
    $(".button").removeClass('active');
    if (localStorage.account == "login") {
        $("#tabbar .login.profile").html(
        '<div onclick="profile()" class="button">\
            <div class="icon"><i class="fas fa-barcode"></i></div>\
            <div class="name">Профиль</div>\
        <div>'
        );
        $(".name-layout .exit").html('<i class="fas fa-sign-out-alt"></i>');
    }else{
        $("#tabbar .login.profile").html(
        '<div onclick="login()" class="button">\
            <div class="icon"><i class="far fa-user-circle"></i></div>\
            <div class="name">Войти</div>\
        </div>'
        );
    }
    $("#tabbar .map .button").addClass('active');
}





















$('.exit').click(function() {
    $('.exit').html('');
    delete localStorage.account;
    User=false;
    Page='login';
    $("#tabbar .login.profile").html(
    '<div onclick="login()" class="button">\
        <div class="icon"><i class="far fa-user-circle"></i></div>\
        <div class="name">Войти</div>\
    </div>'
    );
    $("#tabbar .news .button").addClass('active');
    login();
});
