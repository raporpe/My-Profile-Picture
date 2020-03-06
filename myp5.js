


var profile = 800;

// var seedX = 'raporpe';
// var seedY = 'diegogarpe';
var seedX = Math.floor(Math.random()*10000);
var seedY = Math.floor(Math.random()*10000);
console.log(String(seedX) + ' ' + String(seedY));



var seedCol = 'hanzo';

var reductionFactor = 300;
var colorFactor = 500;

var circleNumber = 500;
var circleSize = 3;
var pt = new Array();
var step = 2;

var perlinX = new Perlin(seedX, 'perlin');
var perlinY = new Perlin(seedY, 'perlin');
var perlinCol = new Perlin(seedCol, 'perlin');
//var simplexX = new Simplex(23);
//var simplexY = new Simplex(234);

function setup() {

  createCanvas(profile, profile);
  background(0);


  //Initialize points
  for (let i = 0; i < circleNumber; i++) {
    pt.push(new Point(perlinX, perlinY, perlinCol, step));
    //console.log('Drawing ' + String(i));
  }



}

function draw() {


  for (let i = 0; i < circleNumber; i++) {
    let col = pt[i].updatePos(step);
    noStroke();
    fill(col);
    circle(pt[i].x, pt[i].y, circleSize);
  }

}

function mousePressed() {
  pt.push(new Point(perlinX, perlinY, perlinCol, step, mouseX, mouseY));
  circleNumber += 1;
  // prevent default
  return false;
}



class Point {

  constructor(perlinX, perlinY, perlinCol, updateStep, initX = 0, initY = 0) {
    this.x = 0;
    this.y = 0;
    this.perlinX = perlinX;
    this.perlinY = perlinY;
    this.perlinCol = perlinCol;
    this.updateStep = updateStep;
    this.time = 0;


    // Intialize x and y
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        this.x = Math.random() * profile;
        this.y = 0;
        break;
      case 1:
        this.x = 0;
        this.y = Math.random() * profile;
        break;
      case 2:
        this.x = Math.random() * profile;
        this.y = profile;
        break;
      case 3:
        this.x = profile;
        this.y = Math.random() * profile;
        break;
    }

    this.x = Math.random()*profile;
    this.y = Math.random()*profile;

    if (initX != 0 && initY != 0){
      this.x = initX;
      this.y = initY;
    }

  }


  updatePos() {
    this.time += 1;

    this.x = this.x + 
    this.updateStep * (this.perlinX.noise(this.x/reductionFactor, this.y/reductionFactor, 12)-0.5);
    
    this.y = this.y + 
    this.updateStep * (this.perlinY.noise(this.x/reductionFactor, this.y/reductionFactor, 23)-0.5);
    
    let col = this.perlinCol.noise(this.x/colorFactor, this.y/colorFactor, 0);
    let col2 = this.perlinX.noise(this.x/colorFactor, this.y/colorFactor, 0);
    let col3 = this.perlinY.noise(this.x/colorFactor, this.y/colorFactor, 0);

    let red = String(Math.floor(col * 255));
    let green = 0;
    let blue = String(Math.floor(col2 * 255));
    return color('rgb(' + red + ', ' + green + ', ' + blue + ')');
  }

}

