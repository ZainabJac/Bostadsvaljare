(function() {
    window.sunstudy_responsive = {



    listeners: { },

        init: function() {
            var self = this;

            this.listeners.resize = function(e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
            if (document.readyState === "complete") {
           
                $('#loader').addClass('hide');
                $('#sunstudysection').removeClass('hide');
                self.resize();
            } else {
                $(window).on('load', function () {
                    setTimeout(() => {
                  
                        $('#loader').addClass('hide');
                        $('#sunstudysection').removeClass('hide');
                        self.resize();
                    }, 2000);
                });
            }
        
        },

        dispose: function() {
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        resize: function() {
            this._onResize();
        },

        _onResize: function(e) {
            $('#sunstudy-container').height($('.sunstudy').height());
        },
    };
})();

