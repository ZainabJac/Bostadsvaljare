(function () {
    window.interior = {
        onResize: function (event) {
            //TODO: change hotspots' positions to follow the image's size
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

        setHotspot: function (parentID, aID, x, y, r) {
            var a = $(parentID +' '+ aID),
                img = $(parentID +' img');

            x = x * (img.width() / img[0].naturalWidth) - r;
            y = y * (img.height() / img[0].naturalHeight) - r;
            a.css({
                left: x + 'px',
                top: y + 'px',
            });
        },

        dispose: function () {
            window.removeEventListener('resize', this.onResize, false);
        },
    };
})();
