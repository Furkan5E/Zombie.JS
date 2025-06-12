class Zombie {
    constructor() {
        this.x = 920;
        this.y = Math.random() * 610; // distribute randomly
        this.img = zombieImg;
        this.health = 3;
        this.speed = 2;
        this.attackCooldown = 0;
        this.size = [57, 44];

        this.hurt = false;
        this.hurtCooldown = 0;
    }
    
    draw() {
        //Movement
        let dx = (game.player.x - this.x) / Math.sqrt((game.player.x - this.x)**2 + (game.player.y - this.y)**2);
        let dy = (game.player.y - this.y) / Math.sqrt((game.player.x - this.x)**2 + (game.player.y - this.y)**2);
    
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    
        this.angle = atan2(dy, dx); // work out angle to face the player

        //Visuals
        push();
        translate(this.x, this.y);
        rotate(this.angle); // face the player
        noSmooth();
        imageMode(CENTER);
        if (!this.hurt) {
            image(this.img, 0, 0, this.size[0], this.size[1]);
        }
        else { // play hurt animation
            image(zombieHurtImg, 0, 0, this.size[0], this.size[1]);
        }
        pop();

        this.collisionCheck();
    }
    collisionCheck() {
        //Cooldown checks
        if (this.attackCooldown > 0) {
            this.attackCooldown -= 1;
        }
        if (this.hurtCooldown > 0) {
            this.hurtCooldown -= 1;
        }
        else {
            this.hurt = false;
        }
        // check if zombie hits player
        if (dist(game.player.x, game.player.y, this.x, this.y) < this.size[0] / 1.5) {
            if (this.attackCooldown <= 0) {
              this.attackCooldown = 60;
              game.player.health -= 1;
              game.player.hurt = true;
              game.player.hurtCooldown = 3;
              game.states.SETTINGS.playSFX(playerHurtSound);
              // check player health, if zero the game is over
              if (game.player.health <= 0) {
                game.setState("GAME_OVER");
              }
            }
          }
        // check if bullet hits zombie
        for (let i = game.bulletsArray.length - 1; i >= 0; i--) {
            let bullet = game.bulletsArray[i];
            if (dist(bullet.x, bullet.y, this.x, this.y) < this.size[0] / 2) {
              this.health -= 1;
              this.hurt = true;
              this.hurtCooldown = 2;
              game.states.SETTINGS.playSFX(zombieHurtSound);
              game.bulletsArray.splice(i, 1);
            }
        }
    }

}

// set each zombie type's properties
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
        this.x = bossX; // minion will spawn where boss is standing
        this.y = bossY;
        this.img = minionZombieImg;
        this.health = 1;
        this.speed = 3.5;
        this.size = [47, 38];
    }
}

class BossZombie extends Zombie {
    constructor() {
        super();
        this.img = bossZombieImg;
        this.health = 20;
        this.speed = 0.6;
        this.size = [114, 88]; 

        this.spawnCooldown = 0;
    }

    spawnMinions() { // creates minion zombies at the boss' location
        let minion = new MinionZombie(this.x, this.y);
        zombiesArray.push(minion);
    }

    draw() {
        super.draw(); // calls base zombie class update function

        // times when to spawn minions
        if (this.spawnCooldown > 0) {
            this.spawnCooldown -= 1;
        }
        else if (this.spawnCooldown <= 0) {
            this.spawnCooldown = 60;
            this.spawnMinions();
        }
    }
}

class SplitZombie extends Zombie {
    constructor(hasSplit) {
        super();
        this.img = splitZombieImg;
        this.hasSplit = hasSplit;
        // set values depending on if the zombie has split
        // if it has it will be faster but weaker
        if (!this.hasSplit) {
            this.size = [61, 48];
            this.health = 4
            this.speed = 0.9;
        }
        else{
            this.size = [51, 40];
            this.health = 3
            this.speed = 2;
        }
    }
    split() {
        // splits into two zombie on death
        if (!this.hasSplit){
            let splitZombie1 = new SplitZombie(true)
            splitZombie1.x = this.x;
            splitZombie1.y = this.y + 22;
            zombiesArray.push(splitZombie1);
            let splitZombie2 = new SplitZombie(true)
            splitZombie2.x = this.x;
            splitZombie2.y = this.y - 22;
            zombiesArray.push(splitZombie2);
            splitSound.play();
        }
    }
}