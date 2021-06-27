const leftScreenEdge = 20, groundTileWidth=10;
var backgroundImg, ground, bird0, bird1, bird2;
var floorcounter = 0, neat = false;
var generation = 1;

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
	Bird.setActivation([tanhAF, sigmoidAF, sigmoidAF]);
	fill(0);
	stroke(0);
	textSize(20);
	let gen = "Generation ="+generation;
	let pop = "Population ="+totalPopulation;
	text(gen,700,630);
	text(pop,900,630);
}

function draw(){
	// draw the background
	if(!neat){
		imageMode(CORNER);
		image(backgroundImg, leftScreenEdge, 0,600,600);
		for(let i=0; i<2; i++){
			pipes[i].move(i);
			if(pipes[i].active)Pipe.displayPipe(pipes[i].pipePosition, pipes[i].length);
		}
		drawfloor();
		drawWhiteMask();
		population.step();
		spwanPipe();
		if(deadBirdCounter == totalPopulation){
			neat = true;
		}
	}else{
		population.evaluteFitness();
		population.newGeneration();
		population.mutate();
		pipes.splice(0, pipes.length);
		for(let i=0; i<2;i++){
			pipes[i] = new Pipe();
		}
		pipes[0].active = true;
		Pipe.activePipe = 0;
		generation++;
		maxfitness=0;
		indexOfMaxFitness=0;
		deadBirdCounter = 0;
		neat = false;
		background(255);
		textSize(20);
		fill(0);
		stroke(0);
		let gen = "Generation ="+generation;
		let pop = "Population ="+totalPopulation;
		text(gen,700,630);
		text(pop,850,630);
	}

	// drawAxion(population.species[0].neuralNetwork);
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
// function keyPressed(){
// 	if(keyCode == 32){
// 		population.species.jump();
// 	} 
// }

function drawWhiteMask(){
	push();
	rectMode(CORNER);
	stroke(255);
	fill(255);
	rect(0,0,leftScreenEdge,650);
	rect(620,0,880,600);
	pop();
	fill(0);
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