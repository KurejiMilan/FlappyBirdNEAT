class Bird{
	static xPos = 250;
	static stepCounter = 1;
	
	constructor( ){
		this.yPos = 300;
		this.velocity = 0;
		this.isAlive = true;
	}
	
	// call this method regularlly to update the position or heigh of the flight
	// and to update the velocity of the bird
	updateVelocity(){
		if(this.isAlive){
			this.velocity+=.6;
			if(this.velocity>=13)this.velocity = 13;
			this.yPos += this.velocity; 
		}
	}

	// jump acton is only performed when there is need to
	jump(){
		if(this.isAlive){
			this.velocity = -9;
			this.yPos += this.velocity;			
		}
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