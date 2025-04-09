class MainMenu {
    constructor() {

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
        onMainMenu = false;
        selectSound.play();
        resetGame(); // start game
        }
        else if (mouseX <= 548 && mouseX >= 343 && mouseY <= 347 && mouseY >= 308) { // controls button position
        onMainMenu = false;
        onControlsMenu = true; // switch to control menu
        selectSound.play();
        }
    }
}