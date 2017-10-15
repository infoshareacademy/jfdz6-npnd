var $app = $('#app'); // Find element with id = 'app'
var $table = helpers.createTable(10, 10);
var $lastRowCells = $('tr:last td', $table);
var $startPlayerPosition = $lastRowCells.eq(parseInt($lastRowCells.length / 2));
var $firstRowCells = $('tr:first td', $table);
var $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
var points = 0;

$('td', $table).addClass('cell');
$(function () {
    $startPlayerPosition.addClass('player-cell');
});

setInterval(function () {
    $(function () {
        $startCoinPosition.addClass('coin-cell');
        $startCoinPosition = $firstRowCells.eq(Math.floor(Math.random() * parseInt($firstRowCells.length)));
    })
}, 1000);


$app.append($table);

// x.eq(parseInt(x.length/2)) <-- środkowa pozycja w ostatnim rzędzie

function moveRight() {
    if ($('.player-cell', $table).next().length) {
        $('.player-cell', $table).removeClass('player-cell').next().addClass('player-cell');
        calculateScore();
    }
}

function moveLeft() {
    if ($('.player-cell', $table).prev().length) {
        $('.player-cell', $table).removeClass('player-cell').prev().addClass('player-cell');
        calculateScore();
    }
}

$(window).on('keydown', function (event) {
    console.log(event.keyCode);
    if (event.keyCode === 39) {
        moveRight()
    }
    if (event.keyCode === 37) {
        moveLeft()
    }

});
setInterval(function () {
    $('td.coin-cell').each(function () {
        $(this).removeClass('coin-cell').parent().next().find('td').eq($(this).index()).addClass('coin-cell')
    });
    calculateScore();
}, 1000);

function calculateScore() {

    var pointCell = $('td.coin-cell.player-cell', $table);
    if (pointCell.length) {
        pointCell.removeClass('coin-cell');
        points++;
    }
    $('.score').text(points);
}
