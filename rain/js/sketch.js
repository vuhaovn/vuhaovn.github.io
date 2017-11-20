var rain = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 500; i++) {
		rain[i] = new Rain();
	}
}

function draw() {

	colorMode(HSB, 255);
	background(0);
	for (var i = 0; i < rain.length; i++) {
		rain[i].fall();
		rain[i].show();
	}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}