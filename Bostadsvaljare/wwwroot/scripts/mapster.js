(function () {
    window.mapster = {
        addMapHighlights: function () {
            var colors = {
                available: '5bcb24',
                booked: 'dfd431',
                sold: 'd32626',
            };

            var options = {
                staticState: false,
                fill: true,
                mapKey: 'status',
                wrapClass: 'center',
            };

            var initialOptions = options;
            initialOptions.onConfigured = function (success) {
                if (success) {
                    var statuses = { available: 0, booked: 0, sold: 0 };
                    options.areas = [];

                    var mapAreas = $('#housing_map')[0].areas
                    for (var i = 0; i < mapAreas.length; i++) {
                        var area = mapAreas[i];
                        var status = area.attributes.status.value;
                        area.attributes.status.value = status + statuses[status];
                        options.areas.push({
                            key: status + statuses[status],
                            fillColor: colors[status],
                        });
                        console.log(status + statuses[status]);
                        statuses[status] += 1;
                    }

                    this.mapster('rebind', options);

                    this.css({
                        width: '100%',
                    });
                }
            };

            $('#overview').mapster(initialOptions);
        },

        changeMapImage: function (imagePath) {
            $('img.mapster_el')[0].src = imagePath;
        },
    };
})();
