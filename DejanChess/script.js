
'use strict';
// chess board matrix
var matrix = [];
for(var i = 0; i < 8; i++) {
   matrix[i] = [];
    for(var j = 0; j < 8; j++) {
        matrix[i][j] = null;
    }
}

// piece constructor functions
function Pawn(color, name ,isOccupated,position)
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;

 }

function Knight(color, name ,isOccupated,position)
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;
}

function Queen (color, name ,isOccupated,position)
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;
}

function King (color, name ,isOccupated,position)
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;

}


function Bishop (color, name,isOccupated,position) 
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;
	
}


function Rook (color, name,isOccupated,position) 
{
	this.name = name;
	this.color = color;
	this.isOccupated = false;
	this.position = position;
}


// NEW GAME FUNCTION CHESS BOARD RESET start position

function chessBoard() {
	
	//array with white and black pieces
	var white_Pieces = [];
	var black_Pieces = [];

	// initialization of chess piece
	//white piece
	//PAWNS
	var pawn_W_1=  new Pawn("white" , "wP1" , false, [1,0]);
	white_Pieces.push(pawn_W_1);
	matrix[1][0] = pawn_W_1;
	
	var pawn_W_2=  new Pawn("white" , "wP2" , false ,[1,1]);
	white_Pieces.push(pawn_W_2);
	matrix[1][1] = pawn_W_1;
	
	var pawn_W_3 = new Pawn("white" , "wP3" , false,[1,2]);
	white_Pieces.push(pawn_W_3);
	matrix[1][2] = pawn_W_1;
	
	var pawn_W_4 = new Pawn("white" , "wP4" , false ,[1,3]);
	white_Pieces.push(pawn_W_4);
	matrix[1][3] = pawn_W_1;
	
	var pawn_W_5 = new Pawn("white" , "wP5" , false,[1,4]);
	white_Pieces.push(pawn_W_5);
	matrix[1][4] = pawn_W_1;
	
	var pawn_W_6 = new Pawn("white" , "wP6" , false,[1,5]);
	white_Pieces.push(pawn_W_6);
	matrix[1][5] = pawn_W_1;
	
	var pawn_W_7 = new Pawn("white" , "wP7" , false ,[1,6]);
	white_Pieces.push(pawn_W_7);
	matrix[1][6] = pawn_W_1;
	
	var pawn_W_8 = new Pawn("white" , "wP8" , false ,[1,7]);
	white_Pieces.push(pawn_W_8);
	matrix[1][7] = pawn_W_1;
   // end of PAWNS
	
	//ROOK
	var rook_W_1 = new Rook("white" , "wR1" , false,[0,0]);
	white_Pieces.push(rook_W_1);
	matrix[0][0] = rook_W_1;
	
	var rook_W_2 = new Rook("white","wR2" , false,[0,7]);
	white_Pieces.push(rook_W_2);
	matrix[0][7] = rook_W_1;
    //end of ROOK
	
	
	//KNIGHT
	var knight_W_1 = new Knight("white", "wK1", false,[0,1]);
	white_Pieces.push(knight_W_1);
	matrix[0][1] = knight_W_1;
	var knight_W_2 = new Knight("white", "wK2", false,[0,6]);
	white_Pieces.push(knight_W_2);
	matrix[0][6] = knight_W_1;
   //end of knight
	
	//BISHOP
	var bishop_W_1 = new Bishop("white", "wB1", false,[0,2]);
	white_Pieces.push(bishop_W_1);
	matrix[0][2] = bishop_W_1;
	var bishop_W_2 = new Bishop("white", "wB2", false,[0,5]);
	white_Pieces.push(bishop_W_2);
	matrix[0][5] = bishop_W_2;
	
   //QUEEN
	var queen_W =  new Queen("white", "wQueen", false,[0,3]);
	white_Pieces.push(queen_W);
	//KING
	var king_W =  new King("white", "wKing",false,[0,4]);
	white_Pieces.push(king_W);

	
	
	
	//BLACK piece 
	//PAWNS
	var pawn_B_1=  new Pawn("black" , "bP1" , false, [6,0]);
	black_Pieces.push(pawn_B_1);
	matrix[6][0] = pawn_B_1;
	
	var pawn_B_2=  new Pawn("black" , "bP2" , false,[6,1]);
	black_Pieces.push(pawn_B_2);
	matrix[6][1] = pawn_B_2;
	
	var pawn_B_3 = new Pawn("black" , "bP3" , false, [6,2]);
	black_Pieces.push(pawn_B_3);
	matrix[6][2] = pawn_B_3;
	
	var pawn_B_4 = new Pawn("black" , "bP4" , false,[6,3]);
	black_Pieces.push(pawn_B_4);
	matrix[6][3] = pawn_B_4;
	
	var pawn_B_5 = new Pawn("black" , "bP5" , false ,[6,4]);
	black_Pieces.push(pawn_B_5);
	matrix[6][4] = pawn_B_5;
	
	var pawn_B_6 = new Pawn("black" , "bP6" , false ,[6,5]);
	black_Pieces.push(pawn_B_6);
	matrix[6][5] = pawn_B_6;
	
	var pawn_B_7 = new Pawn("black" , "bP7" , false ,[6,6]);
	black_Pieces.push(pawn_B_7);
	matrix[6][6] = pawn_B_7;
	
	var pawn_B_8 = new Pawn("black" , "bP8" , false ,[6,7]);
	black_Pieces.push(pawn_B_8);
	matrix[6][7] = pawn_B_8;
	
	
	var rook_B_1 = new Rook("black" , "bR1" , false,[7,0]);
	black_Pieces.push(rook_B_1);
	matrix[7][0] = rook_B_1;
	
	var rook_B_2 = new Rook("black","bR2" , false,[7,7]);
	black_Pieces.push(rook_B_2);
	matrix[7][7] = rook_B_2;
	
	var knight_B_1 = new Knight("black", "bK1", false,[7,1]);
	black_Pieces.push(knight_B_1);
	matrix[7][1] = knight_B_1;
	
	var knight_B_2 = new Knight("black", "bK2", false,[7,6]);
	black_Pieces.push(knight_B_2);
     matrix[7][6]  = knight_B_2;
	
	var bishop_B_1 = new Bishop("black", "bB1", false,[7,2]);
	black_Pieces.push(bishop_B_1);
	matrix[7][2] = bishop_B_1;
	
	var bishop_B_2 = new Bishop("black", "bB2", false,[0,5]);
	black_Pieces.push(bishop_B_2);
	matrix[0][5] = bishop_B_2;

	var queen_B =  new Queen("black", "bQueen", false,[7,3]);
	black_Pieces.push(queen_B);
	matrix[7][3] = queen_B;
	
	var king_B =  new King("black", "bKing",false, [0,4]);
	black_Pieces.push(king_B);
    matrix[0][4] = king_B;

    
      console.log(matrix);
      return matrix;
}

//MAIN FUNCTION TO RESET NEW TABLE	
chessBoard();



