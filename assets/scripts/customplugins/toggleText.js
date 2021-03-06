"use strict";

(function ($) {
	$.fn.toggleText = function (_params) {

		var params = $.extend({
			statefun: false
		}, _params);

		var $toggle = this;
		var text = "";

		$toggle.text(function (i, text) {
			if ($toggle.attr("data-text")) {
				text = $(this).data("text");
				$toggle.removeAttr("data-text");
			} else {
				$toggle.attr("data-text", text);
				text = $toggle.data("toggle");
			}
			return text;
		});

		return $toggle;
	};
})(jQuery);