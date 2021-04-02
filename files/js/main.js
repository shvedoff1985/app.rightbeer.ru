let User = false;
First_exit = false;
Phone = '';
Page = 'login';
i_connected = 'true'

if (localStorage.account == "login") {
    User = true;
    Page = 'profile';
    profile();
} else {
    User = false;
    Page = 'login';
    login();
}

document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onLine, false);

function onOffline() {i_connected = 'fales';$('.noconnect').css('display', 'block');}
function onLine() {i_connected = 'true';$('.noconnect').css('display', 'none');}



//Главный прелоудер
if (!First_exit) {
    setTimeout(function () {
        $("#preload-main").css("display", "none");
    }, 1350);
} else {}

//Окно с ошибкой
function loaderror(text) {
    $('#error_code').css('display', 'block');
    $("#error_code").html(
        '<div class="block">\
            <h3>Ошибка</h3>\
            <p>' + text + '</p>\
        </div>\
        <p style="text-align: center;z-index: 99;"><i class="close far fa-times-circle"></i></p>'
    );
    $(function () {
        $('#error_code .close').click(function () {
            $('#error_code').css('display', 'none');
        });
    });
}




function login() {
    Page = 'login';

    $('#preload').css('display', 'block');

    if (!User && Page == 'login') {

        $('#layout').removeAttr('page');
        $('#layout').attr('page', 'login');
        $("metajs").html('');

        //Название страницы
        $(".name-layout .name").html('Авторизация');


        tabbar_onclick();
        //Проверка кнопок

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
                    <a  href="tel:+79623271000">Обратная связь</a>\
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
            <p id="timer_close">Позвонить повторно через <span class="seconds">160</span> сек</p>'
        );

        //Код страницы Login
        let pin;

        $('.box-login').on('input', function () {
            if ($("#phone-mask").val().length == 18) {
                $('#submit-mask').removeAttr('disabled');
            } else {
                $('#submit-mask').attr('disabled', 'disabled');
            }
        });


        $(function () {
            $('#submit-mask').click(function () {

                $("#overlay").css("height", windowheight);
                $(".PIN").css("margin-top", (windowheight - $(".PIN").height()) / 3 - 55 - 72);

                Phone = $("#phone-mask").val().split('+').join('');
                Phone = Phone.split(' ').join('');
                Phone = Phone.split('(').join('');
                Phone = Phone.split(')').join('');
                Phone = Phone.split('-').join('');

                $.ajax({
                    type: 'POST',
                    url: 'https://app.rightbeer.ru/getpin.php',
                    data: {
                        phone: Phone,
                        Authorization: 'd3577f6c-05e4-430b-bfa9-561f4ad4b7ea',
                        accept: 'application/json',
                    },
                    success: function (data) {
                        card = JSON.parse(data)
                        console.log(card);
                        if (card.message == "Карта не найдена") {

                            loaderror('В базе нет данного номера телефона. Обратитесь на кассу для оформления карты лояльности.');
                            $("#overlay").css("display", 'none');
                        } else {
                            send_pin();
                            $("#overlay").css("display", 'block');
                        }

                    }
                });
            });

        });

        function send_pin() {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://smsc.ru/sys/send.php?login=shvedoff1985&psw=b12132ff02dd8e140df8fa5c59c23df1&phones=' + $("#phone-mask").val() + '&mes=code&call=1&fmt=3', false);
            xhr.send();
            console.log(xhr.responseText);
            if (xhr.status != 200) {
                $("#overlay").css("display", 'none');
            } else {

                pin = JSON.parse(xhr.responseText);
                $("#overlay").css("display", 'block');
            }
            pincode_timer(60);

        }

        function pincode_timer(second) {
            $("#timer_close").html('<p id="timer_close">Позвонить повторно через <span class="seconds">' + second + '</span> сек</p>');
            var _Seconds = second,
                int;
            int = setInterval(function () { // запускаем интервал
                if (_Seconds > 0) {
                    _Seconds--; // вычитаем 1
                    $('.seconds').text(_Seconds); // выводим получившееся значение в блок
                } else {
                    clearInterval(int); // очищаем интервал, чтобы он не продолжал работу при _Seconds = 0
                    $("#timer_close").html('Позвонить повторно');
                    $('#timer_close').click(function () {
                        send_pin();
                    });
                }
            }, 1000);
        }

        $('.PIN').on('input', function () {
            if ($("#pin-mask").val().length == 7) {

                pincode = $("#pin-mask").val();
                pincode = pincode.split('-').join('');
                pin1 = pin.code;

                pin2 = pin1.substr(2, 6);

                if (pincode == pin2) {

                    $("#overlay").css("display", 'none');
                    $("#overlay").html('');
                    Phone = $("#phone-mask").val();
                    authorization();
                } else {

                    $("#pin-mask").addClass('animation');
                    setTimeout(function () {
                        $('#pin-mask').removeClass('animation');
                        $("#pin-mask").val('0');
                        $("#pin-mask").val('');
                        $("#pin-mask").remove();
                        $("#overlay .input-group").append('<input id="pin-mask" type="" name="" placeholder="_-_-_-_">');
                        var regExpMasks = IMask(document.getElementById('pin-mask'), {
                            mask: '0-0-0-0'
                        });
                    }, 1010);
                }
            }
        });
        close_preload();
        //Подгрузка маски
        var phoneMask = IMask(document.getElementById('phone-mask'), {
            mask: '+7 (000) 000-00-00'
        });
        var regExpMask = IMask(document.getElementById('pin-mask'), {
            mask: '0-0-0-0'
        });
    }

}


function authorization() {
    $('#preload').css('display', 'block');
    Phone = Phone.split('+').join('');
    Phone = Phone.split(' ').join('');
    Phone = Phone.split('(').join('');
    Phone = Phone.split(')').join('');
    Phone = Phone.split('-').join('');


    //Чистый номер телефона - Phone


    //Отправляем запрос на получение данных

    $.ajax({
        type: 'POST',
        url: 'https://app.rightbeer.ru/getcard.php',
        data: {
            phone: Phone,
            Authorization: 'd3577f6c-05e4-430b-bfa9-561f4ad4b7ea',
            accept: 'application/json',
        },
        success: function (data) {
            card = JSON.parse(data)


            //Проверка, существует ли карта
            if (card.message == "Карта не найдена") {
                //Если карта не существует

                //Отправляем на регистраницю


            } else {
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
            url: 'https://app.rightbeer.ru/getcard.php',
            data: {
                phone: localStorage.FormPhone,
                Authorization: 'd3577f6c-05e4-430b-bfa9-561f4ad4b7ea',
                accept: 'application/json',
            },
            success: function (data) {
                card = JSON.parse(data)

                if (localStorage.CardBalance !== card.balance) {
                    localStorage.CardBalance = card.balance;
                    $("#layout .reload").html('<b>' + localStorage.CardBalance + '</b>');
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

    setInterval(function () {
        if (i_connected == 'true') {
                RelBalance();
        }else{
            $("#layout .reload").html('<b>' + localStorage.CardBalance + '</b>');
        }

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
                ' + localStorage.FormHolder.toUpperCase() + '\
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
                <b>' + localStorage.CardBalance + '</b>\
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

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .login .button").addClass('active');

    //e56d44f9-135e-4fea-aa9a-90efd21a6872
    $.ajax({
        type: 'POST',
        url: 'https://app.rightbeer.ru/getcheck.php',
        data: {
            Uuid: localStorage.Carduuid /*'ba895b40-bd66-4e2f-bcdb-ae2d7309ff89'*/ ,
        },
        success: function (data) {
            Check_arr = JSON.parse(data);
            Check_Numm = Object.keys(Check_arr).length;
            console.log(Check_arr);
            if (Check_Numm < 1) {

                $(".check_card").append(
                    '<div class="cards">\
                        <div class="text" style="text-align:center;">За этот месяц операций нет.</div>\
                    </div>\
                    '
                );
            }
            for (var i = 0; i < Check_Numm; i++) {
                let unix_timestamp = Check_arr[i].period;
                var date = new Date(unix_timestamp * 1000);
                var hours = date.getHours();
                var year = date.getFullYear();
                var mounth =  date.getMonth();
                var data = date.getDate();
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime = year+'/'+mounth+'/'+data+ ' - '+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                $(".check_card").append(
                    '<div class="cards">\
                        <div class="text">Потрачено: <b>' + Check_arr[i].total + '</b> | Начислен бонусов: <b>' + Check_arr[i].bonus + '</b> | Номер платежа: <b>' + Check_arr[i].number + '</b> | Дата: <b>' +formattedTime+ '</b></div>\
                    </div>\
                    '
                );
            }
        },
        error: function (xhr, textStatus, error) {
            $(".check_card").append(
                '<div class="cards">\
                    <div class="text" style="text-align:center;">Нет подключения к интернету</div>\
                </div>\
                '
            );
        }
    });

    //'<br>\
    //Номер карты: ' +localStorage.CardNumber+ '<br>\
    //Пользователь: ' +localStorage.FormHolder+ '<br>\
    //Номер телефона: ' +localStorage.FormPhone+ '<br>\
    //Дата рождения: ' +localStorage.FormBirthdate+ '<br>\
    //Баланс: ' +localStorage.CardBalance+ '<br>'


    JsBarcode("#barcode", localStorage.CardNumber);

}

function news() {
    Page = 'news';
    //$("metajs").append('<script type="text/javascript" src="files/js/testing.js"></script>');

    $('#preload').css('display', 'block');


    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'news');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Новости');
    //Загрузка контента

    $("#layout").html('<div class="lineP"></div>');

    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .news .button").addClass('active');

    var News = new XMLHttpRequest();
    News.open('GET', 'https://app.rightbeer.ru//news.php', false);
    News.send();
    if (News.status != 200) {
        $('#preload').css('display', 'block');
        $("#layout").html(
            '<div class="card">\
              <div class="title">нет соединения с интернетом.</div>\
          </div>\
          '
        );
    } else {
        close_preload();
        News_arr = JSON.parse(News.responseText);
        News_Numm = Object.keys(News_arr).length;
        if (News_Numm < 1) {
            $("#layout").append(
                '<div class="card">\
                  <div class="title">В данное время нет актуальных новостей</div>\
              </div>\
              '
            );
        }else{
            for (var i = 1; i < News_Numm + 1; i++) {
                $("#layout").append(
                    '<div class="card">\
                      <img src="' + News_arr[i]['image'] + '">\
                      <div class="title">' + News_arr[i].name + '</div>\
                      <div class="text">' + News_arr[i].text + '</div>\
                  </div>\
                  '
                );
            }
        }

    }


}


function stocks() {
    Page = 'stocks';
    $('#preload').css('display', 'block');


    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'stocks');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Акции');
    //Загрузка контента
    $("#layout").html('<div class="lineP"></div>');


    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .stocks .button").addClass('active');


    var News = new XMLHttpRequest();
    News.open('GET', 'https://app.rightbeer.ru/stocks.php', false);
    News.send();

    if (News.status != 200) {
        $('#preload').css('display', 'block');
        $("#layout").html(
            '<div class="card">\
              <div class="title">нет соединения с интернетом.</div>\
          </div>\
          '
        );
    } else {
        close_preload();
        News_arr = JSON.parse(News.responseText);
        News_Numm = Object.keys(News_arr).length;
        if (News_Numm < 1) {
            $("#layout").append(
                '<div class="card">\
                  <div class="title">В данное время нет актуальных новостей</div>\
              </div>\
              '
            );
        }else{
            for (var i = 1; i < News_Numm + 1; i++) {
                $("#layout").append(
                    '<div class="card">\
                      <img src="' + News_arr[i]['image'] + '">\
                      <div class="title">' + News_arr[i].name + '</div>\
                      <div class="text">' + News_arr[i].text + '</div>\
                  </div>\
                  '
                );
            }
        }

    }


}


function map() {
    Page = 'map';

    $('#preload').css('display', 'block');


    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'map');

    //Название страницы
    $(".name-layout .name").html('Карты');
    //Загрузка контента
    $("#layout").html(
        '<div id="map" style="width: 100%;"></div>'
    );
    //Проверка кнопок
    tabbar_onclick();

    $("#tabbar .map .button").addClass('active');

    $("metajs").html(
        '<script src="https://api-maps.yandex.ru/2.1/?apikey=4589713e-a8e5-4019-bd5a-e4de5fb76b1d&lang=ru_RU" type="text/javascript"></script>'
    );
    $("#layout #map").css("height", $(document).height() - 72 - 55);

    //Функции map.js
    document.addEventListener("deviceready", onDeviceReady, false);
    //onDeviceReady();
    function onDeviceReady() {

        WonderPush.subscribeToNotifications();

        options = {
            maximumAge: 3600000,
            timeout: 4000,
            enableHighAccuracy: true
        };


        //Узнать включена ли локация?
        cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback);

        function successCallback(res) {
            !res ? cordova.plugins.diagnostic.switchToLocationSettings() : '';
        }

        function errorCallback(err) {
        }

        var onSuccess = function (position) {

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
                        function (result) {
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
                        function (err) {
                            //console.log('Ошибка: ' + err)
                        }
                    );

                var PointToMaps = new XMLHttpRequest();

                PointToMaps.open('GET', 'https://app.rightbeer.ru/maps.json', false);
                PointToMaps.send();

                if (PointToMaps.status != 200) {
                    $('#preload').css('display', 'block');
                } else {
                    close_preload();
                    Point_arr = JSON.parse(PointToMaps.responseText);
                    Point_Numm = Object.keys(Point_arr).length;
                    for (var i = 0; i < Point_Numm; i++) {
                        var pos_before = Point_arr[i].pos.split(' ')[0];
                        var pos_after = Point_arr[i].pos.split(' ')[1];

                        placemarki = new ymaps.Placemark([pos_after, pos_before], {
                            //balloonContentBody: '' +
                            balloonContentBody: '<strong>Right</strong><br/>' +
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
            close_preload();
        };


        function onError(error) {
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }


}


function close_preload() {
    $('#preload').removeClass('animation');
    $('#preload').css('display', 'block');

    setTimeout(function () {
        $('#preload').addClass('animation');
    }, 250);
    setTimeout(function () {
        $('#preload').removeClass('animation');
        $('#preload').css('display', 'none');
    }, 451);
}


function tabbar_onclick() {
    if (localStorage.account == "login") {
        if (Page == "profile") {
            $("#tabbar .login.profile").html('<div class="button"><div class="icon"><i class="fas fa-barcode"></i></div><div class="name">Профиль</div><div>');
        } else {
            $("#tabbar .login.profile").html('<div onclick="profile()" class="button"><div class="icon"><i class="fas fa-barcode"></i></div><div class="name">Профиль</div><div>');
        }
        $(".name-layout .exit").html('<i class="fas fa-sign-out-alt"></i>');
    } else {
        if (Page == "login") {
            $("#tabbar .login.profile").html('<div class="button active"><div class="icon"><i class="far fa-user-circle"></i></div><div class="name">Войти</div><div>');
        } else {
            $("#tabbar .login.profile").html('<div onclick="login()" class="button"><div class="icon"><i class="far fa-user-circle"></i></div><div class="name">Войти</div></div>');
        }
        $(".name-layout .exit").html('');
    }
    if (Page == "news") {
        $("#tabbar .news").html('<div class="button"><div class="icon"><i class="far fa-newspaper"></i></div><div class="name">Новости</div></div>');
    } else {
        $("#tabbar .news").html('<div onclick="news()" class="button"><div class="icon"><i class="far fa-newspaper"></i></div><div class="name">Новости</div></div>');
    }
    if (Page == "stocks") {
        $("#tabbar .stocks").html('<div class="button"><div class="icon"><i class="fas fa-tags"></i></div><div class="name">Акции</div></div>');
    } else {
        $("#tabbar .stocks").html('<div onclick="stocks()" class="button"><div class="icon"><i class="fas fa-tags"></i></div><div class="name">Акции</div></div>');
    }
    if (Page == "map") {
        $("#tabbar .map").html('<div class="button"><div class="icon"><i class="far fa-map"></i></div><div class="name">Карта</div></div>');
    } else {
        $("#tabbar .map").html('<div onclick="map()" class="button"><div class="icon"><i class="far fa-map"></i></div><div class="name">Карта</div></div>');
    }
}











$('.exit').click(function () {
    $('.exit').html('');
    delete localStorage.account;
    delete localStorage.FormPhone;
    delete localStorage.FormHolder;
    delete localStorage.FormBirthdate;
    delete localStorage.Carduuid;
    delete localStorage.CardBalance;
    delete localStorage.CardNumber;
    User = false;
    Page = 'login';
    $("#tabbar .login.profile").html(
        '<div onclick="login()" class="button">\
            <div class="icon"><i class="far fa-user-circle"></i></div>\
            <div class="name">Войти</div>\
        </div>'
    );
    $("#tabbar .news .button").addClass('active');
    login();
});
