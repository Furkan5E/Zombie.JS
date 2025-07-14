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
        if (saved) {
            return JSON.parse(saved);
        }
        else{
            this.saveSettings(this.defaultSettings);
            return this.defaultSettings;
        }
    }

    saveSettings() {
        localStorage.setItem("zombiejs_settings", JSON.stringify(this.settings));
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