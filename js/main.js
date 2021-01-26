$(document).ready(function () {
    $('.nav-bar__btn').on('click', function () {
        let angle = '30deg', top_end = '59px', top_start = '30px', textsize = '25px',
            width_min = '40px', width_max = '60px', left_start = '10px'
        if ($(window).width() < 740)
        {
            angle = '15deg'; top_end = '39px'; textsize = '18px'; top_start = '19px';
        };
        if ($(window).width() < 500)
        {
            angle = '18deg'; top_end = '39px'; textsize = '14px'; top_start = '19px';
            width_min = '30px'; width_max = '40px'; left_start = '5px';
        }
        if ($(window).width() < 350)
        {
            textsize = '12px';
        }
        //alert()
        if ($(this).attr('clicked') == 'false') {
            //Присвоить кнопке аттрибут
            $(this).attr('clicked', 'true');
            //Формируем стрелку
            $(this).children('.menu-btn-line:nth-child(1)').css('transform', 'rotate('+angle+')');
            $(this).children('.menu-btn-line:nth-child(3)').css('transform', 'rotate(-'+angle+')');
            //Опускаем полоску
            $(this).children('.menu-btn-line:nth-child(2)').css('position', 'absolute');
            $(this).children('.menu-btn-line:nth-child(2)').css('height', '1px');
            $(this).children('.menu-btn-line:nth-child(2)').css('top', top_end);
            $(this).children('.menu-btn-line:nth-child(2)').css('left', '0px');
            $(this).children('.menu-btn-line:nth-child(2)').css('width', width_max);
            //Разворачиваем меню
            $('.menu').css('width', '100%');
            $('.menu__item').css('font-size', textsize);
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
            $(this).children('.menu-btn-line:nth-child(2)').css('top', top_start);
            $(this).children('.menu-btn-line:nth-child(2)').css('width', width_min);
            $(this).children('.menu-btn-line:nth-child(2)').css('left', left_start);
            //Сворачиваем меню
            $('.menu').css('width', '0%');
            $('.menu__item').css('font-size', '0px');
        }
    })//onclick
})