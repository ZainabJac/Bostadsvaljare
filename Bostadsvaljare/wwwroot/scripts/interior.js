(function () {
    window.interior = {
        images: [],
        listeners: {},
        imageType: {
            image: 0,
            panorama: 1,
            vr: 2,
            roundme: 3,
        },


        hidecolorpicker: function () {
            if ($(houseinputid).val() == 99) {
                $(colorpick).removeClass("colorpickermenu")
                $(colorpick).addClass("colorpickermenu2")
                $(colorpickslink).addClass("animate__animated animate__bounce")
            }
        },

        adjustpan: function () {
            var width = parseInt($('#carousel-item-0').width());
            width = width * 0.75;

            $('.iframe-container iframe').height(width + 'px');
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
                img.id = 'floorplan-'+ i +'-img';
                $(img).attr('floor', i);
                this.images.push({
                    img: img,
                    parentID: 'floorplan-'+ i,
                    usemap: '#hotspots-'+ i,
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
                    parentID: 'gallery-item-'+ i,
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
            var img = util.getImgElement(newImage.source, '#gallery');
            bstrap.carousel_changeImage(parseInt($(img).attr('c_ind')));
        },

        _loadFloorplan: async function (img, imgWidth) {
            var floor = $(img).attr('floor'),
                imgWidth = imgWidth || $(img).css('width'),
                parentID = 'floorplan-' + floor;

            mapster_responsive.setValues(parseInt(floor), parentID, imgWidth);
            mapster.addMapHighlights(parentID, parentID +'-img', 'hotspots-'+ floor, '', 0.6, 0.9);
            await util.delay(100);
            mapster.selectAll();

            var height1 = parseInt($('.planritning').height());
            var height2 = parseInt($('#gallery').height());
            var height3 = parseInt($('#info').height());

            var height4 = height3 + height2 + height1 + 60;

            $('.iframe-container iframe').height(height4 + 'px');
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
            var self = this;
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ChangeRoom', ind)
                .then(r => {
                    self.changeRoom(r[0], r[1]);
                });
        },

        _onResize: function (event) {
            if ($(window).width() <= 927) {
                var height = parseInt($('.planritning').height());
                $('#gallery').height((height + 3) + 'px');
                $('#info').height('auto')
            }
            else if ($(window).width() <= 1380) {
                var height1 = parseInt($('.planritning').height());
                var height2 = parseInt($('#gallery').height());
                var height3 = parseInt($('#slideshow').height());

                var height4 = height3 - height2 - height1 - 35;

                $('#info').height(height4 + 'px');
                var width1 = parseInt($('#carousel-item-0').width());
                width1 = width1 * 0.75
                $('.iframe-container iframe').height(width1 + 'px');
            }
            else {
                var width1 = parseInt($('#carousel-item-0').width());
                width1 = width1 * 0.75
                $('.iframe-container iframe').height(width1 + 'px');

                var height1 = parseInt($('.planritning').height());
                var height2 = parseInt($('#gallery').height());
                var height3 = parseInt($('#slideshow').height());
                var height4 = height3 - height2 - height1 - 57;
                $('#gallery').height('auto');
                $('#info').height(height4 + 'px');
            }

            var height = Math.max($('.fs-border').height() + 97, $(window).height());
            $('.fs-bg').height(height);
        },
    };
})();
