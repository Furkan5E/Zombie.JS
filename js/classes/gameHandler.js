class GameHandler {
    constructor() {
        this.player = new Player();

        //UI
        this.menu = new MainMenu(this);
        this.gameOver = new GameOver(this);
        this.gameWon = new GameWon(this);
        this.controls = new Controls(this);
        this.gamePlaying = new GamePlaying(this);

        this.chosenState = this.menu;

        this.bulletsArray = [];
        this.zombiesArray = [];

        this.waveNumber = 0;
        this.count = 0;
        this.spawnCooldown = 0;
    }

    draw(){
        this.chosenState.draw();
    }

    mousePressed() {
        this.chosenState.mousePressed();
    }
}