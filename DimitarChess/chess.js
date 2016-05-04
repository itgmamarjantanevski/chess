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
var figureToMove = null;
var figureMoveColor = true;
var brW = 0;
var brB = 0;
var takenFigures = [];

for(var i = 0; i < 8; i++){
	lettersPossition.push(LETTERS[i]);
}

//Pomestuvanje na figurata
//Vo figureToMove ja imam figurata
function movingYourFiugre(tr, td){
	// console.log(tr);
	// console.log(tr.dataset.row);
	// console.log(td);
	// console.log(td.dataset.col);
	// console.log(figureToMove.pos.row);
	// console.log(figureToMove.pos.col);
	// console.log(figureToMove.moves());	
	// console.log(figureToMove.pos);
	// console.log(figureToMove.moves()[0].to);
	
	if(figureMoveColor){
		if(figureToMove.color == "w"){
			for(var i = 0; i < figureToMove.moves().length; i++){
				// console.log("---" + figureToMove.moves()[i].to.row);
				// console.log("---" + figureToMove.moves()[i].to.col);
				// console.log("---" + tr.dataset.row);
				// console.log("---" + td.dataset.col);
				if(figureToMove.moves()[i].to.row == tr.dataset.row && figureToMove.moves()[i].to.col == td.dataset.col){
//					console.log("--->" + c.board[tr.dataset.row][td.dataset.col]);
					var pom1 = figureToMove.pos.row;
					var pom2 = figureToMove.pos.col;
					if(c.board[tr.dataset.row][td.dataset.col] == null){
						c.set(Number.parseInt(tr.dataset.row), Number.parseInt(td.dataset.col), figureToMove);
						c.board[pom1][pom2] = null;
						c.drawChessTable();
						if(figureMoveColor){
							figureMoveColor = false;
						}else{
							figureMoveColor = true;
						}
					}else{
						if(c.at(tr.dataset.row, td.dataset.col).type == "KG"){
							alert("WHITE is the winner, GAME OVER!");
							document.getElementById("takenFiguresW").innerHTML = "";
							c.reset();
							c.drawChessTable();
						}else{
							console.log("-->" + c.at(tr.dataset.row, td.dataset.col));
							takenFigures.push(c.at(tr.dataset.row, td.dataset.col));
							var figure = c.at(tr.dataset.row, td.dataset.col);
							var img = new Image();
							img.src = "images/" + figure.color+figure.type + ".png";
							document.getElementById("takenFiguresW").appendChild(img);
							c.set(Number.parseInt(tr.dataset.row), Number.parseInt(td.dataset.col), figureToMove);
							c.board[pom1][pom2] = null;
							c.drawChessTable();
							if(figureMoveColor){
								figureMoveColor = false;
							}else{
								figureMoveColor = true;
							}
						}
					}
				}
			}
		}else{
			alert("Figure white it's your turn!");
		}	
	}else{
		if(figureToMove.color == "b"){
			for(var i = 0; i < figureToMove.moves().length; i++){
				// console.log("---" + figureToMove.moves()[i].to.row);
				// console.log("---" + figureToMove.moves()[i].to.col);
				// console.log("---" + tr.dataset.row);
				// console.log("---" + td.dataset.col);
				if(figureToMove.moves()[i].to.row == tr.dataset.row && figureToMove.moves()[i].to.col == td.dataset.col){
//					console.log("--->" + c.board[tr.dataset.row][td.dataset.col]);
					var pom1 = figureToMove.pos.row;
					var pom2 = figureToMove.pos.col;
					if(c.board[tr.dataset.row][td.dataset.col] == null){
						c.set(Number.parseInt(tr.dataset.row), Number.parseInt(td.dataset.col), figureToMove);
						c.board[pom1][pom2] = null;
						c.drawChessTable();
						if(figureMoveColor){
							figureMoveColor = false;
						}else{
							figureMoveColor = true;
						}
					}else{
						if(c.at(tr.dataset.row, td.dataset.col).type == "KG"){
							alert("BLACK is the winner, GAME OVER!");
							document.getElementById("takenFiguresB").innerHTML = "";
							c.reset();
							c.drawChessTable();
						}else{
							console.log("-->" + c.at(tr.dataset.row, td.dataset.col));
							takenFigures.push(c.at(tr.dataset.row, td.dataset.col));
							var figure = c.at(tr.dataset.row, td.dataset.col);
							var img = new Image();
							img.src = "images/" + figure.color+figure.type + ".png";
							document.getElementById("takenFiguresB").appendChild(img);
							c.set(Number.parseInt(tr.dataset.row), Number.parseInt(td.dataset.col), figureToMove);
							c.board[pom1][pom2] = null;
							c.drawChessTable();
							if(figureMoveColor){
								figureMoveColor = false;
							}else{
								figureMoveColor = true;
							}
						}
					}
				}
			}	
		}else{
			alert("Figure black it's your turn!");
		}	
	}
	figureToMove = null;
};

//Tuka ja zema figurata
/*function takeFigure(figure){
	if(figureToMove.color == figure.color){
		console.log(figureToMove);
		c.board[figureToMove.pos.row][figureToMove.pos.col] = null;
					
	}
};
*/

//Funkcija od gi oboj zeleni polinjata so se available za odredena figura
function drawAvailableMoves(availableMoves){
	//Boja zelena na site available pozici
	for(var i=0; i < availableMoves.length; i++){
		var movement = availableMoves[i];
		var q = '#chessboard tr[data-row="' + movement.to.row + '"] td[data-col="' +  movement.to.col + '"]';
		var td = document.querySelectorAll(q)[0];
//		console.log(td);
		
		if(!td.classList.contains('available-moves'))
			td.classList.add('available-moves');
	}
	
	//Boja crvena na site available pozici za zemanje na figura
	for(var i=0; i < availableMoves.length; i++){
		var movement = availableMoves[i];
		var q = '#chessboard tr[data-row="' + movement.to.row + '"] td[data-col="' +  movement.to.col + '"]';
		var td = document.querySelectorAll(q)[0];
		//console.log(td);
		
		if(td.innerHTML != "")
			td.classList.add('available-moves-take-figure');
	}
	
};

function drawDisableAvailableMoves(availableMoves){
	//Brisenje na boja zelena na site available pozici
	for(var i=0; i < availableMoves.length; i++){
		var movement = availableMoves[i];
		var q = '#chessboard tr[data-row="' + movement.to.row + '"] td[data-col="' + movement.to.col + '"]';
		var td = document.querySelectorAll(q)[0];
		//console.log(td);
		
		if(td.classList.contains('available-moves'))
			td.classList.remove('available-moves');
	}

	//Brisenje na boja crvena na site available pozici za zemanje na figura
	for(var i=0; i < availableMoves.length; i++){
		var movement = availableMoves[i];
		var q = '#chessboard tr[data-row="' + movement.to.row + '"] td[data-col="' +  movement.to.col + '"]';
		var td = document.querySelectorAll(q)[0];
		//console.log(td);
		
		if(td.innerHTML != "")
			td.classList.remove('available-moves-take-figure');
	}
};

//Pecatenje na tablata celo/griavo + sliki
Chessboard.prototype.drawChessTable = function(){
	var i = 0;
	var j = 0;	
	var table = document.createElement("table");
	table.id='chessboard';
	//Pecatenje na cela tabla so available moves
	for(i=0;i<9;i++){
		var tr = document.createElement("tr");
		tr.dataset.row = i;
		for(j=0;j<8;j++){
			var td = document.createElement("td");
			td.dataset.col = j;
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
					
					img.addEventListener('mouseenter', (function (figure) {
						return function(){
							var availMoves = figure.moves();
							if(availMoves.length > 0 )
								drawAvailableMoves(figure.moves());
							else
								console.log('No moves: null');
						};
					})(figure));
					
					img.addEventListener('mouseout', (function (figure) {
						return function(){
							var availMoves = figure.moves();
							if(availMoves.length > 0 )
								drawDisableAvailableMoves(figure.moves());
							else
								console.log('No moves: null');
						};
					})(figure));
					
					img.addEventListener('click', (function (figure, tr, td) {
						return function(){
							var availMoves = figure.moves();
/*							if(availMoves.length > 0){
								// console.log("---" + c.board[Number.parseInt(tr.dataset.row)][Number.parseInt(td.dataset.col)]);
								// if(c.board[Number.parseInt(tr.dataset.row)][Number.parseInt(td.dataset.col)]){
								figureToMove = figure;				
							}
							else{
								console.log('No moves: null');
								figureToMove = null;
							}
	*/ 
							if(availMoves.length > 0 && figureToMove == null){
								figureToMove = figure;				
							}else if(figureToMove != null){
								if(figureToMove.moves().length > 0){
									movingYourFiugre(tr, td);
								}
							}else{
								console.log('No moves: null');
								figureToMove = null;
							}
						};
					})(figure, tr, td));
					
					td.appendChild(img);
				}else{
					//Tuka ako se klikni na prazna pozicija tuka vidi dali mozi da 
					//se pomesti figurata so ti se naoga vo figureToMove
				    // console.log("---------------" + this.board[i][j]);
					td.addEventListener('click', (function (tr, td) {
						return function(){
							if(figureToMove != null){
								var availMoves = figureToMove.moves();
								if(availMoves.length > 0 )
									movingYourFiugre(tr, td);
								else
									console.log('No moves: null');
							}
						};
					})(tr, td));
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
};	

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
   	var twoSquares1=true;
   	var twoSquares2=true;
   
    if(arguments[0] && fig instanceof Pawn)
    {
		//Tuka ako pozicijata na Pawn e ednakvo nekoe pole na null
		//od redica 1 ili redica 6 togas smej samo 1 zeleno pole	
		for(var k = 0; k < 8; k++){
			if(fig.color == "w")
				if(c.board[1][k] == null){
					twoSquares1 = false;
					twoSquares2 = false;
					break;
				}
			if(fig.color == "b")
				if(c.board[6][k] == null){
					twoSquares1 = false;
					twoSquares2 = false;
					break;
				}
		}
		
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
			if(twoSquares && twoSquares1)
			{
				tmp = fig.pos.off((2*color),0);
				at = this.board.at(tmp);
				if(at === null) moves.push(tmp);
			}else if(twoSquares && twoSquares2)
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
	return this.moveSteps(steps, false);
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



