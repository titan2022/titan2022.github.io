
//Different movement speed functions
$.fn.moveIt = function(){
	var $window = $(window);
	var instances = [];

	$(this).each(function(){
		instances.push(new moveItItem($(this)));
	});

	window.addEventListener('scroll', function(){
		var scrollTop = $window.scrollTop();
		instances.forEach(function(inst){
			inst.update(scrollTop);
		});
	}, {passive: true});
}

var moveItItem = function(el){
	this.el = $(el);
	this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop){
	this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function(){
	$('[data-scroll-speed]').moveIt();
	//for sponsors
	$(".title").hover(function(){
		$(this).toggleClass("is-active");
	});
	//pausing video when not on screen 
	$(window).scroll(function() {
		var top_of_element = $("#intro").offset().top;
		var bottom_of_element = $("#intro").offset().top + $("#intro").outerHeight();
		var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
		var top_of_screen = $(window).scrollTop();
		if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
			$('#video').trigger('play');
		} else {
			$('#video').trigger('pause');
		}
	});
});