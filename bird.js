// Bird constructor takes  in one argument which must be an Array that represents the number of nodes in each layer

class Bird{
	static xPos = 250;
	static stepCounter = 1;
	static activationFuncList;

	constructor(layers){
		this.yPos = 300;
		this.pipeScore = 0;
		this.maxFitness = 0;  
		this.velocity = 0;							// velocity of the bird in the y direction
		this.isAlive = true;						// true is the bird is still alive
		this.step = 0;								// increase step for every frame the bird is alive
		this.nodes = layers;						// the layers arguments takes in an array, the array length sould be the number of layer i.e.
		this.totalLayer = layers.length				// layers.length if 3 means 3 leayers, [6, 3, 1] 6 nodes in first layers, 3 nodes in 2nd layer and so on 
		this.nodeValue = new Array();				// nodeValue contains the actual value i.e input node contains the input values and output node
													// constains the output value 
		this.neuralNetwork = new Array();			// the neuralNetwork is array of Tensor object(instance of Tensor class) consist of Matrix
													// the neuralNetwork array represents the weighted matrix
		/*
			the number of rows and columns of a matrix weight depends on the number of nodes that 
			it connects with, i.e. if layer 2 consists of 3 nodes and layer 3 consists of 2 nodes then
			the neuralNetwork that connects these two layers is 2 by 3 Matrix.

			for n layers there is (n-1) weight matrix 
		*/

		for(let i=0; i<this.totalLayer-1; i++){
			this.neuralNetwork[i] = new Tensor(this.nodes[i+1], this.nodes[i]);
		}
		// for(let i=0; i<this.totalLayer; i++)this.nodeValue = new Array();
	}
	
	getInput(){
		let b = pipes[Pipe.activePipe].pipePosition-Bird.xPos;
		let d2 = this.yPos-(600-600*pipes[Pipe.activePipe].length);
		let d3 = this.yPos-(630-600*pipes[Pipe.activePipe].length-pipeSpace);

		this.nodeValue[0] = new Array();			// create array for input nodes
		for(let i=0; i<this.nodes[0]; i++){
			switch(i){
				case 4:
					this.nodeValue[0][i] = 600-this.yPos;
					break;
				case 0:
					this.nodeValue[0][i] = d2; 
					break;
				case 1:
					this.nodeValue[0][i] = d3;
					break;
				case 2:
					this.nodeValue[0][i] = Math.sqrt(Math.pow(b,2)+Math.pow(d2,2));
					break;
				case 3:
					this.nodeValue[0][i] = Math.sqrt(Math.pow(b,2)+Math.pow(d3,2));
					break;
				case 5:
					this.nodeValue[0][i] = b;
					break;
				case 6:
					this.nodeValue[0][i] = this.velocity;
					break;
				default:
					this.nodeValue[0][i] = 1;
			}
		}
	}

	// function that implements the feedForward algorithm
	feedForward(){
		for(let m=0; m<this.totalLayer-1; m++){
			this.nodeValue[m+1] = Tensor.dotProduct(this.neuralNetwork[m], this.nodeValue[m], Bird.activationFuncList[m]);
		}
	}

	// call this method regularlly to update the position or heigh of the flight
	// and to update the velocity of the bird
	updateVelocity(){
		if(this.isAlive){
			this.velocity+=1;
			if(this.velocity>=14)this.velocity = 14;
			this.yPos += this.velocity; 
			if(this.step<50){
				this.step+=1;
			}
		}
	}

	// jump acton is only performed when there is need to
	jump(){
		if(this.isAlive){
			this.velocity = -8;
			this.yPos += this.velocity;			
		}
	}
	// this function must be called in setup before any training can take place
	static setActivation(list){
		Bird.activationFuncList = list;
	}

	// display all the birds using the same static method
	static display(yPosition, vel){
		push();
		let birdImg, angle;
		imageMode(CENTER);	

		if(Bird.stepCounter<=5){														// using stepcounter to animate the wings flapping
			birdImg = bird0;															// since 30 frames makes up one second each image takes
		}else if((Bird.stepCounter>5)&&(Bird.stepCounter<=10)){							// 5 frames and moves to next image to give illusion of 
			birdImg = bird1;															// wings flapping, these numbers can be modified
		}else{
			birdImg = bird2;
		}
		translate(Bird.xPos, yPosition);
		if(vel<0){
			angle = -30;
		}
		else{
			angle = map(vel, 0, 13, -30, 30);
		}
		angleMode(DEGREES);
		rotate(angle);
		image(birdImg, 0, 0, 50, 36);
		pop();
		Bird.stepCounter++;
		if(Bird.stepCounter>15)Bird.stepCounter=1;
	}
}