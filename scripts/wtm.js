var WTM = {
    defaults: {
        proximity_radius: 5000,
        proximity_sound_file: chrome.extension.getURL('sounds/chirp.ogg'),
        units: 'meters',
        alert_volume: 0.15,
        plane_icon_size: 25,
        base_url: 'http://localhost:8111/',
        map_center: 1,
        map_scale: 60
    },
    settings: {},
    update: function() {
        var settings = this.settings;
        $.each(this.defaults, function(key, value) {
            var result = localStorage[key] || value;
            if (typeof value === 'number') {
                result = parseFloat(result, 10);
            } else {
                result = result.trim();
            }
            settings[key] = result;
        });
        
        settings.base_url = settings.base_url.replace(/\/+$/, '') + '/';
        if (!/https?:\/\//.test(settings.base_url)) {
            settings.base_url = 'http://' + settings.base_url;
        }
    },
    icons: {
        a: 0.92,
        b: 1.08,
        c: 0.96
    },
    play_sound: function(url, volume) {
        var audio = new Audio(url);
        audio.volume = volume;
        audio.play();
    },
    conversion: {
        'meters': 1,
        'feet': 3.28084,
        'mi': 0.000621371,
        'km': 0.001,
        'nmi': 0.000539957
    },
    m2x: function(m, x) {
        return m * this.conversion[x];
    },
    x2m: function(m, x) {
        return m / this.conversion[x];
    }
};

WTM.update();