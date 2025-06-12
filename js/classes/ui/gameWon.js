class GameWon {
    constructor(game){
        this.game = game;

         this.text = [
            new Text(450, 180, 100, "YOU WON!"),
            new Text(450, 300, 50, "You defeated the zombie horde!"),
            new Text(450, 360, 50, "Well done!"),
            new Text(450, 420, 45, "Press R to play again"),
            new Text(450, 480, 40, "Press ESC to return to Main Menu")
        ];
    }

    draw() {
        background("black");

        for (let i = 0; i < this.text.length; i++) {
            this.text[i].draw();
        }

        if (keyIsDown(KEYS.RESTART)) {
            this.game.states.PLAYING.startGame();
        }
        else if (keyIsDown(KEYS.MENU)){
            this.game.setState("MENU");
        }
    }

    mousePressed(){

    }
}