class Player {
    constructor(){
        this.x = 250;
        this.y = 325;
        this.speed = 5;
        this.health = 3;

        this.attackCooldown = 0;
        this.hurtIntensity = 0;

        this.angle = 0;
        this.money = 0;
    }

    update(){
        //movement
        if (keyIsDown(KEYS.MOVE_LEFT) && this.x > 24) {  // A
            this.x -= this.speed;
        }
        if (keyIsDown(KEYS.MOVE_RIGHT) && this.x < width - 24) { // D
            this.x += this.speed;
        }
        if (keyIsDown(KEYS.MOVE_UP) && this.y > 24) { // W
            this.y -= this.speed;
        }
        if (keyIsDown(KEYS.MOVE_DOWN) && this.y < height - 24) { // S
            this.y += this.speed;
        }

        //aim
        this.angle = atan2(mouseY - this.y, mouseX - this.x);

        //attack cooldown
        if (this.attackCooldown > 0) {
            this.attackCooldown -= 1;
        }

        //hurt effect tint fade out
        if (this.hurtIntensity > 0){
            this.hurtIntensity -= 0.05;
        }
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        
        let r = lerp(255, 255, this.hurtIntensity);
        let g = lerp(255, 0, this.hurtIntensity);
        let b = lerp(255, 0, this.hurtIntensity);
        tint(r, g, b);
        
        noSmooth();
        image(playerImg, 0, 0, 155.7, 155.7);
        pop();
    }

    takeDamage() {
        this.health--;
        this.hurtIntensity = 1;
        game.audio.playSFX(playerHurtSound);
    }

    mousePressed() {
        if (this.attackCooldown <= 0) {
            this.attackCooldown = 6;
            let bullet = new Bullet(this.x, this.y, this.angle);
            game.audio.playSFX(shootSound);
            return bullet;
        }
    }
}
