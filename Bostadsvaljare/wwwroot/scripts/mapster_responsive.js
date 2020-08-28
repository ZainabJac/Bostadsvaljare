(function () {
    window.mapster_responsive = {
        images: [],
        currentImgInd: 0,
        listeners: {},

        initilalize: function () {
            var self = this;
            this.listeners.resize = function (e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        dispose: function () {
            this.images.length = 0;
            this.currentImgInd = 0;

            window.removeEventListener('resize', this.listeners.resize, false);
        },

        setValues: function (viewInd, parentID, width) {
            this.images[viewInd] = {
                parentID: parentID,
                width: width,
            };
            this._onResize(undefined);
        },

        changeImage: function (newImageInd) {
            this.currentImgInd = newImageInd;
            this._onResize(undefined);
        },

        _onResize: function (event) {
            var view = this.images[this.currentImgInd],
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
            wrapper.children('.mapster_el').width(newWidth);
            wrapper.children('.mapster_el').height(newHeight);

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
