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
var flagClickElement = false;
var br = 0;
for(var i = 0; i < 8; i++){
	lettersPossition.push(LETTERS[i]);
}

function drawChessTable(c, xA, yA){
	var i = 0;
	var j = 0;
	var table = document.createElement("table");
	for(i=0;i<8;i++){
		var tr = document.createElement("tr");
		for(j=0;j<8;j++){
			var td = document.createElement("td");
			if(i%2 == j%2)
				td.style.backgroundColor = "white";
			else
				td.style.backgroundColor = "gray";
			//Gledame dali na odredena pozicija postoj figura 
			//Ako postoj ispecatija
			if(c.board[i][j] != null){
				// console.log(figure.type);
				// console.log(figure.color);
				var figure = c.board[i][j];
				var img = drawImagesTable(figure);
				img.onclick = (function ime(figure, i, j) {
					//console.log(i + " " + j );
					return function(){
						flagClickElement = true;
						showEnablePossitions(figure.moves()); 
						//console.log('Figura=' + figure.moves());
					};
				})(figure, i ,j);
				// img.onclick = function(){ 
				// 		console.log('Figura=' + figure.moves());
				// };
				// (function(){ 
				// 		console.log('Figura=' + figure.moves());
				// })();
			 	td.appendChild(img);
			}
			if(flagClickElement && xA[0]-1 == i && yA[0] == j){
				console.log("xa[0]=" + xA[0] + " i=" + i);
				console.log("ya[0]=" + yA[0] + " j=" + j);
				td.style.backgroundColor = "green";
			}
			if(flagClickElement && xA[1]-1 == i && yA[1] == j){
				console.log("xa0=" + xA[1] + " i=" + i);
				console.log("xa0=" + yA[1] + " j=" + j);
				td.style.backgroundColor = "green";
			}
			tr.appendChild(td);
		}				
		table.appendChild(tr);
	}
	
	flagClickElement = false;
	
	document.getElementById("chessTable").innerHTML = "";
	document.getElementById("chessTable").appendChild(table);
}

//Prikaz na slobodni pozicii
function showEnablePossitions(possition){
	console.log('Figura=' + possition);
	// console.log('FiguraL=' + possition.length);
	// console.log('Figura[0]=' + possition[0]);
	// console.log('Figura[1]=' + possition[1]);
	var possitionParts = [];
	var realPossitionParts = [];
	
	//Go vadam posebno site mozno pozicii za da mozam da mu ja zemam pozicijata
	for(var i = 0; i < possition.length; i++){
		var s = "" + possition[i];		
		realPossitionParts.push(getRealPossitions(s));
	}
	// console.log('Real=' + realPossitionParts);
	
	colorPossitions(realPossitionParts);
};

//Ja zemam pozicijata samo so mi e potrebna primer od "g8" ja zema samo "8"
function getRealPossitions(s){
	var p = s.split(">");
	//console.log('P=' + p[0] + "----" + p[1]);	
	return p[1];
};

//Tuka gi vadam pozicite so treba da se obojat i gi pustam vo drawColorPossition
//I gi pustame vo glavnata f-ja drawChessTable
function colorPossitions(realP){
	console.log('realP0=' + realP);			
	// console.log('realP=' + realP[0][1] + "----" + realP[1][1]);		
	// console.log('realP1=' + lettersPossition.indexOf(realP[0][0]) + "----" + lettersPossition.indexOf(realP[1][0]));		
		
	var realPArrayX = [];
	var realPArrayY = [];
	for(var i = 0; i < realP.length; i++){	
		console.log('realP=' + realP[i][1]);		
		console.log('realP1=' + lettersPossition.indexOf(realP[i][0]));		
		realPArrayX.push(realP[i][1]);
		realPArrayY.push(lettersPossition.indexOf(realP[i][0]));
		console.log(realPArrayX + " " + realPArrayY);
	}
	drawChessTable(c, realPArrayX, realPArrayY);
};


//Pecatenje na sliki tuka primam argument od slika
function drawImagesTable(nameFigure){
	// console.log(nameFigure.color+nameFigure.type);
	var img = document.createElement("img");
	img.src = "images/" + nameFigure.color+nameFigure.type + ".png";
	return	img;
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
//Se civat vo matrica t.e. od tablata na ke mesto koja figura se naoga
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
drawChessTable(c);
// console.log("" + c);
// console.log("" + c.moves().join(", "));
// console.log("-->" + c.figures);
// console.log("---->" + c.board[1][1].moves());
// console.log("---->" + c.board[4][4]);



