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
$.each($('.tab'), function (index, tab) {
    $(this).find('.tab-menu a, .tab-menu button').on('click', function () {
        $(tab).find('.tab-menu a, .tab-menu button').removeClass('active');
        $(this).addClass('active');
        $(tab).find('.tab-content').removeClass('active');
        $(tab).find('.tab-content').eq($(this).index()).addClass('active');
    });
});

var $firstIsMobile = $(window).width() < 768 ? true : false;
var videos = [],
    canvases = [],
    reqIds = [],
    videoStatus = [];

function startPlayback(container, index) {
    if (!videos[index]) {
        videos[index] = document.createElement('video');
        var video = videos[index];
        video.muted = true;
        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.setAttribute('playsinline', true);
        video.allowsInlineMediaPlayback = true;
        video.loop = true;
        video.autoplay = true;
        var sourcemp4 = document.createElement("source");
        sourcemp4.setAttribute("type", "video/mp4");
        var sourcewebm = document.createElement("source");
        sourcewebm.setAttribute("type", "video/webm");
        var sourceogg = document.createElement("source");
        sourceogg.setAttribute("type", "video/ogg");
        if ($firstIsMobile) {
            if ($(container).data("mobile-mp4") != "") {
                sourcemp4.setAttribute("src", $(container).data("mobile-mp4"));
                video.appendChild(sourcemp4);
            }
            if ($(container).data("mobile-webm") != "") {
                sourcewebm.setAttribute("src", $(container).data("mobile-webm"));
                video.appendChild(sourcewebm);
            }
            if ($(container).data("mobile-ogg") != "") {
                sourceogg.setAttribute("src", $(container).data("mobile-ogg"));
                video.appendChild(sourceogg);
            }
        } else {
            if ($(container).data("mp4") != "") {
                sourcemp4.setAttribute("src", $(container).data("mp4"));
                video.appendChild(sourcemp4);
            }
            if ($(container).data("webm") != "") {
                sourcewebm.setAttribute("src", $(container).data("webm"));
                video.appendChild(sourcewebm);
            }
            if ($(container).data("ogg") != "") {
                sourceogg.setAttribute("src", $(container).data("ogg"));
                video.appendChild(sourceogg);
            }
        }
        video.load();
        video.addEventListener('loadeddata', function () {
            video.play();
            video.addEventListener('playing', paintVideo(container, index));
        }, false);
    } else {
        startVideo(container, index);
    }
}

function toogleMutedVideo(index) {
    videos[index].muted = !videos[index].muted;
}

function paintVideo(container, index) {
    if (!canvases[index]) {
        $(container).find("img").addClass("hide");
        canvases[index] = document.createElement('canvas');
        canvases[index].width = videos[index].videoWidth;
        canvases[index].height = videos[index].videoHeight;
        container.appendChild(canvases[index]);
        canvases[index].addEventListener("click", function () {});
    }
    canvases[index].getContext('2d').drawImage(videos[index], 0, 0, canvases[index].width, canvases[index].height);
    if (!video.paused) reqIds[index] = requestAnimationFrame(paintVideo.bind(this, container, index));
}

function stopVideo(index) {
    cancelAnimationFrame(reqIds[index]);
    if (!videos[index].paused) {
        videos[index].pause();
    }
}

function startVideo(container, index) {
    if (videos.length >= index) {
        requestAnimationFrame(paintVideo.bind(this, container, index));
        if (videos[index].paused) {
            videos[index].play();
        }
    }
}

$(window).on("load", function () {
    startPlayback($(".video")[0], 0);
});