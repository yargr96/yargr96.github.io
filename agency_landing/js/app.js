function showCase() {
	var popup = $('#case-1');
	popup.style.display = "block";
	window.setTimeout(function() {
		popup.addClass('popup-case_active')
	}, 0);
	
}
function hideCase() {
	var popup = $('.popup-case_active');
	popup.removeClass('popup-case_active');
	popup.css('display', 'none');
}
document.addEventListener("DOMContentLoaded", function() {

 document.querySelector(".portfolio_item_cover_btn").addEventListener("click", function() {

     var popup = document.querySelector("#case-1");

     popup.style.display = "block";

     window.setTimeout(function() {

         popup.classList.add("popup-case_active")

     }, 0)

 })

});
