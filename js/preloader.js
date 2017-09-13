var images 				= document.images,
	images_total_count 	= images.length,
	images_loaded_count = 0,
	preloader 			= document.getElementById('page-preloader'),
	perc_display 		= document.getElementById('load-perc');
	
for(var i = 0; i < images_total_count; i++)
{
	image_clone 		= new Image();
	image_clone.onload 	= image_loaded;
	image_clone.onerror = image_loaded;
	image_clone.src 	= images[i].src;
}

function image_loaded() {
	images_loaded_count++;
	perc_display.innerHTML = (((100/images_total_count)*images_loaded_count) << 0) + '%';

	if(images_loaded_count >= images_total_count){
		setTimeout(function () {
			if (!preloader.classList.contains('preloader-2-done')) {
				preloader.classList.add('preloader-2-done');
			}
		}, 1000);
	}
}






















/*function test() {
	setTimeout(function () {
		var preloader = document.getElementById('page-preloader');
		if (!preloader.classList.contains('preloader-2-done')) {
			preloader.classList.add('preloader-2-done');
		}
	}, 1000);
}*/