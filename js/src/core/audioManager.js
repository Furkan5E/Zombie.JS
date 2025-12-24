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
    const sfxVol = this.settingsManager.settings.sfxVolume ?? 1;
    if (sfxVol <= 0)
      return;

    if (sound.setVolume)
      sound.setVolume(sfxVol);
    sound.play();
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

    const vol = this.settingsManager.settings.musicVolume;

    // volume 0 = mute
    if (vol <= 0) {
      this.currentMusic.pause();
      return;
    }

    this.currentMusic.setVolume(vol);

    //loop if not already playing
    if (!this.currentMusic.isPlaying || !this.currentMusic.isPlaying()) {
      this.currentMusic.loop();
    }
  }

  applyMusicVolume() {
    if (!this.currentMusic)
      return;
    const vol = this.settingsManager.settings.musicVolume;
    //mute
    if (vol <= 0) {
      this.currentMusic.pause();
      return;
    }
    this.currentMusic.setVolume(vol);
    if (!this.currentMusic.isPlaying || !this.currentMusic.isPlaying()) {
      this.currentMusic.loop();
    }
  }
}