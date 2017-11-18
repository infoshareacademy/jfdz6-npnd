var $startGameButton = $('#start-game');
var $welcomeScreen = $('.welcome');
$startGameButton.click(getPlayerName);
var highscore;
var $highscore;

function getPlayerName() {

    var playerName = prompt('Podaj swoje imię');
    while (!playerName) {
        playerName = prompt('Podaj swoje imię');
    }

    startGame(playerName)
}

function startGame(playerName) {
    var timer = 5;
    var $table = helpers.createTable(15, 20);
    var $app = $('#app');
    var $lastRowCells = $('tr:last td', $table);
    var $startPlayerPosition = $lastRowCells.eq(parseInt($lastRowCells.length / 2));
    var $firstRowCells = $('tr:first td', $table);
    var $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
    var points = 0;
    var $gameManual = $('#game-manual');
    var coinMovement;
    $('.timer').show();
    $('.score').show();
    $('.highscore').hide();

    $('td', $table).addClass('cell');
    $(function () {
        $startPlayerPosition.addClass('player-cell');
    });

    function cleanup() {
        clearInterval(createCoin);
        clearInterval(coinMovement);
        clearInterval(gameTimer);
        showScore(points);
        $table.remove();


    }

    var createCoin = setInterval(function () {
        $(function () {
            $startCoinPosition.addClass('coin-cell');
            $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
        });
        calculateScore();
    }, 1000);

    function difficulty(score) {
        return score > 10 ? 50 : 100;
    }

    function go(howFast) {
        coinMovement = setTimeout(function () {
            $('td.coin-cell').each(function () {
                $(this).removeClass('coin-cell').parent().next().find('td').eq($(this).index()).addClass('coin-cell')
            });
            calculateScore();
            if (timer > 0) {
                go(difficulty(points))
            }
        }, howFast);
    }

    go(100);

    $app.append($table);
    $app.append($gameManual);
    $startGameButton.hide();
    $welcomeScreen.hide();

    function moveRight() {
        if ($('.player-cell', $table).next().length) {
            $('.player-cell', $table).removeClass('player-cell player-cell-right player-cell-left').next().addClass('player-cell player-cell-right');
            calculateScore();
        }
    }

    function moveLeft() {
        if ($('.player-cell', $table).prev().length) {
            $('.player-cell', $table).removeClass('player-cell player-cell-right player-cell-left').prev().addClass('player-cell player-cell-left');
            calculateScore();
        }
    }

    $(window).on('keydown', function (event) {
        if (event.keyCode === 39) {
            moveRight()
        }
        if (event.keyCode === 37) {
            moveLeft()
        }
    });

    var gameTimer = setInterval(function () {
        timer--;
        if (timer <= 0) {
            alert('KUNIEC. Twój wynik to: ' + points);
            $table.remove();
            $('.timer').hide();
            $('.score').hide();
            $startGameButton.show();
            $('.highscore').show();
            $welcomeScreen.show();
            cleanup();
        }
        $('.timer').text("Time left: " + timer);
    }, 1000);

    function calculateScore() {

        var pointCell = $('td.coin-cell.player-cell', $table);

        if (pointCell.length) {
            pointCell.removeClass('coin-cell');
            points++;
            timer += 2;
        }
        $('.score').text('Score: ' + points);
    }

    highscore = JSON.parse(localStorage.getItem('wyniki')) || [];


    function showScore(points) {
        var myResult = {
            name: playerName,
            score: points
        };
        highscore.push(myResult);
        localStorage.setItem('wyniki', JSON.stringify(highscore));
        showHighscore(highscore.sort((a, b) => b.score - a.score));
    }

    function showHighscore(highscore) {
        if (!$highscore) {
            $highscore = $('<ol>');
            $('.highscore').append($highscore);
        }
        $highscore.empty();
        for (var i = 0; i < 5; i++) {
            var $li = $('<li>');
            $li.append(highscore[i].score + " ");
            $li.append(highscore[i].name);
            $highscore.append($li);
        }
        return $highscore;
    }


}