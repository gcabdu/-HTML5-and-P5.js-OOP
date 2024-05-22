let sp = []; // Array for Spot objects
let sh = []; // Array for Squares objects
let num = 30;
let bgColor = { r: 0, g: 0, b: 0 }; 

function setup() {
  colorMode(RGB, 255);
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < num; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let v = createVector(x, y);
    let d = random(20, 50);

    let e = random(0.005, 0.05);
    let c = createVector(random(0, 360), random(0, 360));

    let r = random(0.1, 0.01);
    sp[i] = new Spot(v, d, e, c, r);




    sh[i] = new Squares(v, d, e, c, r, d * 0.75);
  }
}

function draw() {

  Bg();
  background(bgColor.r, bgColor.g, bgColor.b);

  for (let i = 0; i < num; i++) {
    sp[i].move();
    sp[i].display();


    sh[i].move();
    sh[i].display();
  }
}

function Bg() {
  bgColor.r = (bgColor.r + 0.5) % 256;
  bgColor.g = (bgColor.g + 0.3) % 256;

  bgColor.b = (bgColor.b + 0.1) % 256;
}

class Circles {
  constructor(parentShape, numCircles, maxRadius) {


    this.parentShape = parentShape;
    this.numCircles = numCircles;

    this.maxRadius = maxRadius;
    this.angle = random(TWO_PI);
  }

  display() {
    for (let i = 0; i < this.numCircles; i++) {
      let angle = this.angle + (TWO_PI / this.numCircles) * i;
      let x = this.parentShape.v.x + cos(angle) * this.maxRadius;


      let y = this.parentShape.v.y + sin(angle) * this.maxRadius;



      let radius = mouseIsPressed ? 10 : 5;
      fill(255);
      ellipse(x, y, radius, radius);
    }
  }

  update() {
    this.angle += 0.05;
  }
}

class Spot {
  constructor(vect, diameter, ease, col, rate) {
    this.v = vect;
    this.d = diameter;
    this.e = ease;


    this.c = col;
    this.r = rate;

    this.Circles = new Circles(this, 3, diameter / 2);
  }

  display() {
    let co = map(sin(frameCount * this.r), -1, 1, this.c.x, this.c.y);
    fill(co, 100, 100);
    ellipse(this.v.x, this.v.y, this.d, this.d);
    
    this.Circles.display();
  }

  move() {
    let dx = mouseX - this.v.x;
    let dy = mouseY - this.v.y;


    if (mouseIsPressed) {
      this.v.x -= dx * this.e;
      this.v.y -= dy * this.e;

    } else {
      this.v.x += dx * this.e;
      this.v.y += dy * this.e;
    }

    this.Circles.update();
  }
}

class Squares {
  constructor(vect, diameter, ease, col, rate, maxRadius) {
    this.v = vect;
    this.d = diameter;
    this.e = ease;
    this.c = col;
    this.r = rate;
    this.angle = 0;
    this.Circles = new Circles(this, 3, maxRadius);
  }

  display() {

    let co = map(sin(frameCount *  this.r), -1,  1, this.c.x, this.c.y);
    fill(co, 100, 100);
     
    let squareX = this.v.x;
    let squareY = this.v.y;
    push();



    translate(squareX, squareY);
    rotate(this.angle);
    rectMode(CENTER);

    rect(0, 0, this.d, this.d);
    pop();
    this.Circles.display();
  }

  move() {
    let dx = mouseX - this.v.x;

    let dy = mouseY - this.v.y;
    let angle = atan2(dy, dx); 


    this.angle = angle;


    let distance = dist(mouseX, mouseY, this.v.x, this.v.y);
   
    let movement = min(this.e * distance, 5);

    if (mouseIsPressed) {
      this.v.x -= cos(angle) * movement;
      this.v.y -= sin(angle) * movement;

    } else {
      this.v.x += cos(angle) * movement;

      this.v.y += sin(angle) * movement;
    }
    this.Circles.update();
  }
}
