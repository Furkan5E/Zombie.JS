class GameHandler {
    constructor() {
        this.player = new Player();

        //UI
        this.states = {
            MENU: new MainMenu(this),
            PLAYING: new GamePlaying(this),
            GAME_OVER: new GameOver(this),
            GAME_WON: new GameWon(this),
            CONTROLS: new Controls(this),
            SETTINGS: new Settings(this)
        };

        this.chosenState = this.states.MENU;

        this.paused = false;
        this.pauseCooldown = 0;

        this.bulletsArray = [];
        this.zombiesArray = [];

        this.waveNumber = 0;
        this.count = 0;
        this.spawnCooldown = 0;
    }

    draw() {
        if (this.chosenState === this.states.PLAYING) {
            if (this.pauseCooldown > 0) { 
                this.pauseCooldown--;
            }
            // toggle pause
            if (keyIsDown(80) && this.pauseCooldown === 0){
                this.pauseCooldown = 17;
                this.paused = !this.paused;
            }

            if (this.paused) {
                this.pause();
                return;
            }

            this.chosenState.draw();
        }
        else {
            this.paused == false;
            this.chosenState.draw();
        }
    }
    
    setState(newState) {
        if (this.states[newState])
            this.chosenState = this.states[newState];
        else 
            console.log(newState + " state doesn't exist");
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