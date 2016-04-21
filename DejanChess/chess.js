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

//table draw html
function drawTable(chessboard) {
	var div = document.getElementById("chessBoard");
	div.innerHTML = "";
	var table = document.createElement('table');
	for (var i = 8; i > 0; i--) {
		var tr = document.createElement('tr');
		tr.id = i;
		for (var j = 0; j < 8; j++) {
			var td = document.createElement('td');
			//console.log(chessboard.at(i-1,j));
			var span = document.createElement('span');
			if (chessboard.at(i - 1, j) != null) {
				span.innerHTML = chessboard.at(i - 1, j).img;
			} else {
				span.innerHTML = "";
			}

			span.id = String.fromCharCode(j + 65) + i;

			if (i % 2 === 0) {
				if (j % 2 === 0) {
					td.className = "white";
				} else {
					td.className = "black";
				}
            } else {
				if (j % 2 === 0) {
					td.className = "black";
				} else {
					td.className = "white";
				}
			}
			tr.appendChild(td);
			td.appendChild(span);
		}
		table.appendChild(tr);
	}
	document.getElementById("chessBoard").appendChild(table);
}
//end of draw
Chessboard.prototype.reset = function () {
	var i;
	this.figures = [];
	this.board = [];
	for (i = 0; i < 8; i++) this.board[i] = [null, null, null, null, null, null, null, null];

	this.set(0, 0, new Rook(WHITE, "&#9814;", 1));
	this.set(0, 1, new Knight(WHITE, "&#9816;", 1));
	this.set(0, 2, new Laufer(WHITE, "&#9815;", 1));
	this.set(0, 3, new Queen(WHITE, "&#9813;"));
	this.set(0, 4, new King(WHITE, "&#9812;"));
	this.set(0, 5, new Laufer(WHITE, "&#9815;", 2));
	this.set(0, 6, new Knight(WHITE, "&#9816;", 2));
	this.set(0, 7, new Rook(WHITE, "&#9814;", 2));

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

Chessboard.prototype.set = function (row, col, fig, id) {
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

Chessboard.prototype.play = function () {
	c.turn = true;
    var currentPlayer;
    var chessboard = this;
    var nextMove;
    var whiteTake = [];
    var blackTake = [];

    chessboard.moveCounter = 0;
	// console.log(" " + c);
	//all mooves
	var randomPlay = setInterval(function () {
		var allMoves = c.moves();
		//console.log("" + c);
		var whitePlayerMoves = allMoves.filter(function (a) {
			return a.fig.color.charAt(0) == 'w';
		});
		var blackPlayerMoves = allMoves.filter(function (b) {
			return b.fig.color.charAt(0) == 'b';
		});


		if (c.turn) {
			var whiteIndex = Math.floor(Math.random() * whitePlayerMoves.length);
			var white = whitePlayerMoves[whiteIndex];
			console.log("white turn" + " " + white.fig + " " + "from" + " " + white.from + " " + "to" + " " + white.to);
			chessboard.board[white.from.col][white.from.row] = null;
			if (chessboard.board[white.to.col][white.to.row] != null) {
				//console.log(chessboard.board);
				var takenFigure = chessboard.board[white.to.col][white.to.row];
				takenFigure.pos.col = null;
				takenFigure.pos.row = null;
				if (takenFigure.type === "KG") {
					chessboard.set(white.to.col, white.to.row, white.fig);
					console.log("Game over");
					return false;
				}
			}
			chessboard.set(white.to.col, white.to.row, white.fig);
        } else {
			var blackIndex = Math.floor(Math.random() * blackPlayerMoves.length);
			var black = blackPlayerMoves[blackIndex];
			console.log("Black turn" + " " + black.fig + " " + "from" + " " + black.from + " " + "to" + " " + black.to);
			chessboard.board[black.from.col][black.from.row] = null;
			if (chessboard.board[black.to.col][black.to.row] != null) {
				var takenFigure = chessboard.board[black.to.col][black.to.row];
				takenFigure.pos.col = null;
				takenFigure.pos.row = null;

				if (takenFigure.type === "KG") {
					chessboard.set(black.to.row, black.to.col, black.fig);
					console.log("Game over");
					alert("Game Over");
					clearInterval(randomPlay);
					return false;
				}
			}
			chessboard.`set`(black.to.col, black.to.row, black.fig);
        }
		c.turn = !c.turn;
		drawTable(c);
    }, 1000);
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

function Figure(type, color, img, index) {
	this.type = type;
	this.color = color;
	if (index) this.index = index;
	this.img = img;
}



// ===== Figure Type ======

function Figure(type, color, img, index) {
	this.type = type;
	this.color = color;
	if (index) this.index = index;
	this.img = img;
}

Figure.parent = function (d) {
	var b = this;
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

Figure.prototype.moves = function () {
	return [];
}

Figure.prototype.moveSteps = function (steps, repeat) {
	var fig = this;
    var moves = [];
    var moveCounter = 0;
    if (fig.color == BLACK) {
		steps = steps.map(function (obj) {
			obj[0] = obj[0] * (-1);
			obj[1] = obj[1] * (-1);
			return [obj[0], obj[1]];
		});
	} 

    for (var i = 0; i < steps.length; i++) {
		//all steps in pawn
		var step = steps[i];
		//current positon
		var tmp = fig.pos.off(step[0], step[1]);

		var at = this.board.at(tmp);

        while (at === null || at && at.color != fig.color) {
			if (fig instanceof Pawn) {
				if (at === null) {
					if (fig.movePawn(step)) {
						if (moveCounter < 2) {
							var pown = fig.pos;
							if (pown.row == 1) {
								var tmp2 = fig.pos.off(step[0] + 1, step[1]);
								moves.push(tmp2);
							} if (pown.row == 6) {
								var tmp3 = fig.pos.off(step[0] - 1, step[1]);
								moves.push(tmp3);
							}
							moveCounter++;
						}
						moves.push(tmp);
					}
				} else if (at != null && at.color != fig.color) {
					if (fig.pawnAttack(step))
						moves.push(tmp);
				}
			}
			else moves.push(tmp);
			if (at != null || !repeat) break;
			var tmp = tmp.off(step[0], step[1]);
			var at = this.board.at(tmp);
        }
    }

    moves = moves.map(function (x) {
        return new Movement(fig, x);
    });
	return moves;
}
Figure.prototype.movePawn = function (tmp) {
	if ((tmp[0] == 1 && tmp[1] == 0) || (tmp[0] == -1 && tmp[1] == 0)) {
		return true;
	} else return false;
}
Figure.prototype.pawnAttack = function (tmp) {
	if ((tmp[0] == 1 && tmp[1] == -1) || (tmp[0] == 1 && tmp[1] == 1) || (tmp[0] == -1 && tmp[1] == 1) || (tmp[0] == -1 && tmp[1] == -1)) {
		return true;
	} else return false;
}

Figure.prototype.toString = function () {
	return this.color + this.type + (this.index || '');
}

Figure.prototype.init = function () {
	Figure.apply(this, arguments);
}

// ===== King Type ======

Figure.parent(King);
function King(color, img, pos) {
	this.init('KG', color, img, null, pos);
}
King.prototype.moves = function () {
	var steps = [
		[+1, +0],
		[+1, +1],
		[+0, +1],
		[-1, +1],
		[-1, +0],
		[-1, -1],
		[+0, -1],
		[+1, -1]
	];
	return this.moveSteps(steps, true);
}
// ===== Queen Type ======

Figure.parent(Queen);
function Queen(color, img, pos) {
	this.init('QN', color, img, null, pos);
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
function Rook(color, img, index, pos) {
	this.init('R', color, img, index, pos);
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
function Knight(color, img, index, pos) {
	this.init('S', color, img, index, pos);
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
function Laufer(color, img, index, pos) {
	this.init('L', color, img, index, pos);
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
function Pawn(color, img, index, pos) {
	this.init('P', color, img, index, pos);
}

Pawn.prototype.moves = function () {
	var steps = [
		[+1, 0],
		[+1, -1],
		[+1, +1]
	];
	return this.moveSteps(steps, false);

}
// ===== Demo code ======
var c = new Chessboard();
drawTable(c)
c.play();



