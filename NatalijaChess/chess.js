/**
 * http://usejsdoc.org/
 */

// var range = 8;
// // site mozni dvizenja
// var king = [ [ 1, 0 ], [ 1, 1 ], [ 0, 1 ], [ -1, 1 ], [ -1, 0 ], [ -1, -1 ],
// [ 0, -1 ], [ 1, -1 ] ];
// var pawnBlack = [ [ 0, 1 ], [ 0, 2 ], [ 1, 1 ], [ -1, 1 ] ];
// var pawnWhite = [ [ 0, -1 ], [ 0, -2 ], [ 1, -1 ], [ -1, -1 ] ];
// var knight = [ [ 2, 1 ], [ 1, 2 ], [ 1, -2 ], [ 2, -1 ], [ -1, -2 ], [ 1, -2
// ],
// [ -2, -1 ], [ -2, 1 ] ];
// var queen = [];
// var rook = [ [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ], [ 0, 5 ], [ 0, 6 ],
// [ 0, 7 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ],
// [ 7, 0 ], [ 0, -1 ], [ 0, -2 ], [ 0, -3 ], [ 0, -4 ], [ 0, -5 ],
// [ 0, -6 ], [ 0, -7 ], [ -1, 0 ], [ -2, 0 ], [ -3, 0 ], [ -4, 0 ],
// [ -5, 0 ], [ -6, 0 ], [ -7, 0 ] ];
// var bishop = [];

// podloga
var podloga = [];
for (var i = 0; i < 9; i++) {
	podloga[i] = [];
	for (var j = 0; j < 9; j++) {
		podloga[i][j] === null;
	}
}

// constructors for figures
function Pawn(name, color, shortcut, isInGame, coordinate) {
	this.name = name;
	this.color = color;
	this.shortcut = shortcut;
	this.isInGame = isInGame;
	this.coordinates = coordinate;
	this.isFirstMove = true;
}

function Rock(name, color, shortcut, isInGame, coordinate) {
	this.name = name;
	this.color = color;
	this.shortcut = shortcut;
	this.isInGame = isInGame;
	this.coordinates = coordinate;
}

function Bishop(name, color, shortcut, isInGame, coordinate) {
	this.name = name;
	this.color = color;
	this.shortcut = shortcut;
	this.isInGame = isInGame;
	this.coordinates = coordinate;
}

function Knight(name, color, shortcut, isInGame, coordinate) {
	this.name = name;
	this.color = color;
	this.shortcut = shortcut;
	this.isInGame = isInGame;
	this.coordinates = coordinate;
}

function King(namee, colorr, short, isInGamee, coordinate) {
	this.name = namee;
	this.color = colorr;
	this.shortcut = short;
	this.isInGame = isInGamee;
	this.coordinates = coordinate;
}

function Queen(name, color, shortcut, isInGame, coordinate) {
	this.name = name;
	this.color = color;
	this.shortcut = shortcut;
	this.isInGame = isInGame;
	this.coordinates = coordinate;
}

// creating pawns
var pawn1b = new Pawn("Pawn1", "black", "p1b", true, [ 1, 0 ]);
var pawn2b = new Pawn("Pawn2", "black", "p2b", true, [ 1, 1 ]);
var pawn3b = new Pawn("Pawn3", "black", "p3b", true, [ 1, 2 ]);
var pawn4b = new Pawn("Pawn4", "black", "p4b", true, [ 1, 3 ]);
var pawn5b = new Pawn("Pawn5", "black", "p5b", true, [ 1, 4 ]);
var pawn6b = new Pawn("Pawn6", "black", "p6b", true, [ 1, 5 ]);
var pawn7b = new Pawn("Pawn7", "black", "p7b", true, [ 1, 6 ]);
var pawn8b = new Pawn("Pawn8", "black", "p8b", true, [ 1, 7 ]);

var pawn1w = new Pawn("Pawn1", "white", "p1w", true, [ 6, 0 ]);
var pawn2w = new Pawn("Pawn2", "white", "p2w", true, [ 6, 1 ]);
var pawn3w = new Pawn("Pawn3", "white", "p3w", true, [ 6, 2 ]);
var pawn4w = new Pawn("Pawn4", "white", "p4w", true, [ 6, 3 ]);
var pawn5w = new Pawn("Pawn5", "white", "p5w", true, [ 6, 4 ]);
var pawn6w = new Pawn("Pawn6", "white", "p6w", true, [ 6, 5 ]);
var pawn7w = new Pawn("Pawn7", "white", "p7w", true, [ 6, 6 ]);
var pawn8w = new Pawn("Pawn8", "white", "p8w", true, [ 6, 7 ]);

// creating rocks
var rock1b = new Rock("Rock", "black", "r1b", true, [ 0, 0 ]);
var rock2b = new Rock("Rock", "black", "r2b", true, [ 0, 7 ]);
var rock1w = new Rock("Rock", "white", "r1w", true, [ 7, 0 ]);
var rock2w = new Rock("Rock", "white", "r2w", true, [ 7, 7 ]);

// creating knights
var knight1b = new Knight("Knight", "black", "k1b", true, [ 0, 1 ]);
var knight2b = new Knight("Knight", "black", "k2b", true, [ 0, 6 ]);
var knight1w = new Knight("Knight", "white", "k1w", true, [ 7, 1 ]);
var knight2w = new Knight("Knight", "white", "k2w", true, [ 7, 6 ]);

// creating bishops
var bishop1b = new Bishop("Bishop", "black", "b1b", true, [ 0, 2 ]);
var bishop2b = new Bishop("Bishop", "black", "b2b", true, [ 0, 5 ]);
var bishop1w = new Bishop("Bishop", "white", "b1w", true, [ 7, 2 ]);
var bishop2w = new Bishop("Bishop", "white", "b2w", true, [ 7, 5 ]);

// creating king
//smeneta pocetna pozicija na kingb za da mozam dole da hja povikam funkcijata bidejki so pocetnata
//e zagraden king od site strani i ke nema dozvoleni pozicii za dvizenje
var kingb = new King("King", "black", "knb", true, [ 5, 1 ]);
var kingw = new King("King", "white", "knw", true, [ 7, 3 ]);

// creating queen
var queenb = new Queen("Queen", "black", "qub", true, [ 0, 4 ]);
var queenw = new Queen("Queen", "white", "quw", true, [ 7, 4 ]);

function startNewGame(){
	// se polnat 4 nizi so pocetnite pozicii za da se predadat na matricata
	podloga[0] = [ rock1b, knight1b, bishop1b, kingb, queenb, bishop2b, knight2b,
			rock2b ];
	podloga[1] = [ pawn1b, pawn2b, pawn3b, pawn4b, pawn5b, pawn6b, pawn7b, pawn8b ];
	podloga[6] = [ pawn1w, pawn2w, pawn3w, pawn4w, pawn5w, pawn6w, pawn7w, pawn8w ];
	podloga[7] = [ rock1w, knight1w, bishop1w, kingw, queenw, bishop2w, knight2w,
			rock2w ];
}

startNewGame();

function printMatrix(){
	// pecatenje na poceten izgled
	for (var i = 0; i < podloga[0].length; i++) {
		for (var j = 0; j < podloga[0].length; j++) {
			if (podloga[i][j] != null){
				process.stdout.write(podloga[i][j].shortcut + " ");
			} else {
				process.stdout.write(" .  ");
			}
		}
		console.log();
	}
	console.log();
}
printMatrix();



// ////////TODO funkcii za site figuri posebno

// KRAL
// mozni poteszi
function KingMoves(king) {
	var moves = [];
	for (var i = 0; i < podloga[0].length; i++) {
		for (var j = 0; j < podloga[0].length; j++) {
			// ako se ednakvi znaci deka toa ne e poteg, na istoto mesto e
			if ((king.coordinates[0] == i) && (king.coordinates[1] == j)) {
				continue;
			}
			if ((Math.abs(i - king.coordinates[0]) <= 1)
					&& (Math.abs(j - king.coordinates[1]) <= 1)) {
				if (podloga[i][j] == null) {
					console.log("Dozvolena pozicija na dvizenje: " + i + " "+ j);
					moves.push([ i, j ]);
				} else {

					if (podloga[i][j].color !== king.color) {
						console.log("Zemanje na figura " + podloga[i][j].name+ " so boja " + podloga[i][j].color+ " so koordinati: " + i + "," + j);
					} else {
						console
								.log("Ne moze da se pridvizi figurata na pozicija: "+ i+ ","+ j+ " bidejki tamu stoi druga tvoja figura");
					}
				}
			}
		}
	}
	console.log("Povikaj funkcija KingMoves() za da kazes na koja pozicija da se pridvizi kralot");
	return moves;
}

// KingMoves(kingb);

// pravenje na poteg so kral
function KingMoving(king, newPosition) {
	var moves = KingMoves(king);
	// moves.find(function(arr){
	// return arr[0] == newPosition[0] && arr[1] == newPosition[1];
	// });

	for (var i = 0; i < moves.length; i++) {
		if ((moves[i][0] == newPosition[0]) && (moves[i][1] == newPosition[1])) {
			console.log("Pomesteno");
			podloga[king.coordinates[0], king.coordinates[1]]=== null;
			king.coordinates = newPosition;
			podloga[king.coordinates[0], king.coordinates[1]]=king;
		}

	}
	console.log("Novi koordinati na: " + king.name + " se: "+ king.coordinates);

}

var niza = [ 5, 0 ];
KingMoving(kingb, niza);

// PIONS
function PawnMoves(pawn) {
	var moves = [];
	for (var i = 0; i < podloga[0].length; i++) {
		for (var j = 0; j < podloga[0].length; j++) {
			// ako se ednakvi znaci deka toa ne e poteg, na istoto mesto e
			if ((pawn.coordinates[0] == i) && (pawn.coordinates[1] == j)) {
				continue;
			}

			if (pawn.isFirstMove) {
				if ((i == pawn.coordinates[0])&& ((Math.abs(j - pawn.coordinates[1]) == 1) || (j - pawn.coordinates[1]) == 2)) {
					if (podloga[i][j] == " ") {
						console.log("Dozvolena pozicija na dvizenje: " + i+ " " + j);
						moves.push([ i, j ]);
					}					
				}
				pawn.isFirstMove=false;
			} 
					

		}
	}
}
PawnMoves(pawn1w);
function PawnMoving(pawn, newPosition) {
	// todo
}


