class GameHandler {
    constructor() {
        //UI
        this.states = {
            MENU: new MainMenu(this),
            PLAYING: new GamePlaying(this),
            GAME_OVER: new GameOver(this),
            GAME_WON: new GameWon(this),
            CONTROLS: new Controls(this),
            SETTINGS: new Settings(this)
        };
        this.audio = new AudioManger();

        this.chosenState = this.states.MENU;

        this.paused = false;
        this.pauseCooldown = 0;
    }

    draw() {
        if (this.chosenState === this.states.PLAYING) {
            if (this.pauseCooldown > 0) { 
                this.pauseCooldown--;
            }

            //toggle pause with P
            if (keyIsDown(KEYS.PAUSE) && this.pauseCooldown === 0){
                this.pauseCooldown = 17;
                this.paused = !this.paused;
            }

            if (!this.paused) {
                this.chosenState.update();
            }

            this.chosenState.draw();

            if (this.paused) {
                this.pauseOverlay();
            }
        }
        else {
            //reset paused bool
            this.paused = false;
            this.chosenState.draw();
        }
    }

    pauseOverlay() {
        push();
        noStroke()
        fill(0, 175);
        rect(0, 0, width*2, height*2);

        textAlign(CENTER, CENTER);
        textSize(64);
        fill(255);
        text("PAUSED", width / 2, height / 2 - 25);
        pop();
    }


    
    setState(newState) {
        if (this.states[newState])
            this.chosenState = this.states[newState];
        else 
            console.log(newState + " state doesn't exist");
    }

    mousePressed() {
        if (this.paused){
            return;
        }
        this.chosenState.mousePressed();
    }
}