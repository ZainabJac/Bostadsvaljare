(function () {
    window.grid_responsive = {
        listeners: {},

        resizeComplete: function () {

            var height1 = parseInt($('#gallerybox').height());
        
            $('#GridResize').height(height1 + 'px');

        },
    };
})();
