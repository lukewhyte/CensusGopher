(function ($) {
	var sliding = function ($target) {
		var $titles = $(this).find('.slide h2');
		if (!$target.hasClass('active')) {
			$(this).find('ul').slideUp('fast');
			$titles.removeClass('active');
			$target.addClass('active').next('ul').slideDown();
		} else {
			$target.removeClass('active').next('ul').slideUp();
		}
	};

	$(function () {
		$('.accordion ul').click(function (e) {
			if ($(e.target).is('.slide h2')) {
				sliding.call(this, $(e.target));
			}
		});
	});
}(jQuery));