window.onscroll = function () {
    topButtonFunction()
};

function topButtonFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        $('#topBtn').addClass('active');
    } else {
        $('#topBtn').removeClass('active');
    }
}
