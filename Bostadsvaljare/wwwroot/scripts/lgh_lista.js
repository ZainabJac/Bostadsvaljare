(function () {
    window.lgh_lista = {
        images: [],
        listeners: {},


        init: function () {
            var self = this;
            this.listeners.resize = function (e) { self.resizeComplete(e); };
            window.addEventListener('resize', this.listeners.resize, false);
        },

        loadImages: async function (data) {
            var self = this,
                img, view, i = 0;

            for (view of data) {
                let _i = i;
                img = await image_loader.loadImage(view.source);
                img.id = 'house-main-'+ i +'-img';
                $(img).attr('view', i);
                this.images.push({
                    img: img,
                    parentID: 'house-main-'+ i,
                    usemap: '#house-map-'+ i,
                    style: { width: '99.99%' },
                });

                img = await image_loader.loadImage(view.source);
                $(img).addClass('gallery-img');
                $(img).on('click', e => self._onClickGalleryImg(e, _i));
                this.images.push({
                    img: img,
                    parentID: 'gallery-item-'+ i,
                });

                i = i + 1;
            }

            return true;
        },

        applyImages: async function () {
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
                    this._loadIM(data.img, data.style.width);
                }
            }
            await util.delay(100);
        },

        _loadIM: function (img, imgWidth) {
            var view = $(img).attr('view'),
                imgWidth = imgWidth || $(img).css('width'),
                parentID = 'house-main-' + view,
                imgID = parentID + '-img',
                mapName = 'house-map-' + view;
           

            mapster_responsive.setValues(parseInt(view), parentID, imgWidth);
            mapster.addMapHighlights(parentID, imgID, mapName);
        },

        resizeComplete: function () {
            var height = $('#gallerybox').height();
            $('#GridResize').height(height + 'px');
        },

        _onClickGalleryImg: function (event, ind) {
            DotNet.invokeMethodAsync('Bostadsvaljare', 'ChangeLghView', ind)
                .then(_resp => {
                    mapster_responsive.changeImage(ind);
                });

        },

        dispose: function () {
            window.removeEventListener('resize', this.listeners.resize, false);
            mapster.dispose();
            this.images.length = 0;
        },
    };
})();
