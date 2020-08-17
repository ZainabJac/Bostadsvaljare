(function () {
    window.mapster = {
        addMapHighlights: function (elementID, imageID, mapID, classList) {
            var colors = {
                available: '5bcb24',
                booked: 'dfd431',
                sold: 'd32626',
            };

            var options = {
                staticState: false,
                fill: true,
                mapKey: 'id',
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
                        area.attributes.id.value = status + statuses[status];
                        options.areas.push({
                            key: status + statuses[status],
                            fillColor: colors[status],
                        });
                        statuses[status] += 1;
                    }

                    this.mapster('rebind', options);

                    this.css({
                        width: '100%',
                    });
                }
            };

            $('#'+ elementID +' #'+ imageID).mapster(initialOptions);
        },

        changeImage: function (elementID, imagePath) {
            $('#'+ elementID +' img.mapster_el')[0].src = imagePath;
        },

        select: function (areaID) {
            $('area#'+ areaID).mapster('select');
        },

        deselect: function () {
            $('area').mapster('deselect');
        },
    };
})();
