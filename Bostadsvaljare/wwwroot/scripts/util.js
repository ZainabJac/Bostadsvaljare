﻿var elem = document.documentElement;

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

        addMapHilights: function () {
            $('#overview').mapster({
                staticState: false,
                fill: true,
                mapKey: 'status',
                areas: [{
                    key: 'available',
                    fillColor: '5bcb24'
                },
                {
                    key: 'booked',
                    fillColor: 'd32626'
                },
                {
                    key: 'sold',
                    fillColor: 'dfd431'
                }],
                wrapClass: 'center',
                onConfigured: function () {
                    $('#overview').css({
                        width: '100%',
                    });
                },
            });
            /*$('#overview').mapster({
                staticState: false,
                singleSelect: true,
                fill: true,
                fillOpacity: 0.4,
                fillColor: '5bcb24',
                hilight: true,
                render_hilight: {

                },
                onMouseover: function (e) {
                    $(this).mapster('set', false).mapster('set', true);
                },
                onMouseout: function (e) {
                    $(this).mapster('set', false);
                },
            });*/
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
