class GameWon {
    constructor(){

    }

    draw() {
        background("black");
        textFont(font);
        textSize(100);
        fill(255,255,255);
        textAlign(CENTER);

        textSize(100);
        text("YOU WON!", 450, 200);

        textSize(50);
        text("You defeated the zombie horde!", 450, 260);
        text("Well done!", 450, 320);

        textSize(45);
        text("Press R to to play again", 450, 380);

        textSize(40);
        text("Return to Main Menu", 450, 500);
        
        if (keyIsDown(82))  { // R key
        resetGame();
        isGameWon = false;
        }
    }
    mousePressed(){
        if (mouseX <= 655 && mouseX >= 235 && mouseY <= 503 && mouseY >= 465) { // return to menu button position
            onMainMenu = true; // switch to main menu
            isGameWon = false;
            selectSound.play();
        }
    }
}