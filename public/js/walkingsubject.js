var canvas;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
	w = new Walker();
}

function draw() {
	background(255);
	w.display();
	w.update();
}

function Walker() {
	this.pos = createVector(width*0.4, height*0.7);
	this.vel = createVector(0, 0);
	this.text = 'subject';
	this.display = function() {
		fill(0);
        textSize(30);
        textFont('Times-Roman');
		text(this.text, this.pos.x, this.pos.y);
	}
	this.update = function() {
		// Whenever the ball hits to the walls
		// the ball has a new velocity with the opposite direction
		if (this.pos.x <= 0 || this.pos.x >= width - textWidth(this.text)) {
			this.vel.x = this.vel.x * -1;
		} else if (this.pos.y <= 20 || this.pos.y >= height - 20) {
			this.vel.y = this.vel.y * -1;
		}
		// Without this, speed of the ball could go very high as soon as
		// it hits the walls
		this.vel.setMag(1.5);
		// This is where the random acceleration value is set
		this.acc = p5.Vector.fromAngle(random(TWO_PI));
		this.acc.setMag(0.1);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}
}