//tetriminos.
const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20;
const COL = 10;
const SQ = squareSize = 20;
const VACANT ="white";

//draw a square

function drawSquare(x,y,color){

    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);

}

// create the board

let board = [];

for( r = 0 ;r < ROW ;r++){
    board[r] = [];
    for( c = 0;c < COL ; c++){
        board[r][c] = VACANT;
    }
    
}

//draw the board

function drawBoard(){
    for( r = 0 ;r < ROW ;r++){
        for( c = 0;c < COL ; c++){
            drawSquare(c,r,board[r][c]);
        }
        
    }

}
drawBoard();
//tetrimino pieces
let PIECE =[[Z,"red"],[I,"orange"], [J,"cyan"], [L,"blue"],[O,"purple"],[T,"yellow"],[S,"green"]];

//make another piece randomly
function randomPiece(){
	let randomN =Math.floor(Math.random()*PIECE.length);//math.random * 6
	return new Piece(PIECE[randomN][0],PIECE[randomN][1]);
}

let p= randomPiece();


// create the object piece
function Piece(tetrimino,color){

    this.tetrimino = tetrimino;
    this.color = color;

    this.tetriminoN = 0; //index tetrimino
    this.activeTetrimino = this.tetrimino[this.tetriminoN];
    //location of tetrimino

    this.x=3;
    this.y=-2;
}
// fill the piece
Piece.prototype.fill =function (color){
    for( r = 0 ;r < this.activeTetrimino.length ;r++){
        for( c = 0;c < this.activeTetrimino.length ; c++){
            //this to drwa the 1 value in it
            if(this.activeTetrimino[r][c]){
                drawSquare(this.x+c,this.y+r,color);
            }
        }    
    }    
}


//draw the piece
Piece.prototype.draw =function (){
    this.fill(this.color)  
}

//undrwa the piece
Piece.prototype.unDraw =function (){
	this.fill(VACANT)    
}

// movment function 
//
//
//
//
//move down function
Piece.prototype.moveDown = function(){
	if(!this.collision(0,1,this.activeTetrimino)){
		
		this.unDraw();
		this.y++;
		this.draw();
	}else{
		this.lock()
		
		p = randomPiece();

	}
}
//moveRight function
Piece.prototype.moveRight = function(){
	if(!this.collision(1,0,this.activeTetrimino)){
		
		this.unDraw();
		this.x++;
		this.draw();
	}
}
//moveLeft function
Piece.prototype.moveLeft = function(){
	if(!this.collision(-1,0,this.activeTetrimino)){

		this.unDraw();
		this.x--;
		this.draw();
	}
}
// rotate function
Piece.prototype.rotate = function(){
	let nextPattren = this.tetrimino[(this.tetriminoN + 1)% this.tetrimino.length];// (0+1)%4=1
	let kick = 0 ;
	if(this.collision(0,0,nextPattren)){
		if(this.x > COL/2){
			kick = -1;
		}else{
			kick = 1 ;
		}
	}
	if(!this.collision(kick,0,nextPattren)){
		this.unDraw();
		this.x += kick;
		this.tetriminoN = (this.tetriminoN + 1)% this.tetrimino.length;// (0+1)%4=1
		this.activeTetrimino = this.tetrimino[this.tetriminoN];
		this.draw();
	}
}
//the end of movment function
//
//
//
//add an event listener
document.addEventListener("keydown",CONTROL);

function CONTROL(event){
	if(event.keyCode == 40){
		p.moveDown();
		dropStart = Date.now();
	}else if(event.keyCode == 38){
		p.rotate();
		dropStart = Date.now();	
	}else if(event.keyCode == 39){
		p.moveRight();
		dropStart = Date.now();	
	}else if(event.keyCode == 37){
		p.moveLeft();
		dropStart = Date.now();
	}
}

//collision detection function

Piece.prototype.collision=function(x,y,piece){
	for( r = 0 ;r < piece.length ;r++){
        for( c = 0;c < piece.length ; c++){
            //if the squar is vancant we go next
            if(!piece[r][c]){continue;}

			let newX = this.x + c + x;
			let newY = this.y + r + y;
			//check the boarders 
			if(newX <0 || newX >= COL || newY >=ROW){
				return true;

			}
			if(newY < 0){continue;}
			if(board[newY][newX]!= VACANT){
				return true;
			}
        }    
    }
	return false;    
}

let score = 0;
// lock function
Piece.prototype.lock = function(){
	for( r = 0 ;r < this.activeTetrimino.length ;r++){
        for( c = 0;c < this.activeTetrimino.length ; c++){
            //this to drwa the 1 value in it
            if(!this.activeTetrimino[r][c]){
                continue;
            }
			if(this.y + r <0){
				gameOver= true;
				alert("GAME OVER");
				break;
			}
			board[this.y + r][this.x +c]= this.color;

        }    
    }
	//remove the full row   
	for( r = 0 ;r < ROW ;r++){
		let isRowFull= true;
        for( c = 0;c < COL ; c++){
			isRowFull = isRowFull && (board[r][c] != VACANT);

		}
		if(isRowFull){
			//if the row is full
			//we move down all the rows above it
			for(y=r ; y>1 ; y--){
				for(c = 0; c < COL ;c++){
					board[y][c] = board[y-1][c];
				}
			}
			// if the top row have no color
			for(c = 0; c > COL ;c++){
				board[0][c]= VACANT;
			}
			//add the score
			score += 5;
			
		}
	}
	drawBoard();
	
	scoreElement.innerHTML= score;
}

// make piece drop every 1 sec

let dropStart = Date.now();
let gameOver = false;
function drop(){
	let now = Date.now();
	let delta = now - dropStart;
	if(delta > 500){
		p.moveDown();
		dropStart = Date.now();
	}
	if(!gameOver){
		requestAnimationFrame(drop);
	}	
}
drop();
