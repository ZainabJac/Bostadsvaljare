(function () {
    window.interior = {
        onResize: function (event) {
            if ($(window).width() <= 927) {
                var height = parseInt($('.planritning').height());
                $('#gallery').height((height + 3) + 'px');
            } else {
                $('#gallery').height('100%');
            }
        },

        addResizeListener: function () {
            window.addEventListener('resize', this.onResize, false);
        },

        addHotspot: function (id, x, y, r) {
            var a = document.createElement("a");
            //a.href = '#';
            $(a).addClass('hotspot');

            var img = $('#' + id + ' img');
            x = x * (img.width() / img[0].naturalWidth) - r;
            y = y * (img.height() / img[0].naturalHeight) - r;
            $(a).css({
                left: x + 'px',
                top: y + 'px',
            });

            $('#'+ id).append(a);
        },

        dispose: function () {
            window.removeEventListener('resize', this.onResize, false);
        },
    };
})();
