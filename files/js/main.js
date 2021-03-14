let User = false;
    First_exit = false;
    Phone = '+7 (910) 255-75-12';
    Page = 'login';

if (localStorage.account == "login") {
    User=true;
    Page='profile';
    authorization();
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
        setTimeout(function(){$('#preload').css('display', 'none');}, 650);
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
                    Phone = $("#phone-mask").val();
                    authorization();
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
    $('#preload').css('display', 'block');
    setTimeout(function(){$('#preload').css('display', 'none');}, 650);

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
                    Phone = $("#phone-mask").val();
                    authorization();
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
      url: 'https://app.maksf.ru/getcard.php',
      data: {
          phone: '79102557512',
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
          setTimeout(function(){$('#preload').css('display', 'none');}, 650);
      }
  });



}



























function profile() {
    $('#preload').css('display', 'block');
    setTimeout(function(){$('#preload').css('display', 'none');}, 650);

    Page = 'profile';
    //Атрибут Page для layout
    $('#layout').removeAttr('page');
    $('#layout').attr('page', 'profile');

    $("metajs").html('');

    //Название страницы
    $(".name-layout .name").html('Профиль');

    //Загрузка контента
    $("#layout").html(
        '<svg id="barcode"></svg><br>\
        Номер карты: ' +localStorage.CardNumber+ '<br>\
        Пользователь: ' +localStorage.FormHolder+ '<br>\
        Номер телефона: ' +localStorage.FormPhone+ '<br>\
        Дата рождения: ' +localStorage.FormBirthdate+ '<br>\
        Баланс: ' +localStorage.CardBalance+ '<br>'
    );

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
    $("#tabbar .login .button").addClass('active');
}

function news() {
    $('#preload').css('display', 'block');

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
    News.open('GET', 'https://app.maksf.ru', false);
    News.send();
    console.log(News.responseText);
    if (News.status != 200) {
      $('#preload').css('display', 'block');
    } else {
        setTimeout(function(){$('#preload').css('display', 'none');}, 650);
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
    $("#tabbar .news .button").addClass('active');



}



function stocks() {
    $('#preload').css('display', 'block');
    setTimeout(function(){$('#preload').css('display', 'none');}, 650);


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
    $('#preload').css('display', 'block');


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

        WonderPush.subscribeToNotifications();

        options = {
            maximumAge: 30000,
            timeout: 10000,
            enableHighAccuracy: true
        };

        var onSuccess = function(position) {
            ymaps.ready(init);

            function init() {
                var geolocation = ymaps.geolocation,

                    myMap = new ymaps.Map('map', {
                        center: [position.coords.latitude, position.coords.longitude],
                        zoom: 13
                    }, {
                        searchControlProvider: 'yandex#search'
                    });

                placemark1 = new ymaps.Placemark([51.648817, 39.195831], {
                    hintContent: "Воронеж, 20 летия октября, 66",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark2 = new ymaps.Placemark([51.693753, 39.144978], {
                    hintContent: "Воронеж, 45 СтрДивизии, 226",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark3 = new ymaps.Placemark([51.713434, 39.156988], {
                    hintContent: "Воронеж, 60 лет ВЛКСМ, 23",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark4 = new ymaps.Placemark([51.719125, 39.266439], {
                    hintContent: "Воронеж, Артамонова, 22",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark5 = new ymaps.Placemark([51.719125, 39.266439], {
                    hintContent: "Воронеж, Артамонова, 22 кафе",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark6 = new ymaps.Placemark([51.703444, 39.22959], {
                    hintContent: "Воронеж, Березовая роща, 70",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark7 = new ymaps.Placemark([51.660049, 39.276617], {
                    hintContent: "Воронеж, Волгоградская, 4",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark8 = new ymaps.Placemark([51.613597, 39.249093], {
                    hintContent: "Воронеж, Волгодонская, 10",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark9 = new ymaps.Placemark([51.877924, 39.586437], {
                    hintContent: "Воронеж, Г. Лохматикова, 11",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark10 = new ymaps.Placemark([51.653752, 39.149407], {
                    hintContent: "Воронеж, Домостроителей, 13",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark11 = new ymaps.Placemark([51.688159, 39.193711], {
                    hintContent: "Воронеж, Елецкая, 8",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark12 = new ymaps.Placemark([51.671796, 39.201455], {
                    hintContent: "Воронеж, Комиссаржевской, 12",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark13 = new ymaps.Placemark([51.612999, 39.234073], {
                    hintContent: "Воронеж, Корейская, 6А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark14 = new ymaps.Placemark([51.655199, 39.158506], {
                    hintContent: "Воронеж, Космонавтов, 22",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark15 = new ymaps.Placemark([51.660216, 39.153314], {
                    hintContent: "Воронеж, Космонавтов, 8",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark16 = new ymaps.Placemark([51.617104, 39.247332], {
                    hintContent: "Воронеж, Костромская, 13",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark17 = new ymaps.Placemark([51.637282, 39.173805], {
                    hintContent: "Воронеж, Краснознаменная, 171а",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark18 = new ymaps.Placemark([51.6348,39.2327], {
                    hintContent: "Воронеж, Ленинский пр-т, 3",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark19 = new ymaps.Placemark([51.670724, 39.251159], {
                    hintContent: "Воронеж, Ленинский пр-т, 111",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark20 = new ymaps.Placemark([51.672193, 39.251707], {
                    hintContent: "Воронеж, Ленинский пр-т, 117",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark21 = new ymaps.Placemark([51.68248, 39.261301], {
                    hintContent: "Воронеж, Ленинский пр-т, 129",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark22 = new ymaps.Placemark([51.694736, 39.269412], {
                    hintContent: "Воронеж, Ленинский пр-т, 177",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark23 = new ymaps.Placemark([51.643, 39.236992], {
                    hintContent: "Воронеж, Ленинский пр-т, 27",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark24 = new ymaps.Placemark([51.653986, 39.240577], {
                    hintContent: "Воронеж, Ленинский пр-т, 73",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark25 = new ymaps.Placemark([51.665753, 39.248625], {
                    hintContent: "Воронеж, Ленинский пр-т, 97",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark26 = new ymaps.Placemark([51.706787, 39.165037], {
                    hintContent: "Воронеж, Лизюкова, 38",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark27 = new ymaps.Placemark([51.728498, 39.205372], {
                    hintContent: "Воронеж, Ломоносова, 114/19",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark28 = new ymaps.Placemark([51.729022, 39.205057], {
                    hintContent: "Воронеж, Ломоносова, 114/31",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark29 = new ymaps.Placemark([51.691688, 39.281549], {
                    hintContent: "Воронеж, Минская, 67",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark30 = new ymaps.Placemark([51.687919, 39.279222], {
                    hintContent: "Воронеж, Минская, 69",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark31 = new ymaps.Placemark([51.716743, 39.178584], {
                    hintContent: "Воронеж, Московский проспект, 125",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark32 = new ymaps.Placemark([51.616735, 39.237612], {
                    hintContent: "Воронеж, Новосибирская, 9",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark33 = new ymaps.Placemark([51.681804, 39.253333], {
                    hintContent: "Воронеж, Переверткина, 1/2",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark34 = new ymaps.Placemark([51.688243, 39.259675], {
                    hintContent: "Воронеж, Переверткина, 26",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark35 = new ymaps.Placemark([51.685328, 39.189373], {
                    hintContent: "Воронеж, Политехнический пер, 14",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark36 = new ymaps.Placemark([51.682826, 39.086273], {
                    hintContent: "Воронеж, Придонской, 232 СтрДивизии, 45",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark37 = new ymaps.Placemark([51.602405, 39.240909], {
                    hintContent: "Воронеж, Ростовская, 58/12",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark38 = new ymaps.Placemark([51.670841, 39.193271], {
                    hintContent: "Воронеж, Средне-Московская, 45",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark39 = new ymaps.Placemark([51.625022, 39.076382], {
                    hintContent: "Воронеж, Тепличная, 6г",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark40 = new ymaps.Placemark([51.673383, 39.164795], {
                    hintContent: "Воронеж, Труда пр-т, 72",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark41 = new ymaps.Placemark([51.674433, 39.289436], {
                    hintContent: "Воронеж, Урывского, 17в",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark42 = new ymaps.Placemark([51.702601, 39.184414], {
                    hintContent: "Воронеж, Хользунова, 35",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark43 = new ymaps.Placemark([51.702316, 39.1666], {
                    hintContent: "Воронеж, Хользунова, 72б",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark44 = new ymaps.Placemark([51.715588, 39.185528], {
                    hintContent: "Воронеж, Шишкова, 146б",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark45 = new ymaps.Placemark([51.49865, 40.436288], {
                    hintContent: "Воронежская область, Анна, Чапаева, 32",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark46 = new ymaps.Placemark([51.741338, 39.313951], {
                    hintContent: "Воронежская область, Боровое, Ф Тютчева, 99А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark47 = new ymaps.Placemark([50.427705, 41.002577], {
                    hintContent: "Воронежская область, Калач, Герцена, 8",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark48 = new ymaps.Placemark([51.344215, 39.298572], {
                    hintContent: "Воронежская область, Колодезный, Победы, 2б",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark49 = new ymaps.Placemark([50.987763, 39.503298], {
                    hintContent: "Воронежская область, Лиски, Коммунистическая, 87",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark50 = new ymaps.Placemark([50.991885, 39.502867], {
                    hintContent: "Воронежская область, Лиски, Трудовые резервы, 2а",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark51 = new ymaps.Placemark([51.641954, 39.408966], {
                    hintContent: "Воронежская область, Новая Усмань, Ленина, 244",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark52 = new ymaps.Placemark([51.607669, 39.379681], {
                    hintContent: "Воронежская область, Новая Усмнань, Полевая, 36б",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark53 = new ymaps.Placemark([50.452695, 40.133601], {
                    hintContent: "Воронежская область, Павловск, Северный мкр-н, 7",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark54 = new ymaps.Placemark([51.645207, 40.134355], {
                    hintContent: "Воронежская область, Панино, Красная площадь, 13а",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark55 = new ymaps.Placemark([51.74015, 39.164902], {
                    hintContent: "Воронежская область, Подгорное, Лихачева, 2",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark56 = new ymaps.Placemark([51.754185, 39.432313], {
                    hintContent: "Воронежская область, поселок Шуберское, Ленина, 35",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark57 = new ymaps.Placemark([51.914282, 39.337361], {
                    hintContent: "Воронежская область, Рамонь, 50 лет ВЛКСМ, 10",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark58 = new ymaps.Placemark([51.917832, 39.299165], {
                    hintContent: "Воронежская область, Рамонь, ВНИИСС, 95",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark59 = new ymaps.Placemark([51.692078, 39.018836], {
                    hintContent: "Воронежская область, Семилуки, Комсомольская, 12",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark60 = new ymaps.Placemark([51.695177, 39.022448], {
                    hintContent: "Воронежская область, Семилуки, Крупской пер, 7",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark61 = new ymaps.Placemark([51.822252, 39.268056], {
                    hintContent: "Воронежская область, Чертовицы, Героев, 2",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark62 = new ymaps.Placemark([51.562546, 39.114094], {
                    hintContent: "Воронежская область, Шилово, Междуреченская, 1ж",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark63 = new ymaps.Placemark([51.836684, 40.8029], {
                    hintContent: "Воронежская область, Эртиль, Правды, 1а",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark64 = new ymaps.Placemark([50.85397, 39.053772], {
                    hintContent: "Воронежская область, Острогожск, 50 лет Октября, 45",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark65 = new ymaps.Placemark([50.4235,41.0298], {
                    hintContent: "Воронежская область, Калач, Ленинская 98А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark66 = new ymaps.Placemark([50.1920,39.5801], {
                    hintContent: "Воронежская область, Россошь, Пролетарская, 161",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark67 = new ymaps.Placemark([50.19579336208347,39.58520056706746], {
                    hintContent: "Воронежская область, Россошь, Простеева, 9г",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark68 = new ymaps.Placemark([51.6440,39.1468], {
                    hintContent: "Воронеж, Кривошеина, 66",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark69 = new ymaps.Placemark([50.9754,39.5454], {
                    hintContent: "Воронежская область, Лиски, 40 лет Октября, 43А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark70 = new ymaps.Placemark([51.0855,38.6434], {
                    hintContent: "Воронежская область, Репьёвка, Воронежская, 70А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark71 = new ymaps.Placemark([51.0985,38.5732], {
                    hintContent: "Воронежская область, Дракино, Полевая 114А",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark72 = new ymaps.Placemark([51.34999180812789,39.29382271801027], {
                    hintContent: "",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark73 = new ymaps.Placemark([51.3502,39.2980], {
                    hintContent: "Генерала Лохматикова, 11",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark74 = new ymaps.Placemark([51.4577,41.9736], {
                    hintContent: "Грибановский, Советская, 157 Б",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark75 = new ymaps.Placemark([51.4498,41.9212], {
                    hintContent: "Грибановский, Машзаводская, 22",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark76 = new ymaps.Placemark([51.6754,39.1419], {
                    hintContent: "Воронеж, Семилукская, 16/5",
                    iconContent: "",



                }, {
                    preset: "islands#greenShoppingIcon"

                });

                placemark77 = new ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
                    hintContent: "Воронеж, 45 СтрДивизии, 226"
                }, {
                    preset: "islands#geolocationIcon"
                });

                myMap.geoObjects.add(placemark1).add(placemark2).add(placemark3).add(placemark4).add(placemark5).add(placemark6).add(placemark7).add(placemark8).add(placemark9).add(placemark10).add(placemark11).add(placemark12).add(placemark13).add(placemark14).add(placemark15).add(placemark16).add(placemark17).add(placemark18).add(placemark19).add(placemark20).add(placemark21).add(placemark22).add(placemark23).add(placemark24).add(placemark25).add(placemark26).add(placemark27).add(placemark28).add(placemark29).add(placemark30).add(placemark31).add(placemark32).add(placemark33).add(placemark34).add(placemark35).add(placemark36).add(placemark37).add(placemark38).add(placemark39).add(placemark40).add(placemark41).add(placemark42).add(placemark43).add(placemark44).add(placemark45).add(placemark46).add(placemark47).add(placemark48).add(placemark49).add(placemark50).add(placemark51).add(placemark52).add(placemark53).add(placemark54).add(placemark55).add(placemark56).add(placemark57).add(placemark58).add(placemark59).add(placemark60).add(placemark61).add(placemark62).add(placemark63).add(placemark64).add(placemark65).add(placemark66).add(placemark67).add(placemark68).add(placemark69).add(placemark70).add(placemark71).add(placemark72).add(placemark73).add(placemark74).add(placemark75).add(placemark76).add(placemark77);

                setTimeout(function(){$('#preload').css('display', 'none');}, 650);
            }
        };



        function onError(error) {
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
