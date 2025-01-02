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
        rotate(atan2(mouseY - this.y, mouseX - this.x));
        noSmooth();
        imageMode(CENTER);
        if (!this.hurt) {
            image(playerImg, 0, 0, 95, 95);
        }
        else {
            image(playerHurtImg, 0, 0, 95, 95);
        }
        pop();
    }

    update() {
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

class Zombie {
    constructor() {
        this.x = 920;
        this.y = Math.random() * 610;
        this.img = zombieImg;
        this.health = 3;
        this.speed = 2;
        this.attackCooldown = 0;
        this.size = [57, 44];  // 154 by 120 px 

        this.hurt = false;
        this.hurtCooldown = 0;
    }

    move() {
        let dx = (player.x - this.x) / Math.sqrt((player.x - this.x)**2 + (player.y - this.y)**2);
        let dy = (player.y - this.y) / Math.sqrt((player.x - this.x)**2 + (player.y - this.y)**2);

        this.x += dx * this.speed;
        this.y += dy * this.speed;

        this.angle = atan2(dy, dx);
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        noSmooth();
        imageMode(CENTER);
        if (!this.hurt) {
            image(this.img, 0, 0, this.size[0], this.size[1]);
        }
        else {
            image(zombieHurtImg, 0, 0, this.size[0], this.size[1]);
        }
        pop();
    }

    update() {
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

    collisionCheck() {
        if (dist(player.x, player.y, this.x, this.y) < this.size[0] / 1.5) {
            if (this.attackCooldown <= 0) {
              this.attackCooldown = 60;
              player.health -= 1;
              player.hurt = true;
              player.hurtCooldown = 3;
              if (player.health <= 0) {
                gameOver = true;
              }
            }
          }

        for (let i = bulletsArray.length - 1; i >= 0; i--) {
            let bullet = bulletsArray[i];
            if (dist(bullet.x, bullet.y, this.x, this.y) < this.size[0] / 2) {
              this.health -= 1;
              this.hurt = true;
              this.hurtCooldown = 2;
              bulletsArray.splice(i, 1);
            }
        }
    }

}

class FastZombie extends Zombie {
    constructor() {
        super();
        this.img = fastZombieImg;
        this.health = 2;
        this.speed =3;
        this.size = [51, 40];
    }
}

class StrongZombie extends Zombie {
    constructor() {
        super();
        this.img = strongZombieImg;
        this.health = 5;
        this.speed = 1.5;
        this.size = [61, 48];
    }
}

class MinionZombie extends Zombie {
    constructor(bossX, bossY) {
        super();
        this.x = bossX;
        this.y = bossY;
        this.img = minionZombieImg;
        this.health = 1;
        this.speed = 4;
        this.size = [47, 38];
    }
}

class BossZombie extends Zombie {
    constructor() {
        super();
        this.img = bossZombieImg;
        this.health = 20;
        this.speed = 0.5;
        this.size = [114, 88]; 

        this.spawnCooldown = 0;
    }

    spawnMinions() {
        if (this.spawnCooldown <= 0) {
            this.spawnCooldown = 50;
            let minion = new MinionZombie(this.x + Math.random(), this.y + Math.random());
            zombiesArray.push(minion);
        }
    }

    update() {
        super.update();

        this.spawnMinions();

        if (this.spawnCooldown > 0) {
            this.spawnCooldown -= 1;
        }
    }
}

class SplitZombie extends Zombie {
    constructor(hasSplit) {
        super();
        this.img = splitZombieImg;
        this.hasSplit = hasSplit;
        if (!this.hasSplit) {
            this.size = [61, 48];
            this.health = 5
            this.speed = 1;
        }
        else{
            this.size = [51, 40];
            this.health = 3
            this.speed = 2.5;
        }
    }
    split() {
        if (!this.hasSplit){
            let splitZombie1 = new SplitZombie(true)
            splitZombie1.x = this.x;
            splitZombie1.y = this.y + 22;
            zombiesArray.push(splitZombie1);
            let splitZombie2 = new SplitZombie(true)
            splitZombie2.x = this.x;
            splitZombie2.y = this.y - 22;
            zombiesArray.push(splitZombie2);
        }
    }
}