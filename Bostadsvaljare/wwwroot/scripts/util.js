(function () {
    window.util = {
        isDevice: function () {
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(navigator.userAgent);
        },

        getElementFromPoint: function (target) {
            var list = document.querySelectorAll(':hover');
            for (i = list.length-1; i >= 0; i--) {
                if (list[i].localName === target)
                    return list[i];
            }
            return undefined;
        },

        getSFGridRowIndex: function () {
            var rowEl = this.getElementFromPoint('tr');
            if (rowEl  &&  rowEl.className.includes('e-row'))
                return parseInt(rowEl.ariaRowIndex);
            else
                return -1;
        },

        getGalleryIndex: function () {
            var img = this.getElementFromPoint('img');
            if (img  &&  img.className.includes('gallery-img'))
                return parseInt(img.attributes.index.value);
            else
                return -1;
        },

        removeObjectByName: function (object, targetName) {
            var children = object.children;

            for (var i = 0; i < children.length; i += 1) {
                if (children[i].name === targetName) {
                    children.splice(i);
                    break;
                }
            }
        },

        /* View in fullscreen */
        openFullscreen: function () {
            var elem = document.documentElement;

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
        },

        prettyString: function (str, options) {
            if (str == null || typeof str !== 'string')
                return str;
            if (!options)
                options = {};

            if (options.strip) {
                var stripArr = options.strip.split('|');
                $.each(stripArr, function (_, strip) {
                    str = str.replace(RegExp(strip, 'g'), '');
                });
            }

            // Replace underscores with a space
            str = str.replace(/_/g, ' ');

            // Remove all brackets
            str = str.replace(/\[/g, '').replace(/\]/g, '');

            // Turn the first character of each word into upper case
            str = str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });

            return (options.prefix || '')
                + str
                + (options.postfix || '');
        },

        matchHeightToWidth: function (id) {
            $("#"+id).height( $("#"+id).width() * 2/3 );
        },

        delay: function (ms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, ms);
            });
        },

        disableScroll: function () {
            $('body').css({ overflow: 'hidden'});
        },

        enableScroll: function () {
            $('body').css({ overflow: 'visible'});
        },
    };
})();
