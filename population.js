var layersNodes = new Array(4, 3, 5,1);
var totalPopulation = 15;
var deadBirdCounter = 0;
var maxfitness = 0, indexOfMaxFitness=0;    //these two are used in step function to find the most fit bird

class Population{
	static totalScore = 0;
	static mutationRate = 0.05;
	constructor(){
		this.species = new Array();
		for(let i=0; i<totalPopulation; i++)this.species[i] = new Bird(layersNodes);
	}

	evaluteFitness(){
		Population.totalScore = 0;
		for(let i=0; i<totalPopulation; i++){
			this.species[i].maxFitness = this.species[i].step+this.species[i].pipeScore;
			Population.totalScore+=this.species[i].maxFitness;
		}
	}

	newGeneration(){
		let newGenBird = new Array();
		for(let i=0; i<totalPopulation; i++){
			let x1 = this.selection();
			let x2 = this.selection();
			newGenBird[i] = Population.crossOver(x1, x2);
		}
		for(let i=0; i<totalPopulation; i++){
			this.species[i] = newGenBird[i];
		}
	}

	selection(){
		let probability = Math.floor(map(Math.random(), 0 ,1 ,0, Population.totalScore)); 
		let index = 0;
		do{
			probability-=this.species[index].maxFitness;
			index++;
		}while(probability>0);
		index--;
		return this.species[index];
	}

	static crossOver(x1, x2){
		let temp = new Bird(layersNodes);
		let c=0;
		for(let i=0; i<temp.totalLayer-1; i++){
			for(let j=0; j<temp.neuralNetwork[i].rows; j++){
				for(let k=0; k<temp.neuralNetwork[i].columns; k++){
					let prob = Math.floor(map(Math.random(), 0, 1, 0, x1.maxFitness+x2.maxFitness));
					c = 0;
					do{
						if(c==0)prob-=x1.maxFitness;
						else if(c==1)prob-=x2.maxFitness;
						else console.log(".");
						c++
					}while(prob>0);
					c--;
					if(c==0)temp.neuralNetwork[i].matrix[j][k] = x1.neuralNetwork[i].matrix[j][k];
					else if(c==1)temp.neuralNetwork[i].matrix[j][k] = x2.neuralNetwork[i].matrix[j][k];
					else console.log("..");
				}
			}
		}
		return temp;
	}

	mutate(){
		this.species.forEach((bird, index)=>{
			for(let i=0; i<bird.totalLayer-1; i++){
				for(let j=0; j<bird.neuralNetwork[i].rows; j++){
					for(let k=0; k<bird.neuralNetwork[i].columns; k++){
						if(Math.random()<Population.mutationRate)bird.neuralNetwork[i].matrix[j][k] = Math.random();
					}
				}
			}
		});
	}

	step(){
		for(let i=0; i<totalPopulation; i++){
			if(this.species[i].isAlive){
				this.species[i].getInput();
				this.species[i].feedForward();
				if(this.species[i].nodeValue[this.species[i].nodeValue.length-1][0]>.9)this.species[i].jump();
				// console.table(this.species[i].nodeValue);
				this.species[i].updateVelocity();
				if(Pipe.pipeCrossed)this.species[i].pipeScore+=100;
				Bird.display(this.species[i].yPos, this.species[i].velocity);
				this.species[i].isAlive = collisionDetect(this.species[i].yPos);
				if(!this.species[i].isAlive)deadBirdCounter++;
				if((this.species[i].step+this.species[i].pipeScore)>maxfitness){
					indexOfMaxFitness = i;
					maxfitness = this.species[i].step+this.species[i].pipeScore;
				}
			}
			if(indexOfMaxFitness == i)drawAxion(this.species[i].neuralNetwork, this.species[i].nodeValue[this.species[i].nodeValue.length-1][0]);
		}
		Pipe.pipeCrossed = false;
	}
}

// draw the lines/axions connecting nodes together
var drawAxion=(weightMatrix, val)=>{
	// width = 880 and height = 650 #ee9411 #edf663
	let c1 = color('#fdfdfd');
	let c2 = color('#e00024');
	let xStep = 880/(layersNodes.length+1);
	let axionCoordinate = new Array();
	for(let i=1; i<=weightMatrix.length; i++){
		
		let x1 = xStep*i+620;
		let x2 = xStep*(i+1)+620;
		let y1Step = (650/(weightMatrix[i-1].columns+1));
		let y2Step = (650/(weightMatrix[i-1].rows+1));

		for(let j=0; j<weightMatrix[i-1].rows; j++){
			for(let k=0; k<weightMatrix[i-1].columns; k++){
				stroke(lerpColor(c1,c2,weightMatrix[i-1].matrix[j][k]));
				line(x1, y1Step*(k+1), x2, y2Step*(j+1));
			}
		} 
	}
	push();
	for(let i=0; i<layersNodes.length; i++){
		let yStep = (650/(layersNodes[i]+1)); 
		for(let j=0;j<layersNodes[i];j++){
			stroke(0);
			if((i==layersNodes.length-1)&&(val>.9))fill(255);
			else fill(0);
			circle(620+xStep*(i+1), yStep*(j+1), 10);
		}
	}
	pop();
}

