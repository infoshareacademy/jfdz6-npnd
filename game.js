var $startGameButton = $('#start-game');
$startGameButton.click(startGame);
var highscore;
var $highscore;

function startGame() {
    var timer = 5;
    var $table = helpers.createTable(15, 20);
    var $app = $('#app'); // Find element with id = 'app'
    var $lastRowCells = $('tr:last td', $table);
    var $startPlayerPosition = $lastRowCells.eq(parseInt($lastRowCells.length / 2));
    var $firstRowCells = $('tr:first td', $table);
    var $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
    var points = 0;
    var $gameManual = $('#game-manual');
    var coinMovement;
    $('.timer').show();
    $('.score').show();

    $('td', $table).addClass('cell');
    $(function () {
        $startPlayerPosition.addClass('player-cell');
    });

    function cleanup() {
        clearInterval(createCoin);
        clearInterval(coinMovement);
        clearInterval(gameTimer);
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

// x.eq(parseInt(x.length/2)) <-- środkowa pozycja w ostatnim rzędzie

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
            showScore(points);
            cleanup();
        }
        console.log(timer);
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

    highscore = JSON.parse(localStorage.getItem('wynik')) || [];
    highscore.sort((a, b) => b - a);
    console.log("O TO NAJLEPSZE WYNIKI: " + highscore.slice(0, 5));

    function showScore(points) {
        highscore.push(points);
        localStorage.setItem('wynik', JSON.stringify(highscore));
    }

    function showHighscore() {
        if (!$highscore) {
            $highscore = $('<ol>');
            $('.highscore').append($highscore);
        }
        $highscore.empty();
        for (var i = 0; i < 5; i++) {
            var $li = $('<li>');
            $li.html(highscore[i]);
            $highscore.append($li);
        }
        return $highscore;
    }

    showHighscore();
}