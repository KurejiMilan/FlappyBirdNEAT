const space = 200, pipeWidth=60, pipeSpace = 160;

class Pipe{
	static activePipe = 0;
	static pipeVelocity=3.3;												//used to index the active pipe(the once which needs to be avoided)
	constructor(){
		this.pipePosition = 620;
		this.active = false;
		this.length = (Math.random()*0.6)+0.08;
	}
	
	move(){
		if(this.active)this.pipePosition -=Pipe.pipeVelocity;
		if(this.pipePosition<(Bird.xPos-20)){
			if(Pipe.activePipe==0)Pipe.activePipe=1;					//this part is used to toggle between the two pipes to select the active pipe
			else if(Pipe.activePipe==1)Pipe.activePipe=0;				// the one which is the next obstacle 
		}

		if(this.pipePosition<(20-pipeWidth)){
			this.active = false;
			this.pipePosition = 620;
		}
	}
	static displayPipe(position, length){
		let c1 = color('#6dfb21');
		let c2 = color('#0fcd01');
		let c3 = color('#3ca803');
		push();
		rectMode(CORNER);
		strokeWeight(2);
		
		for(let i=0; i<pipeWidth; i++){
			let inter = map(i, 0, pipeWidth, .1 , 1);
			let c = lerpColor(c1, c3, inter);
			stroke(c);
			line(position+i, 600-(600*length), position+i, 600);
			line(position+i, 0, position+i, 600-(600*length)-pipeSpace);
			let inter1 = map(i, 0, pipeWidth, .3 , 1);
			let b = lerpColor(c1, c3, inter1);
			stroke(b);
			line(position+i, 600-(600*length), position+i, 630-(600*length));
			line(position+i, 630-(600*length)-pipeSpace, position+i, 600-(600*length)-pipeSpace);
		}

		stroke(0);
		fill(c3);
		line(position,600-(600*length),position, 630-(600*length));
		line(position,600-(600*length),position+pipeWidth, 600-(600*length));
		line(position+pipeWidth,600-(600*length),position+pipeWidth, 630-(600*length));
		line(position,630-(600*length),position+pipeWidth, 630-(600*length));

		line(position, 630-(600*length)-pipeSpace,position, 630-(600*length)-pipeSpace);
		line(position, 600-(600*length)-pipeSpace,position+pipeWidth,  600-(600*length)-pipeSpace);
		line(position+pipeWidth,600-(600*length)-pipeSpace,position+pipeWidth, 630-(600*length)-pipeSpace);
		line(position,630-(600*length)-pipeSpace,position+pipeWidth, 630-(600*length)-pipeSpace);

		strokeWeight(1);
		line(position, 600-(600*length), position, 600);
		line(position+pipeWidth, 600-(600*length), position+pipeWidth, 600);
		line(position, 0, position, 630-(600*length)-pipeSpace);
		line(position+pipeWidth, 0, position+pipeWidth, 630-(600*length)-pipeSpace);
		pop();
	}
}