(function () {
    window.bv = {
        isFullscreen: false,
        listeners: {},

        initialize: function () {
            var self = this;

            this.listeners.toggleFullscreen = function() { self.toggleFullscreen(); };

            $('#bv-fullscreen-btn').on('click', this.listeners.toggleFullscreen);
        },

        toggleFullscreen: function () {
            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen)
                util.openFullscreen();
            else
                util.closeFullscreen();
        },
    };
})();
