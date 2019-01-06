"use strict";

$.fn.extend({
    animateCss: function animateCss(animationName, endFunction) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            if (typeof endFunction == "function") {
                endFunction.call();
            }
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    },
    animateCounter: function animateCounter(_params) {
        var $display = $(this);

        var params = $.extend({
            delay: 80,
            startDataAttr: "start",
            endDataAttr: "end"
        }, _params);

        var start = $display.data(params.startDataAttr);
        var numberEnd = $display.data(params.endDataAttr);

        var _loop = function _loop(i) {
            setTimeout(function () {
                $display.text(i);
            }, params.delay * i);
        };

        for (var i = start; i <= numberEnd; i++) {
            _loop(i);
        }

        return $display;
    }
});