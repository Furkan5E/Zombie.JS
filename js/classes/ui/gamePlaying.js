class GamePlaying {
    constructor(game) {
        this.game = game;
        this.player = new Player();

        this.bulletsArray = [];
        this.zombiesArray = [];

        this.waveNumber = 0;
        this.count = 0;
        this.spawnCooldown = 0;
        
        this.healthBar = new HealthBar();

        this.wavesArray = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,1,2,1,1,1,2,1],
            [2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,3,2,2,1,3,2,2,2,3,2,2,1],
            [3,3,3,3,1,1,1,3,2,1,3,3],
            [2,3,2,3,3,2,1,1,1,3,3,2],
            [1,2,3,2,1,1,2,3,1,2,4,4,1,1],
            [2,2,2,1,3,1,4,1,2,3,4,1,1,3,3],
            [4,4,4,4,1,2,4,2,2,4],
            [1,2,2,3,1,1,1,1,1,1,1,1,1,1,0],
            [1,2,1,1,1,1,3,4,2,1,1,1,1],
            [4,3,1,4,4,4,1,2,1,1,1,1],
            [4,2,4,2,3,3,2,1,2,3,0],
            [4,2,2,2,2,1,4,3,2,1,4,4,4],
            [1,1,1,1,1,2,1,1,3,3,4,4,4],
            [1,2,1,1,3,4,2,1,1,1,2,3,4],
            [2,1,1,3,3,3,3,4,4,4,2,1,4],
            [4,4,4,4,4,4,4,4,3,2,2,2,2,1,1,1],
            [1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3],
            [4,4,4,4,4,4,1,2,3,0,1,1,0]
        ];
    }

    update() {
        this.player.update();

        //spawn new zombies
        if (this.spawnCooldown > 0)
            this.spawnCooldown--;
        else {
            this.spawnCooldown = 60;
            this.spawnZombies();
        }

        //update bullets
        for (let i = this.bulletsArray.length - 1; i >= 0; i--) {
            const bullet = this.bulletsArray[i];
            bullet.update();

            if (bullet.timeAlive >= 100) {
                this.bulletsArray.splice(i, 1);
                continue;
            }

            //bullet collision check
            for (let j = this.zombiesArray.length - 1; j >= 0; j--) {
                const zombie = this.zombiesArray[j];
                if (dist(bullet.x, bullet.y, zombie.x, zombie.y) < zombie.size[0] / 2) {
                    zombie.takeDamage(1);
                    this.bulletsArray.splice(i, 1);
                    break;
                }
            }
        }

        //zombies
        for (let i = this.zombiesArray.length - 1; i >= 0; i--) {
            const zombie = this.zombiesArray[i];
            zombie.update();

            //boss minion spawn
            if (zombie instanceof BossZombie) {
                const minion = zombie.spawnMinion();
                if (minion)
                    this.zombiesArray.push(minion);
            }

            //handle deaths
            if (zombie.health <= 0) {
                if (zombie instanceof SplitZombie) {
                    const newZombies = zombie.split();
                    if (newZombies) this.zombiesArray.push(...newZombies);
                }
                this.zombiesArray.splice(i, 1);
                continue;
            }

            //zombie-player collision
            if (dist(zombie.x, zombie.y, this.player.x, this.player.y) < zombie.size[0] / 2){
                zombie.attack();
            }
        }

        //player health check
        if (this.player.health <= 0) {
            this.game.setState("GAME_OVER");
            return;
        }
    }

    
    draw() {
        background("#b8b4b4");
        
        //draw bullets
        for (let bullet of this.bulletsArray) {
            bullet.draw();
        }
        
        //draw player
        this.player.draw();
        
        //draw zombies
        for (let zombie of this.zombiesArray) {
            zombie.draw();
        }
        
        //draw UI
        this.healthBar.draw(this.player.health);
        
        textFont(font);
        textSize(100);
        fill("black");
        textSize(30);
        textAlign(LEFT);
        text("Wave " + (this.waveNumber + 1), 2, 45);
    }
    
    mousePressed() {
        let bullet = this.player.mousePressed();
        if (bullet){
            this.bulletsArray.push(bullet);
        }
    }
    
    
    startGame(){
        this.game.chosenState = this.game.states.PLAYING;
        this.bulletsArray = [];
        this.zombiesArray = [];

        this.player.x = 250;
        this.player.y = 325;
        this.player.health = 3;
        this.player.hurtIntensity = 0;

        this.waveNumber = 0;
        this.count = 0;
    }
    

    spawnZombieByType(type){
        const ZOMBIE_TYPES = {
            1: () => new Zombie(this.player),
            2: () => new FastZombie(this.player),
            3: () => new StrongZombie(this.player),
            4: () => new SplitZombie(this.player, false),
            0: () => new BossZombie(this.player),
        };
        //check if type exists
        if (ZOMBIE_TYPES[type]) {
            this.zombiesArray.push(ZOMBIE_TYPES[type]());
        }
    }

    spawnZombies() {
        //Win condition, all waves defeated
        if (this.waveNumber >= this.wavesArray.length) {
            if (this.zombiesArray.length === 0) {
                this.game.setState("GAME_WON");
            }
            return;
        }

        let currentWave = this.wavesArray[this.waveNumber];

        if (this.count < currentWave.length) {
            this.spawnZombieByType(currentWave[this.count]);
            this.count++;
        } 
        else if (this.zombiesArray.length === 0) {
            this.waveNumber++;
            this.count = 0;
        }
    }
}