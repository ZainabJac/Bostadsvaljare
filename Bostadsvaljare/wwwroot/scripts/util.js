var elem = document.documentElement;

(function () {
    window.util = {
        /* View in fullscreen */
        openFullscreen: function () {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        },

        /* Close fullscreen */
        closeFullscreen: function () {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        },

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

        showTooltip: function (positionX, positionY, msg) {
            var tooltip = $('#tipmsg');
            tooltip.text(msg);
            tooltip.css({
                top: positionY,
                left: positionX,
            }).show();
        },

        hideTooltip: function () {
            $('#tipmsg').hide();
        }
    };
})();
