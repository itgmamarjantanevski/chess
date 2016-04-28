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
var lettersPossition = [];
var br = 0;
var figureToMove;

for(var i = 0; i < 8; i++){
	lettersPossition.push(LETTERS[i]);
}

function showEnablePossitions(possition){
	// console.log('show=' + possition);
	var possitionParts = [];
	var realPossitionParts = [];
	//Go vadam posebno site mozno pozicii za da mozam da mu ja zemam pozicijata
	var s = "" + possition[0];		
	var f = s.substring(0,3);
	for(var i = 0; i < possition.length; i++){
		var s = "" + possition[i];		
		var p = s.split(">");
		realPossitionParts.push(p[1]);
	}
	console.log('Real=' + realPossitionParts);
	console.log('F=' + f);
	
	var realPArrayX = [];
	var realPArrayY = [];	
	for(var i = 0; i < realPossitionParts.length; i++){			
		realPArrayX.push(realPossitionParts[i][1]-1);
		realPArrayY.push(lettersPossition.indexOf(realPossitionParts[i][0]));
	}
	// console.log(realPArrayX + " " + realPArrayY);
	return realPArrayX.concat(realPArrayY);		
};

//Proverka dali kliknatata figura ima mozni potezi	
function checkAveliable(kor){
	if(kor.length == 0){
		alert("Your figure doesn't have available moves!");
	}	
};

//Dvizenje na figurata + brisenje na starata 
function movingYourFiugre(x, y){
	// console.log("FigTM->" + figToM);
	// console.log("I->" + x);	
	// console.log("J->" + y);	
	if(figureToMove != null){
		for(var i=0;i<8;i++){
			for(var j=0;j<8;j++){
				// console.log(c.board[i][j]);
				// console.log(figureToMove);
				if(c.board[i][j] == figureToMove){
					console.log(c.board[i][j]);
					console.log(figureToMove);
					c.board[i][j] = null;
				}
			}
		}
		c.set(x, y, figureToMove);
		c.drawChessTable();
	}
	figureToMove = null;
};

//Pecatenje na tablata celo/griavo + sliki
Chessboard.prototype.drawChessTable = function(kor){
	var i = 0;
	var j = 0;	
	var table = document.createElement("table");
	table.id='chessboard';
	//Pecatenje na cela tabla so available moves
	for(i=0;i<9;i++){
		var tr = document.createElement("tr");
		tr.dataset.row = (i + 1);
		for(j=0;j<8;j++){
			var td = document.createElement("td");
			td.dataset.col = String.fromCharCode(64 + (j+1));
			if(i == 8){
				td.style.backgroundColor = "white";
				td.innerHTML = LETTERS[j].toUpperCase();
			}else{
				if(i%2 == j%2){
					td.style.backgroundColor = "white";
				}else{
					td.style.backgroundColor = "gray";
				}
				
				//Available moves
				if(this.board[i][j] != null){
					var figure = this.board[i][j];
					var img = new Image();
					img.src = "images/" + figure.color+figure.type + ".png";
					var poss = img.src;
					
					img.addEventListener('click', (function (figure) {
						return function(){
							var colorP = [];
							var availMoves = figure.moves();
							if(availMoves.length > 0 ){
								colorP = showEnablePossitions(figure.moves()); 
								console.log(colorP);
								c.drawChessTable(colorP);
								checkAveliable(colorP);
								figureToMove = figure;
							}
							else{
								console.log('No moves: null');
							}
						};
					})(figure));
					
					img.addEventListener('mouseout', (function (figure) {
						return function(){
							// console.log('Figura=' + figure.moves());
							// console.log("asd");
							//c.drawChessTable(null);
						};
					})(figure));
					
					td.appendChild(img);
				}else{
					//Tuka ako se klikni na prazna pozicija tuka vidi dali mozi da 
					//se pomesti figurata so ti se naoga vo figureToMove
				    // console.log("---------------" + this.board[i][j]);
					td.onclick = (function (i, j) {
						return function(){
							if(figureToMove != null){
								//alert("Selektirana e figurata " + figureToMove);								
								movingYourFiugre(i, j);
							}
						};
					})(i, j);
					
				}
				//Tuka ja pustame cela niza so koordinati so ni se 
				//Prajme deleno so 2 posto preku eden element zemame
				// console.log("---------------" + kor);
				if(kor != null){
					if(kor.length == 2){
						//Vo slucaj da vrati edna pozicija togas nemame preku eden
						if(kor[0] == i && kor[1] == j){
							td.style.backgroundColor = "green";
						}
					}else{
						for(var k = 0; k < kor.length/2; k++){
							//console.log("-" + kor[k] + " = " + kor[k+2]);
							if(kor[k] == i && kor[k+2] == j){
								console.log("-" + kor[k]);
								console.log("-" + kor[k+2]);
								td.style.backgroundColor = "green";
							}
						}	
					}
				}
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.getElementById("chessTable").innerHTML = "";
	document.getElementById("chessTable").appendChild(table);
};

// Self-contained instance of a chessboard
function Chessboard() {
	this.reset();
}	

Chessboard.prototype.reset = function() {
	var i;
	this.move = 0;
	this.figures = [];
	this.board = [];

//borad[] na pocetok ni e inicijalizirana cela na null
	for(i=0; i<8; i++) 
		this.board[i] = [null, null, null, null, null, null, null, null];

//figure[] na pocetok ni e inicijalizirana cela na null
//Tuka figure[] ja polnime
//Za sekoja figura se povikva funkcija kaj so se deklarira/inicijalizira
//Tuka ni se belite, vo sredina pionite, a dolu crnite
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

//Tuka pustame redica, kolona i figura
//Se cuvat vo matrica t.e. od tablata na ke mesto koja figura se naoga
//Setirame nova pozicija za odredana figura
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

//Vraka selektirana figura od chessboard
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

function Figure(type, color, index) {
	this.type = type;
	this.color = color;
	if (index) 
		this.index = index;
}

Figure.parent = function (d) {
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
    var movement = this.board.move;
    var twoSquares=true;
   
    if(arguments[0] && fig instanceof Pawn)
    {
      var color = (fig.color == WHITE) ? +1 : -1;
      for(var i=0 ; i<4 ; i++)
      {
        switch (i) 
        {
          case 0:
          { 	
            tmp = fig.pos.off(color,0);
            at = this.board.at(tmp);
            if(at === null) moves.push(tmp);
            else twoSquares=false;
            continue;
          }
          case 1:
          {   
            if(twoSquares)
            {
              tmp = fig.pos.off((2*color),0);
              at = this.board.at(tmp);
              if(at === null) moves.push(tmp);
            }
            continue;
          }
          case 2:
          {
            tmp = fig.pos.off(color,1);
            at = this.board.at(tmp);
            if ((at != null) && (fig.color != at.color))  moves.push(tmp);
            continue;
          }	
          case 3:	
          {
            tmp = fig.pos.off(color,-1);
            at = this.board.at(tmp);
            if ((at != null) && (fig.color != at.color))  moves.push(tmp);
            continue;
          }	
        }
   	}
	}
    else 
    {
    	for(var i=0; i<steps.length; i++) 
    	{
	    	var step = steps[i];
	    	var tmp = fig.pos.off(step[0], step[1]);
	
	    	var at = this.board.at(tmp);
	        while(at === null || at && at.color != fig.color) 
	        {
	        	moves.push(tmp);
	        	
	        	if (at != null || !repeat) break;
	        	var tmp = tmp.off(step[0], step[1]);
	        	var at = this.board.at(tmp);
	        }
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

// ===== Rook Type ======

Figure.parent(Rook);
function Rook(color, index, pos) {
	this.init('R', color, index, pos);
}

Rook.prototype.moves = function(steps) {
    var steps = [
         [+1,  0],
         [ 0, +1],
         [-1,  0],
         [ 0, -1]
    ];
    return this.moveSteps(steps, true);
}

// ===== King Type ======

Figure.parent(King);
function King(color, pos) {
	this.init('KG', color, null, pos);
}

King.prototype.moves = function() {
	var steps = [
	    [+1,  0],
	    [+1, +1],
	    [ 0, +1],
	    [-1, +1],
	    [-1,  0],
	    [-1, -1],
	    [ 0, -1],
	    [+1, -1]
	 ];
	return this.moveSteps(steps, true);
}

// ===== Queen Type ======

Figure.parent(Queen);
function Queen(color, pos) {
	this.init('QN', color, null, pos);
}


Queen.prototype.moves = function() {
	var steps = [
		[+1,  0],
		[ 0, +1],
		[-1,  0],
		[ 0, -1],
		[+1, +1],
		[+1, -1],
		[-1, +1],
		[-1, -1]
    ];
   return this.moveSteps(steps, true);
}

// ===== Knight Type ======

Figure.parent(Knight);
function Knight(color, index, pos) {
	this.init('S', color, index, pos);
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
function Laufer(color, index, pos) {
	this.init('L', color, index, pos);
}


Laufer.prototype.moves = function(){
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

Pawn.prototype.moves = function() {
	return this.moveSteps(true);
}


// ===== Demo code ======

var c = new Chessboard();
c.drawChessTable();
// console.log("" + c);
// console.log("" + c.moves().join(", "));
// console.log("-->" + c.figures);
// console.log("---->" + c.board[1][1].moves());
// console.log("---->" + c.board[4][4]);



