//chessboard

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

//Function for moves the figures at single play 
function moveFigure(clickFig, i, j, chessboard) {
	//tmp flag variable boolean value
	var flag = false;
	//all posible moves for clicked figure
	var legalmoves = clickFig.moves();
	if (legalmoves != null) {
		for (var n = 0; n < legalmoves.length; n++) {
			// console.log(legalmoves[n].to.col);
			// console.log(legalmoves[n].to.row);
			// console.log(i, j);
			if (legalmoves[n].to.col == j && legalmoves[n].to.row == i - 1) {
				flag = true;
			}
		} if (flag) {
			//set the prevision position position to null
			chessboard.board[clickFig.pos.row][clickFig.pos.col] = null;
			chessboard.board[i - 1][j] = clickFig;
			//set the new position
			clickFig.pos.row = i - 1;
			clickFig.pos.col = j;
		}
	}
};


//table draw html dynamicly
function drawTable(chessboard) {
	var clickFig;
	//div board in DOM
	var div = document.getElementById("board");
	div.innerHTML = "";
	//get table from DOM
	var table = document.createElement('table');
	for (var i = 8; i > 0; i--) {
		var tr = document.createElement('tr');
		tr.id = i;
		for (var j = 0; j < 8; j++) {
			var td = document.createElement('td');
			//	 onclick event on current td(figure)
			//   draw with green color all posible moves for this figure
			td.addEventListener("click", (function (i, j) {
                return function () {
					if (!clickFig) {
						//check wich turn is start with white Figures turn
						//make movement two times at the same figure is not possible
						if (chessboard.at(i - 1, j) !== null)
							if ((chessboard.turn && chessboard.at(i - 1, j).color == 'w') || (!chessboard.turn && chessboard.at(i - 1, j).color == 'b')) {
								clickFig = (chessboard.at(i - 1, j));
								chessboard.turn = !chessboard.turn;
								posibleMoves(clickFig);
							}
					} else {
						//function for move figure to new position
						moveFigure(clickFig, i, j, chessboard);
						//draw a new position of table
						drawTable(chessboard);
					}
                };
			})(i, j));
			var span = document.createElement('span');
			// add images at squares board
			if (chessboard.at(i - 1, j) != null) {
				span.innerHTML = chessboard.at(i - 1, j).img;
			} else {
				span.innerHTML = "";
			}
			//color square black/white with adding class
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
	document.getElementById("board").appendChild(table);
}


//select with green color  on chessboard all possosible moves.
// input paramerter is which figure am clicked at the moment
function posibleMoves(clickFig) {
	var col;
	var row;
	if (clickFig != null) {
		toggleSelectedFigure(clickFig);
		//get all possible moves from figure
		var legalMoves = clickFig.moves();
		// console.log(legalMoves);
		for (var i = 0; i < legalMoves.length; i++) {
			// this figure , next posible moves
			colTo = legalMoves[i].to.col;
			rowTo = legalMoves[i].to.row;
			var span = String.fromCharCode(colTo + 65) + (rowTo + 1);
			//change class of span in chessboard
			//add greeen color of all posible moves fir this figure
			spanTmp = document.getElementById(span);
			spanTmp.parentElement.classList.toggle('greenSelect');
		}
	} else return false;
	return legalMoves;
}

//toogle class for selection figure
//here add scuare border for selected figure
//toogle selection add classs / remove class
function toggleSelectedFigure(clickFig) {
	var classList = document.getElementById(String.fromCharCode(clickFig.pos.col + 65) + (clickFig.pos.row + 1)).parentNode.classList;
	if (classList.contains('selected-figure')) {
		document.getElementById(String.fromCharCode(clickFig.pos.col + 65) + (clickFig.pos.row + 1)).parentNode.classList.remove('selected-figure');
	} else {
		document.getElementById(String.fromCharCode(clickFig.pos.col + 65) + (clickFig.pos.row + 1)).parentNode.classList.add('selected-figure');
	}
};

Chessboard.prototype.reset = function () {
	var i;
	this.randomPlay;
	this.turn = true;
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

//Random play function
// var play = ... ;
Chessboard.prototype.play = function () {
	c.turn = true;
	var currentPlayer;
	var chessboard = this;
	var nextMove;
	var whiteTake = [];
	var blackTake = [];
	//set interval for random play
	this.randomPlay = setInterval(function () {
		var allMoves = c.moves();
		//get all posible moves from white figures
		var whitePlayerMoves = allMoves.filter(function (a) {
			return a.fig.color.charAt(0) == 'w';
		});
		//get all posible moves from black figures
		var blackPlayerMoves = allMoves.filter(function (b) {
			return b.fig.color.charAt(0) == 'b';
		});

		if (c.turn) {
			//white move index
			var whiteIndex = Math.floor(Math.random() * whitePlayerMoves.length);
			//random from white moves
			var white = whitePlayerMoves[whiteIndex];
			//div to write current movement
			//which turn is....
			var divResult = document.getElementById("nextPlayer");
			divResult.innerHTML = ("WHITE turn" + " " + white.fig + " " + "from" + " " + white.from + " " + "to" + " " + white.to);
			//clear current position
			chessboard.board[white.from.row][white.from.col] = null;
			if (chessboard.board[white.to.row][white.to.col] != null) {
				//picked figure
				var takenFigure = chessboard.board[white.to.row][white.to.col];
				//display picked white figures
				var divWhiteTaken = document.getElementById("whiteTaken");
				// show picked figures to div
				divWhiteTaken.innerHTML += takenFigure.img;
				//set old position to null
				takenFigure.pos.col = null;
				takenFigure.pos.row = null;
				//check if king is still alive?
				//if is not end of game.
				if (takenFigure.type === "KG") {
					chessboard.set(white.to.row, white.to.col, white.fig);
					alert("Game Over");
					clearInterval(c.randomPlay);
					return false;
				}
			}
			//set the new position of piece
			chessboard.set(white.to.row, white.to.col, white.fig);
		} else {
			//black move index
			var blackIndex = Math.floor(Math.random() * blackPlayerMoves.length);
			//random from black moves
			var black = blackPlayerMoves[blackIndex];
			//div in html to write whitch turn is
			var divResult = document.getElementById("nextPlayer");
			divResult.innerHTML = ("BLACK turn" + " " + black.fig + " " + "from" + " " + black.from + " " + "to" + " " + black.to);

			//clear old position
			chessboard.board[black.from.row][black.from.col] = null;
			if (chessboard.board[black.to.row][black.to.col] != null) {
				//picked figure
				var takenFigure = chessboard.board[black.to.row][black.to.col];
				//display picked figures 
				var divBlackTaken = document.getElementById("blackTaken");
				divBlackTaken.innerHTML += takenFigure.img;
				takenFigure.pos.col = null;
				takenFigure.pos.row = null;
				//check if king is still alive?
				//if is not end of game.
				if (takenFigure.type === "KG") {
					chessboard.set(black.to.row, black.to.col, black.fig);
					alert("Game Over");
					clearInterval(c.randomPlay);
					return false;
				}
			}
			//set new position
			chessboard.set(black.to.row, black.to.col, black.fig);
		}
		c.turn = !c.turn;
		drawTable(c);
	}, 100);
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
		[+1, +0],
		[+0, +1],
		[-1, +0],
		[+0, -1],
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
		[+1, +0],
		[+0, +1],
		[-1, +0],
		[+0, -1]
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
		[+1, +0],
		[+1, -1],
		[+1, +1]
	];
	return this.moveSteps(steps, false);

}
// ===== Pawn Moves ======
Pawn.prototype.moveSteps = function (steps, turn) {
	var fig = this;
	var moves = [];
	if (fig.pos.row === null || fig.pos.col === null) { return moves; }
	if (fig.color == BLACK) {
		steps = steps.map(function (obj) {
			obj[0] = obj[0] * (-1);
			obj[1] = obj[1] * (-1);
			return [obj[0], obj[1]];
		});
	}
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
	for (var i = 1; i < steps.length; i++) {
		step = steps[i];
		tmp = fig.pos.off(step[0], step[1]);
		at = this.board.at(tmp);
		if (at && at.color !== fig.color) {
			moves.push(tmp);
		}
	}
	moves = moves.map(function (x) {
		return new Movement(fig, x);
	});
	return moves;
}
// ===== Demo code ======
var c = new Chessboard();
drawTable(c);
// =====================

//random play on click
document.getElementById("random").addEventListener("click", function () {
	c.reset();
	c.play()
});
//new game 
document.getElementById("newGame").addEventListener("click", function () {
	//clear side figures around board
	var divBlackTaken = document.getElementById("blackTaken");
	divBlackTaken.innerHTML = '';
	var divWhiteTaken = document.getElementById("whiteTaken");
	divWhiteTaken.innerHTML = '';
    clearInterval(c.randomPlay);
	c.reset();
	drawTable(c);
});