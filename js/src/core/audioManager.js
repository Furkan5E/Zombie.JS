class AudioManager {
  constructor(settingsManager) {
    this.settingsManager = settingsManager;

    this.tracks = {
      MENU: menuTheme,
      GAME: gameTheme,
    };

    this.currentMusicKey = null;
    this.currentMusic = null;
  }

  playSFX(sound) {
    if (this.settingsManager.settings.sfxON) {
      sound.play();
    }
  }

  setMusic(key) {
    if (this.currentMusicKey === key){ //already on this track
      this.playMusic();
      return;
    }

    if (this.currentMusic){ // stop old track
      this.currentMusic.stop()
    }

    // set new track
    this.currentMusicKey = key;
    this.currentMusic = this.tracks[key];
    this.playMusic();
  }

  playMusic() {
    if (!this.currentMusic)
        return;
    if (this.settingsManager.settings.musicON) {
        if(!this.currentMusic.isPlaying || !this.currentMusic.isPlaying()){
            this.currentMusic.loop();
        }
    }
    else{
      this.currentMusic.pause();
    }
  }
}
