var $app = $('#app'); // Find element with id = 'app'
var $table = helpers.createTable(11, 10);
var $lastRowCells = $('tr:last td', $table);
var $startPlayerPosition = $lastRowCells.eq(parseInt($lastRowCells.length / 2));

$('td', $table).addClass('cell');
$(function () {
    $startPlayerPosition.addClass('player-cell');
});
$app.append($table);

// x.eq(parseInt(x.length/2)) <-- środkowa pozycja w ostatnim rzędzie
