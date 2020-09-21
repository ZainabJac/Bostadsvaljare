(function () {
    window.interior = {
        images: {},
        imageMaps: [],
        listeners: {},

        addResizeListener: function () {
            var self = this;

            this.listeners.resize = function (e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        loadImages: async function (houseType, data) {
            var self = this,
                imagesLoaded = data.floorplans.length,
                onLoadImg = function () { imagesLoaded = imagesLoaded - 1; };
            // Load images that use image maps every time
            // TODO: fix so it's not neccessary to load every time;
            //       some bug causes only some image maps to load otherwise
            data.floorplans.forEach((floorplan, i) => {
                var img = new Image();
                img.onload = onLoadImg;
                img.id = 'floorplan-' + i + '-img';
                img.src = floorplan.source;
                $(img).attr('floor', i);
                self.imageMaps.push({
                    img: img,
                    parentID: 'floorplan-' + i,
                    usemap: '#hotspots-' + i,
                    style: { width: '99.99%' },
                });
            });

            if (this.images[houseType]) {
                return true;
            }

            var imageData = [];
            imagesLoaded = imagesLoaded + data.images.length;

            data.images.forEach((image, i) => {
                var img = new Image();
                img.onload = onLoadImg;
                img.src = image.source;
                $(img).addClass('gallery-img');
                $(img).on('click', e => self._onClickGalleryImg(e, i));
                imageData.push({
                    img: img,
                    parentID: 'gallery-item-' + i,
                });

                if (image.type === 0) { /* image.type === ImageType.Image */
                    var carouselImg = img.cloneNode();
                    $(carouselImg).removeClass();
                    $(carouselImg).addClass('d-block w-100');
                    $(carouselImg).on('click', e => self._onClickCarousel(e));
                    imageData.push({
                        img: carouselImg,
                        parentID: 'carousel-item-'+ i,
                    });
                }
            });

            this.images[houseType] = imageData;
            while (imagesLoaded > 0) {
                await util.delay(100);
            }
            return true;
        },

        applyImages: function (houseType) {
            var data;

            for (data of this.images[houseType]) {
                // Remove any style that may have been added previously
                $(data.img).removeAttr('style');
                // Add img element
                $('#' + data.parentID).append(data.img);
            }

            for (data of this.imageMaps) {
                // Reset any style that may have been added previously,
                // and add in our own
                $(data.img).removeAttr('style');
                if (data.style)
                    $(data.img).css(data.style);
                // Add img element
                $('#'+ data.parentID).append(data.img);
                // Add image map functionality
                $('#'+ data.img.id).attr('usemap', data.usemap);
                this._loadFloorplan(data.img);
            }
        },

        dispose: function () {
            mapster.dispose();
            this.imageMaps.length = 0;
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        resize: function () {
            this._onResize();
        },

        _loadFloorplan: async function (img) {
            var floor = $(img).attr('floor'),
                imgWidth = $(img).css('width'),
                parentID = 'floorplan-' + floor;

            mapster_responsive.setValues(parseInt(floor), parentID, imgWidth);
            mapster.addMapHighlights(parentID, parentID +'-img', 'hotspots-'+ floor, '', 0.6, 0.9);
            await util.delay(100);
            mapster.selectAll();
        },

        _onClickCarousel: function (event) {
            var self = this;
            $('.fs-border img').remove();
            var img = $(event.target).clone();
            img.removeClass();
            img.css({ width: '100%' });
            img.appendTo('.fs-border');
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ShowImage')
                .then(_data => { self._onResize(); });
        },

        _onClickGalleryImg: function (event, ind) {
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ChangeRoom', ind);
        },

        _onResize: function (event) {
            if ($(window).width() <= 927) {
                var height = parseInt($('.planritning').height());
                $('#gallery').height((height + 3) + 'px');
            } else {
                $('#gallery').height('100%');
            }

            var height = Math.max($('.fs-border').height() + 97, $(window).height());
            $('.fs-bg').height(height);
        },
    };
})();
