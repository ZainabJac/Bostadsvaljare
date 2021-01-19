(function () {
    window.colorpicker = {
        images: {},
        imageMaps: [],
        listeners: {},
        imageType: {
            image: 0,
            panorama: 1,
            vr: 2,
            roundme: 3,
        },



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

            var ind = 0;
            data.images.forEach((image, i) => {
                var img = new Image(), _ind = ind;
                img.onload = onLoadImg;
                img.src = image.thumbnail;
                $(img).addClass('gallery-img-colorpicker');
                $(img).on('click', e => self._onClickGalleryImg(e, i));
                if (image.type === this.imageType.image) {
                    $(img).attr('c_ind', _ind);
                    ind = ind + 1;
                }
                imageData.push({
                    img: img,
                    parentID: 'gallery-item-colorpicker-' + i,
                });

                if (image.type === this.imageType.image) {
                    var carouselImg = new Image(), _ind = ind;
                    carouselImg.onload = onLoadImg;
                    carouselImg.src = image.source;
                    $(carouselImg).removeClass();
                    $(carouselImg).addClass('d-block w-100');
                    $(carouselImg).on('click', e => self._onClickCarousel(e));
                    imageData.push({
                        img: carouselImg,
                        parentID: 'carousel-item-colorpicker-' + i,
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

            //for (data of this.images[houseType]) {
            //    // Remove any style that may have been added previously
            //    $(data.img).removeAttr('style');
            //    // Add img element
            //    $('#' + data.parentID).append(data.img);
            //}

            
        },

        dispose: function () {
            mapster.dispose();
            this.imageMaps.length = 0;
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        resize: function () {
            this._onResize();
        },

        changeRoom: function (oldImage, newImage) {

            if (oldImage.type === this.imageType.panorama &&
                newImage.type !== this.imageType.panorama) {
                var img = util.getImgElement(newImage.source, '#gallery');
                bstrap.carousel_changeImage(parseInt($(img).attr('c_ind')));
            }

            if (newImage.type === this.imageType.image) {
                var img = util.getImgElement(newImage.source, '#gallery');
                bstrap.carousel_changeImage(parseInt($(img).attr('c_ind')));
            }

            else {
                var img = util.getImgElement(newImage.source, '#gallery');
                bstrap.carousel_changeImage(parseInt($(img).attr('c_ind')));
            }
        },

        _loadFloorplan: async function (img, imgWidth) {
            var floor = $(img).attr('floor'),
                imgWidth = imgWidth || $(img).css('width'),
                parentID = 'floorplan-' + floor;

            mapster_responsive.setValues(parseInt(floor), parentID, imgWidth);
            mapster.addMapHighlights(parentID, parentID + '-img', 'hotspots-' + floor, '', 0.6, 0.9);
            await util.delay(100);
            mapster.selectAll();
        },

        _onClickCarousel: function (event) {
            var self = this;
            $('.fs-border img').remove();
            var img = $(event.target).clone();
            img.removeClass();
            img.css({ width: '100%' });
            img.appendTo('.fs-border-colorpicker');
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ShowImages')
                .then(_data => { self._onResize(); });
        },

        _onClickGalleryImg: function (event, ind) {
            var self = this;
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ChangeRooms', ind)
                .then(r => {
                    self.changeRoom(r[0], r[1]);
                });
        },

        _onResize: function (event) {
            if ($(window).width() >= 995) {
                var height = parseInt($('#gallery-carousel').height());
                $('#gallery').height((height + 3) + 'px');
            } else {
                $('#gallery').height('auto');
            }

            var height = Math.max($('.fs-border').height() + 97, $(window).height());
            $('.fs-bg').height(height);
        },
    };
})();