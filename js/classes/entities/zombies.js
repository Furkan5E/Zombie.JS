class Zombie {
    constructor(player) {
        this.x = 920;
        this.y = Math.random() * 610; // distribute randomly
        this.img = zombieImg;
        this.health = 3;
        this.speed = 2;
        this.attackCooldown = 0;
        this.size = [57, 44];

        this.hurtIntensity = 0;

        this.player = player;
    }

    update(){
        //Movement
        let dx = (this.player.x - this.x) / Math.sqrt((this.player.x - this.x)**2 + (this.player.y - this.y)**2);
        let dy = (this.player.y - this.y) / Math.sqrt((this.player.x - this.x)**2 + (this.player.y - this.y)**2);
    
        this.x += dx * this.speed;
        this.y += dy * this.speed;

        this.angle = atan2(dy, dx);

        //attack cooldown
        if(this.attackCooldown > 0){
            this.attackCooldown -= 1;
        }
        //hurt effect tint fade out
        if (this.hurtIntensity > 0){
            this.hurtIntensity -= 0.05;
        }
    }
    
    draw() {
        push();
        noSmooth();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angle);

        tint(255, 255 * (1 - this.hurtIntensity)); // fade to white


        image(this.img, 0, 0, this.size[0], this.size[1]);
        pop();
    }

    takeDamage() {
        this.health--;
        this.hurtIntensity = 1;
        game.states.SETTINGS.playSFX(zombieHurtSound);
    }

    attack() {
        if (this.attackCooldown <= 0) {
            this.player.takeDamage(1);
            this.attackCooldown = 30;
        }
    }

}

// set each zombie type's properties
class FastZombie extends Zombie {
    constructor(player) {
        super(player);
        this.img = fastZombieImg;
        this.health = 2;
        this.speed =3;
        this.size = [51, 40];
    }
}

class StrongZombie extends Zombie {
    constructor(player) {
        super(player);
        this.img = strongZombieImg;
        this.health = 5;
        this.speed = 1.5;
        this.size = [61, 48];
    }
}

class MinionZombie extends Zombie {
    constructor(player, bossX, bossY) {
        super(player);
        this.x = bossX; // minion will spawn where boss is standing
        this.y = bossY;
        this.img = minionZombieImg;
        this.health = 1;
        this.speed = 3.5;
        this.size = [47, 38];
    }
}

class BossZombie extends Zombie {
    constructor(player) {
        super(player);
        this.img = bossZombieImg;
        this.health = 20;
        this.speed = 0.6;
        this.size = [114, 88]; 

        this.spawnCooldown = 0;
    }

    spawnMinion() {
        if (this.spawnCooldown > 0) {
            this.spawnCooldown--;
            return null;
        }

        this.spawnCooldown = 120;
        splitSound.play();
        return new MinionZombie(this.player, this.x, this.y);
    }
}

class SplitZombie extends Zombie {
    constructor(player, hasSplit) {
        super(player);
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
            let splitZombie1 = new SplitZombie(this.player, true)
            splitZombie1.x = this.x;
            splitZombie1.y = this.y + 22;
            let splitZombie2 = new SplitZombie(this.player, true)
            splitZombie2.x = this.x;
            splitZombie2.y = this.y - 22;

            game.states.SETTINGS.playSFX(splitSound);
            return [splitZombie1, splitZombie2];
        }
    }
}