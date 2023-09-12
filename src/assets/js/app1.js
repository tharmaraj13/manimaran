$(function () {
	"use strict";
	$(".mobile-toggle-menu").on("click", function () {
		$(".wrapper").addClass("toggled")
	});
	$(".toggle-icon").click(function () {
		$(".wrapper").hasClass("toggled") ? $(".wrapper").removeClass("toggled") : $(".wrapper").addClass("toggled");
	});
});