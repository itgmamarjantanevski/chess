var whiteTeam = [];
var blackTeam = [];

function King(name, team, position) {

	this.name = name;
	this.team = team;

	this.position = position;

}

function Queen(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
}

function Rook(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
}

function Bishop(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
}

function Knight(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
}

function Pawn(name, team, position) {
	this.name = name;
	this.team = team;
	this.position = position;
	this.isFirstMove = true;
}

var matrix = [];
for (var i = 0; i < 8; i++) {
	matrix[i] = [];
	for (var j = 0; j < 8; j++) {
		matrix[i][j] = null;
	}
}

var rookWhite1 = new Rook("rW1", "white", [ 0, 0 ]);
var rookWhite2 = new Rook("rW2", "white", [ 0, 7 ]);

matrix[0][0] = rookWhite1;
matrix[0][7] = rookWhite2;

var rookBlack1 = new Rook("rB1", "black", [ 7, 0 ]);
var rookBlack2 = new Rook("rB2", "black", false, [ 7, 7 ]);

matrix[7][0] = rookBlack1;
matrix[7][7] = rookBlack2;

var knightWhite1 = new Knight("knW1", "white", [ 0, 1 ]);
var knightWhite2 = new Knight("knW2", "white", [ 0, 6 ]);

matrix[0][1] = knightWhite1;
matrix[0][6] = knightWhite2;

var knightBlack1 = new Knight("kB1", "black", [ 7, 1 ]);
var knightBlack2 = new Knight("kB2", "black", [ 7, 6 ]);

matrix[7][1] = knightBlack1;
matrix[7][6] = knightBlack2;

var bishopWhite1 = new Bishop("bW1", "white", [ 0, 2 ]);
var bishopWhite2 = new Bishop("bW2", "white", [ 0, 5 ]);

matrix[0][2] = bishopWhite1;
matrix[0][5] = bishopWhite2;

var bishopBlack1 = new Bishop("bB1", "black", [ 7, 2 ]);
var bishopBlack2 = new Bishop("bB2", "black", [ 7, 5 ]);

matrix[7][2] = bishopBlack1;
matrix[0][5] = bishopBlack2;

var kingWhite = new King("kW", "white", [ 0, 3 ]);
var queenWhite = new Queen("qW", "white", [ 0, 4 ]);

matrix[0][3] = kingWhite;
matrix[0][4] = queenWhite;

var kingBlack = new King("kB", "black", [ 7, 3 ]);
var queensBlack = new Queen("qB", "black", [ 7, 4 ]);

matrix[7][3] = kingBlack;
matrix[7][4] = queensBlack;

var pawnW1 = new Pawn("pw1", "white", [ 1, 0 ])
var pawnW2 = new Pawn("pW2", "white", [ 1, 1 ]);
var pawnW3 = new Pawn("pW3", "white", [ 1, 2 ]);
var pawnW4 = new Pawn("pW4", "white", [ 1, 3 ]);
var pawnW5 = new Pawn("pW5", "white", [ 1, 4 ]);
var pawnW6 = new Pawn("pW6", "white", [ 1, 5 ]);
var pawnW7 = new Pawn("pW7", "white", [ 1, 6 ]);
var pawnW8 = new Pawn("pW8", "white", [ 1, 7 ]);

matrix[1][0] = pawnW1;
matrix[1][1] = pawnW2;
matrix[1][2] = pawnW3;
matrix[1][3] = pawnW4;
matrix[1][4] = pawnW5;
matrix[1][5] = pawnW6;
matrix[1][6] = pawnW7;
matrix[1][7] = pawnW8;

var pawnB1 = new Pawn("pB1", "black", [ 6, 0 ]);
var pawnB2 = new Pawn("pB2", "black", [ 6, 1 ]);
var pawnB3 = new Pawn("pB3", "black", [ 6, 2 ]);
var pawnB4 = new Pawn("pB4", "black", [ 6, 3 ]);
var pawnB5 = new Pawn("pB5", "black", [ 6, 4 ]);
var pawnB6 = new Pawn("pB6", "black", [ 6, 5 ]);
var pawnB7 = new Pawn("pB7", "black", [ 6, 6 ]);
var pawnB8 = new Pawn("pB8", "black", [ 6, 7 ]);

matrix[6][0] = pawnB1;
matrix[6][1] = pawnB2;
matrix[6][2] = pawnB3;
matrix[6][3] = pawnB4;
matrix[6][4] = pawnB5;
matrix[6][5] = pawnB6;
matrix[6][6] = pawnB7;
matrix[6][7] = pawnB8;

console.log(matrix);
