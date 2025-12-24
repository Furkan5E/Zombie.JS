class Settings {
  constructor(game) {
    this.game = game;
    this.title = new Text(450, 80, 75, "Settings");

    this.backButton = new Button(450, 535, 645, 34, 37, "Press ESC to return to Main Menu", true, () => {
      this.game.setState("MENU");
      this.game.audio.playSFX(selectSound);
    });

    const s = this.game.settingsManager.settings;

    this.musicSlider = new Slider(
      450, 200, 380, 16, 0, 1, s.musicVolume ?? 0.6,
      "Music Volume",
      (v) => {
        this.game.settingsManager.setMusicVolume(v);
        this.game.audio.applyMusicVolume();
      }
    );

    this.sfxSlider = new Slider(
      450, 285, 380, 16, 0, 1, s.sfxVolume ?? 0.7,
      "SFX Volume",
      (v) => {
        this.game.settingsManager.setSfxVolume(v);
        //this.game.audio.playSFX(selectSound);
      }
    );
  }

  draw() {
    background(COLOURS.MENU);
    this.title.draw();
    this.backButton.draw();

    this.musicSlider.draw();
    this.sfxSlider.draw();
       
    if (keyIsDown(KEYS.MENU))
      this.game.setState("MENU");
  }

  mousePressed(){
    this.backButton.mousePressed();
    this.musicSlider.mousePressed();
    this.sfxSlider.mousePressed();
  }

  mouseDragged(){
    this.musicSlider.mouseDragged();
    this.sfxSlider.mouseDragged();
  }

  mouseReleased(){
    this.musicSlider.mouseReleased();
    this.sfxSlider.mouseReleased();
  }
}