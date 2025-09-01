class GameHandler {
    constructor() {
        //UI
        this.settingsManager = new SettingsManager();
        this.audio = new AudioManager(this.settingsManager);
        this.states = {
            MENU: new MainMenu(this),
            PLAYING: new GamePlaying(this),
            GAME_OVER: new GameOver(this),
            GAME_WON: new GameWon(this),
            CONTROLS: new Controls(this),
            SETTINGS: new Settings(this)
        };

        this.chosenState = this.states.MENU;
    }

    draw() {
        if (this.chosenState === this.states.PLAYING) {
            this.chosenState.update();
        }
        this.chosenState.draw();
    }
    
    setState(newState) {
        if (this.states[newState])
            this.chosenState = this.states[newState];
        else 
            console.error(newState + " state doesn't exist");
    }

    mousePressed() {
        this.chosenState.mousePressed();
    }
}