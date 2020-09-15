(function () {
    window.bv = {
        fullscreen: false,
        listeners: {},

        initialize: function () {
            var self = this;

            this.listeners.fullscreenchange = function(e) { self._onFullscreenChange(e); };
            this.listeners.toggleFullscreen = function() { self.toggleFullscreen(); };

            document.addEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            $('#bv-fullscreen-btn').on('click', this.listeners.toggleFullscreen);
        },

        toggleFullscreen: function () {
            if (!this.fullscreen)
                util.openFullscreen();
            else
                util.closeFullscreen();
        },

        _onFullscreenChange: function (e) {
            this.fullscreen = !this.fullscreen;
        },
    };
})();
