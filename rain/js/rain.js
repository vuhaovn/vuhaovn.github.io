function Rain() {
  this.x = random(width);
  this.y = random(-500, -10);
  this.speed = random(3, 10);
  this.hue = random(255);

  this.fall = function() {
    this.y += this.speed;
    if ( this.y > height ) {
      this.y = random(-200, -10);
    }
  }

  this.show = function() {
    fill(this.hue, this.hue, this.hue);
    ellipse(this.x, this.y, 10, 10);
  }
}