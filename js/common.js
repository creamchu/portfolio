$(document).ready(function(){
	
	AOS.init({});	// AOS
	var is_active = true;	// 스킬 애니메이션 체크

	$(window).scroll(function(){
		// intro
		var num = $(window).scrollTop() / 2;
		$("#section_intro").css("top", -num);

		// shape animation
		var shape = $("#animate_shape .shape");

		for(var i=0; i < shape.length; i++) {
			var speed = shape.eq(i).attr("data-shape");
			speed_slow =  $(window).scrollTop() / 5;
			speed_usually =  $(window).scrollTop() / 2;
			speed_fast =  $(window).scrollTop() / 1.5;
			if(speed == "fast") {
				shape.eq(i).css("margin-top", -speed_fast);
			} else if(speed == "slow") {
				shape.eq(i).css("margin-top", -speed_slow);
			} else {
				shape.eq(i).css("margin-top", -speed_usually);
			}
		}

		// 스킬 수치화
		var offset_prev,
			data_num;
		if($(window).outerWidth() < 768) {
			offset_prev = $("#section_skill").offset().top - $("#section_skill").outerHeight() / 2;
		} else {
			offset_prev = $("#section_skill").offset().top - $("#section_skill").outerHeight();
		}

		if($(window).scrollTop() > offset_prev && is_active) {
			$(".graph_info li").each(function(){
				data_num = $(this).find(".num").attr("data-num");
				$(this).find(".num").addClass("is-active");
				$(this).find(".num").animate({"width": data_num + "%"},500);
			});
			is_active = false;
		}
		
		if($(window).scrollTop() > offset_prev) {
			is_active = false;
		} else {
			$(".graph_info li .num").removeClass("is-active");
			$(".graph_info li .num").css("width", "0");
			is_active = true;
		}
	});

	// 포트폴리오 팝업
	var $modal,
		$modal_this;
	$(".portfolio .title").on("click", function(){
		$modal = $(this).attr("data-modal");
		$(".modal[data-modal=" + $modal + "]").addClass("active");
		$("body").addClass("no-scroll");
		$(".modal[data-modal=" + $modal + "]").attr('tabindex', "0").focus();
		$modal_this = $(this);
	});
	$(".modal_close").on("click", function(){
		$(".modal").removeClass("active");
		$("body").removeClass("no-scroll");
		$(".modal[data-modal=" + $modal + "]").attr('tabindex', "-1").focus();
		$modal_this.focus();
	});

	gnb();
});
function gnb() {
	// gnb
	var gnb_pos = new Array(),
		index,
		gnb_animate,
		section_length;

	$(".section_cont").each(function(i){
		gnb_pos.push($(this).offset().top);
		section_length = i;
	});
	
	$(window).resize(function(){
		gnb_pos = []
		$(".section_cont").each(function(){
			gnb_pos.push($(this).offset().top);
		});
	})
	$(".menu a").on("click", function() {
		$("body").removeClass("no-scroll");
		$(".gnb").removeClass("is-active");
		index = $(this).closest("li").index();
		gnb_animate = gnb_pos[index];
		$("html, body").animate({scrollTop : gnb_animate}, 600);
		$(".menu_button span").text("메뉴 열기");
	});
	$(".menu a").on("focus", function() {
		if($(this).closest("li").index() == 3){
			$(this).on("blur", function() {
				$(".menu_button").focus();
			});
		}
	});
	$(".gnb .menu_button").on("click", function() {
		if($(".gnb").hasClass("is-active")) {
			$(".gnb").removeClass("is-active");
			$("body").removeClass("no-scroll");
			$(".menu_button span").text("메뉴 열기");
		} else {
			$(".gnb").addClass("is-active");
			$("body").addClass("no-scroll");
			$(".menu_button span").text("메뉴 닫기");
		}
	});
}