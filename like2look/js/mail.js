$(document).ready(function() {
    // Отправка форм
    $("form").submit(function() { //устанавливаем событие отправки для формы с id=form
        var form_data = $(this).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "../php/form.php", //путь до php фаила отправителя
            data: form_data,
            success: function() {
                alert("Форма отправлена");
            }
        });
        return false;
    });
});