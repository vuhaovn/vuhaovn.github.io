var drops = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 300; i++) {
		drops[i] = new Drop();
	}
}

function draw() {
	background(0,0,0);
	for (var i = 0; i < 300; i++) {
		drops[i].fall();
		drops[i].show();
	}
}

function Drop() {
	this.x = random(width);
	this.y = random(-200, -50);
	this.speed = random(1,5);

	this.fall = function() {
		this.y = this.y + this.speed;

		if (this.y > height) {
			this.y = random(-200, -50);
		}
	}

	this.show = function() {
		fill(random(1,255),random(1,255),random(1,255));
		ellipse(this.x, this.y, 10, 10);
	}

}
