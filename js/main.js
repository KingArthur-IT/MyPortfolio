$(document).ready(function () {
    $('.nav-bar__btn').on('click', function () {
        if ($(this).attr('clicked') == 'false') {
            //Присвоить кнопке аттрибут
            $(this).attr('clicked', 'true');
            //Формируем стрелку
            $(this).children('.menu-btn-line:nth-child(1)').css('transform', 'rotate(30deg)');
            $(this).children('.menu-btn-line:nth-child(3)').css('transform', 'rotate(-30deg)');
            //Опускаем полоску
            $(this).children('.menu-btn-line:nth-child(2)').css('position', 'absolute');
            $(this).children('.menu-btn-line:nth-child(2)').css('height', '1px');
            $(this).children('.menu-btn-line:nth-child(2)').css('top', '59px');
            $(this).children('.menu-btn-line:nth-child(2)').css('left', '0px');
            $(this).children('.menu-btn-line:nth-child(2)').css('width', '60px');
            //Разворачиваем меню
            $('.menu').css('width', '100%');
            $('.menu__item').css('font-size', '25px');
        }
        else
        {
            //Присвоить кнопке аттрибут
            $(this).attr('clicked', 'false');
            //Восстанавливаем полоски кнопки
            $(this).children('.menu-btn-line:nth-child(1)').css('transform', 'rotate(0deg)');
            $(this).children('.menu-btn-line:nth-child(3)').css('transform', 'rotate(0deg)');
            //Поднимаем полоску
            $(this).children('.menu-btn-line:nth-child(2)').css('height', '2px');
            $(this).children('.menu-btn-line:nth-child(2)').css('top', '30px');
            $(this).children('.menu-btn-line:nth-child(2)').css('width', '40px');
            $(this).children('.menu-btn-line:nth-child(2)').css('left', '10px');
            //Сворачиваем меню
            $('.menu').css('width', '0%');
            $('.menu__item').css('font-size', '0px');
        }
    })//onclick
})