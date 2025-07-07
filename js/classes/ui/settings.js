class Settings {
    constructor(game){
        this.game = game;

        this.text = [
            new Text(450, 80, 75, "Settings"),
            new Text(450, 535, 37, "Press ESC to return to Main Menu")
        ];
        
        this.musicToggle = new Button(450, 190, 250, 50, 50, "Music: ON ", () => {
            this.game.audio.musicON = !this.game.audio.musicON;
            this.musicToggle.text.label = this.game.audio.musicON ? "Music: ON " : "Music: OFF";
            this.musicToggle.text.color = this.game.audio.musicON ? "green" : "red";
            this.game.audio.playMusic(backgroundMusic);
            this.game.audio.playSFX(selectSound);
        })
        this.sfxToggle = new Button(450, 260, 240, 50, 50, "SFX: ON ", () => {
            this.game.audio.sfxON = !this.game.audio.sfxON;
            this.sfxToggle.text.label = this.game.audio.sfxON ? "SFX: ON " : "SFX: OFF";
            this.sfxToggle.text.color = this.game.audio.sfxON ? "green" : "red";
            this.game.audio.playSFX(selectSound);
        })
        this.sfxToggle.text.color = "green";
        this.musicToggle.text.color = "green";
    }

    draw() {
        background("black")
        for (let i = 0; i < this.text.length; i++) {
            this.text[i].draw();
        }

        this.musicToggle.draw();
        this.sfxToggle.draw();

        if (keyIsDown(KEYS.MENU))
            this.game.setState("MENU");
    }

    mousePressed(){
        this.musicToggle.mousePressed();
        this.sfxToggle.mousePressed();
    }
}