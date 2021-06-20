const leftScreenEdge = 20, groundTileWidth=10;
var backgroundImg, ground, bird0, bird1, bird2;
var floorcounter = 0;

// const activationFuncList = [reluAF, sigmoid];							// this must be equal to the number of layers

var population = new Population();
var pipes = new Array();

function setup() {
	frameRate(300);
	createCanvas(1500,650);
	backgroundImg = loadImage("./assets/background.png");
	ground = loadImage("./assets/ground.png");
	bird0 = loadImage("./assets/bird0.png");
	bird1 = loadImage("./assets/bird1.png");
	bird2 = loadImage("./assets/bird2.png");

	for(let i=0; i<2;i++){
		pipes[i] = new Pipe();
	}
	pipes[0].active = true;
	Bird.setActivation([leakyReluAF, tanhAF, tanhAF, sigmoidAF]);
}

function draw(){

	// gameFrame();
	// drawNeuralNetworkFrame();
	// draw the background
	imageMode(CORNER);
	image(backgroundImg, leftScreenEdge, 0,600,600);
	for(let i=0; i<2; i++){
		pipes[i].move();
		if(pipes[i].active)Pipe.displayPipe(pipes[i].pipePosition, pipes[i].length);
	}
	drawfloor();
	if(population.species.isAlive){
		Bird.display(population.species.yPos, population.species.velocity);
		population.species.updateVelocity();
		population.species.isAlive = collisionDetect(population.species.yPos);
		// console.log(population.species);
	}
	spwanPipe();
	drawWhiteMask();
}

function spwanPipe(){
	if(Pipe.activePipe == 1){
		if((!pipes[0].active)&&((620-pipes[1].pipePosition-pipeWidth)>=300)){
			// pipes[0].pipePosition = 620;
			pipes[0].active = true;
			pipes[0].length = (Math.random()*0.6)+0.08;
		}
	}else if(Pipe.activePipe == 0){
		if((!pipes[1].active)&&((620-pipes[0].pipePosition-pipeWidth)>=300)){
			// pipes[1].pipePosition = 620;
			pipes[1].active = true;
			pipes[1].length = (Math.random()*0.6)+0.08;
		}
	}
}

function collisionDetect(birdPosition){
	// takes the parameter of birdPosition
	// returns boolean type data to indicate if the bird is alive or dead(collision)
	// check if collision has occured, if not return true as no collision condition
	if((birdPosition-18)<0){																															// check overshoot
		return false;
	}else if((birdPosition+18)>600){																													// check collision with ground
		return false;
	}else if((birdPosition+18)>=(600-pipes[Pipe.activePipe].length*600)){
		if(((Bird.xPos-25)>=pipes[Pipe.activePipe].pipePosition)&&((Bird.xPos-25)<=pipes[Pipe.activePipe].pipePosition+pipeWidth)) return false;		// check collision with the lower pipe
		else if(((Bird.xPos+25)<=pipes[Pipe.activePipe].pipePosition+pipeWidth)&&((Bird.xPos+25)>=pipes[Pipe.activePipe].pipePosition)) return false;
	}else if((birdPosition-18)<=(630-pipes[Pipe.activePipe].length*600-pipeSpace)){
		if(((Bird.xPos-25)>=pipes[Pipe.activePipe].pipePosition)&&((Bird.xPos-25)<=pipes[Pipe.activePipe].pipePosition+pipeWidth)) return false;		// check collision with the upper pipe
		else if(((Bird.xPos+25)<=pipes[Pipe.activePipe].pipePosition+pipeWidth)&&((Bird.xPos+25)>=pipes[Pipe.activePipe].pipePosition)) return false;
	}
	return true;
}

function drawfloor(){
	push();
	imageMode(CORNER);
	for(let i=0; i<(600/groundTileWidth);i++){
		image(ground, leftScreenEdge+i*groundTileWidth-floorcounter,600, groundTileWidth, 50)
	}
	floorcounter+=.5;
	if(floorcounter>=14)floorcounter=0;
	pop();
}

// only used for debugging
function keyPressed(){
	if(keyCode == 32){
		population.species.jump();
	} 
}

function drawWhiteMask(){
	push();
	rectMode(CORNER);
	stroke(255);
	fill(255);
	rect(0,0,leftScreenEdge,650);
	rect(620,0,50,650);
	pop();
}

// function gameFrame(){
// 	push();
// 	rectMode(CORNER);
// 	stroke(0);
// 	rect(leftScreenEdge,0,600,650);
// 	pop();
// }

// function drawNeuralNetworkFrame(){
// 	push();
// 	rectMode(CORNER);
// 	stroke(0);
// 	strokeWeight(1);
// 	rect(550,0,850,650);
// 	pop();
// }