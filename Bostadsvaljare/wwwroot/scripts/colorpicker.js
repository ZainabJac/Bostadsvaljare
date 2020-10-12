(function () {
    window.colorpicker = {
        images: [],
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

        loadImages: async function (data) {
            var self = this, img,
                floorplan, i = 0;

            // Load floorplan images
            for (floorplan of data.floorplans) {
                img = await image_loader.loadImage(floorplan.source);
                img.id = 'floorplan-' + i + '-img';
                $(img).attr('floor', i);
                this.images.push({
                    img: img,
                    parentID: 'floorplan-' + i,
                    usemap: '#hotspots-' + i,
                    style: { width: '99.99%' },
                });
                i = i + 1;
            }

            // Load gallery/carousel images
            var image, i = 0, c_ind = 0;
            for (image of data.images) {
                let _i = i, _c_ind = c_ind;

                img = await image_loader.loadImage(image.source);
                $(img).addClass('gallery-img');
                $(img).on('click', e => self._onClickGalleryImg(e, _i));
                if (image.type === this.imageType.image) {
                    $(img).attr('c_ind', _c_ind);
                    c_ind = c_ind + 1;
                }
                this.images.push({
                    img: img,
                    parentID: 'gallery-item-' + i,
                });

                if (image.type === this.imageType.image) {
                    img = await image_loader.loadImage(image.source);
                    $(img).addClass('d-block w-100');
                    $(img).on('click', e => self._onClickCarousel(e));
                    this.images.push({
                        img: img,
                        parentID: 'carousel-item-'+ i,
                    });
                }
                i = i + 1;
            }

            return true;
        },

        applyImages: function (houseType) {
            var data;

            for (data of this.images) {
                // Reset any style that may have been added previously,
                // and add in our own
                $(data.img).removeAttr('style');
                if (data.style)
                    $(data.img).css(data.style);
                // Add img element
                $('#'+ data.parentID).append(data.img);
                // Add image map functionality
                if (data.usemap) {
                    $('#'+ data.img.id).attr('usemap', data.usemap);
                    this._loadFloorplan(data.img, data.style.width);
                }
            }
        },

        dispose: function () {
            mapster.dispose();
            this.images.length = 0;
            window.removeEventListener('resize', this.listeners.resize, false);
        },

        resize: function () {
            this._onResize();
        },

        changeRoom: function (oldImage, newImage) {
            if (oldImage.type === this.imageType.panorama &&
                newImage.type !== this.imageType.panorama)
                pan_viewer.softDispose();

            if (newImage.type === this.imageType.image) {
                var img = util.getImgElement(newImage.source, '#gallery');
                bstrap.carousel_changeImage(parseInt($(img).attr('c_ind')));
            }
            else if (newImage.type === this.imageType.panorama) {
                if (oldImage.type === this.imageType.panorama)
                    pan_viewer.changeRoom(newImage.roomName);
                else
                    pan_viewer.start(newImage.link, newImage.roomName);
            }
        },

        _loadFloorplan: async function (img, imgWidth) {
            var floor = $(img).attr('floor'),
                imgWidth = imgWidth || $(img).css('width'),
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
            DotNet.invokeMethodAsync('Bostadsvaljare', 'CP_ShowImage')
                .then(_data => { self._onResize(); });
        },

        _onClickGalleryImg: function (event, ind) {
            var self = this;
            DotNet.invokeMethodAsync('Bostadsvaljare', 'CP_ChangeRoom', ind)
                .then(r => {
                    self.changeRoom(r[0], r[1]);
                });
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
