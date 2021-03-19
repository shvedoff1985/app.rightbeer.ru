let User = false;
    First_exit = false;
    Phone = '';
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


        $('#preload').css('display', 'block');
        close_preload();
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

                    $("#overlay").css("display", 'none');
                    $("#overlay").html('');
                    Phone = $("#phone-mask").val();
                    authorization();
                }else{
                    alert('Неверный код');
                }
            }
        });

        //Проверка кнопок

        //Подгрузка маски
        var phoneMask = IMask(document.getElementById('phone-mask'), {mask: '+7 (000) 000-00-00'});
        var regExpMask = IMask(document.getElementById('pin-mask'), {mask: '0-0-0-0'});

    }
});

function login() {
    $('#preload').css('display', 'block');

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
                //console.log(pin.code+'-'+pin);
                if (pincode == pin) {
                    $("#overlay").css("display", 'none');
                    $("#overlay").html('');
                    Phone = $("#phone-mask").val();
                    authorization();
                }else{
                    alert('Неверный код');
                }
            }
        });
        close_preload();
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

    tabbar_onclick();
    //Проверка кнопок
}




function authorization() {
    $('#preload').css('display', 'block');
    //alert(Phone);
    Phone = Phone.split('+').join('');
    Phone = Phone.split(' ').join('');
    Phone = Phone.split('(').join('');
    Phone = Phone.split(')').join('');
    Phone = Phone.split('-').join('');


    //Чистый номер телефона - Phone


    //Отправляем запрос на получение данных

    $.ajax({
      type: 'POST',
      url: 'https://app.maksf.ru/getcard.php',
      data: {
          phone: Phone,
          Authorization: 'd3577f6c-05e4-430b-bfa9-561f4ad4b7ea',
          accept: 'application/json',
      },
      success: function(data) {
          card = JSON.parse(data)


          //Проверка, существует ли карта
          if (card.message == "Карта не найдена") {
            //Если карта не существует

            //Отправляем на регистраницю


          }else{
            //Если карта сущетсвует
            //Сохраняем данные
            localStorage.account = 'login';
            localStorage.Carduuid = card.uuid;
            localStorage.CardNumber = card.number;
            localStorage.CardBalance = card.balance;
            localStorage.FormHolder = card.form.holder;
            localStorage.FormHolder = card.form.holder;
            localStorage.FormPhone = card.form.phone;
            localStorage.FormBirthdate = card.form.birthdate;


            //Отправляем в профиль
            profile();
          }
          //Проверка есть ли карта
          close_preload();
      }
  });



}



















function RelBalance() {
    if (localStorage.account == "login") {

        $.ajax({
          type: 'POST',
          url: 'https://app.maksf.ru/getcard.php',
          data: {
              phone: localStorage.FormPhone,
              Authorization: 'd3577f6c-05e4-430b-bfa9-561f4ad4b7ea',
              accept: 'application/json',
          },
          success: function(data) {
                card = JSON.parse(data)

                if(localStorage.CardBalance !== card.balance) {
                    localStorage.CardBalance = card.balance;
                    $("#layout .reload").html('<b>'+localStorage.CardBalance+'</b>');
                    confetti.start(1200, 50, 150);
                }

            }
        });
    }

}







function profile() {
    $('#preload').css('display', 'block');

    close_preload();

    Page = 'profile';
    RelBalance();

    setInterval(function(){
        RelBalance();
    }, 20000);



    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'profile');

    $("metajs").html('');

    //Название страницы

    $(".name-layout .name").html('Профиль');

    //Загрузка контента
    $("#layout").html(
        '<div class="card">\
            <div class="title">\
                '+localStorage.FormHolder.toUpperCase()+'\
            </div>\
            <div class="code">\
                <svg id="barcode"></svg>\
            </div>\
        </div>\
        <div class="card balance">\
            <div class="balancet">\
                Баланс: \
            </div>\
            <div class="reload">\
                <b>'+localStorage.CardBalance+'</b>\
            </div>\
        </div>\
        <div class="card check">\
            <div class="title">\
                Последние операции\
            </div>\
            <div class="check_card">\
            </div>\
        </div>\
        ');



        $.ajax({
          type: 'POST',
          url: 'https://app.maksf.ru/getcheck.php',
          data: {
              Uuid: 'ba895b40-bd66-4e2f-bcdb-ae2d7309ff89'/*localStorage.Carduuid*/,
          },
          success: function(data) {
              //alert(Math.round(new Date().getTime()/1000.0));
              Check_arr = JSON.parse(data);
              Check_Numm = Object.keys(Check_arr).length;
              console.log(Check_arr);
              for (var i = 0; i < Check_Numm; i++) {
                $(".check_card").append(
                    '<div class="cards">\
                        <div class="text">Потрачено: <b>'+Check_arr[i].total+'</b> | Начислен бонусов: <b>'+Check_arr[i].bonus+'</b> | Номер платежа: <b>'+Check_arr[i].number+'</b> | Дата: <b>'+Check_arr[i].period+'</b></div>\
                    </div>\
                    '
                );
              }
          },
          error: function(xhr, textStatus, error){

          }
        });


        /*
        var News = new XMLHttpRequest();
        News.open('GET', 'http://app.maksf.ru/getcheck.php', false);
        News.send();
        //console.log(News.responseText);
        if (News.status != 200) {
          $('#preload').css('display', 'block');
        } else {
            close_preload();
            News_arr = JSON.parse(News.responseText);
            News_Numm = Object.keys(News_arr).length;

            for (var i = 1; i < News_Numm+1 ; i++) {


              $("#layout").append(
                  '<div class="card">\
                      <img src="'+News_arr[i]['image']+'">\
                      <div class="title">'+News_arr[i].name+'</div>\
                      <div class="text">'+News_arr[i].text+'</div>\
                  </div>\
                  '
              );
            }
        }
        */

        //'<br>\
        //Номер карты: ' +localStorage.CardNumber+ '<br>\
        //Пользователь: ' +localStorage.FormHolder+ '<br>\
        //Номер телефона: ' +localStorage.FormPhone+ '<br>\
        //Дата рождения: ' +localStorage.FormBirthdate+ '<br>\
        //Баланс: ' +localStorage.CardBalance+ '<br>'


    JsBarcode("#barcode", localStorage.CardNumber);

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

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .login .button").addClass('active');
}

function news() {
    $('#preload').css('display', 'block');
    close_preload();

    Page = 'news';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'news');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Новости');
    //Загрузка контента

    $("#layout").html('<div class="lineP"></div>');



    var News = new XMLHttpRequest();
    News.open('GET', 'https://app.maksf.ru/news.php', false);
    News.send();
    //console.log(News.responseText);
    if (News.status != 200) {
      $('#preload').css('display', 'block');
    } else {
        close_preload();
        News_arr = JSON.parse(News.responseText);
        News_Numm = Object.keys(News_arr).length;

        for (var i = 1; i < News_Numm+1 ; i++) {


          $("#layout").append(
              '<div class="card">\
                  <img src="'+News_arr[i]['image']+'">\
                  <div class="title">'+News_arr[i].name+'</div>\
                  <div class="text">'+News_arr[i].text+'</div>\
              </div>\
              '
          );
        }
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

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .news .button").addClass('active');



}



function stocks() {
    $('#preload').css('display', 'block');
    close_preload();


    Page = 'stocks';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'stocks');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Акции');
    //Загрузка контента
    $("#layout").html('<div class="lineP"></div>');



    var News = new XMLHttpRequest();
    News.open('GET', 'https://app.maksf.ru/stocks.php', false);
    News.send();
    //console.log(News.responseText);
    if (News.status != 200) {
      $('#preload').css('display', 'block');
    } else {
        close_preload();
        News_arr = JSON.parse(News.responseText);
        News_Numm = Object.keys(News_arr).length;

        for (var i = 1; i < News_Numm+1 ; i++) {


          $("#layout").append(
              '<div class="card">\
                  <img src="'+News_arr[i]['image']+'">\
                  <div class="title">'+News_arr[i].name+'</div>\
                  <div class="text">'+News_arr[i].text+'</div>\
              </div>\
              '
          );
        }
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

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .stocks .button").addClass('active');
}


function map() {
    $('#preload').css('display', 'block');




    Page = 'map';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'map');

    //Название страницы
    $(".name-layout .name").html('Карты');
    //Загрузка контента
    $("#layout").html(
        '<div id="map" style="width: 100%;"></div>'
    );
    $("metajs").html(
        '<script src="https://api-maps.yandex.ru/2.1/?apikey=4589713e-a8e5-4019-bd5a-e4de5fb76b1d&lang=ru_RU" type="text/javascript"></script>'
    );
    $("#layout #map").css("height", $(document).height()-72-55);


    //Функции map.js
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

        WonderPush.subscribeToNotifications();

        options = {
            maximumAge: 3600000,
            timeout: 4000,
            enableHighAccuracy: true
        };

        //Узнать включена ли локация?
        cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback);
        function successCallback(res){
            //alert("Геолокация " + (res ? "включена" : "выключена"));
            !res ? cordova.plugins.diagnostic.switchToLocationSettings() : '';
        }
        function errorCallback(err){
            //alert("Ошибка: "+JSON.stringify(err));
        }
        //Конец включена ли локация?

        var onSuccess = function(position) {
            $('#preload').css('display', 'none');
            ymaps.ready(init);

            function init() {
                var geolocation = ymaps.geolocation,

                    myMap = new ymaps.Map('map', {
                        center: [position.coords.latitude, position.coords.longitude],
                        zoom: 13
                    }, {
                        searchControlProvider: 'yandex#search'
                    });

                geolocation.get({
                    mapStateAutoApply: true
                })
                    .then(
                        function(result) {
                            // Получение местоположения пользователя.
                            var userAddress = result.geoObjects.get(0).properties.get('text');
                            var userCoodinates = result.geoObjects.get(0).geometry.getCoordinates();
                            // Пропишем полученный адрес в балуне.
                            result.geoObjects.get(0).properties.set({
                                balloonContentBody: 'Адрес: ' + userAddress +
                                    '<br/>Координаты:' + userCoodinates
                            });
                            myMap.geoObjects.add(result.geoObjects)
                        },
                        function(err) {
                            //console.log('Ошибка: ' + err)
                        }
                    );

                var PointToMaps = new XMLHttpRequest();

                PointToMaps.open('GET', 'https://app.maksf.ru/getmap.php', false);
                PointToMaps.send();

                if (PointToMaps.status != 200) {
                  $('#preload').css('display', 'block');
                } else {
                    close_preload();
                    Point_arr = JSON.parse(PointToMaps.responseText);
                    Point_Numm = Object.keys(Point_arr).length;

                    for (var i = 0; i < Point_Numm ; i++) {
                        var pos_before = Point_arr[i].pos.split(' ')[0];
                        var pos_after = Point_arr[i].pos.split(' ')[1];

                        placemarki = new ymaps.Placemark([pos_after, pos_before], {
                            //balloonContentBody: '' +
                            balloonContentBody:
                                '<strong>Right</strong><br/>' +
                                '<strong>Адрес: </strong>' + Point_arr[i].address + '<br/>' +
                                '<strong>Время работы: </strong>' + Point_arr[i].openHour + '<br/>' +
                                '<strong>Телефон: </strong><a href="tel:' + Point_arr[i].phone + '" >' + Point_arr[i].phone + '</a>'
                        }, {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: 'default#imageWithContent',
                            // Своё изображение иконки метки.
                            iconImageHref: 'files/images/PointMap.png',
                            // Размеры метки.
                            iconImageSize: [48, 48],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-24, -24],
                            // Смещение слоя с содержимым относительно слоя с картинкой.
                            iconContentOffset: [15, 15],

                        });
                        myMap.geoObjects.add(placemarki);
                    }
                }

            }
        };



        function onError(error) {
            //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
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

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .map .button").addClass('active');
}




function close_preload() {
    $('#preload').removeClass('animation');
    $('#preload').css('display', 'block');

    setTimeout(function(){$('#preload').addClass('animation');},250);
    setTimeout(function(){$('#preload').removeClass('animation');$('#preload').css('display', 'none');},451);
}




function tabbar_onclick() {
    if (localStorage.account == "login") {
        if (Page == "profile") {$("#tabbar .login.profile").html('<div class="button"><div class="icon"><i class="fas fa-barcode"></i></div><div class="name">Профиль</div><div>');}
        else{$("#tabbar .login.profile").html('<div onclick="profile()" class="button"><div class="icon"><i class="fas fa-barcode"></i></div><div class="name">Профиль</div><div>');}
    }else{
        if (Page == "login") {$("#tabbar .login.profile").html('<div class="button active"><div class="icon"><i class="far fa-user-circle"></i></div><div class="name">Войти</div><div>');}
        else{$("#tabbar .login.profile").html('<div onclick="login()" class="button">\<div class="icon"><i class="far fa-user-circle"></i></div>\<div class="name">Войти</div>\</div>');}
    }
    if (Page == "news") {$("#tabbar .news").html('<div class="button"><div class="icon"><i class="far fa-newspaper"></i></div><div class="name">Новости</div></div>');
    }else{$("#tabbar .news").html('<div onclick="news()" class="button"><div class="icon"><i class="far fa-newspaper"></i></div><div class="name">Новости</div></div>');}
    if (Page == "stocks") {$("#tabbar .stocks").html('<div class="button"><div class="icon"><i class="fas fa-tags"></i></div><div class="name">Акции</div></div>');
    }else{$("#tabbar .stocks").html('<div onclick="stocks()" class="button"><div class="icon"><i class="fas fa-tags"></i></div><div class="name">Акции</div></div>');}
    if (Page == "map") {$("#tabbar .map").html('<div class="button"><div class="icon"><i class="far fa-map"></i></div><div class="name">Карта</div></div>');
    }else{$("#tabbar .map").html('<div onclick="map()" class="button"><div class="icon"><i class="far fa-map"></i></div><div class="name">Карта</div></div>');}
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
