$(document).ready(function() {

	//Плавные  скроллы
	$('a.category-up').click(function() {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top + 'px'
		}, {
			duration: 300,
			easing: 'swing'
		});
		return false;
	});
	$('a.main-down-link').click(function() {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top + 'px'
		}, {
			duration: 300,
			easing: 'swing'
		});
		return false;
	});


	//Табы
	$('.category-content-item_btn').click(function() {
		if(!$(this).hasClass('category-content-item_btn_active')) {
			var i = $(this).attr('data-num');
			$('.category-content-item_btn_active').removeClass('category-content-item_btn_active');
			$('.tabs-item_active').removeClass('tabs-item_active');
			$(this).addClass('category-content-item_btn_active');
			$('.tabs-item_' + i).addClass('tabs-item_active');
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top + 'px'
			}, {
				duration: 300,
				easing: 'swing'
			});
			return false;

		}
		else {
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top + 'px'
			}, {
				duration: 300,
				easing: 'swing'
			});
			return false;
		}
	})

	//Slick
	$('.feedback-slider').slick({
		infinite: true,
		fade: true
	});

})