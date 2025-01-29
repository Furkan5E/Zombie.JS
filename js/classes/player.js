class Player {
    constructor(){
        this.x = 250;
        this.y = 325;
        this.speed = 5;
        this.health = 3;
        this.attackCooldown = 0;

        this.hurt = false;
        this.hurtCooldown = 0;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(atan2(mouseY - this.y, mouseX - this.x)); // face the mouse
        noSmooth();
        imageMode(CENTER);
        if (!this.hurt) {
            image(playerImg, 0, 0, 95, 95);
        }
        else { // play hurt animation
            image(playerHurtImg, 0, 0, 95, 95);
        }
        pop();
    }

    update() {
        // update counter variables
        if (this.attackCooldown > 0) {
            this.attackCooldown -= 1;
        }
        if (this.hurtCooldown > 0) {
            this.hurtCooldown -= 1;
        }
        else {
            this.hurt = false;
        }
    }

    move() {
        // update player position
        if (keyIsDown(65) && player.x > 24) {  // A key, left
            player.x -= player.speed;
        }
        if (keyIsDown(68) && player.x < 876) { // D key, right
            player.x += player.speed;
        }
        if (keyIsDown(87) && player.y > 24) { // W key, up
            player.y -= player.speed;
        }
        if (keyIsDown(83) && player.y < 576) { // S key, down
            player.y += player.speed;
        }
    }
}
