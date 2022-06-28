$(function () {
  $(".nav a").click(function () {
    var position = $(this).position();
    $(".btn").css({
      left: +position.left + 20,
    });
    $(".nav a").removeClass("a-active");
    $(this).addClass("a-active");
  });
});
