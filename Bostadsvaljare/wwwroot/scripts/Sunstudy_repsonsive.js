(function() {
    window.sunstudy_responsive = {



    listeners: { },

        init: function() {
            var self = this;

            this.listeners.resize = function(e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
            if (document.readyState === "complete") {
                $('#1-2')[0].load();
                $('#2-3')[0].load();
                $('#3-4')[0].load();
                $('#4-5')[0].load();
                $('#2-1')[0].load();
                $('#3-2')[0].load();
                $('#4-3')[0].load();
                $('#5-4')[0].load();

                setTimeout(() => {
             
                    $('#loader').addClass('hide');
                    $('#sunstudysection').removeClass('hide');
                    self.resize();
                }, 5000);

              
               
            } else {
                $(window).on('load', function () {

                    $('#1-2')[0].load();
                    $('#2-3')[0].load();
                    $('#3-4')[0].load();
                    $('#4-5')[0].load();
                    $('#2-1')[0].load();
                    $('#3-2')[0].load();
                    $('#4-3')[0].load();
                    $('#5-4')[0].load();
                    setTimeout(() => {
                     
                        $('#loader').addClass('hide');
                        $('#sunstudysection').removeClass('hide');
                        self.resize();
                    }, 5000);

                  
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

