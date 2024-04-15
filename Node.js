class Node {

    constructor(args) {
        this.p = args.p || createVector(int(random(width)), int(random(height)));
        this.r = args.r || 5;
        this.defualt_color = 130;
        this.clr = args.clr || this.defualt_color;
    }

    draw() {
        push();
        translate(this.p.x, this.p.y);
        // fill(255, 65, 80);
        fill(this.clr)
        noStroke();
        circle(0, 0, this.r);
        textSize(11);
        textAlign(CENTER)
        text("(" + this.p.x + "," + this.p.y + ")", 0, -3);
        pop();
    }

    color_reset() {
        this.clr = this.defualt_color;
    }


}