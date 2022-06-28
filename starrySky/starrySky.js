$(function () {
  let stars = 1000;
  let $stars = $(".satrs");
  for (let i = 0; i < stars; i++) {
    let $star = $("<div>").addClass("star");
    $stars.append($star);
  }
  $(".star").each(function () {
    let star_i = $(this);
    let scale = 0.2 + Math.random() * 1;
    let radius = 100 + Math.random() * 300;
    star_i.css({
      transformOrigin: "0 0 " + radius + "px",
      transform:
        "translate3d(0,0,-" +
        radius +
        "px) rotateY(" +
        Math.random() * 360 +
        "deg) rotateX(" +
        Math.random() * -60 +
        "deg) scale(" +
        scale +
        "," +
        scale +
        ")",
    });
  });
});
