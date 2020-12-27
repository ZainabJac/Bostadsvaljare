(function () {
    window.mapster_responsive = {
        images: [],
        currentImgInd: 0,
        listeners: {},
        stayInWindow: false,
        margin: {},
        disposed: true,

        initialize: async function (stayInWindow) {
            while (!this.disposed) {
                await util.delay(50);
            }
            var self = this;
            this.stayInWindow = stayInWindow;
            this.listeners.resize = function (e) { self._onResize(e); };
            this.listeners.fullscreenchange = function (e) { self._onFullscreenChange(e); };
            window.addEventListener('resize', this.listeners.resize, false);
            document.addEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            this.disposed = false;
        },

        dispose: function () {
            this.images.length = 0;
            this.currentImgInd = 0;
            this.stayInWindow = false;
            this.margin = {};

            window.removeEventListener('resize', this.listeners.resize, false);
            document.removeEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            this.disposed = true;
        },

        getMargin: function () {
            var image = this.images[this.currentImgInd],
                l = $('#' + image.parentID).offset().left,
                r = $(window).width() - $('#' + image.parentID).width() - l,
                t = $('#' + image.parentID).offset().top,
                b = 0; //TODO: get correct margin-bottom
            return { left: l, right: r, top: t, bottom: b, width: l + r, height: t + b };
        },

        setValues: function (imgInd, parentID, width) {
            var imgEl = $('#' + parentID + ' img');
            this.images[imgInd] = {
                parentID: parentID,
                width: width,
                ratio: imgEl.width() / imgEl.height(),
            };

            if ($.isEmptyObject(this.margin) && imgInd == this.currentImgInd)
                this.margin = this.getMargin();
        },

        changeImage: function (newImageInd) {
            this.currentImgInd = newImageInd;
            this.resize();
        },

        resize: function () {
            if (this.images.length > 0
                && $('#' + this.images[this.currentImgInd].parentID + ' div').length > 0) {
                this._onResize();
            }
        },

        _onFullscreenChange: async function (event) {
            await util.delay(20);
            this.resize();
        },

        _onResize: async function (event) {
            var image = this.images[this.currentImgInd],
                newWidth, newHeight, diff = 1, perc = 1,
                wrapper = $('#' + image.parentID + ' div'),
                areas = $('#' + image.parentID + ' area'),
                n, m, len = areas.length, clen, coords = [],
                windowW = $(window).width() - this.margin.width,
                windowH = $(window).height() - this.margin.height;

            // Wait a little while until the element has a size
            while ($('#' + image.parentID).width() === 0) {
                await util.delay(10);
            }

            if (image.width.slice('-1') == '%')
                perc = parseFloat(image.width) * 0.01;

            if (this.stayInWindow
                && windowH * image.ratio < windowW * perc) {
                newHeight = windowH;
                newWidth = newHeight * image.ratio;
                diff = newWidth / wrapper.width();
            } else {
                if (image.width.slice('-1') == '%') {
                    newWidth = $('#' + image.parentID).width() * perc;
                } else
                    newWidth = parseFloat(image.width);
                newHeight = newWidth / image.ratio;
                diff = newWidth / wrapper.width();
            }

            if (diff !== 1) {
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
            }
        },
    };
})();
