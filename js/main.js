var App = function() {
	// initializes main settings
	var handleInit = function() {

	};

	var mailreplace = function () {
		$('a[href^="mailto:"]').each(function(i) {
			var elm = this;
			var newhref = $(elm).attr('href').replace("##kukac##" , String.fromCharCode(64));
			$(elm).attr( 'href' , newhref);

			var newtext = $(elm).html().replace("##kukac##" , String.fromCharCode(64));
			$(elm).html(newtext);
		});
	};

	//* END:CORE HANDLERS *//

	return {
		init: function() {
			//Core handlers
			handleInit();

			mailreplace();
		},

		initIndex: function() {
			function carousel_height() {
				$('#mrfunk_carousel').height($(window).height()/1.5);
			}
			carousel_height();

			$(window).load(function() {
				carousel_height();
			});

			$(window).resize(function() {
				carousel_height();
			});

			$('#mrfunk_carousel').on('slide.bs.carousel', function (e) {
				$(e.relatedTarget).attr("style", $(e.relatedTarget).attr("data-style"));

				if (e.direction == "left") {
					$(e.relatedTarget).next().attr("style", $(e.relatedTarget).next().attr("data-style"));
				}
				else {
					$(e.relatedTarget).prev().attr("style", $(e.relatedTarget).prev().attr("data-style"));
				}

				if ($(window).width() >= 768) {
					$(e.relatedTarget).simpleParallax();
				}

				$('.welcome-text').find('.label').removeClass("label-donuts label-bagels label-shakes label-drinks");

				if ($(e.relatedTarget).index() === 0) {
					$('.welcome-text').find('.label').addClass('label-donuts');
				}
				else if ($(e.relatedTarget).index() == 1) {
					$('.welcome-text').find('.label').addClass('label-bagels');
				}
				else if ($(e.relatedTarget).index() == 2) {
					$('.welcome-text').find('.label').addClass('label-shakes');
				}
				else {
					$('.welcome-text').find('.label').addClass('label-drinks');
				}
			});

			$('#mrfunk_carousel .item.active').attr("style", function() { return $(this).attr('data-style'); });
			$('#mrfunk_carousel .item.active').next().attr("style", function() { return $(this).attr('data-style'); });
			$('#mrfunk_carousel .item').last().attr("style", function() { return $(this).attr('data-style'); });

			if ($(window).width() >= 768) {
				$('#mrfunk_carousel .item.active').simpleParallax();

				$(window).load(function() {
					$('#mrfunk_carousel .item.active').simpleParallax();
				});

				$(window).resize(function () {
					$('#mrfunk_carousel .item.active').simpleParallax();
				});
			}
		}
	};
}();

$(function() {
	App.init();
});
