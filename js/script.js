// написать строку, которая по клику превращается в инпут
// различать какой инпут будет появляться по данным в span
// носителями контента могут быть ссылки, значит нужно убрать поведение по умолчанию
// если нет значения, то пишут empty или not fiiled в контент ::before или ::after, псевдокласс :empty

/*
Создайте репозиторий для проекта, добавьте туда функционал, реализованный на занятии.

Для задания создайте в репозитории отдельную ветку - 2019-01-14
Задание
Измените функционал встроенного редактирования, добавив соответствующие кнопки для сохранения данных и отмены сохранения. Кнопки ассоциированы с каждым редактируемым полем, стилизуются средствами Bootstrap.

*/

//повесили событие на элемент динамически, на body
$('body').on('click', '[editable]', function (event) {
    event.preventDefault();

    var $element = $(this); // сохраняем элемент, по которому кликнули, в объект jQuery
    var type = $element.attr('editable'); // находим элемент с атрибутом editable

    var $input = $('<input>'); //создаем элемент инпут
    var $btnSave = $(this).siblings('.btn__save');
    var $btnCancel = $(this).siblings('.btn__cancel');

    $input
        .insertAfter($element) // вставляем инпут после элемента, по которому кликнули 
        .attr('type', type) // добавляет атрибут type, полученый из переменной type
        .val($($element).text()) //вставили значение из спана
        .focus() // вставили фокус в инпут
        .select() //выделяет содержимое в инпуте
        .on('keyup', function (event) {
            // which, который дает тоже что и keyCode
            if (event.which === 13) {
                $element
                    .insertAfter(this)
                    .text($(this).val());
                $(this).remove();
            } else if (event.which === 27) {
                $element.insertAfter(this);
                $(this).remove();
            }
        });

    $btnSave
        .addClass('btn--show')
        .on('click', function () {
            $element
                .insertAfter($input)
                .text($input.val());
            $($input).remove();            
            $btnSave.removeClass('btn--show');
            $btnCancel.removeClass('btn--show');
        });        
    
    $btnCancel
        .addClass('btn--show')
        .on('click', function() {
            $element.insertAfter($input);
            $($input).remove();
            $btnSave.removeClass('btn--show');
            $btnCancel.removeClass('btn--show');
        });    

    $($element).remove(); // удалить физически элемент, по которому кликнули
});


/*
$('body').on('click', '[editable]', function (event) {
    event.preventDefault();

    //console.log(this);
    //console.log ($(this)); // объект jQuery;
    //console.log($(this).attr('editable'));

    var $element = $(this); // сохраняем элемент, по которому кликнули, в объект jQuery
    var type = $element.attr('editable'); // находим элемент с атрибутом editable

    $('<input>')
        .insertAfter($element) // вставляем инпут после элемента, по которому кликнули
        .attr('type', type) // добавляет атрибут type, полученый из переменной type
        .val($($element).text()) //вставили значение из спана
        .focus() // вставили фокус в инпут
        .select() //выделяет содержимое в инпуте
        .on('keyup', function (event) {
            // which, который дает тоже что и keyCode
            if (event.which === 13) {
                $element
                    .insertAfter(this)
                    .text($(this).val());
                $(this).remove();
            } else if (event.which === 27) {
                $(this).trigger('blur'); // вызывает определенное событие, эмулирует событие on.blur, перейдет на событие on.blur и выполнит 2 строки, которые тут закомментированны
                //$element.insertAfter(this);
                //$(this).remove();
            }
        })
        .on('blur', function () {
            $element.insertAfter(this);
            $(this).remove();
        });

    $($element).remove(); // удалить физически элемент, по которому кликнули
});

*/