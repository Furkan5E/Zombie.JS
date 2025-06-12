class GameOver {
    constructor(game) {
        this.game = game;
        
        this.text = [
            new Text(450, 200, 100, "GAME OVER"),
            new Text(450, 300, 50, "Press R to to play again"),
            new Text(450, 370, 45, "Press ESC to return to Main Menu")
        ];
    }

    draw() {
        background("black");

        for (let i = 0; i < this.text.length; i++) {
            this.text[i].draw();
        }

        if (keyIsDown(KEYS.RESTART))
            this.game.states.PLAYING.startGame();
        else if (keyIsDown(KEYS.MENU))
            this.game.setState("MENU");
    }
    
    mousePressed(){
    }
}