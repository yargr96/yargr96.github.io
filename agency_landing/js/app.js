$(document).ready(function() {
	//modals
	$('a#show_case-1').click(function(event) {
		event.preventDefault();
		$('#case-1').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#show_case-2').click(function(event) {
		event.preventDefault();
		$('#case-2').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#show_case-3').click(function(event) {
		event.preventDefault();
		$('#case-3').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#show_case-4').click(function(event) {
		event.preventDefault();
		$('#case-4').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#show_case-5').click(function(event) {
		event.preventDefault();
		$('#case-5').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#show_case-6').click(function(event) {
		event.preventDefault();
		$('#case-6').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a.calc-btn').click(function(event) {
		event.preventDefault();
		$('#calculate-popup').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a.request').click(function(event) {
		event.preventDefault();
		$('#callback-popup').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#hamburger').click(function(event) {
		event.preventDefault();
		$('.mobile-menu').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#question_1').click(function(event) {
		event.preventDefault();
		$('.service-popup_1').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#question_2').click(function(event) {
		event.preventDefault();
		$('.service-popup_2').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#question_3').click(function(event) {
		event.preventDefault();
		$('.service-popup_3').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	$('a#question_4').click(function(event) {
		event.preventDefault();
		$('.service-popup_4').css('display', 'block')
					.animate({opacity: 1, left: 0}, 500)
	});
	// Закрытие окна
	$('.popup-case_column_close').click(function() {
		$('.popup-case')
			.animate({opacity: 0, left: '100%'}, 500,
				function() {
					$(this).css('display', 'none');
				}
		);
		$('.mobile-menu')
			.animate({opacity: 0, left: '100%'}, 500,
				function() {
					$(this).css('display', 'none');
				}
		);
		$('.service-popup')
			.animate({opacity: 0, left: '100%'}, 500,
				function() {
					$(this).css('display', 'none');
				}
		);
	});
	$('.mobile-menu').click(function() {
		$('.mobile-menu')
			.animate({opacity: 0, left: '100%'}, 500,
				function() {
					$(this).css('display', 'none');
				}
		);
	});

    $(".popup-case_preview-i2").niceScroll({
        cursorcolor: "#f5c84a"
    });
});