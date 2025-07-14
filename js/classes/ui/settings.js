class Settings {
    constructor(game) {
        this.game = game;

        this.text = [
            new Text(450, 80, 75, "Settings"),
            new Text(450, 535, 37, "Press ESC to return to Main Menu")
        ];
        
        this.musicToggle = new Button(450, 190, 250, 50, 50, "Music: ON", () => {
            this.game.settingsManager.toggleMusic();
            this.buttonStates();
            this.game.audio.playSFX(selectSound);
            this.game.audio.playMusic(backgroundMusic);
        });
        this.sfxToggle = new Button(450, 260, 240, 50, 50, "SFX: ON", () => {
            this.game.settingsManager.toggleSFX();
            this.buttonStates();
            this.game.audio.playSFX(selectSound);
        }); 
        this.buttonStates();

    }
    
    buttonStates(){
        const musicON = this.game.settingsManager.settings.musicON;
        const sfxON = this.game.settingsManager.settings.sfxON;

        this.musicToggle.text.label = musicON ? "Music: ON" : "Music: OFF";
        this.musicToggle.text.color = musicON ? "green" : "red";

        this.sfxToggle.text.label = sfxON ? "SFX: ON" : "SFX: OFF";
        this.sfxToggle.text.color = sfxON ? "green" : "red";
        
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