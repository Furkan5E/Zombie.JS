class SettingsManager {
    constructor(){
        this.defaultSettings = {
            musicVolume: 0.7,
            sfxVolume: 0.6
        }

        //load settings if available
        this.settings = this.loadSettings();
    }

    loadSettings(){
        const saved = localStorage.getItem("zombiejs_settings");
        if (saved && saved !== "undefined"){
            try {
                return JSON.parse(saved);
            }
            catch (error){
                console.warn("Error: ", error);
                return {...this.defaultSettings};
            }
        }
        else{
            return {...this.defaultSettings};
        }
    }

    saveSettings() {
        if (this.settings) {
            localStorage.setItem("zombiejs_settings", JSON.stringify(this.settings));
        }
    }

    setMusicVolume(vol) {
        this.settings.musicVolume = constrain(vol, 0, 1);
        this.saveSettings();
    }

    setSfxVolume(vol) {
        this.settings.sfxVolume = constrain(vol, 0,1);
        this.saveSettings();
    }
}