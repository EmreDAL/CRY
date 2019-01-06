'use strict';

$.each($('.tab'), function (index, tab) {
  $(this).find('.tab-menu a, .tab-menu button').on('click', function () {
    $(tab).find('.tab-menu a, .tab-menu button').removeClass('active');
    $(this).addClass('active');
    $(tab).find('.tab-content').removeClass('active');
    $(tab).find('.tab-content').eq($(this).index()).addClass('active');
  });
});