class AudioManager {
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }

    playSFX(sound) {
        if (this.settingsManager.settings.sfxON) {
            sound.play();
        }
    }

    playMusic(music) {
        if (this.settingsManager.settings.musicON) {
            music.loop();
        } else {
            music.pause();
        }
    }
}
