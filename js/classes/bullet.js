class Bullet{
    constructor(){
        this.angle = atan2(mouseY - game.player.y, mouseX - game.player.x); // face the mouse
        this.x = game.player.x + cos(this.angle) * 25;
        this.y = game.player.y + sin(this.angle) * 25;
        this.dx = cos(this.angle) * 10;
        this.dy = sin(this.angle) * 10;
        this.timeAlive = 0;
    }

    draw() {
        this.timeAlive += 1;
        this.x += this.dx;
        this.y += this.dy;

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill("yellow");
        strokeWeight(0);
        rect(0, -1, 14, 4.5);
        pop();
    }
}