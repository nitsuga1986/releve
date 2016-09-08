//= require jquery
//= require jquery_ujs
//= require bootstrap.min
$(window).load(function(){$('#modal2').modal('show');});

// Mobile Nav
$('body').on('click', 'nav .navbar-toggle', function() {
	$('.mobile-nav').addClass('active');
});

$('body').on('click', '.mobile-nav a', function(event) {
	$('.mobile-nav').removeClass('active');
	if(!this.hash) return;
	event.preventDefault();
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		event.stopPropagation();
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
		}
	}
});

$('body').on('click', '.mobile-nav a.close-link', function(event) {
	$('.mobile-nav').removeClass('active');
	event.preventDefault();
});

$('body').on('click', 'nav.original .navbar-nav a:not([data-toggle])', function() {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		event.stopPropagation();
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 1000);
			return false;
		}
	}
});
