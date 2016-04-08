/**
 * 
 */

//
//
console.log("Chess.. \n");



var figuresWhite = [ "R-", "N-", "B-", "Q-", "K-", "P-" ]
var figuresBlack = [ "r-", "n-", "b-", "q-", "k-", "p-" ]

var alpha = [ "a", "b", "c", "d", "e", "f", "g", "h" ];

function figure(position, type) {

	this.position = position;
	this.type = type;
	this.index = function() {
		return type.concat(position);
	}
	this.fileN = function() {
		return alpha.indexOf(position[0]);
	}
	this.fileC = function() {
		return position[0];
	}
	this.rank = function() {
		return position[1];
	}

}

/*
 * var ranks = {
 * 
 * RANK_1 : 1, RANK_2 : 2, RANK_3 : 3, RANK_4 : 4, RANK_5 : 5, RANK_6 : 6,
 * RANK_7 : 7, RANK_8 : 8 };
 * 
 * var files = { FILE_A : 1, FILE_B : 2, FILE_C : 3, FILE_D : 4, FILE_E : 5,
 * FILE_F : 6, FILE_G : 7, FILE_H : 8 };
 */

function InitChessBoard() {
	var board = new Array();
	var e = 3;
	var b = 3;

	for (var i = 0; i < 8; i++) {

		board[i] = new Array(8);
	}

	for (var i = 0; i < 8; i++) {
		for (var k = 0; k < 8; k++) {

			// fill table with white figures
			if (i == 0) {
				if (k >= 5) {
					var next = k - e;
					board[i][k] = new figure(alpha[k].concat(i + 1),
							figuresWhite[next]);
					e += 2;
				} else
					board[i][k] = new figure(alpha[k].concat(i + 1),
							figuresWhite[k])
			}
			if (i == 1) {
				var pawn = new figure(alpha[k].concat(i + 1), figuresWhite[5]);
				pawn.firstMove = 1;
				board[i][k] = pawn;
			}

			// fill table with blank figures

			if (i > 1 && i < 6) {
				board[i][k] = new figure(alpha[k].concat(i + 1), "0-");
			}

			// fill table with black figures
			if (i == 6) {

				var pawn = new figure(alpha[k].concat(i + 1), figuresBlack[5]);
				pawn.firstMove = 1;
				board[i][k] = pawn;
			} else if (i == 7) {
				if (k >= 5) {
					var next = k - b;
					board[i][k] = new figure(alpha[k].concat(i + 1),
							figuresBlack[next]);
					b += 2;
				} else
					board[i][k] = new figure(alpha[k].concat(i + 1),
							figuresBlack[k]);
			}

		}
	}

	return board;

}

function ShowMeAvailableMoves(fromThisPos, chessBoard) {
	var temp = new figure();
	var moves = new Array();
	temp = fromThisPos;
	var i;

	// switch(temp.type){

	// case ("P-"):
	if (temp.type = "P-") {

		for (i = 0; i < 4; i++) {

			if (temp.firstMove == 1 && i == 0) {

				if ((chessBoard[Number(temp.fileN() + 2)][temp.fileN()]).type == "0-")

				{
					moves[i] = temp.fileC().concat(Number(temp.rank()) + 2);
				}
			}

			else

			if (((chessBoard[Number(temp.fileN() + 1)][temp.fileN()]).type == "0-")
					&& i == 1) {
				moves[i] = temp.fileC().concat(Number(temp.rank()) + 1);
			} else

			if (((chessBoard[Number(temp.fileN() + 1)][temp.fileN() + 1]))
					&& i == 2) {

				var m = temp.fileN() + 1;
				moves[i] = alpha[m] + "" + (Number(temp.rank()) + 1);
			} else

			if (((chessBoard[Number(temp.fileN() - 1)][temp.fileN() + 1]))
					&& i == 3) {
				var m = temp.fileN() - 1;
				moves[i] = alpha[m] + "" + (Number(temp.rank()) + 1);
			}

		}

	}
	return moves;
} // Move

function Validate(thisPosition) {
}

var b = InitChessBoard();
//console.log(b);




 
 



for (var i = 0; i < 8; i++) {
	for (var k = 0; k < 8; k++) {
		temp=b[i][k];
		console.log("index: "+temp.index()+", "+temp.position+" rank: "+(Number(temp.rank())-1)+" file: "+temp.fileN());
	}
}
