var $startGameButton = $('#start-game');
$startGameButton.click(startGame);

function startGame() {
    var timer = 5;
    var $table = helpers.createTable(15, 20);
    var $app = $('#app'); // Find element with id = 'app'
    var $lastRowCells = $('tr:last td', $table);
    var $startPlayerPosition = $lastRowCells.eq(parseInt($lastRowCells.length / 2));
    var $firstRowCells = $('tr:first td', $table);
    var $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));

    $('td', $table).addClass('cell');
    $(function () {
        $startPlayerPosition.addClass('player-cell');
    });

    $startGameButton.on('click', function () {
        clearInterval(createCoin);
        clearInterval(coinMovement);
        $table.remove();
    });

    var createCoin = setInterval(function () {
        $(function () {
            $startCoinPosition.addClass('coin-cell');
            $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
        })
    }, 1000);
    var coinMovement = setInterval(function () {
        $('td.coin-cell').each(function () {
            $(this).removeClass('coin-cell').parent().next().find('td').eq($(this).index()).addClass('coin-cell')
        })
    }, 100);
    $app.append($table);
    $startGameButton.hide();

// x.eq(parseInt(x.length/2)) <-- środkowa pozycja w ostatnim rzędzie

    function moveRight() {
        if ($('.player-cell', $table).next().length) {
            $('.player-cell', $table).removeClass('player-cell').next().addClass('player-cell');
        }
    }

    function moveLeft() {
        if ($('.player-cell', $table).prev().length) {
            $('.player-cell', $table).removeClass('player-cell').prev().addClass('player-cell');
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
        if (timer < 0) {
            clearInterval(gameTimer);
            alert('KUNIEC');
            $table.remove();
            $startGameButton.show();
        }
        console.log(timer)
    }, 1000)
}

