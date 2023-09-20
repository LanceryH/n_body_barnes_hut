let movers = [];
let sun;
let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;

function setup() {
  createCanvas(500, 500, WEBGL);
  debugMode(AXES);
  camera(0, 500, -400);

  for (let i = 0; i < 50; i++) {
    let pos = p5.Vector.random3D();
    let vel = pos.copy();
    vel.setMag(random(1, 5));
    pos.setMag(random(-200, 200));
    vel.rotate(PI / 2);
    let m = random(5, 15);
    movers[i] = new Mover(pos.x, pos.y, pos.z, vel.x, vel.y, vel.z, m, "planets");  
    }
    sun = new Mover(0, 0, 0, 0, 0, 0, 50, "sun");
  }

  function draw() {
    background(0);
    orbitControl(1,1,1);
    let boundary = new Rectangle(0, 0,  200, 200);
    let qt = new QuadTree(boundary, 4);
    
    for (let mover of movers) {
      sun.attract(mover);
      let point = new Point(mover.pos.x, mover.pos.y, mover.pos.z, mover);
      qt.insert(point);
      for (let other of movers) {
        if (mover !== other) {
          mover.attract(other);
        }
      }
    }
  
    for (let mover of movers) {
      mover.update();
      mover.show();
      }
    sun.show();
    //qt.update();
    qt.show();
  }

  function keyPressed() {
    // this will download the first 5 seconds of the animation!
    if (key === 's') {
      saveGif('mySketch', 5);
    }
  }