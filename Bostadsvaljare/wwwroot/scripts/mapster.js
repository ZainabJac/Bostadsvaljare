﻿(function () {
    window.mapster = {
        addMapHighlights: function (parentID, imgID, mapID, classList, highlightOpacity, selectOpacity) {
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
            if (highlightOpacity)
                options.render_highlight = { fillOpacity: highlightOpacity };

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
                        var areaOpt = {
                            key: status + statuses[status],
                            fillColor: colors[status],
                        };
                        if (selectOpacity)
                            areaOpt.render_select = { fillOpacity: selectOpacity };
                        options.areas.push(areaOpt);
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

        selectAll: function () {
            $('area').mapster('select');
        },

        deselect: function () {
            $('area').mapster('deselect');
            //Need to resize mapster twice after this
            mapster_responsive.resize();
            mapster_responsive.resize();
        },
    };
})();
