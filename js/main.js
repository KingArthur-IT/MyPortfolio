//Меню
$(document).ready(function () {
    $('.nav-bar__btn').on('click', function () {
        let angle = '30deg', top_end = '59px', top_start = '29px', textsize = '25px',
            width_min = '40px', width_max = '60px', left_start = '10px'
        if ($(window).width() < 741)
        {
            angle = '15deg'; top_end = '39px'; textsize = '18px'; top_start = '19px';
        };
        if ($(window).width() < 501)
        {
            angle = '18deg'; top_end = '39px'; textsize = '14px'; top_start = '19px';
            width_min = '30px'; width_max = '40px'; left_start = '5px';
        }
        if ($(window).width() < 351)
        {
            textsize = '12px';
        }
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

//При изменении размеров окна отрегулировать меню
$(window).resize(function(){
    let angle = '30deg', top_end = '59px', top_start = '29px', textsize = '25px',
            width_min = '40px', width_max = '60px', left_start = '10px'
        if ($(window).width() < 741)
        {
            angle = '15deg'; top_end = '39px'; textsize = '18px'; top_start = '19px';
        };
        if ($(window).width() < 501)
        {
            angle = '18deg'; top_end = '39px'; textsize = '14px'; top_start = '19px';
            width_min = '30px'; width_max = '40px'; left_start = '5px';
        }
        if ($(window).width() < 351)
        {
            textsize = '12px';
        }
        //alert($(window).width())
        if ($('.nav-bar__btn').attr('clicked') == 'true') {
            //Исправляем поворот стрелки
            $('.menu-btn-line:nth-child(1)').css('transform', 'rotate('+angle+')');
            $('.menu-btn-line:nth-child(3)').css('transform', 'rotate(-'+angle+')');
            //Положение средней полоски
            $('.menu-btn-line:nth-child(2)').css('top', top_end);
            $('.menu-btn-line:nth-child(2)').css('width', width_max);
            //Шрифт меню
            $('.menu__item').css('font-size', textsize);
        }
        else
        {
            //Средняя полоска
            $('.menu-btn-line:nth-child(2)').css('top', top_start);
            $('.menu-btn-line:nth-child(2)').css('width', width_min);
            $('.menu-btn-line:nth-child(2)').css('left', left_start);
        }
});

//Анимация технологий
$(document).ready(function () {
    let fan_animation;
    let tech_animation = [];
    
    $('.tech-animation__img').on('click', function () {
        if ($(this).attr('clicked') == 'false')
        {
            $(this).attr('clicked', 'true'); //Присвоить аттрибут кнопке
            fan_animation = document.getElementById("fan").animate(
                { transform: 'rotate3d(0,0,1,-360deg)' },
                {
                    duration: 500,
                    iterations: 100
                }
            )//animate
            technologiesAnimationStart();
        }//if
        else {
            $(this).attr('clicked', 'false');
            fan_animation.cancel();
            technologiesAnimationStop();
        }
    })//click    
    
    function technologiesAnimationStart() {
        let len = document.getElementsByClassName('tech-list__item').length;
        for (let i = 1; i <= len; i++)
        {
            let id = "tech-item-" + i;
            let t = document.getElementById(id).offsetTop;
            let r = Math.random() * 20;
            if (r < 5)
                r = 5;
            tech_animation[i - 1] = document.getElementById(id).animate(
            [
                { top: t + 'px' },
                { top: t + r + 'px' },
                { top: t + 'px' },
                { top: t - r + 'px' }
            ],
            {
                duration: Math.abs(r) *  200,
                iterations: 100,
                direction: 'alternate-reverse',
                easing: 'ease-in-out',
                delay: 500
            }
            )//animate
        }//for
    }//function technologiesAnimation()
    function technologiesAnimationStop() {
        let len = document.getElementsByClassName('tech-list__item').length;
        for (let i = 1; i <= len; i++) {
            tech_animation[i - 1].cancel();
        }//for
    }//technologiesAnimationStop
})//ready

$(document).ready(function () {
    $('.case__slider').slick({
        infinite: true,
        slidesToShow: 1,
        prevArrow: $('.back-btn'),
        nextArrow: $('.next-btn')
      });
})