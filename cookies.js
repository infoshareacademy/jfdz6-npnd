function showCookieInfo() {
    if (!localStorage.getItem('npnd-cookie-info')) {
        var cookieInfo = document.createElement('div');
        cookieInfo.setAttribute('id', 'cookieInfo');
        cookieInfo.innerHTML = "<p>Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do Twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje.</p><span id='closeCookieInfo'>&times;</span>";
        document.body.appendChild(cookieInfo);
        document.getElementById('closeCookieInfo').addEventListener('click', function () {
            document.body.removeChild(document.getElementById('cookieInfo'));
            localStorage.setItem('npnd-cookie-info', '1');
        });
    }
}