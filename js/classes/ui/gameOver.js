class GameOver {
    constructor() {
    }

    draw() {
        background("black");
        textFont(font);
        textSize(100);
        fill("white");
        textAlign(CENTER);
        textSize(100);
        text("GAME OVER :(", 450, 200);

        textSize(50);
        text("Press R to to play again", 450, 265);

        textSize(40);
        text("Return to Main Menu", 450, 410);

        if (keyIsDown(82)) // R key
            resetGame();
    }
    
    mousePressed(){
        if (mouseX <= 655 && mouseX >= 235 && mouseY <= 408 && mouseY >= 372) { // return to menu button position
            onMainMenu = true; // switch to main menu
            isGameOver = false;
            selectSound.play();
        }
    }
}