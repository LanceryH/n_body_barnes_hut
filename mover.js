class Mover {
    constructor(x, y, z, vx, vy, vz, m, name) {
      this.pos = createVector(x, y, z);
      this.vel = createVector(vx, vy, vz);
      this.acc = createVector(0, 0, 0);
      this.mass = m;
      this.r = sqrt(this.mass) * 2;
      this.name = name;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acc.add(f);
    }
  
    attract(mover) {
      let force = p5.Vector.sub(this.pos, mover.pos);
      let distanceSq = constrain(force.magSq(), 1000, 2000);
      let G = 1;
      let strength = (G * (this.mass * mover.mass)) / distanceSq;
      force.setMag(strength);
      mover.applyForce(force);
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0, 0);
    }
  
    show() {
        if (this.name == "planets") {
            stroke(255,0,0);
            strokeWeight(this.mass/2);
            point(this.pos.x, this.pos.y,this.pos.z);
        }
        if (this.name == "sun") {
            stroke(255,255,0);
            strokeWeight(10);
            point(this.pos.x, this.pos.y,this.pos.z);
        }
    }
}