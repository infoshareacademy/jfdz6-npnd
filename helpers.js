var helpers = {
    createTable: function (width, height) {
        var $table = $('<table>');
        for (var j = 0; j < height; j += 1) {
            $tr = $('<tr>');
            for (var i = 0; i < width; i += 1) {
                // Create new <td> element on every iteration.
                // We need that because we cannot force one <td>
                // to exist in multiple parts of DOM in the same
                // time.
                $td = $('<td>');

                $tr.append($td);
            }
            $table.append($tr);
        }
        return $table;
    }
};