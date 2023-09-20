class Point {
    constructor(x, y, z, userData) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.userData = userData;
    }
  }
  
  class Rectangle {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    contains(point){
        return(point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h);
    }
  }
  
  class QuadTree {
    constructor(boundary, n){
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }
    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let tr = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.top_right= new QuadTree(tr, this.capacity);
        let tl = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.top_left = new QuadTree(tl, this.capacity);
        let br = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.bot_right = new QuadTree(br, this.capacity);
        let bl = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.bot_left = new QuadTree(bl, this.capacity);
        this.divided = true;
    }
    insert(point){
        if (!this.boundary.contains(point)){
            return;
        }
        if(this.points.length < this.capacity){
            this.points.push(point);
        }
        else{
            if(!this.divided){
            this.subdivide();
            }
        this.top_left.insert(point);
        this.top_right.insert(point);
        this.bot_left.insert(point);
        this.bot_right.insert(point);
        }

    }
    show(){
        stroke(255);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if (this.divided){
            this.top_left.show();
            this.top_right.show();
            this.bot_left.show();
            this.bot_right.show();
        }
    }
  }
  