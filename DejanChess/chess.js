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
Chessboard.prototype.draw = function() {
var table = document.createElement('table');
for (var i = 8 ; i > 0; i--) {
     var tr = document.createElement('tr');
     tr.id = i;
     for (var j = 0; j < 8; j++) {
         var td = document.createElement('td');
         var span = document.createElement('span');
          span.id = String.fromCharCode(j+65) + i;
         if(i%2 === 0){
            if(j%2 === 0) {
                td.className = "white";
            }else {
                td.className = "black";
               
            }
            }else {
             if(j%2 === 0) {
                td.className = "black";
             }else {
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
// end of draw

Chessboard.prototype.reset = function() {
	var i;
	
	this.figures = [];
	this.board = [];
	for(i=0; i<8; i++) this.board[i] = [null, null, null, null, null, null, null, null];
	
	this.set(0, 0, new Rook(WHITE, 1));
	this.set(0, 1, new Knight(WHITE, 1));
	this.set(0, 2, new Laufer(WHITE, 1));
	this.set(0, 3, new Queen(WHITE));
	this.set(0, 4, new King(WHITE));
	this.set(0, 5, new Laufer(WHITE, 2));
	this.set(0, 6, new Knight(WHITE, 2));
	this.set(0, 7, new Rook(WHITE, 2));
	
	for(i=0; i<8; i++) {
		this.set(1, i, new Pawn(WHITE, i+1));
		this.set(6, i, new Pawn(BLACK, i+1));
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

Chessboard.prototype.set = function(row, col, fig , id) {
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
	if (arguments.length == 2) pos = new Pos(a,b);
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
	for(i=7; i>=0; i--) {
		s += (i + 1) + ' ';
		for(j=0; j<8; j++) {
			s += (this.board[i][j] || '...') + ' ';
		}
		s += '\n';
	}
	s += '   A   B   C   D   E   F   G   H\n';
	return s;
}
//random play 
Chessboard.prototype.play = function() {
    var currentPlayer;
    var chessboard = this;
    var nextMove;
    var whiteTake=[];
    var blackTake=[];
    chessboard.moveCounter = 0;
   // console.log(" " + c);
    var allMoves = c.moves();
    
    setInterval(function () {
    console.log("" + c);
    var whitePlayerMoves = allMoves.filter(function (a) {
        return a.fig.color.charAt(0) == 'w';}); 
    var blackPlayerMoves = allMoves.filter(function (b) {
        return b.fig.color.charAt(0) == 'b';}); 
    var whiteIndex = Math.floor(Math.random() * whitePlayerMoves.length);
    var white = whitePlayerMoves[whiteIndex];
    var blackIndex = Math.floor(Math.random() * blackPlayerMoves.length);
    var black = blackPlayerMoves[blackIndex];
    
         if(c.turn === true) {
             console.log("white turn" + " " + white.fig + " " + "from" + " " + white.from  + " " + "to" + " "+ white.to);
             chessboard.board[white.from.col][white.from.row] = null;
             chessboard.set(white.to.col, white.to.row, white.fig); 
        } else {
             console.log("Black turn" + " " + black.fig + " " + "from"+ " " + black.from + " " + "to" + " " + black.to);
             chessboard.board[black.from.col][black.from.row]= null;
             chessboard.set(black.to.col, black.to.row, black.fig); 
        }
       if(white.length === 0)  {
        console.log("Black pieces win");
        return null;
       };
    
       if(black.length === 0) {
        console.log("Black pieces win");
        return null;
       };
    c.turn = !c.turn;
    },1000);
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

function Figure(type, color, index) {
	this.type = type;
	this.color = color;
	if (index) this.index = index;
}



//===== Figure Type ======

Figure.parent = function (d) {
	var b = this;
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

Figure.prototype.moves = function() {
	return [];
} 

Figure.prototype.toString = function() {
	return this.color + this.type + (this.index || ''); 
}

Figure.prototype.init = function() {
	Figure.apply(this, arguments);
}

//===== King Type ======

Figure.parent(King);
function King(color, pos) {
	this.init('KG', color, null, pos);
}

//===== Queen Type ======

Figure.parent(Queen);
function Queen(color, pos) {
	this.init('QN', color, null, pos);
}

//===== Rook Type ======

Figure.parent(Rook);
function Rook(color, index, pos) {
	this.init('R', color, index, pos);
}

//===== Knight Type ======

Figure.parent(Knight);
function Knight(color, index, pos) {
	this.init('S', color, index, pos);
}

Knight.prototype.moves = function() {
	var fig = this;
	var board = this.board;
	var pos = this.pos;
	var moves = [
		pos.off(+2, +1),
		pos.off(+2, -1),
		pos.off(-2, +1),
		pos.off(-2, -1),
		pos.off(+1, +2),
		pos.off(+1, -2),
		pos.off(-1, +2),
		pos.off(-1, -2)
	];
	
	moves = moves.filter(function(x) {
	    var at = board.at(x);
	    if (at === undefined) return false;
	    return (at == null || at && at.color != fig.color);
	}).map(function(x) {
		return new Movement(fig, x);
	});
		
	return moves;
}

//===== Laufer Type ======

Figure.parent(Laufer);
function Laufer(color, index, pos) {
	this.init('L', color, index, pos);
}

//===== Pawn Type ======

Figure.parent(Pawn);
function Pawn(color, index, pos) {
	this.init('P', color, index, pos);
}

//===== Demo code ======

var c = new Chessboard();
c.draw();
c.play();
// console.log("" + c);
// console.log("" + c.moves().join(", "));
