
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

Chessboard.prototype.reset = function() {
    var i;
    this.turn = true;
    this.numMoves = 1;
    this.figures = [];
    this.figura = null;
    this.timeOut;
    this.board = [];
    for (i = 0; i < 8; i++) this.board[i] = [null, null, null, null, null, null, null, null];

    this.set(0, 0, new Rook(WHITE, "&#9814", 5, 5, 1));
    this.set(0, 1, new Knight(WHITE, "&#9816;", 3, 3, 1));
    this.set(0, 2, new Laufer(WHITE, "&#9815;", 3, 3, 1));
    this.set(0, 3, new Queen(WHITE, "&#9813", 9, 9));
    this.set(0, 4, new King(WHITE, "&#9812", 1, 10));
    this.set(0, 5, new Laufer(WHITE, "&#9815;", 3, 3, 2));
    this.set(0, 6, new Knight(WHITE, "&#9816;", 3, 3, 2));
    this.set(0, 7, new Rook(WHITE, "&#9814", 5, 5, 2));

    for (i = 0; i < 8; i++) {
        this.set(1, i, new Pawn(WHITE, "&#9817;", 1, 1, i + 1));
        this.set(6, i, new Pawn(BLACK, "&#9823;", 1, 1, i + 1));
    }

    this.set(7, 0, new Rook(BLACK, "&#9820;", 5, 5, 1));
    this.set(7, 1, new Knight(BLACK, "&#9822;", 3, 5, 1));
    this.set(7, 2, new Laufer(BLACK, "&#9821;", 3, 3, 1));
    this.set(7, 3, new Queen(BLACK, "&#9819;", 9, 9));
    this.set(7, 4, new King(BLACK, "&#9818;", 1, 10));
    this.set(7, 5, new Laufer(BLACK, "&#9821;", 3, 3, 2));
    this.set(7, 6, new Knight(BLACK, "&#9822;", 3, 3, 2));
    this.set(7, 7, new Rook(BLACK, "&#9820;", 5, 5, 2));
   
    //reset timer, div for takend figures
    document.getElementById('board').innerHTML="";
    document.getElementById('takenwFigures').innerHTML="";
    document.getElementById('takenbFigures').innerHTML="";
    document.getElementById('stats').innerHTML="Stats:<br />";
    clearTimeout(this.timeOut);
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
    if (arguments.length == 2) pos = new Pos(a, b);
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
// ===== functions for playing random ======

//get available moves for white and black player
//and play alternately in order
Chessboard.prototype.play = function(name) {
    var chessboard = this;
    this.drawChessboard(name);
    var flag = true;
    this.timeOut = setInterval(function() {
        var availableMoves = chessboard.moves();
        var whiteMoves = availableMoves.filter(
            function(value) {
                return (value.fig.color.charAt(0) == 'w');
            }
        );
        var blackMoves = availableMoves.filter(
            function(value) {
                return (value.fig.color.charAt(0) == 'b');
            }
        );
        var nextMove;
        if (chessboard.turn === true) {     
            nextMove=chessboard.findNextMove(whiteMoves);   
            flag = chessboard.makeMove(nextMove, "white", name);
        }
        else {
            chessboard.numMoves++;
            nextMove = chessboard.findNextMove(blackMoves);
            flag = chessboard.makeMove(nextMove, "black", name);
        }
        chessboard.drawFigures(name, flag);
        if (!flag) {
            clearTimeout(chessboard.timeOut);
        }
        chessboard.turn = !chessboard.turn;
    }, 500);
}
//find the best move(serach of all posiblle moves there is only one move that can take opposite fugure, that move is returned,
//if there are more than one move, then check the vale of figure that will be taken, adn return move with max value,
//if there are more that one moves with the same max value, then random move of them is returned
//if there are no moves that can take samo opposite figure, then random move from the list of all possible moves is returned
Chessboard.prototype.findNextMove= function(possibleMoves){
    var valueNextMove = [];
    var valueTakenFigure = [];
    var finalMoves=[];    
    var nextMove;        
    //if playing next move some figure will be taken
    for(var tmp = 0;tmp<possibleMoves.length;tmp++){
        if(this.at(possibleMoves[tmp].to.row,possibleMoves[tmp].to.col)!==null){
         valueNextMove.push(possibleMoves[tmp]);
        }
    }
    nextMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];  
    //if in array is only one element then make that move
    if(valueNextMove.length==1){
        nextMove = valueNextMove[0];  
    }
    //if in array there are more moves put the value of figures that will be taken in array
    else if(valueNextMove.length>1){
            for(tmp=0; tmp<valueNextMove.length;tmp++){
                valueTakenFigure.push(valueNextMove[tmp].fig.valueForTaking);
            }
            //sort and reverse the array to get the max value od figure that acn be taken
            valueTakenFigure.sort();
            valueTakenFigure.reverse();
            //get the max value
            var mostValued = valueTakenFigure[0];
            //find the figures with that value(there can me more than one figure with the same value)
            for(tmp = 0 ; tmp<valueNextMove.length;tmp++){
                if(mostValued==valueNextMove[tmp].fig.valueForTaking)  {
                finalMoves.push(valueNextMove[tmp]);
                }
            } 
            //take random(if there are more than one)
            nextMove = finalMoves[Math.floor(Math.random() * finalMoves.length)];  
         }
    return nextMove;
}

//pritn stats, and check if the next position od the figure is not null, that figure is deleted from chessboard,
//and check if that figure is King - the Game is over
Chessboard.prototype.makeMove = function(figNextMove, player, chessboardName) {
    var chessboard= this;
    document.getElementById('stats').innerHTML+="Next " + player + " move on chessboard "+chessboardName+": " + figNextMove.fig + " from pos: " + figNextMove.from + " to position: " + figNextMove.to + "<br />";
    chessboard.board[figNextMove.from.row][figNextMove.from.col] = null;
    if (chessboard.board[figNextMove.to.row][figNextMove.to.col] != null) {
        var zemenaFigura = chessboard.board[figNextMove.to.row][figNextMove.to.col];
        document.getElementById('taken' + zemenaFigura.color+'Figures').innerHTML+=zemenaFigura.img;      
        zemenaFigura.pos.row = null;
        zemenaFigura.pos.col = null;
        if (zemenaFigura.type == "KG") {
            document.getElementById('stats').innerHTML="Game Over, the winner is player: " + player + "<br />";
            chessboard.set(figNextMove.to.row, figNextMove.to.col, figNextMove.fig);
            return false;
        }
    }
    chessboard.set(figNextMove.to.row, figNextMove.to.col, figNextMove.fig);
    return true;
}
// ===== end of functions for playing random ======

// ===== function for playing manually ======

//hovers the posiblle moves for hovered figure
Chessboard.prototype.hover = function(i,j){
    var currentMoves = this.getElementByCoordinates(i,j);
    if(currentMoves && currentMoves.length!=0){
        for(var j=0;j<currentMoves.length;j++){
            var m =  document.getElementById(String.fromCharCode(currentMoves[j].to.col + 65) + (currentMoves[j].to.row+1));
            m.parentElement.classList.add('hovered');    
        }
    }        
}

//return to original condition positions for pervios hovered figure
Chessboard.prototype.notHover= function(i,j){
    var currentMoves = this.getElementByCoordinates(i,j);
    if(currentMoves && currentMoves.length!=0){
        for(var j=0;j<currentMoves.length;j++){
            var m =  document.getElementById(String.fromCharCode(currentMoves[j].to.col + 65) + (currentMoves[j].to.row+1));
            m.parentElement.classList.remove('hovered')
        }
    }        
}

//return posiblle movements for the figure witch is placed on postion i and j
Chessboard.prototype.getElementByCoordinates= function(i,j){
    var currentFigure = this.at(i,j);
    if(currentFigure!=null){
        var currentMoves = currentFigure.moves();
            if(currentMoves.length!=0){
                return currentMoves;
             }    
    }   
}

//select the figure that is clicked, and check possible clicks on postions that are not allowed
Chessboard.prototype.selectFigure= function(i,j) { 
    this.notHover(i,j);
    if(this.figura===null){
        var currentPosition = this.at(i,j);
        if(currentPosition!==null){
            if(currentPosition!=null&&((this.turn&&currentPosition.color=='w')||(!this.turn&&currentPosition.color=='b'))){
                 this.figura=currentPosition;
                 document.getElementById(String.fromCharCode(currentPosition.pos.col + 65) + (currentPosition.pos.row+1)).parentElement.classList.add('bordered')
                 this.turn=!this.turn;
            }
            else{
                document.getElementById('stats').innerHTML+="Wait, it's not your turn!!!<br />";
                this.figura=null;
            }
        }
        else{
                document.getElementById('stats').innerHTML+="You clicked on empty space<br />";
                this.figura=null;
            }
    }    
    else{
        this.placeFigure(i,j);
    }
}

//place the figure on clicked place, pritn stats, and check if the next position od the figure is not null, that figure is deleted from chessboard,
//and check if that figure is King - the Game is over 
Chessboard.prototype.placeFigure= function(i,j) {
    document.getElementById(String.fromCharCode(this.figura.pos.col + 65) + (this.figura.pos.row+1)).parentElement.classList.remove('bordered')
    var availableMoves = this.figura.moves();
    var isok=false;
    for(var m = 0; m<availableMoves.length;m++){
       if(availableMoves[m].to.col==j&&availableMoves[m].to.row==i){
          isok=true;
       }}       
    if(isok){
        var color;
        if(this.turn){
            color='White'; 
        }else{
            color='Black';
        }    
        document.getElementById('stats').innerHTML+=color+ " player turn!<br />";
        this.board[this.figura.pos.row][this.figura.pos.col]=null;
        this.figura.pos.col=i;
        this.figura.pos.row=j;
        if(this.board[i][j]!=null){  
           var div=document.getElementById('taken'+this.board[i][j].color+'Figures');   
           div.innerHTML+=this.board[i][j].img;      
           if(this.at(i,j).type=='KG'){
               document.getElementById('stats').innerHTML="Game Over, the winner is player: " + (this.turn ? "Black" : "White") + "<br />";
           }
        }
        this.set(this.figura.pos.col, this.figura.pos.row,this.figura);
        this.drawFigures("me");
        this.figura=null; 
    } 
    else {
        document.getElementById('stats').innerHTML+="This position is not allowed!<br />";
        this.figura=null;
        this.turn=!this.turn;
    }   
    
    if(this.at(i,j)&&this.at(i,j).color=='b'){
        this.numMoves++;
    }     
}
// ===== end of functions for plaing manually ======

// ===== common functions (for playin mannualy and random) ======

//drawing chessboard(function is called only the first time)
Chessboard.prototype.drawChessboard = function(name) {
    var chessboard=this;
    var divTable = document.createElement('div');
    divTable.id = name;
    divTable.className = 'table';
    document.getElementById('board').appendChild(divTable);
    var table = document.createElement('table');
    table.className = 'table';
    var tr, td;
    for (var i = 8; i > 0; i--) {
        tr = document.createElement('tr');
        for (var j = 0; j < 8; j++) {
            td = document.createElement('td');
            td.className = 'td';
            var span = document.createElement('span');            
            id= String.fromCharCode(j + 65) + i;
            span.id = id;            
            td.onmouseover = function(i,j){
                return function() {
                    chessboard.hover(i-1, j);                    
                };
            }(i,j);
            td.onmouseout = function(i,j){
                return function() {
                    chessboard.notHover(i-1, j);                    
                };
            }(i,j);
            td.onclick= function(i,j){
                return function() {
                    chessboard.selectFigure(i-1, j);                    
                };
            }(i,j);         
            if (i % 2 == j % 2) {
                td.className = 'white';
            }
            else {
                td.className = 'black';
            }            
            tr.appendChild(td);
            td.appendChild(span);
        }
        table.appendChild(tr);
    }
    divTable.appendChild(table);
    this.drawFigures(name);
}

//drawing figures on chessboard(function is called everytime some postion of figure is changed)
Chessboard.prototype.drawFigures= function(name){
    for (var i = 8; i > 0; i--){
        for (var j = 0; j < 8; j++) {
            var q = '#' + name + '>table>tr>td>#' + (String.fromCharCode(j + 65) + i);
            var span = document.querySelectorAll(q)[0];
            if(this.at(i-1,j)!=null||this.at(i-1,j)!=undefined){
                span.innerHTML=this.at(i-1,j).img;
            }
            else{
                span.innerHTML="";
            }
        }
    }
}
//end of common functions(for playin mannualy and random)

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

function Figure(type, color, img, valueforPlaying, valueForTaking, index) {
    this.type = type;
    this.color = color;
    this.img = img;
    this.valueforPlaying = valueforPlaying;
    this.valueForTaking = valueForTaking;
    if (index) this.index = index;
}

Figure.parent = function(d) {
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


// ===== King Type ======

Figure.parent(King);
function King(color, img, pos) {
    this.init('KG', color, img, null, pos);
}

King.prototype.moves = function() {
    var steps = [
        [+1, 0],
        [+1, +1],
        [0, +1],
        [-1, +1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [+1, -1]
    ];
    return this.moveSteps(steps, false);
}

// ===== Queen Type ======

Figure.parent(Queen);
function Queen(color, img, pos) {
    this.init('QN', color, img, null, pos);
}


Queen.prototype.moves = function() {
    var steps = [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [0, -1],
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

Rook.prototype.moves = function(steps) {
    var steps = [
        [+1, 0],
        [0, +1],
        [-1, 0],
        [0, -1]
    ];
    return this.moveSteps(steps, true);
}


// ===== Knight Type ======

Figure.parent(Knight);
function Knight(color, img, index, pos) {
    this.init('S', color, img, index, pos);
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
function Laufer(color, img, index, pos) {
    this.init('L', color, img, index, pos);
}


Laufer.prototype.moves = function() {
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
function Pawn(color, img, valueforPlaying, valueForTaking, index, pos) {
    this.init('P', color, img, valueforPlaying, valueForTaking, index, pos);
}

//possible moves for Pawn
Pawn.prototype.moveSteps = function(steps, numMoves) {
    var fig = this;
    var moves = [];
    if (fig.pos.row === null || fig.pos.col === null) { return moves; }
    if (fig.color == BLACK) {
        steps = steps.map(function(obj) {
            obj[0] = obj[0] * (-1);
            obj[1] = obj[1] * (-1);
            return [obj[0], obj[1]];
        });
    }
    //for moving on emty postion
    var step = steps[0];
    var tmp = fig.pos.off(step[0], step[1]);
    var at = this.board.at(tmp);
    if (at === null) {
        moves.push(tmp);
    }
    if (numMoves == 1 && at === null) {
        tmp = tmp.off(step[0], step[1]);
        at = this.board.at(tmp);
        if (at === null) {
            moves.push(tmp);
        }
    }
    //for taking opposite figure
    for (var i = 1; i < steps.length; i++) {
        step = steps[i];
        tmp = fig.pos.off(step[0], step[1]);
        at = this.board.at(tmp);
        if (at && at.color !== fig.color) {
            moves.push(tmp);
        }
    }
    moves = moves.map(function(x) {
        return new Movement(fig, x);
    });
    return moves;
}

Pawn.prototype.moves = function() {
    var fig = this;
    var board = this.board;
    var pos = this.pos;
    var steps = [
        [+1, 0],
        [+1, -1],
        [+1, +1]
    ];
    return this.moveSteps(steps, board.numMoves);
}

// ===== Demo code ======
var c1 = new Chessboard();

//button for random game
document.getElementById("randomGameBtn").onclick = function(){
    c1.reset();
    c1.play("me");
}

//button for manual game
document.getElementById("manualGameBtn").onclick= function(){
    c1.reset();
    c1.drawChessboard("me");
    document.getElementById('stats').innerHTML+="White player turn!<br />";
}