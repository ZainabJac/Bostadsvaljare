(function () {
    window.bv = {
        isFullscreen: false,
        listeners: {},

        initialize: function () {
            var self = this;

            this.listeners.fullscreenchange = function(e) { self._onFullscreenChange(e); };
            this.listeners.toggleFullscreen = function() { self.toggleFullscreen(); };

            document.addEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            $('#bv-fullscreen-btn').on('click', this.listeners.toggleFullscreen);
        },

        toggleFullscreen: function () {
            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen)
                util.openFullscreen();
              
            else
                util.closeFullscreen();
  
        },

        _onFullscreenChange: function (e) {
            if (!document.fullscreenElement && !document.webkitIsFullScreen &&
                !document.mozFullScreen && !document.msFullscreenElement) {
                this.isFullscreen = false;
                $('#bv-fullscreen-btn').removeClass("fa-compress-alt");
                $('#bv-fullscreen-btn').addClass("fa-expand-alt");
            } else {
                this.isFullscreen = true;
                $('#bv-fullscreen-btn').removeClass("fa-expand-alt");
                $('#bv-fullscreen-btn').addClass("fa-compress-alt");
            }
        },
    };
})();
