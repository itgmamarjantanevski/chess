// Chessboard

// King
// Queen 
// Rook x2 (top)
// Knight x2 (konj)
// Bishop x2 (laufer)
// Pawn x8
'use strict'
var WHITE = 'w';
var BLACK = 'b';
var LETTERS = 'ABCDEFGH';

// Self-contained instance of a chessboard
function Chessboard() {
    this.reset();
}

Chessboard.prototype.reset = function () {
    var i;
    this.move = 0;
    this.figures = [];
    this.board = [];
    for (i = 0; i < 8; i++) this.board[i] = [null, null, null, null, null, null, null, null];

    this.set(0, 0, new Rook(WHITE, 1));
    this.set(0, 1, new Knight(WHITE, 1));
    this.set(0, 2, new Laufer(WHITE, 1));
    this.set(0, 3, new Queen(WHITE));
    this.set(0, 4, new King(WHITE));
    this.set(0, 5, new Laufer(WHITE, 2));
    this.set(0, 6, new Knight(WHITE, 2));
    this.set(0, 7, new Rook(WHITE, 2));

    for (i = 0; i < 8; i++) {
        this.set(1, i, new Pawn(WHITE, i + 1));
        this.set(6, i, new Pawn(BLACK, i + 1));
    }

    this.set(7, 0, new Rook(BLACK, 1));
    this.set(7, 1, new Knight(BLACK, 1));
    this.set(7, 2, new Laufer(BLACK, 1));
    this.set(7, 3, new Queen(BLACK));
    this.set(7, 4, new King(BLACK));
    this.set(7, 5, new Laufer(BLACK, 2));
    this.set(7, 6, new Knight(BLACK, 2));
    this.set(7, 7, new Rook(BLACK, 2));


}

Chessboard.prototype.set = function (row, col, fig) {
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

Chessboard.prototype.at = function (a, b) {
    if (a === undefined) return undefined;
    var pos = a;
    if (arguments.length == 2) pos = new Pos(a, b);
    if (!pos.isValid()) return undefined;
    return this.board[pos.row][pos.col];
}

Chessboard.prototype.moves = function () {
    var moves = [];
    this.figures.forEach(function (fig) {
        var x = fig.moves();
        if (x && x.length > 0) moves = moves.concat(x);
    });
    return moves;
}

Chessboard.prototype.toString = function () {
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

Pos.prototype.off = function (r, c) {
    return new Pos(this, r, c);
}

Pos.prototype.toString = function () {
    return LETTERS[this.col] + (this.row + 1);
}

Pos.prototype.isValid = function () {
    return !(this.row < 0 || this.row > 7 || this.col < 0 || this.col > 7);
}

function Movement(fig, to) {
    this.fig = fig;
    this.from = fig.pos;
    this.to = to;
}

Movement.prototype.toString = function () {
    return this.fig.toString() + "/" + this.from + "->" + this.to;
}

// ===== Figure Type ======

function Figure(type, color, index) {
    this.type = type;
    this.color = color;
    if (index) this.index = index;
}

Figure.parent = function (d) {
    var b = this;
    for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

Figure.prototype.moves = function () {
    return [];
}

Figure.prototype.moveSteps = function (steps, repeat) {
    var fig = this;
    var moves = [];
    var movement = this.board.move;
    var twoSquares;

    if (movement == 0 || movement == 1) twoSquares = true;

    if (arguments[0] && fig instanceof Pawn) {
        var color = (fig.color == WHITE) ? +1 : -1;
        var myTurn = (fig.color == WHITE) ? 0 : 1;
        for (var i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    {
                        tmp = fig.pos.off(color, 0);
                        at = this.board.at(tmp);
                        if (at === null) moves.push(tmp);
                        else twoSquares = false;
                        continue;
                    }
                case 1:
                    {
                        if (twoSquares) {
                            tmp = fig.pos.off((2 * color), 0);
                            at = this.board.at(tmp);
                            if (at === null) moves.push(tmp);
                        }
                        continue;
                    }
                case 2:
                    {
                        tmp = fig.pos.off(color, 1);
                        at = this.board.at(tmp);
                        if ((at != null) && (fig.color != at.color)) moves.push(tmp);
                        continue;
                    }
                case 3:
                    {
                        tmp = fig.pos.off(color, -1);
                        at = this.board.at(tmp);
                        if ((at != null) && (fig.color != at.color)) moves.push(tmp);
                        continue;
                    }
            }
        }
    } else {
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
    }

    moves = moves.map(function (x) {
        return new Movement(fig, x);
    });

    return moves;
}

Figure.prototype.toString = function () {
    return this.color + this.type + (this.index || '');
}

Figure.prototype.init = function () {
    Figure.apply(this, arguments);
}


// ===== King Type ======

Figure.parent(King);

function King(color, pos) {
    this.init('K', color, null, pos);
}

King.prototype.moves = function () {
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

function Queen(color, pos) {
    this.init('Q', color, null, pos);
}


Queen.prototype.moves = function () {
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

function Rook(color, index, pos) {
    this.init('R', color, index, pos);
}

Rook.prototype.moves = function (steps) {
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

function Knight(color, index, pos) {
    this.init('N', color, index, pos);
}

Knight.prototype.moves = function () {
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

function Laufer(color, index, pos) {
    this.init('B', color, index, pos);
}


Laufer.prototype.moves = function () {
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

function Pawn(color, index, pos) {
    this.init('P', color, index, pos);
}

Pawn.prototype.moves = function () {
    return this.moveSteps(true);
}

// ===== Play =====

Chessboard.prototype.fenMove = function (check, thisFigure) {
    var newBoard = this;
    var flag = false;
    var figure, moves, row, fromRow, fromCol;



    figure = newBoard.at((thisFigure[1] - 1), LETTERS.indexOf(thisFigure[0]));
    moves = figure.moves();


    var fileRank = moves.map(function (x) {
        if (figure === BLACK) row = (x.to.row - 1);
        else row = (x.to.row + 1);
        return (LETTERS.charAt(x.to.col) + row);
    })

    for (var i = 0; i < fileRank.length; i++) {
        if (fileRank[i] === check) flag = true;
    }

    fromRow = figure.pos.row;
    fromCol = figure.pos.col;


    if (flag) {
        this.set((check[1] - 1), LETTERS.indexOf(check[0]), figure);
        this.board[fromRow][fromCol] = null;

    } else {
        console.log("That it's not possible move");
    }


    return flag;


}


Chessboard.prototype.getMoves = function (thisFigure) {

    if (thisFigure) {

        var board = this;
        var fileRank;

        var figure = board.at(Number(thisFigure[1]) - 1, LETTERS.indexOf(thisFigure[0]));


        if (figure === null) {
            return "null moves";
        } else {
            fileRank = figure.moves();
            fileRank = fileRank.map(function (x) {
                var row;
                if (figure.color === BLACK) {
                    row = (x.to.row + 1);
                } else {
                    row = (x.to.row + 1);
                }
                return (LETTERS.charAt(x.to.col) + row);
            })

            return fileRank;
        }

    }


}

Chessboard.prototype.nextColor = function () {

    var counter = this.move;
    var nextColor = (counter % 2) ? BLACK : WHITE;

    return nextColor;

}

Chessboard.prototype.play = function () {

    var moveOnBoard;
    var kings = this.figures.filter(function (x) {
        return (x instanceof King);
    })

    while (kings.length == 2) {

        moveOnBoard = this.playEngine();
        var from = moveOnBoard.substr(0, 2);
        console.log(from);
        var to = moveOnBoard.substr(3, 4);
        console.log(to);
        var content = document.getElementById(from).innerHTML;
        console.log(content);
        document.getElementById(to).innerHTML = content;
        document.getElementById(from).innerHTML = '';
        kings = this.figures.filter(function (x) {
            return (x instanceof King);
        })
    }

}


Chessboard.prototype.stopPlayingCondition = function () {
    var kings = this.figures.filter(function (x) {
        return (x instanceof King);
    })

    if (kings.length !== 2) return true;
}

Chessboard.prototype.playEngine = function () {

    var counter = this.move;
    var nextColor = (counter % 2) ? BLACK : WHITE;
    var moves = [];
    var randomFig;

    // take random figure, based on the number of figures and next color
    var figuresByColor = this.figures.filter(function (x) {
        return (x.color === nextColor);
    })
    randomFig = figuresByColor[Math.floor(Math.random() * figuresByColor.length)];
    // find figure with moves
    while (randomFig.moves().length === 0) {

        randomFig = figuresByColor[Math.floor(Math.random() * figuresByColor.length)];

    }
    moves = randomFig.moves();
    var nextMove = moves[Math.floor(Math.random() * moves.length)];
    // check if the destination square is not empty
    var notEmpty = this.at(nextMove.to.row, nextMove.to.col);
    var tempTakes;
    // if there is a figure of different color we can take it, then
    // delete it
    // from figures array
    if (notEmpty != null && notEmpty.color != randomFig.color) {

        tempTakes = notEmpty;
        this.figures = this.figures.filter(function (x) {
            return (x != notEmpty);
        })
    }
    // new position for the figure
    this.board[nextMove.to.row][nextMove.to.col] = randomFig;
    randomFig.pos = new Pos(nextMove.to.row, nextMove.to.col);
    // delete the figure on the previous position
    this.board[nextMove.from.row][nextMove.from.col] = null;

    this.move++;

    //console.log(""+this);

    var moveOnBoard = (nextMove.from + '-' + nextMove.to).toUpperCase();

    var from = moveOnBoard.substr(0, 2);
    console.log(from);
    var to = moveOnBoard.substr(3, 4);
    console.log(to);
    var content = document.getElementById(from).innerHTML;
    console.log(content);
    document.getElementById(to).innerHTML = content;
    document.getElementById(from).innerHTML = '';

    return (nextMove.from + '-' + nextMove.to).toUpperCase();

    // if (tempTakes instanceof King) {
    //     if (tempTakes.color == WHITE)
    //         console.log("=========> BLACK WINS! <=========");
    //     else
    //         console.log("=========> WHITE WINS! <=========");}




}

Chessboard.prototype.getColor = function(thisFigure) {

    var figure = this.at(Number(thisFigure[1]) - 1, LETTERS.indexOf(thisFigure[0]));
    return figure.color;
}

// ======= FEN string =======
Chessboard.prototype.fen = function () {

    var fen = [];
    var temp;
    var result = '';
    var emptySquareCounter = 0;
    for (var i = 7; i != -1; i--) {
        for (var j = 0; j < this.board[i].length; j++) {
            var f = this.board[i][j];
            if (!f) {
                emptySquareCounter++;
            } else {
                if (emptySquareCounter !== 0) {
                    result += emptySquareCounter;
                    emptySquareCounter = 0;
                }
                if (f.color === WHITE)
                    result += f.type.toUpperCase();
                else if (f.color === BLACK) {
                    result += f.type.toLowerCase();
                }
            }
        }
        if (emptySquareCounter !== 0) {
            result += emptySquareCounter;
        }
        emptySquareCounter = 0;
        if (i !== 0)
            result += '/';

    }

    return result;

};

// ===== Demo code ======
 //var c = new Chessboard();
// console.log(" "+c);
// // // console.log(c.playEngine());
//  var thisFigure = 'B7';
// console.log(c.at( Number(thisFigure[1])-1 , LETTERS.indexOf(thisFigure[0]) ));
// console.log(c.at( Number(thisFigure[1]) , LETTERS.indexOf(thisFigure[0]) ));
//  console.log(c.getMoves('B7'));
// var ova = c.at(6,1);
// console.log(ova.moves());