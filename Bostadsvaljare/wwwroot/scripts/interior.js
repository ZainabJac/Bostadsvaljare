(function () {
    window.interior = {
        onResize: function (event) {
            if ($(window).width() <= 927) {
                var height = parseInt($('.line-4-planritning').height());
                $('#gallery').height((height + 3) + 'px');
            } else {
                $('#gallery').height('100%');
            }
        },

        addResizeListener: function () {
            window.addEventListener('resize', this.onResize, false);
        },

        dispose: function () {
            window.removeEventListener('resize', this.onResize, false);
        },
    };
})();
