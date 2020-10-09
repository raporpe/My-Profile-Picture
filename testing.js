var numberOfDivisions = 5;
//var nSeed = Math.floor(Math.random()*100000000000000);
//var cSeed = Math.floor(Math.random()*100000000000000);

var nSeed = 42;
var cSeed = 42;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    t = 0;
    ix = 0;
    randomSeed(cSeed);
    noiseSeed(nSeed);
    console.log(cSeed);
    console.log(nSeed);
    console.log("..");
}


function init() {

    colorMode(HSB, 1);

    col0 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col1 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col2 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);
    col3 = color(random(), 1 - sq(random())+0.07, 1 - sq(random())+0.07);

    // My own colors

    // col0 = color(126, 1 - (random()), 1 - (random()));
    // col1 = color(random(), 1 - (random()), 1 - (random()));
    // col2 = color(random(), 1 - (random()), 1 - (random()));
    // col3 = color(random(), 1 - (random()), 1 - (random()));

    // Copy values
    ncol0 = col0;
    ncol1 = col1;
    ncol2 = col2;
    ncol3 = col3;

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
    if (ix > windowWidth) {
        saveCanvas("Dream " + (t++), "png");
        noLoop();
    }

    // Check if the zone was finished
    if (ix % (floor(windowWidth / numberOfDivisions)) == 0){
        init();
    } 

    // Render vertical line
    for (iy = 0; iy < windowHeight; iy++) {
        v = sq(noise(ix / res, iy / res)) * disstr;
        v0 = noise(ix / res0 + 10, iy / res0, v * disstr0 + 4);
        v1 = noise(ix / res1, iy / res1 + 10, v * disstr1 + 14);
        v2 = noise(ix / res2 + 10, iy / res2 + 10, v * disstr2 + 24);


        v0 = v0 + sin(v0 * 50) / 65;
        v1 = v1 + sin(v1 * 50) / 65;
        v2 = v2 + sin(v2 * 50) / 65;

        // This adds the strange diagonal artifacts
        //ncol0 = lerpColor(col0, color(0, 0, 0), (ix + iy) % 8 < 3 ? .03 : 0);
        //ncol2 = lerpColor(col2, color(255, 255, 255), (ix + iy) % 8 < 3 ? .03 : 0);
        //ncol1 = lerpColor(col1, color(64, 64, 64), (ix + iy) % 5 < 2 ? .03 : 0);
        //ncol3 = lerpColor(col3, color(192, 192, 192), (ix + iy) % 5 < 2 ? .03 : 0);

        col01 = lerpColor(ncol0, ncol1, 1 / (1 + exp((v0 - .5) * str0)));
        col23 = lerpColor(ncol2, ncol3, 1 / (1 + exp((v1 - .5) * str1)));

        // Draw everything
        col = lerpColor(col01, col23, 1 / (1 + exp((v2 - .5) * str2)));
        stroke(col);
        point(ix, iy);
    }
    ix++;


}