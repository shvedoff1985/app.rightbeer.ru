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

    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
    xhr.open('GET', 'https://smsc.ru/sys/send.php?login=shvedoff1985&psw=b12132ff02dd8e140df8fa5c59c23df1&phones='+$("#phone-mask").val()+'&mes=code&call=1&fmt=3', false);

// 3. Отсылаем запрос
    xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        alert( xhr.responseText ); // responseText -- текст ответа.
    }
}

function CloseOverlay() {
	$("#overlay").css("display", 'none');
}