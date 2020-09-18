(function () {
    window.interior = {
        imageData: [],
        listeners: {},

        addResizeListener: function () {
            var self = this;

            this.listeners.resize = function (e) { self._onResize(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        loadImages: async function (data) {
            var self = this,
                imagesLoaded = data.images.length + data.floorplans.length,
                onLoadImg = function () { imagesLoaded = imagesLoaded - 1; };

            data.images.forEach((image, i) => {
                var img = new Image();
                img.onload = onLoadImg;
                img.src = image.source;
                $(img).addClass('gallery-img');
                $(img).on('click', e => self._onClickGalleryImg(e, i));
                self.imageData.push({
                    img: img,
                    parentID: 'gallery-item-' + i,
                    type: image.type,
                });

                if (image.type === 0) { /* image.type === ImageType.Image */
                    var carouselImg = img.cloneNode();
                    $(carouselImg).removeClass();
                    $(carouselImg).addClass('d-block w-100');
                    $(carouselImg).on('click', e => self._onClickCarousel(e));
                    self.imageData.push({
                        img: carouselImg,
                        parentID: 'carousel-item-'+ i,
                    });
                }
            });
            data.floorplans.forEach((floorplan, i) => {
                var img = new Image();
                img.onload = onLoadImg;
                img.id = 'floorplan-'+ i +'-img';
                img.src = floorplan.source;
                $(img).css({ width: '99.99%' });
                $(img).attr('floor', i);
                self.imageData.push({
                    img: img,
                    parentID: 'floorplan-'+ i,
                    usemap: '#hotspots-'+ i,
                });
            });

            while (imagesLoaded > 0) {
                await util.delay(100);
            }
            return true;
        },

        applyImages: function () {
            for (var data of this.imageData) {
                $('#'+ data.parentID).append(data.img);
                if (data.usemap) {
                    var id = '#'+ data.img.id;
                    $(id).attr('usemap', data.usemap);
                    this._loadFloorplan(data.img);
                }
            }
        },

        dispose: function () {
            this.imageData.length = 0;
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        resize: function () {
            this._onResize();
        },

        _loadFloorplan: async function (img) {
            var floor = $(img).attr('floor'),
                imgWidth = $(img).css('width');
                parentID = 'floorplan-' + floor;

            mapster_responsive.setValues(floor, parentID, imgWidth);
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
