// Chessboard



var WHITE = 'w';
var BLACK = 'b';
var LETTERS = 'abcdefgh';

// Self-contained instance of a chessboard
function Chessboard() {
	this.reset();
}

Chessboard.prototype.reset = function() {
	var i;
	this.move = 0;
	this.turn=true;
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
	
	this.set(7,	0, new Rook(BLACK, 1));
	this.set(7, 1, new Knight(BLACK, 1));
	this.set(7, 2, new Laufer(BLACK, 1));
	this.set(7, 3, new Queen(BLACK));
	this.set(7, 4, new King(BLACK));
	this.set(7, 5, new Laufer(BLACK, 2));
	this.set(7, 6, new Knight(BLACK, 2));
	this.set(7, 7, new Rook(BLACK, 2));
}

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


Chessboard.prototype.play = function(){
	
		
		var board = c.board;
		c.turn = true;
		var myMoveNumber;
		var myMove;
		var figure;
		var whiteTeam;
		var blackTeam;
		var allMoves;
		var kingAlive ;
		var i ;
		gameOver = setInterval(function() {
			console.log("" + c);
			
			if(c.turn){
				allMoves = (c.moves());
				whiteTeam = allMoves.filter(
						function (value) {
							return (value.fig.color.charAt(0) == 'w');
						}
					);
				 myMoveNumber = Math.floor(Math.random() * whiteTeam.length);
				 myMove = whiteTeam[myMoveNumber];
				 figure = board[myMove.fig.pos.row][myMove.fig.pos.col];
				if(figure !=null) 
				 kingAlive = c.makeMove(figure, myMove)
				
			}else {
				allMoves = (c.moves());
				blackTeam = allMoves.filter(
						function (value) {
							return (value.fig.color.charAt(0) == 'b');
						}
					);
				myMoveNumber = Math.floor(Math.random() * blackTeam.length);
				myMove = blackTeam[myMoveNumber];
				figure = board[myMove.fig.pos.row][myMove.fig.pos.col];
				if(figure !=null) 
				kingAlive = c.makeMove(figure, myMove);
				
			}
			if(!kingAlive){
				clearTimeout(gameOver);
			}
			c.turn = !c.turn;
		}, 100)
		
}

Chessboard.prototype.makeMove = function(figure, myMove){
	console.log(myMove.from + " " + myMove.to);
	this.board[figure.pos.row][figure.pos.col] = null;	
	if(this.board[myMove.to.row][myMove.to.col] != null){
		var takenFigure = this.board[myMove.to.row][myMove.to.col];
		if(takenFigure.type == "KG"){
			this.set(myMove.to.row,myMove.to.col, figure);
			console.log("Taken figure is King");
			console.log("Game over");
			return false;
		}
	}
	
	this.set(myMove.to.row,myMove.to.col, figure);
	return true;
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
	if (index) this.index = index;
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
    var moveCounter = 0;
    if(fig.color==BLACK){
	     steps = steps.map(function(obj){
	      obj[0]=obj[0]*(-1);
	      obj[1]=obj[1]*(-1);
	      return [obj[0], obj[1]];
	    });
	    }
   
    for(var i=0; i<steps.length; i++) {
    	var step = steps[i];
    
    	var tmp = fig.pos.off(step[0], step[1]);
    
    	var at = this.board.at(tmp);
  	
        while(at === null || at && at.color != fig.color) {
        	
        		if(fig instanceof Pawn){
				
				if(at === null ){
						
							if(fig.movePawn(step))
								{
								if(moveCounter < 2){
									var pown = fig.pos;
									
									if(pown.row == 1){
										var tmp2 = fig.pos.off(step[0]+1, step[1]);
										moves.push(tmp2);
										
									} if( pown.row == 6){
										var tmp3 = fig.pos.off(step[0]-1, step[1]);
										moves.push(tmp3);
									}	
									moveCounter++;
								}
								
								moves.push(tmp);	
								}
									
					
				} else if(at !=null && at.color !=fig.color){
					
					if(fig.pawnAttack(step))
					moves.push(tmp);
				}
			}
			
			else moves.push(tmp);
   			
        	if (at != null || !repeat) break;
        	var tmp = tmp.off(step[0], step[1]);
        	var at = this.board.at(tmp);
        }
        
      

    }
    
    moves = moves.map(function(x) {
        return new Movement(fig, x);
    });
          
	return moves;
}

Figure.prototype.movePawn = function(tmp){
	
	if((tmp[0] == 1 && tmp[1] == 0) || (tmp[0] == -1 && tmp[1] == 0)){
		
		return true;
	} else return false;
	
	
}

Figure.prototype.pawnAttack = function(tmp){
	
	if((tmp[0] == 1 && tmp[1] == -1) || (tmp[0] == 1 && tmp[1] == 1) || (tmp[0] == -1 && tmp[1] == 1) || (tmp[0] == -1 && tmp[1] == -1)){
		
		return true;
	} else return false;
}

Figure.prototype.toString = function() {
	return this.color + this.type + (this.index || ''); 
}

Figure.prototype.init = function() {
	Figure.apply(this, arguments);
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
	
	 
	 var steps = [
	             [+1,  0],
	     	     [+1, -1],
	     	     [+1, +1]
	     ];
	 return this.moveSteps(steps, false); 
	
}

// ===== Demo code ======



var c = new Chessboard();
c.play();



