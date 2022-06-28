
$('#signup').click(() => {
    $('.pinkbox').css('transform', 'translateX(80%)');
    $('.signin').addClass('nodisplay');
    $('.signup').removeClass('nodisplay');

})
$('#signin').click(() => {
    $('.pinkbox').css('transform', 'translateX(0%)');
    $('.signup').addClass('nodisplay');
    $('.signin').removeClass('nodisplay');

})