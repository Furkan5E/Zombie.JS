class Controls {
    constructor(){
    }

    draw() {
        background("black");
        textFont(font);
        textSize(100);
        fill("white");
        textAlign(CENTER);

        textSize(75);
        text("Controls", 450, 80);

        textSize(45);
        text("WASD to move around", 450, 165);
        text("Use mouse to aim", 450, 240);
        text("left mouse button click to shoot", 450, 310);
        text("Don't let the zombies get you!", 450, 385);

        textSize(40);
        text("Return to Main Menu", 450, 500);
    }

    mousePressed(){
        if (mouseX <= 655 && mouseX >= 235 && mouseY <= 503 && mouseY >= 465) { // return to menu button position
            onMainMenu = true; // switch to main menu
            onControlsMenu = false;
            selectSound.play();
        }
    }
}