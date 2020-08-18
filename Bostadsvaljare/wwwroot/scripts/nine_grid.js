var corner = {
    upperLeft: 0,
    upperRight: 2,
    lowerLeft: 6,
    lowerRight: 8
};
var side = {
    top: 1,
    left: 3,
    right: 5,
    bottom: 7
};
var middle = 4;

function NineGrid(imgSrc, color, splitPointsHor, splitPointsVer) {
    THREE.Sprite.call(this);
    this.material.opacity = 0;

    var self = this;
    var loader = new THREE.TextureLoader();

    this.sprites = new Array();
    this.width;
    this.height;
    this.position.set = function (x, y, z) { self.setPosition(x, y, z); };
    this.scale.set = function (x, y, z) { self.setScale(x, y, z); };
    this.center.set = function (x, y) { self.setCenter(x, y); };

    loader.load(imgSrc, function (texture) {
        self.width = texture.image.width;
        self.height = texture.image.height;

        // Add image edges onto the split points
        splitPointsHor.unshift(0);
        splitPointsHor.push(self.width);
        splitPointsVer.unshift(0);
        splitPointsVer.push(self.height);

        // Split into nine separate sprites
        for (var i = 0; i < 9; i += 1) {
            var horPoint = i % 3,
                verPoint = Math.floor(i / 3);
            var x = splitPointsHor[horPoint],
                y = splitPointsVer[verPoint],
                w = splitPointsHor[horPoint + 1] - x,
                h = splitPointsVer[verPoint + 1] - y;
            var canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;

            var ctx = canvas.getContext('2d');
            ctx.drawImage(texture.image, x, y, w, h, 0, 0, w, h);

            var texturePart = new THREE.Texture(canvas);
            texturePart.needsUpdate = true;

            var sprite = new THREE.Sprite(new THREE.SpriteMaterial({
                map: texturePart,
                color: color
            }));
            sprite.x = x;
            sprite.y = y;
            sprite.w = w;
            sprite.h = h;
            sprite.center.set(0, 1);
            // sprite.position.set(x, y, 0);
            // sprite.position.setX(self.center.x*(x-self.width)/self.parent.scale);
            // sprite.position.setY((self.height-y)*0.0015);
            self.add(sprite);
            self.sprites[i] = sprite;
        }

        // self.setCenter(self.parent.center);
        self.setPosition(0, 0, -1);
        self.setScale(1, 1, 1);
    }, false);
}

NineGrid.prototype = Object.assign(Object.create(THREE.Sprite.prototype), {

    constructor: NineGrid,

    get: function (index) {
        if (index === undefined)
            return this;
        else
            return this.children[index];
    },

    setPosition: function (x, y, z) {
        console.log('setting position...');
        var self = this;
        var xCen = this.center.x,
            yCen = this.center.y,
            w = this.width,
            h = this.height,
            wP = this.parent.scale.x,
            hP = this.parent.scale.y;

        this.position.setX(x);
        this.position.setY(y);
        this.position.setZ(z);
        this.sprites.forEach(function (sprite) {
            sprite.position.setX(-1 * xCen + sprite.x / w);
            sprite.position.setY(1 * (1 - yCen) - sprite.y / h);
        });
    },

    setScale: function (x, y, z) {
        console.log('setting scale...');
        this.scale.setX(x);
        this.scale.setY(y);
        this.scale.setZ(z);
        var w = this.width,
            h = this.height,
            wP = this.parent.scale.x,
            hP = this.parent.scale.y;
        for (var i = 0; i < this.sprites.length; i += 1) {
            var sprite = this.sprites[i];
            switch (i) {
                case corner.upperLeft:
                case corner.lowerLeft:
                case corner.upperRight:
                case corner.lowerRight:
                    sprite.scale.set(sprite.w / wP, sprite.h / hP, 1);
                    break;
                case side.top:
                case side.bottom:
                    sprite.scale.set(1 - (w - sprite.w) / w,
                        sprite.h / hP, 1);
                    break;
                case side.left:
                case side.right:
                    sprite.scale.set(sprite.w / wP,
                        1 - (h - sprite.h) / h, 1);
                    break;
                case middle:
                    sprite.scale.set(1 - (w - sprite.w) / w,
                        1 - (h - sprite.h) / h, 1);
                    break;
                default:
                    console.error('WRONG', i);
            }
        }
    },

    setCenter: function (x, y) {
        console.log('setting center...');
        this.center.setX(x);
        this.center.setY(y);
        // this.sprites.forEach(function(sprite) {
        //    sprite.center.set(0, 1);
        // });
    },
});
