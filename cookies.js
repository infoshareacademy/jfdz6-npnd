function showCookieInfo() {
    if (!localStorage.getItem('npnd-cookie-info')) {
        var cookieInfo = document.createElement('div');
        cookieInfo.setAttribute('id', 'cookieInfo');
        cookieInfo.innerHTML = "<p>To jest komunikat o ciasteczkach</p><span id='closeCookieInfo'>&times;</span>";
        document.body.appendChild(cookieInfo);
        document.getElementById('closeCookieInfo').addEventListener('click', function () {
            document.body.removeChild(document.getElementById('cookieInfo'));
            localStorage.setItem('npnd-cookie-info', '1');
        });
    }
}