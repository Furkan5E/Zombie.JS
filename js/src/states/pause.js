class Pause {
    constructor(gamePlaying){
        this.gamePlaying = gamePlaying;
        this.isPaused = false;
        this.pauseCooldown = 0;

        this.restartButton = new Button(450, 300, 620, 42, 50, "Press R to to play again", true, () => {
            this.gamePlaying.startGame();
            this.gamePlaying.game.audio.playSFX(selectSound);
        });
        
        this.backButton = new Button(450, 370, 790, 40, 45, "Press ESC to return to Main Menu", true, () => {
            this.gamePlaying.game.setState("MENU");
            this.gamePlaying.game.audio.playSFX(selectSound);
        });
    }

    draw(){
        push();
        noStroke()
        fill(0, 210);
        rect(0, 0, width*2, height*2);

        textAlign(CENTER, CENTER);
        textSize(64);
        fill(255);
        text("PAUSED", width / 2, 200);
        this.restartButton.draw();
        this.backButton.draw();
        pop();
    }

    update() {
        if (this.pauseCooldown > 0) { 
            this.pauseCooldown--;
        }

        //toggle pause with P
        if (keyIsDown(KEYS.PAUSE) && this.pauseCooldown === 0){
            this.pauseCooldown = 17;
            this.isPaused = !this.isPaused;
        }

        if (keyIsDown(KEYS.RESTART))
            this.gamePlaying.startGame();
        else if (keyIsDown(KEYS.MENU))
            this.gamePlaying.game.setState("MENU");
    }

    mousePressed(){
        this.restartButton.mousePressed();
        this.backButton.mousePressed();
    }
}