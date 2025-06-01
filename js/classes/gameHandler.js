class GameHandler {
    constructor() {
        this.player = new Player();

        //UI
        this.menu = new MainMenu(this);
        this.gameOver = new GameOver(this);
        this.gameWon = new GameWon(this);
        this.controls = new Controls(this);
        this.gamePlaying = new GamePlaying(this);

        this.paused = false;
        this.pauseCooldown = 0;

        this.chosenState = this.menu;

        this.bulletsArray = [];
        this.zombiesArray = [];

        this.waveNumber = 0;
        this.count = 0;
        this.spawnCooldown = 0;
    }

    draw() {
    if (this.chosenState === this.gamePlaying) {
        if (this.pauseCooldown > 0) {
            this.pauseCooldown--;
        }
        // toggle pause
        if (keyIsDown(80) && this.pauseCooldown === 0){
            this.pauseCooldown = 17;
            this.paused = !this.paused;
        }

        if (this.paused) {
            this.pause(); //pause game
            return;
        }

        this.chosenState.draw();
    }
    else{
        this.paused == false;
        this.chosenState.draw();
    }
}

    pause(){
        push();
        textAlign(CENTER, CENTER);
        textSize(64);
        text("PAUSED", width /2, height/2 - 25);
        pop();
    }

    mousePressed() {
        if (this.paused){
            return;
        }
        this.chosenState.mousePressed();
    }
}