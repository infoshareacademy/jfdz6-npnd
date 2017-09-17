window.onscroll = function () {
    topButtonFunction()
};

function topButtonFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        $('#topBtn').addClass('active');
        $('.navbar').addClass('shrink');
        $('.img-logo').addClass('shrink');
    } else {
        $('#topBtn').removeClass('active');
        $('.navbar').removeClass('shrink');
        $('.img-logo').removeClass('shrink').addClass('shrinkOut');
    }
}

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});