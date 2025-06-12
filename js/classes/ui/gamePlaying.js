class GamePlaying {
    constructor(game) {
        this.game = game;

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

    draw() {
        background("#b8b4b4");

        this.drawBullets();
        this.game.player.draw();
        this.drawZombies();

        // draw UI
        for (let i = 0; i < this.game.player.health; i++) {
            // display player lives
            image(heartImg, i * 35, 1, 34, 34);
            noSmooth();

            textFont(font);
            textSize(100);
            fill("black");
            textSize(30);
            textAlign(LEFT);
            // display wave number
            text("Wave " + (this.game.waveNumber + 1), 2, 60);
        }

        if (this.game.spawnCooldown > 0) {
            this.game.spawnCooldown--;
        }
        else{
            this.game.spawnCooldown = 60;
            this.spawnZombies();
        }
    }

    mousePressed() {
        this.game.player.mousePressed();
    }
    
    startGame(){
        this.game.chosenState = this.game.states.PLAYING;
        this.game.bulletsArray = [];
        this.game.zombiesArray = [];

        this.game.player.x = 250;
        this.game.player.y = 325;
        this.game.player.health = 3;
        this.game.player.hurt = false;

        this.game.waveNumber = 0;
        this.game.count = 0;
    }

    drawBullets() {
        // update each bullet in array
        for (let i = this.game.bulletsArray.length-1; i>=0; i--) {
            let bullet = this.game.bulletsArray[i];
            if (bullet.timeAlive >= 100) {
                // remove bullets after delay
                this.game.bulletsArray.splice(i, 1);
            }

            bullet.draw();
        }
    }
    

    drawZombies() {
        for (let i = this.game.zombiesArray.length - 1; i >= 0; i--) {
            let zombie = this.game.zombiesArray[i];
            zombie.draw();

            // if zombie dies, remove from array
            if (zombie.health <= 0) {
                if (zombie instanceof SplitZombie)
                    zombie.split();
                this.game.zombiesArray.splice(i, 1);
            }
        }
    }

    spawnZombieByType(type){
        const ZOMBIE_TYPES = {
            1: () => new Zombie(),
            2: () => new FastZombie(),
            3: () => new StrongZombie(),
            4: () => new SplitZombie(false),
            0: () => new BossZombie(),
        };
        //check if type exists
        if (ZOMBIE_TYPES[type]) {
            this.game.zombiesArray.push(ZOMBIE_TYPES[type]());
        }
    }

    spawnZombies() {
        //Win condition, all waves defeated
        if (this.game.waveNumber >= this.wavesArray.length) {
            if (this.game.zombiesArray.length === 0) {
                this.game.setState("GAME_WON");
            }
            return;
        }

        let currentWave = this.wavesArray[this.game.waveNumber];

        if (this.game.count < currentWave.length) {
            this.spawnZombieByType(currentWave[this.game.count]);
            this.game.count++;
        } 
        else if (this.game.zombiesArray.length === 0) {
            this.game.waveNumber++;
            this.game.count = 0;
        }
    }
}