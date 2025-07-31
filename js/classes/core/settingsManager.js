class SettingsManager {
    constructor(){
        this.defaultSettings = {
            sfxON: true,
            musicON: true
        }

        //load settings if available
        this.settings = this.loadSettings();
    }

    loadSettings(){
        const saved = localStorage.getItem("zombiejs_settings");
        if (saved && saved !== 'undefined') {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.warn("Error: ", error);
                return { ...this.defaultSettings };
            }
        }
        else{
            return { ...this.defaultSettings };
        }
    }

    saveSettings() {
        if (this.settings) {
            localStorage.setItem("zombiejs_settings", JSON.stringify(this.settings));
        }
    }

    toggleMusic() {
        this.settings.musicON = !this.settings.musicON;
        this.saveSettings();
    }

    toggleSFX() {
        this.settings.sfxON = !this.settings.sfxON;
        this.saveSettings();
    }
}