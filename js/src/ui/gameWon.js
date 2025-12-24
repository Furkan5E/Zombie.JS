class GameWon {
    constructor(game){
        this.game = game;

         this.text = [
            new Text(450, 180, 100, "YOU WON!"),
            new Text(450, 300, 50, "You defeated the zombie horde!"),
            new Text(450, 360, 50, "Well done!")
        ];

        this.restartButton = new Button(450, 420, 570, 37, 45, "Press R to to play again", true, () => {
            this.game.states.PLAYING.startGame();
            this.game.audio.playSFX(selectSound);
        });
        
        this.backButton = new Button(450, 480, 700, 35, 40, "Press ESC to return to Main Menu", true, () => {
            this.game.setState("MENU");
            this.game.audio.playSFX(selectSound);
        });
    }

    draw() {
        background(COLOURS.MENU);

        for (let i = 0; i < this.text.length; i++) {
            this.text[i].draw();
        }
        this.backButton.draw();
        this.restartButton.draw();

        if (keyIsDown(KEYS.RESTART)) {
            this.game.states.PLAYING.startGame();
        }
        else if (keyIsDown(KEYS.MENU)){
            this.game.setState("MENU");
        }
    }

    mousePressed(){
        this.restartButton.mousePressed();
        this.backButton.mousePressed();
    }
}