class Controls {
    constructor(game){
        this.game = game;

        this.text = [
            new Text(450, 80, 75, "Controls"),
            new Text(450, 165, 45, "WASD to move around"),
            new Text(450, 235, 45, "Use mouse to aim"),
            new Text(450, 305, 45, "left mouse button click to shoot"),
            new Text(450, 375, 45, "Don't let the zombies get you!"),
            new Text(450, 445, 45, "P to pause the game")
        ];
        this.backButton = new Button(450, 535, 645, 34, 37, "Press ESC to return to Main Menu", true, () => {
            this.game.setState("MENU");
            this.game.audio.playSFX(selectSound);
        });
    }

    draw() {
        background(COLOURS.MENU);
        this.backButton.draw();

        for (let i = 0; i < this.text.length; i++) {
            this.text[i].draw();
        }

        if (keyIsDown(KEYS.MENU))
            this.game.setState("MENU");
    }

    mousePressed(){
        this.backButton.mousePressed();
    }
    
}