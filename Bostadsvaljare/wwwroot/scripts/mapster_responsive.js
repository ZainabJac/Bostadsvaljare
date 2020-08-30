(function () {
    window.mapster_responsive = {
        images: [],
        currentImgInd: 0,
        listeners: {},
        stayInWindow: false,

        initialize: function (stayInView) {
            var self = this;
            this.stayInWindow = stayInView;
            this.listeners.resize = function (e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        dispose: function () {
            this.images.length = 0;
            this.currentImgInd = 0;
            this.stayInWindow = false;

            window.removeEventListener('resize', this.listeners.resize, false);
        },

        getMargin: function () {
            var image = this.images[this.currentImgInd],
                l = $('#'+ image.parentID).offset().left,
                r = $(window).width() - $('#'+ image.parentID).width() - l,
                t = $('#'+ image.parentID).offset().top,
                b = 0; //TODO: get correct margin-bottom
            return { left: l, right: r, top: t, bottom: b, width: l + r, height: t + b };
        },

        setValues: function (imgInd, parentID, width) {
            this.images[imgInd] = {
                parentID: parentID,
                width: width,
            };
        },

        changeImage: function (newImageInd) {
            this.currentImgInd = newImageInd;
            this._onResize(undefined);
        },

        resize: function () {
            if (images.length > 0)
                this._onResize(undefined);
        },

        _onResize: function (event) {
            var image = this.images[this.currentImgInd],
                newWidth, newHeight, diff = 1, perc = 1,
                wrapper = $('#'+ image.parentID +' div'),
                areas = $('#'+ image.parentID +' area'),
                n, m, clen, len = areas.length,
                coords = [], margin = this.getMargin(),
                windowW = $(window).width() - margin.width,
                windowH = $(window).height() - margin.height;

            if (image.width.slice('-1') == '%')
                perc = parseFloat(image.width) * 0.01;

            if (this.stayInWindow
            &&  windowH * 3 < windowW * 2 * (perc + (1-perc)*0.5)
            &&  wrapper.height() !== windowH) {
                newHeight = windowH;
                diff = newHeight / wrapper.height();
                newWidth = wrapper.width() * diff;
            } else {
                if (image.width.slice('-1') == '%')
                    newWidth = $('#'+ image.parentID).parent().width() * perc;
                else
                    newWidth = parseFloat(image.width);
                diff = newWidth / wrapper.width();
                newHeight = wrapper.height() * diff;
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
