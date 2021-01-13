
(function () {
    window.lgh_lista = {
        images: [],
        imageMaps: [],
        listeners: {},


        init: function () {
            var self = this;
            this.listeners.resize = function (e) { self.resizeComplete(e); };
            window.addEventListener('resize', this.listeners.resize, false);

        },

        focuslistitem: function (housenumber) {

            let idlist = 'list' + `${housenumber}`;

            $('#' + `${idlist}`).addClass('focus');

        },

        removefocuslistitem: function (housenumber) {

            let idlist = 'list' + `${housenumber}`
            $('#' + `${idlist}`).removeClass('focus');

        },
    


        loadImages: async function (data) {
            var self = this,
                imagesLoaded = data.length,
                onLoadImg = function () { imagesLoaded = imagesLoaded - 1; };
            // Load images that use image maps every time
            // TODO: fix so it's not neccessary to load every time;
            //       some bug causes only some image maps to load otherwise
            data.forEach((view, i) => {
                var img = new Image();
                img.onload = onLoadImg;
                img.id = 'house-main-' + i + '-img';
                img.src = view.source;
                $(img).attr('view', i);
                self.imageMaps.push({
                    img: img,
                    parentID: 'house-main-' + i,
                    usemap: '#house-map-' + i,
                    style: { width: '99.99%' },
                });

                //img = img.cloneNode();
                img = $("#abc" + i);
                //$(img).addClass('gallery-img');
                //$(img).on('click', e => self._onClickGalleryImg(e, i));
                self.images.push({
                    img: img,
                    parentID: 'gallery-item-' + i,
                });
            });

         
            return true;
        },

        applyImages: async function () {
            var data;

            //for (data of this.images) {
            //    // Remove any style that may have been added previously
            //    $(data.img).removeAttr('style');
            //    // Add img element
            //    $('#'+ data.parentID).append(data.img);
            //}

            for (data of this.imageMaps) {
                // Reset any style that may have been added previously,
                // and add in our own
                $(data.img).removeAttr('style');
                $(data.img).css(data.style);
                // Add img element
                $('#'+ data.parentID).append(data.img);
                // Add image map functionality
                $('#'+ data.img.id).attr('usemap', data.usemap);
                this._loadIM(data.img, data.style.width);
            }

          
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
            this.images.length = 0;
            this.imageMaps.length = 0;
        },
    };
})();
