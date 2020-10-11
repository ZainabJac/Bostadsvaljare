(function () {
    window.image_loader = {
        images: {},

        loadImage: async function (src, onLoadCB) {
            var loaded = true, img;

            if (!this.images[src]) {
                loaded = false;
                img = new Image();
                img.onload = function () {
                    if (onLoadCB) onLoadCB();
                    loaded = true;
                };
                img.src = src;
                this.images[src] = img;
            }
            while (!loaded) {
                await util.delay(50);
            }

            return this.images[src].cloneNode();
        }
    };
})();
