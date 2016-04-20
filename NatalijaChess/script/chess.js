
// Chessboard
// King
// Queen 
// Rook x2 (top)
// Knight x2 (konj)
// Bishop x2 (laufer)
// Pawn x8

var WHITE = 'w';
var BLACK = 'b';
var LETTERS = 'abcdefgh';

// Self-contained instance of a chessboard
function Chessboard() {
    this.reset();
}

Chessboard.prototype.reset = function() {
    var i;
    this.turn = true;
    this.numMoves = 1;
    this.figures = [];
    this.board = [];
    for (i = 0; i < 8; i++) this.board[i] = [null, null, null, null, null, null, null, null];

    this.set(0, 0, new Rook(WHITE, "&#9814", 1));
    this.set(0, 1, new Knight(WHITE, "&#9816;", 1));
    this.set(0, 2, new Laufer(WHITE, "&#9815;", 1));
    this.set(0, 3, new Queen(WHITE, "&#9812"));
    this.set(0, 4, new King(WHITE, "&#9813"));
    this.set(0, 5, new Laufer(WHITE, "&#9815;", 2));
    this.set(0, 6, new Knight(WHITE, "&#9816;", 2));
    this.set(0, 7, new Rook(WHITE, "&#9814", 2));

    for (i = 0; i < 8; i++) {
        this.set(1, i, new Pawn(WHITE, "&#9817;", i + 1));
        this.set(6, i, new Pawn(BLACK, "&#9823;", i + 1));
    }

    this.set(7, 0, new Rook(BLACK, "&#9820;", 1));
    this.set(7, 1, new Knight(BLACK, "&#9822;", 1));
    this.set(7, 2, new Laufer(BLACK, "&#9821;", 1));
    this.set(7, 3, new Queen(BLACK, "&#9819;"));
    this.set(7, 4, new King(BLACK, "&#9818;"));
    this.set(7, 5, new Laufer(BLACK, "&#9821;", 2));
    this.set(7, 6, new Knight(BLACK, "&#9822;", 2));
    this.set(7, 7, new Rook(BLACK, "&#9820;", 2));
}

Chessboard.prototype.set = function(row, col, fig) {
    if (fig.board === undefined) {
        Object.defineProperty(fig, 'board', {
            value: this,
            writable: false,
            enumerable: false,
            configurable: false
        });
        this.figures.push(fig);
    }
    this.board[row][col] = fig;
    fig.pos = new Pos(row, col);
}

Chessboard.prototype.at = function(a, b) {
    if (a === undefined) return undefined;
    var pos = a;
    if (arguments.length == 2) pos = new Pos(a, b);
    if (!pos.isValid()) return undefined;
    return this.board[pos.row][pos.col];
}

Chessboard.prototype.moves = function() {
    var moves = [];
    this.figures.forEach(function(fig) {
        var x = fig.moves();
        if (x && x.length > 0) moves = moves.concat(x);
    });
    return moves;
}

Chessboard.prototype.toString = function() {
    var s = '';
    var i, j;
    for (i = 7; i >= 0; i--) {
        s += (i + 1) + ' ';
        for (j = 0; j < 8; j++) {
            s += (this.board[i][j] || '...') + ' ';
        }
        s += '\n';
    }
    s += '   A   B   C   D   E   F   G   H\n';
    return s;
}

Chessboard.prototype.makeMove = function(figNextMove, player, chessboardName) {
    var c= this;
    console.log("Next " + player + " move on chessboard "+chessboardName+": " + figNextMove.fig + " from pos: " + figNextMove.from + " to position: " + figNextMove.to);
    console.log();
    c.board[figNextMove.from.row][figNextMove.from.col] = null;
    if (c.board[figNextMove.to.row][figNextMove.to.col] != null) {
        var zemenaFigura = c.board[figNextMove.to.row][figNextMove.to.col];
        console.log("Zemanje figura: " + zemenaFigura);
        zemenaFigura.pos.row = null;
        zemenaFigura.pos.col = null;
        if (zemenaFigura.type == "KG") {
            console.log("Igrata zavrsi, pobednikot e igracot so boja: " + player);
            c.set(figNextMove.to.row, figNextMove.to.col, figNextMove.fig);
            //console.log();
            //console.log("" + c);
            return false;
        }
    }
    c.set(figNextMove.to.row, figNextMove.to.col, figNextMove.fig);
    return true;
}

Chessboard.prototype.play = function(name) {
    var chessboard = this;
    drawChessboard(chessboard,name);
    var flag = true;
    timeOut = setInterval(function() {
        //console.log("" + c);
        var availableMoves = chessboard.moves();
        var whiteMoves = availableMoves.filter(
            function(value) {
                return (value.fig.color.charAt(0) == 'w');
            }
        );
        var blackMoves = availableMoves.filter(
            function(value) {
                return (value.fig.color.charAt(0) == 'b');
            }
        );
        var nextMove;
        if (chessboard.turn === true) {
            nextMove = Math.floor(Math.random() * whiteMoves.length);
            flag = chessboard.makeMove(whiteMoves[nextMove], "white", name);
        }
        else {
            chessboard.numMoves++;
            nextMove = Math.floor(Math.random() * blackMoves.length);
            flag = chessboard.makeMove(blackMoves[nextMove], "black", name);
        }
        if (!flag) {
            clearTimeout(timeOut);
        }
        chessboard.turn = !chessboard.turn;
        drawFigures(chessboard, name);
    }, 3);
}

// ===== Common Types ======
function Pos(a, b, c) {
    if (c === undefined) {
        this.row = a;
        this.col = b;
    } else {
        this.row = a.row + b;
        this.col = a.col + c;
    }
}

Pos.prototype.off = function(r, c) {
    return new Pos(this, r, c);
}

Pos.prototype.toString = function() {
    return LETTERS[this.col] + (this.row + 1);
}

Pos.prototype.isValid = function() {
    return !(this.row < 0 || this.row > 7 || this.col < 0 || this.col > 7);
}

function Movement(fig, to) {
    this.fig = fig;
    this.from = fig.pos;
    this.to = to;
}

Movement.prototype.toString = function() {
    return this.fig.toString() + "/" + this.from + "->" + this.to;
}

// ===== Figure Type ======

function Figure(type, color, img, index) {
    this.type = type;
    this.color = color;
    this.img = img;
    if (index) this.index = index;
}

Figure.parent = function(d) {
    var b = this;
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

Figure.prototype.moves = function() {
    return [];
}

Figure.prototype.moveSteps = function(steps, repeat) {
    var fig = this;
    var moves = [];
    if (fig.pos.row === null || fig.pos.col === null) { return moves; }
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var tmp = fig.pos.off(step[0], step[1]);

        var at = this.board.at(tmp);
        while (at === null || at && at.color != fig.color) {
            moves.push(tmp);

            if (at != null || !repeat) break;
            var tmp = tmp.off(step[0], step[1]);
            var at = this.board.at(tmp);
        }
    }
    moves = moves.map(function(x) {
        return new Movement(fig, x);
    });
    return moves;
}

Figure.prototype.toString = function() {
    return this.color + this.type + (this.index || '');
}

Figure.prototype.init = function() {
    Figure.apply(this, arguments);
}


// ===== King Type ======

Figure.parent(King);
function King(color, img, pos) {
    this.init('KG', color, img, null, pos);
}

King.prototype.moves = function() {
    var steps = [
        [+1, 0],
        [+1, +1],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [+1, -1]
    ];
    return this.moveSteps(steps, false);
}

// ===== Queen Type ======

Figure.parent(Queen);
function Queen(color, img, pos) {
    this.init('QN', color, img, null, pos);
}


Queen.prototype.moves = function() {
    var steps = [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [0, -1],
        [+1, +1],
        [+1, -1],
        [-1, +1],
        [-1, -1]
    ];
    return this.moveSteps(steps, true);
}


// ===== Rook Type ======

Figure.parent(Rook);
function Rook(color, img, index, pos) {
    this.init('R', color, img, index, pos);
}

Rook.prototype.moves = function(steps) {
    var steps = [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [0, -1]
    ];
    return this.moveSteps(steps, true);
}


// ===== Knight Type ======

Figure.parent(Knight);
function Knight(color, img, index, pos) {
    this.init('S', color, img, index, pos);
}

Knight.prototype.moves = function() {
    var steps = [
        [+2, +1],
        [+2, -1],
        [-2, +1],
        [-2, -1],
        [+1, +2],
        [+1, -2],
        [-1, +2],
        [-1, -2]
    ];
    return this.moveSteps(steps, false);
}

// ===== Laufer Type ======

Figure.parent(Laufer);
function Laufer(color, img, index, pos) {
    this.init('L', color, img, index, pos);
}


Laufer.prototype.moves = function() {
    var steps = [
        [+1, +1],
        [+1, -1],
        [-1, +1],
        [-1, -1]
    ];
    return this.moveSteps(steps, true);
}


// ===== Pawn Type ======

Figure.parent(Pawn);
function Pawn(color, img, index, pos) {
    this.init('P', color, img, index, pos);
}
Pawn.prototype.moveSteps = function(steps, turn) {
    var fig = this;
    var moves = [];
    if (fig.pos.row === null || fig.pos.col === null) { return moves; }
    if (fig.color == BLACK) {
        steps = steps.map(function(obj) {
            obj[0] = obj[0] * (-1);
            obj[1] = obj[1] * (-1);
            return [obj[0], obj[1]];
        });
    }
    //da se dvizi
    var step = steps[0];
    var tmp = fig.pos.off(step[0], step[1]);
    var at = this.board.at(tmp);
    if (at === null) {
        moves.push(tmp);
    }
    if (turn == 1 && at === null) {
        tmp = tmp.off(step[0], step[1]);
        at = this.board.at(tmp);
        if (at === null) {
            moves.push(tmp);
        }
    }
    //da zema
    for (var i = 1; i < steps.length; i++) {
        step = steps[i];
        tmp = fig.pos.off(step[0], step[1]);
        at = this.board.at(tmp);
        if (at && at.color !== fig.color) {
            moves.push(tmp);
        }
    }
    moves = moves.map(function(x) {
        return new Movement(fig, x);
    });
    return moves;
}

Pawn.prototype.moves = function() {
    var fig = this;
    var board = this.board;
    var pos = this.pos;
    var steps = [
        [+1, 0],
        [+1, -1],
        [+1, +1]
    ];
    return this.moveSteps(steps, board.numMoves);
}

// ===== Demo code ======
var c1 = new Chessboard();
var c2 = new Chessboard();
var c3 = new Chessboard();
var c4 = new Chessboard();

c1.play('me');
//c2.play('you');
//c3.play('he');
//4.play('she');

var id=0;
function drawChessboard(c,name) {
    var divTable = document.createElement('div');
    divTable.id = name;
    divTable.className = 'table';
    document.body.appendChild(divTable);
    var table = document.createElement('table');
    table.className = 'table';
    var tr, td;
    for (var i = 8; i > 0; i--) {
        tr = document.createElement('tr');
        for (var j = 0; j < 8; j++) {
            td = document.createElement('td');
            td.className = 'td';
            var span = document.createElement('span');            
            id= String.fromCharCode(j + 65) + i;
            span.id = id;
            if (i % 2 == j % 2) {
                td.className = 'white';
            }
            else {
                td.className = 'black';
            }            
            tr.appendChild(td);
            td.appendChild(span);
        }
        table.appendChild(tr);
    }
    divTable.appendChild(table);
    drawFigures(c, name);
}

function drawFigures(c, name){
    for (var i = 8; i > 0; i--){
        for (var j = 0; j < 8; j++) {
            var q = '#' + name + '>table>tr>td>#' + (String.fromCharCode(j + 65) + i);
            var span = document.querySelectorAll(q)[0];
            if(c.at(i-1,j)!=null||c.at(i-1,j)!=undefined){
                span.innerHTML=c.at(i-1,j).img;
            }
            else{
                span.innerHTML="";
            }
        }
    }
}