var numberOfDivisions = 12;
var skip = 0;

var nSeed = 12;
var cSeed = 12;

function setup() {
    createCanvas(windowWidth-40, windowHeight-40);
    background(0);

    // Set random generator seeds
    randomSeed(cSeed);
    noiseSeed(nSeed);

    // Vertical lines counter
    ix = 0;

    for(i=0; i<skip; i++){
        init();
    }
    
}

// Intialized basic variables 
function init() {

    colorMode(HSB, 1);

    col0 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col1 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col2 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col3 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);

    colorMode(RGB, 255);

    // Resolution division factor
    res1 = 150 - random(100) + random(300); 
    res2 = 150 - random(100) + random(300);
    res0 = 150 - random(100) + random(300);
    res = 150 - random(100) + random(300);

    str0 = 20 - random(10) + random(10);
    str1 = 20 - random(10) + random(10);
    str2 = 20 - random(10) + random(10);

    // Distortioners for the third dimmension
    disstr = random(1) - random(.8) + random(1.5); 
    disstr0 = 5 - random(3) + random(5);
    disstr1 = 5 - random(3) + random(5);
    disstr2 = 5 - random(3) + random(5);

    noiseDetail(floor(3 + random(3)), 0.5 + random(0.25));
}

function draw() {

    // Check if finished drawing
    if (ix >= windowWidth) {
        saveCanvas("Dream ", "png");
        noLoop();
    }

    // Check if the zone was finished
    if (ix % (floor(windowWidth / numberOfDivisions)) == 0){
        init();
    } 

    // Render a vertical line
    for (iy = 0; iy < windowHeight; iy++) {

        // Note: noise() function uses p5 Perlin noise generator
        v = noise(ix / res, iy / res) * disstr;
        v0 = noise(ix / res0, iy / res0, v * disstr0);
        v1 = noise(ix / res1, iy / res1, v * disstr1);
        v2 = noise(ix / res2, iy / res2, v * disstr2);

        //Calculate the pixel color
        v0 += sin(v0 * 50) / 65;
        v1 += sin(v1 * 50) / 65;
        v2 += sin(v2 * 50) / 65;

        col01 = lerpColor(col0, col1, 1 / (1 + exp((v0 - .5) * str0)));
        col23 = lerpColor(col2, col3, 1 / (1 + exp((v1 - .5) * str1)));

        finalColor = lerpColor(col01, col23, 1 / (1 + exp((v2 - .5) * str2)));
        stroke(finalColor);

        // Draw the pixel
        point(ix, iy);
    }

    // Finished rendering a vertical line. Next one.
    ix++;

}