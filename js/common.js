/**
* --------------------------------
* ui.chatbot JS
* creator : chowoobin
* --------------------------------
*/
var fn = (function() {
	"use strict";

	return {
		//공통
		common : function(){
			//gnb
			fn.gnb();

			//popup
			fn.popup();
		},

		//gnb
		gnb : function(){
			var gnb_pos = new Array(),
					index,
					gnb_animate;
		
			$(".section_cont").each(function(i){
				gnb_pos.push($(this).offset().top);
			});
			
			$(window).resize(function(){
				gnb_pos = [];
				$(".section_cont").each(function(){
					gnb_pos.push($(this).offset().top);
				});
			})

			$(document).on("click", ".gnb_menu a", function() {
				$("body").removeClass("is_ovhideen");
				$(".gnb").removeClass("is_active");
				index = $(this).closest("li").index();
				gnb_animate = gnb_pos[index];
				$("html, body").animate({scrollTop : gnb_animate}, 600);
				$(".gnb_btn span").text("메뉴 열기");
			});

			$(document).on("focus", ".gnb_menu a", function() {
				if($(this).closest("li").index() == 3){
					$(this).on("blur", function() {
						$(".gnb_btn").focus();
					});
				}
			});

			$(document).on("click", ".gnb .gnb_btn", function() {
				if($(".gnb").hasClass("is_active")) {
					$(".gnb").removeClass("is_active");
					$("body").removeClass("is_ovhideen");
					$(".gnb_btn span").text("메뉴 열기");
				} else {
					$(".gnb").addClass("is_active");
					$("body").addClass("is_ovhideen");
					$(".gnb_btn span").text("메뉴 닫기");
				}
			});
		},

		// popup
		popup : function(){
			var $popup,
					$this;

			$(document).on("click", ".portfolio .title", function(){
				$this = $(this);
				$popup = $(this).attr("data-popup");
				$popup = $('#'+$popup);
				$popup.addClass("active");
				$("body").addClass("is_ovhideen");
				$popup.attr('tabindex', "0").focus();
			});

			$(document).on("click", ".popup_close", function(){
				$(".popup").removeClass("active");
				$("body").removeClass("is_ovhideen");
				$popup.attr('tabindex', "-1").focus();
				$this.focus();
			});
		},

		// intro
		intro : function(){
			var num = $(window).scrollTop() / 2;
			$("#section_intro").css("top", -num);
		},

		//animation
		animation : function(){
			var shape = $("#animate_shape .shape");
			var speed, speed_slow, speed_usually, speed_fast;

			for(var i=0; i < shape.length; i++) {
				speed = shape.eq(i).attr("data-shape"),
				speed_slow =  $(window).scrollTop() / 5,
				speed_usually =  $(window).scrollTop() / 2,
				speed_fast =  $(window).scrollTop() / 1.5;

				if(speed == "fast") {
					shape.eq(i).css("margin-top", -speed_fast);
				} else if(speed == "slow") {
					shape.eq(i).css("margin-top", -speed_slow);
				} else {
					shape.eq(i).css("margin-top", -speed_usually);
				}
			}
		}
	}
})();


$(document).on('ready', function(){
	//init
	AOS.init({});	// AOS
	fn.common();	// common

	$(window).scroll(function(){
		fn.intro();
		fn.animation();
	});

});
