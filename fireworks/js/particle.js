function Particle(x, y, hue, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hue = hue;
  if (this.firework) {
    this.vel = createVector(0, random(-12, -18));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 30));
  }

  this.acc = createVector(0, 0);
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update= function() {
    if (!this.firework) {
      this.vel.mult(0.85);
      this.lifespan -= 3;
    }
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(hue, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(hue, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }

}