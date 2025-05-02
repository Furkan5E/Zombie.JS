class MainMenu {
    constructor(game){
        this.game = game;
    }

    draw() {
        background("black");
        textFont(font);
        textSize(100);
        fill("white");
        textAlign(CENTER);
        textSize(80);
        text("Zombie Showdown", 450, 200);

        textSize(55);
        text("Play", 450, 275);

        textSize(42);
        text("Controls", 450, 345);
    }
    
    mousePressed(){
        if (mouseX <= 520 && mouseX >= 365 && mouseY <= 275 && mouseY >= 225) { // play button position
        this.game.gamePlaying.startGame();
        selectSound.play();
        //resetGame(); // start game
        }
        else if (mouseX <= 548 && mouseX >= 343 && mouseY <= 347 && mouseY >= 308) { // controls button position
        // switch to control menu
        this.game.chosenState = this.game.controls;
        selectSound.play();
        }
    }
}