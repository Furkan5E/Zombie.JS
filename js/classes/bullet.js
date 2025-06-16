class Bullet{
    constructor(playerX, playerY, angle){
        this.angle = angle;
        this.x = playerX + cos(this.angle) * 33;
        this.y = playerY + sin(this.angle) * 33;
        this.dx = cos(this.angle) * 10;
        this.dy = sin(this.angle) * 10;
        this.timeAlive = 0;
    }

    update() {
        this.timeAlive += 1;
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill("yellow");
        noStroke();
        rect(0, -1, 14, 4.5);
        pop();
    }
}
