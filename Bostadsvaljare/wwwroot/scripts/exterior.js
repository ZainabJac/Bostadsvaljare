﻿(function () {
    window.exterior = {
        images: [],
        mapIndex: {},

        loadImages: async function (data) {
            var img, name, i = 0;

            for (view of data.views) {
                for (name in view.sunStudies) {
                    img = await image_loader.loadImage(view.sunStudies[name]);
                    img.id = data.studyID + '-' + i + '-' + name + '-img';
                    $(img).attr({
                        view: i,
                        'sun-study': name,
                    });
                    this.images.push({
                        img: img,
                        parentID: '#' + data.parentID + '-' + i + ' #sun-study-' + name,
                        usemap: '#' + data.imageMapName + '-' + i + '-' + name,
                        style: { width: '99%' },
                    });
                }
                i = i + 1;
            }

            var view, ind = 0;
            for (view in data.views) {
                for (name in data.views[view].sunStudies) {
                    this.mapIndex[name + view] = ind++;
                }
            }

            return true;
        },

        applyImages: async function () {
            var data;

            for (data of this.images) {
                // Reset any style that may have been added previously,
                // and add in our own
                $(data.img).removeAttr('style');
                $(data.img).css(data.style);
                // Add img element
                $(data.parentID).append(data.img);
                // Add image map functionality
                $('#' + data.img.id).attr('usemap', data.usemap);
                this._loadIM(data.img, data.style.width);
            }
            await util.delay(100);
            // Internally, change image to what is displayed at page start
            this.changeImage(0, 'midday');
        },

        changeImage: function (view, sunStudy) {
            mapster_responsive.changeImage(this.mapIndex[sunStudy + view]);
        },

        _loadIM: function (img, imgWidth) {
            var view = $(img).attr('view'),
                sunStudy = $(img).attr('sun-study'),
                imgWidth = imgWidth || $(img).css('width'),
                parentID = 'view-' + view + ' #sun-study-' + sunStudy,
                imgID = 'sun-study-' + view + '-' + sunStudy + '-img',
                mapName = 'houses-' + view + '-' + sunStudy;

            mapster_responsive.setValues(this.mapIndex[sunStudy + view], parentID, imgWidth);
            mapster.addMapHighlights(parentID, imgID, mapName, 'center');
        },

        dispose: function () {
            mapster.dispose();
            this.images.length = 0;
        },
    };
})();
