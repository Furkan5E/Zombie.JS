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

        // update player position
        if (keyIsDown(65) && this.x > 24) {  // A key, left
            this.x -= this.speed;
        }
        if (keyIsDown(68) && this.x < 876) { // D key, right
            this.x += this.speed;
        }
        if (keyIsDown(87) && this.y > 24) { // W key, up
            this.y -= this.speed;
        }
        if (keyIsDown(83) && this.y < 576) { // S key, down
            this.y += this.speed;
        }
    }
    mousePressed() {
        if (this.attackCooldown <= 0) {
            this.attackCooldown = 6;
            // create bullets
    
            let bullet = new Bullet();

            bulletsArray.push(bullet);
            shootSound.play();
        }
    }
}
