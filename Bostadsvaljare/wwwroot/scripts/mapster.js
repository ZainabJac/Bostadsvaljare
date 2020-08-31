(function () {
    window.mapster = {
        addMapHighlights: function (parentID, imgID, mapID, classList) {
            var colors = {
                available: '5bcb24',
                booked: 'dfd431',
                sold: 'd32626',
                interior: 'd3F8E1',
                interior2: 'd3F8E1'

            };

            var options = {
                staticState: false,
                fill: true,
                mapKey: 'status',
                scaleMap: true,
            };
            if (classList !== "")
                options.wrapClass = classList;

            var initialOptions = { ...options };
            initialOptions.onConfigured = function (success) {
                if (success) {
                    var statuses = { available: 0, booked: 0, sold: 0 };
                    options.areas = [];

                    var mapAreas = $('#'+ mapID)[0].areas
                    for (var i = 0; i < mapAreas.length; i++) {
                        var area = mapAreas[i];
                        var status = area.attributes.id.value;
                        area.attributes.status.value = status + statuses[status];
                        options.areas.push({
                            key: status + statuses[status],
                            fillColor: colors[status],
                        });
                        statuses[status] += 1;
                    }

                    this.mapster('rebind', options);

                    this.css({
                        width: '100%',
                        height: '100%',
                    });

                    mapster_responsive.resize();
                }
            };

            $('#'+ parentID +' #'+ imgID).mapster(initialOptions);
        },

        changeImage: function (parentID, imagePath) {
            $('#'+ parentID +' img.mapster_el')[0].src = imagePath;
        },

        select: function (parentID, imgID, statusKey) {
            $('#'+ parentID +' #'+ imgID).mapster('highlight', statusKey);
        },

        deselect: function () {
            $('area').mapster('deselect');
        },
    };
})();
