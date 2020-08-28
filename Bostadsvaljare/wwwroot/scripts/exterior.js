(function () {
    window.exterior = {
        views: [],
        currentView: 0,
        listeners: {},
        resizeTimeout: null,

        initilalize: function () {
            var self = this;
            this.listeners.resize = function (e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        dispose: function () {
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        setValues: function (viewInd, parentID, width) {
            this.views[viewInd] = {
                parentID: parentID,
                width: width,
            };
            this._onResize();
        },

        changeView: function (newView) {
            this.currentView = newView;
            this._onResize(undefined);
        },

        _onResize: function (event) {
            var view = this.views[this.currentView],
                newWidth = 1200, newHeight, diff,
                wrapper = $('#'+ view.parentID +' div'),
                areas = $('#'+ view.parentID +' area'),
                n, m, clen, len = areas.length,
                coords = [];

            switch (view.width.slice(-1)) {
                case '%':
                    // Percentage
                    var perc = parseFloat(view.width) / 100;
                    newWidth = $(window).width() * perc;
                    break;
                case 'x':
                    // Pixels
                    newWidth = parseFloat(view.width);
                    break;
            }
            diff = newWidth / wrapper.width();
            newHeight = wrapper.height() * diff;

            wrapper.width(newWidth);
            wrapper.height(newHeight);
            wrapper.children('img.mapster_el').width(newWidth);
            wrapper.children('img.mapster_el').height(newHeight);
            wrapper.children('canvas').width(newWidth);
            wrapper.children('canvas').height(newHeight);

            for (n = 0; n < len; n++) {
                coords[n] = areas[n].coords.split(',');
            }
            for (n = 0; n < len; n++) {
                clen = coords[n].length;
                for (m = 0; m < clen; m++) {
                    coords[n][m] *= diff;
                }
                areas[n].coords = coords[n].join(',');
            }
        },
    };
})();
