class MainMenu {
    constructor(game){
        this.game = game;
        
        this.buttons = [
            new Button(450, 275, 150, 65, 60, "Play", () => {
                this.game.setState("PLAYING");
                this.game.states.PLAYING.startGame();
                this.game.audio.playSFX(selectSound);
            }),
            new Button(450, 345, 230, 55, 50, "Settings", () => {
                this.game.setState("SETTINGS");
                this.game.audio.playSFX(selectSound);
            }),
            new Button(450, 415, 225, 55, 45, "Controls", () => {
                this.game.setState("CONTROLS");
                this.game.audio.playSFX(selectSound);
            })
        ];
        this.title = new Text(450, 160, 80, "Zombie Showdown");
    }

    draw() {
        background("black");
        this.title.draw();

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw();
        }
    }
    
    mousePressed(){
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mousePressed()
        }
    }
}