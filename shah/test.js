/**
 * 
 */

console.log("Chess.. \n");



var figuresWhite = [
	"R-",
	"N-",
	"B-",
	"Q-",
	"K-",
	"P-"]
var figuresBlack = [
	"r-",
	"n-",
	"b-",
	"q-",
	"k-",
	"p-"
]


var alpha = ["a","b","c","d","e","f","g","h"];

function figure(position,type){
	
	this.position=position;
	this.type=type;
	this.index= function () {return type.concat(position);}
	this.fileN= function () {return alpha.indexOf(position[0]);}
	this.fileC= function () {return position[0];}
	this.rank=function (){return position[1];}
	
	
	
	
	
}

/*var ranks = {

	RANK_1 : 1,
	RANK_2 : 2,
	RANK_3 : 3,
	RANK_4 : 4,
	RANK_5 : 5,
	RANK_6 : 6,
	RANK_7 : 7,
	RANK_8 : 8
};

var files = {
	FILE_A : 1,
	FILE_B : 2,
	FILE_C : 3,
	FILE_D : 4,
	FILE_E : 5,
	FILE_F : 6,
	FILE_G : 7,
	FILE_H : 8
};
*/


function InitChessBoard(){
	var board = new Array();
	var e=3;
	var b=3;
	for (var i=0;i<8;i++){
		
		board[i]=new Array(8);
	}
	
	
	for(var i=0; i < 8; i++){
		for(var k=0;k < 8; k++){
		
			
		
			
			
			//beli figuri
				if(i==0) {
						if (k>=5){
							var next=k-e;
							board[i][k]= new figure(alpha[k].concat(i+1),figuresWhite[next]);
							e+=2;
								}
						else board[i][k]= new figure(alpha[k].concat(i+1),figuresWhite[k])} //figuresWhite[k].concat(alpha[k]).concat(i);
				if(i==1) {
					var pawn = new figure(alpha[k].concat(i+1),figuresWhite[5]);
					pawn.firstMove = 1;
					board[i][k]=pawn; 
					}//figuresWhite[5].concat(alpha[k]).concat(i);}
				
				//prazni mesta
				
				if(i>1 && i <6) {board[i][k]=new figure(alpha[k].concat(i+1),"0-"); } //"0-".concat(alpha[k]).concat(i);}
				
			 //crni figuri
				if(i==6){
					
					var pawn = new figure(alpha[k].concat(i+1),figuresBlack[5]);
					pawn.firstMove = 1;
					board[i][k]=pawn;
					} //figuresBlack[5].concat(alpha[k]).concat(i);}
				else if (i==7){
				if(k>=5) {
					var next=k-b;
					board[i][k]=new figure(alpha[k].concat(i+1),figuresBlack[next]);//figuresBlack[next].concat(alpha[k]).concat(i);
					b+=2;
					}
				else board[i][k]=new figure(alpha[k].concat(i+1),figuresBlack[k]);//figuresBlack[k].concat(alpha[k]).concat(i);
				}
	
			
			
	}}
		
	
	


return board;

}


function ShowMeAvailableMoves(fromThisPos,chessBoard){
	var temp = new figure();
	var moves = new Array();
	temp=fromThisPos;
	var i;
	
	//switch(temp.type){
	
	//case ("P-"):
		if(temp.type="P-"){
		
		
	
		
		for(i=0;i<4;i++){
			
		if (temp.firstMove==1 && i==0){
			
			if((chessBoard[Number(temp.fileN()+2)][temp.fileN()]).type=="0-")
			
			{ moves[i]=temp.fileC().concat(Number(temp.rank())+2);}}
			
			
		
		 else
		
		if(((chessBoard[Number(temp.fileN()+1)][temp.fileN()]).type=="0-") && i==1){
			moves[i]=temp.fileC().concat(Number(temp.rank())+1);}
		else
		
		if(((chessBoard[Number(temp.fileN()+1)][temp.fileN()+1])) && i==2){
		
			var m=temp.fileN()+1;
			moves[i]=alpha[m]+""+(Number(temp.rank())+1); 
		} else
		if(((chessBoard[Number(temp.fileN()-1)][temp.fileN()+1])) && i==3){
			var m=temp.fileN()-1;
			moves[i]=alpha[m]+""+(Number(temp.rank())+1);
			}
		
		}
		
	
	}return moves;
} //Move

function Validate(thisPosition){}

var b = InitChessBoard();
//console.log(b);
//console.log((b[1][1]).position);
//console.log((b[1][1]).index());
//console.log((b[1][1]).rank());
//console.log("broj"+(b[1][4]).fileN());
//console.log(("bukva"+(b[1][4]).fileC())+" "+(b[1][4]).type+" "+(b[1][4]).firstMove);



//var temp = (b[1][1]);
/*console.log("===============================");
console.log((b[Number(temp.fileN()+2)][temp.fileN()]).fileC());
console.log(temp.fileC().concat(Number(temp.rank())+2));*/


//var a = ShowMeAvailableMoves(b[1][1],b);
//var b = ShowMeAvailableMoves(b[1][2],b);
//var c = ShowMeAvailableMoves(b[1][3],b);
//var d = ShowMeAvailableMoves(b[1][4],b);
//var e = ShowMeAvailableMoves(b[1][5],b);


/*for(var i=0;i<8;i++){
	
	console.log((b[1][i]).type);
}*/


//console.log(a);
//console.log(b);
/*console.log(c);
console.log(d);
console.log(e);
console.log(b[1][5]);
console.log(b[3][5]);*/
temp=b[0][0];
//temp=b[0][1];
temp=b[0][2];
console.log(temp.fileN());
console.log(Number(temp.rank())-1);

console.log((b[Number(temp.rank())+1 ][temp.fileN()]));

/*for(var i=0;i<8;i++){
	for(var k=0;k<8;k++)
	{
console.log((b[i][k]).index);}}*/

/*function table() {
	var array = new Array();
	var alphas = "abcdefgh";

	for (var i = 0; i < 8; i++) {
		var ch = alphas.charAt(i);
		for (var k = 0; k < 8; k++) {

			array.push([ ch.concat(k), 0 ]);
		}

	}
	return array;
}

// var ar=table();

function initStartPositions() {
	var array = new Array();

	var alpha = "abcdefgh";

	var white = [ "R-", "N-", "B-", "Q-", "K-", "B-", "N-", "R-", "P-" ];
	var black = [ "r-", "n-", "b-", "q-", "k-", "b-", "n-", "r-", "p-" ];

	for (var i = 0; i < 8; i++) {

		var ch1 = alpha.charAt(i);

		array.push([ white[i].concat(ch1.concat(1)) ]);
		array.push([ white[8].concat(ch1.concat(2)) ]);

	}

	for (var i = 8; i < 0; i--) {

		var ch1 = alpha.charAt(i);

		array.push([ black[i].concat(ch1.concat(8)) ]);
		array.push([ black[8].concat(ch1.concat(7)) ]);

	}

	
	 * for (var i = 0; i < 8 ; i++) { for (var k = 0; k < 2; k++){ var ch1 =
	 * alpha.charAt(k);
	 * 
	 * 
	 * if(i==0) array.push([ch1.concat(k+1),white[i].concat(ch1.concat(k+1))]);
	 * 
	 * else array.push([ch1.concat(k+1),white[8].concat(ch1.concat(k+1))]);
	 *  } }
	 

	for (var i = 3; i < 6; i++) {
		for (var k = 0; k < 8; k++) {
			var ch1 = alpha.charAt(i);
			array.push([ ch1.concat(k), 1 ]);
		}
	}

	for (var i = 6; i < 8; i++) {
		for (var k = 0; k < 8; k++) {
			ch1 = alpha.charAt(i);

			if (i == 6)
				array.push([ ch1.concat(k + 1),
						black[k].concat(ch1.concat(k + 1)) ]);

			else
				array.push([ ch1.concat(k + 1),
						black[8].concat(ch1.concat(k + 1)) ]);

		}
	}

	return array;
}

function init() {

	document.getElementById("demo").innerHTML = initStartPositions();
	document.getElementById("board").innerHTML = chessboard();

}

ar = initStartPositions();

console.log(ar);
*/