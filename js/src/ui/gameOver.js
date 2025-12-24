class GameOver {
    constructor(game) {
        this.game = game;
        
        this.title = new Text(450, 200, 100, "GAME OVER");
        
        this.restartButton = new Button(450, 300, 620, 42, 50, "Press R to to play again", true, () => {
            this.game.states.PLAYING.startGame();
            this.game.audio.playSFX(selectSound);
        });
        
        this.backButton = new Button(450, 370, 790, 40, 45, "Press ESC to return to Main Menu", true, () => {
            this.game.setState("MENU");
            this.game.audio.playSFX(selectSound);
        });
    }

    draw() {
        background(COLOURS.MENU);

        this.title.draw();
        this.backButton.draw();
        this.restartButton.draw();

        if (keyIsDown(KEYS.RESTART))
            this.game.states.PLAYING.startGame();
        else if (keyIsDown(KEYS.MENU))
            this.game.setState("MENU");
    }
    
    mousePressed(){
        this.restartButton.mousePressed();
        this.backButton.mousePressed();
    }
}