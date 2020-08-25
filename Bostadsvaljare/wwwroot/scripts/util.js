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

        removeObjectByName: function (object, targetName) {
            var children = object.children;

            for (var i = 0; i < children.length; i += 1) {
                if (children[i].name === targetName) {
                    children.splice(i);
                    break;
                }
            }
        },
    };
})();
