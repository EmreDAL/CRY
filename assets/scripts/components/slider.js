'use strict';

var slider = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    effect: "coverflow",
    loop: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    }
});