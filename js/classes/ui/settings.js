class Settings {
    constructor(game){
        this.game = game;
        this.musicOn = true;
        this.sfxON = true;

        this.text = [
            new Text(450, 80, 75, "Settings"),
            new Text(450, 535, 37, "Press ESC to return to Main Menu")
        ];
        
        this.musicToggle = new Button(450, 190, 250, 50, 50, "Music: ON ", () => {
            this.musicOn = !this.musicOn;
            this.musicToggle.text.label = this.musicOn ? "Music: ON " : "Music: OFF";
            this.musicToggle.text.color = this.musicOn ? "green" : "red";
            this.playMusic(backgroundMusic);
            this.playSFX(selectSound);
        })
        this.sfxToggle = new Button(450, 260, 240, 50, 50, "SFX: ON ", () => {
            this.sfxON = !this.sfxON;
            this.sfxToggle.text.label = this.sfxON ? "SFX: ON " : "SFX: OFF";
            this.sfxToggle.text.color = this.sfxON ? "green" : "red";
            this.playSFX(selectSound);
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

    playSFX(sound){
        if(this.sfxON) {
            sound.play();
        }
    }

    playMusic(music){
        if(this.musicOn) {
            music.loop();
        }
        else{
            music.pause();
        }
    }
}