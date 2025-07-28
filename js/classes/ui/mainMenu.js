class MainMenu {
    constructor(game){
        this.game = game;
        
        this.buttons = [
            new Button(450, 275, 150, 65, 60, "Play", true, () => {
                this.game.setState("PLAYING");
                this.game.states.PLAYING.startGame();
                this.game.audio.playSFX(selectSound);
            }),
            new Button(450, 345, 230, 55, 50, "Settings", true, () => {
                this.game.setState("SETTINGS");
                this.game.audio.playSFX(selectSound);
            }),
            new Button(450, 415, 225, 55, 45, "Controls", true, () => {
                this.game.setState("CONTROLS");
                this.game.audio.playSFX(selectSound);
            })
        ];
        this.titleZombie = new Text(405, 150, 80, "Zombie");
        this.titleJS = new Text(595, 150, 80, "JS");
    }

    draw() {
        background("black");
        this.titleZombie.animate();
        this.titleZombie.draw();
        this.titleJS.animate();
        this.titleJS.color = "yellow";
        this.titleJS.draw();

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