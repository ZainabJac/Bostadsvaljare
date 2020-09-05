(function () {
    window.interior = {
        onResize: async function (event) {
            if ($(window).width() <= 927) {
                await util.delay(500);
                var height = parseInt($('.line-4-planritning').height());
                $('#gallery').height((height + 3) + 'px');
            }
        },

        addResizeListener: function () {
            window.addEventListener('resize', this.onResize, false);
        },

        dispose: function () {
            window.removeEventListener('resize', this.onResize, false);
        },
    }
})();