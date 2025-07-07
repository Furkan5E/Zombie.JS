class AudioManger {
    constructor(){
        this.sfxON = true;
        this.musicON = true;
    }

    playSFX(sound){
        if(this.sfxON) {
            sound.play();
        }
    }

    playMusic(music){
        if(this.musicON) {
            music.loop();
        }
        else{
            music.pause();
        }
    }
}