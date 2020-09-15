const constants = {
    CONTAINER: 'pan_container',
    UI: {
        MAIN: 'pan_ui',
        FULLSCREEN: 'pan_fullscreen-btn',
    },
    PAN_ELEMENT: 'pan_el',
    TOOLTIP: 'tipmsg',
    MAP: 'map',
    MAP_ICON: 'map_icon',
    MINIMIZE: 'minimize',
    MINIMIZE_ICON: 'minimize_icon',
    FULLSCREEN: 'fullscreen',
    FULLSCREEN_ICON: 'fullscreen_icon',
    MEASUREMENTS: 'measurements',
    MEASUREMENTS_ICON: 'measurements_icon',
    IMAGE_TYPE: {
        IMAGE: 'image',
        NINE_GRID: '9-grid',
        DEFAULT: 'image',
    },
    PAN_TYPE: {
        SPHERE: 'sphere',
        CUBE: 'cube',
    },
};

(function () {
    window.pan_viewer = {
        options: { ...panOptions }, aptData: {},
        roomTextures: {},
        renderer: null, skybox: null,
        camera: null, scene: null, canvas: null, ui: null,
        /*cameraHUD: null, sceneHUD: null, canvasHUD: null,*/
        clock: new THREE.Clock(),
        pressedFullscreenButton: false,
        disposed: true, softDisposed: true, animating: null,
        isUserInteracting: false,
        clientXStart: 0, clientYStart: 0,
        lon: 180, lonLast: 0, lonStart: 0,
        lat: 0, LatLast: 0, latStart: 0,
        phi: 0, theta: 0,
        velCam: new THREE.Vector2(),
        autoRotate: true,
        autoRotateTimeout: null,
        lonAcc: new Accumulator(20, true),
        latAcc: new Accumulator(20, true),
        decRotationRate: 0,
        isMouseover: false,
        isFullscreen: false,
        isShowingMeasurements: false,
        canvasWidth: 0, canvasHeight: 0,
        /*startingWidth: 0, startingHeight: 0,*/
        lastWidth: 0, lastHeight: 0,
        /*sizeAlt: 1,*/
        /*mapSprite: null,*/ currentRoom: null,
        raycaster: new THREE.Raycaster(),
        pointerVector: new THREE.Vector2(),
        hotspotGroup: new THREE.Group(),
        /*HUDGroup: new THREE.Group(),
        holdingHUDEl: null,*/ holdingUI: null, holdingHotspot: null,
        hoveringObj: null,
        latestPointerProjection: null,
        listeners: {},

        start: /*async */function (aptID, roomID, coverWindow) {
            //this.aptData = window.apartments[aptID];
            if (coverWindow === undefined)
                coverWindow = false;
            this.options.canvas.cover_window = coverWindow;
            if (this.softDisposed)
                this.init(aptID);
            this.reset();

            this.changeRoom(roomID || this.aptData.entry);
            //await util.delay(100);
            this.onResize();
            this.animate();
        },

        reset: function () {
            // Reset some camera values
            this.clientXStart = 0, this.clientYStart = 0,
            this.lon = 180, this.lonLast = 0, this.lonStart = 0,
            this.lat = 0, this.LatLast = 0, this.latStart = 0,
            this.phi = 0, this.theta = 0;
            this.velCam = new THREE.Vector2();
            this.autoRotate = true;
            this.autoRotateTimeout = undefined;
            this.decRotationRate = 0;
        },

        init: async function (aptID) {
            while (!this.disposed && !this.softDisposed) await util.delay(50);

            var self = this;

            if ($.isEmptyObject(this.roomTextures)) {
                this.aptData = window.apartments[aptID];
                // Preload images to avoid loading them each time when changing rooms
                for (var room in this.aptData.rooms) {
                    var panorama = this.aptData.rooms[room].panorama;
                    if (panorama.type === constants.PAN_TYPE.SPHERE)
                        this.roomTextures[room] = new THREE.TextureLoader().load(panorama.imageURL);
                    else if (panorama.type === constants.PAN_TYPE.CUBE)
                        this.roomTextures[room] = this.getTexturesFromAtlasFile(panorama.imageURL, 6);
                }
            }

            var aspect = 100 / (100*this.options.canvas.height_difference);
            this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
            this.camera.target = new THREE.Vector3(0, 0, 0);
            this.scene = new THREE.Scene();

            this.skybox = new THREE.Mesh();
            this.scene.add(this.skybox);

            this.canvas = document.createElement("canvas");
            this.ui = $('#'+ constants.UI.MAIN)[0];
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
            this.renderer.autoClear = false;
            this.renderer.setPixelRatio(window.devicePixelRatio);

            var container = $('#'+ constants.CONTAINER)[0];
            container.oncontextmenu = function () { return false; };
            container.appendChild(this.canvas);

            var containerDims = this.getContainerDimensions();
            /*this.startingWidth = */this.lastWidth = this.canvasWidth = containerDims.width;
            /*this.startingHeight = */this.lastHeight = this.canvasHeight = containerDims.height;
            /*this.sizeAlt = this.getSizeAlt();*/

            this.initUI();
            //this.initHUD();

            // Map setup
            //var transform = this.getTransform(this.options.map.transform);
            //transform.pos.z = -10;
            //this.mapSprite = this.createHUDElement(this.aptData.map,
            //    constants.MAP,
            //    transform,
            //    { onloadCB: function() { self.initMap(); },
            //      onresizeCB: self.hudMapResize });

            //// Map button setup
            //// TODO: Make background its own 9-grid image and scale it up to fit map image when clicked
            ////       Need to make sure the background is clickable as well (to bring up the map)
            //var mapData = this.options.map_icon;
            //var transform = this.getTransform(mapData.transform);
            //this.createHUDElement(mapData,
            //    constants.MAP_ICON,
            //    transform,
            //    { onclickCB: function() { self.showMap(); } });

            //// Fullscreen button setup
            //var fullscreenData = this.options.fullscreen_icon;
            //var transform = this.getTransform(fullscreenData.transform);
            //this.createHUDElement(fullscreenData,
            //    constants.FULLSCREEN_ICON,
            //    transform,
            //    { onclickCB: function() { self.toggleFullscreen(); } });

            // Measurements button setup
            // TODO: Be able to show apartment measurements on walls, etc.
            // TODO: Make a different icon
            /*var measurementsData = this.options.measurements_icon;
            var transform = this.getTransform(measurementsData.transform);
            this.createHUDElement(measurementsData,
                constants.MEASUREMENTS_ICON,
                transform,
                { onclickCB: function() { self.toggleMeasurements(); } });*/

            this.listeners.mouseover = function (e) { self.onMouseover(e); };
            //this.listeners.mouseout = function (e) { self.onMouseout(e); };
            this.listeners.mousemove = function (e) { self.onMouseMove(e); };
            this.listeners.mousedown = function (e) { self.onMouseDown(e); };
            this.listeners.mouseup = function (e) { self.onMouseUp(e); };
            this.listeners.touchmove = function (e) { self.onTouchMove(e); };
            this.listeners.touchstart = function (e) { self.onTouchStart(e); };
            this.listeners.touchend = function (e) { self.onTouchEnd(e); };
            this.listeners.fullscreenchange = function (e) { self.onFullscreenChange(e); };
            //this.listeners.resize = function () { self.onResize(); };

            // Adding event listeners
            document.addEventListener('mouseover', this.listeners.mouseover, false);
            //document.addEventListener('mouseout', this.listeners.mouseout, false);
            document.addEventListener('mousemove', this.listeners.mousemove, false);
            document.addEventListener('mousedown', this.listeners.mousedown, false);
            document.addEventListener('mouseup', this.listeners.mouseup, false);

            document.addEventListener('touchmove', this.listeners.touchmove, false);
            document.addEventListener('touchstart', this.listeners.touchstart, false);
            document.addEventListener('touchend', this.listeners.touchend, false);

            document.addEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            //window.addEventListener('resize', this.listeners.resize, false);

            this.softDisposed = false;
            this.disposed = false;
        },

        initUI: function () {
            var self = this;
            $('#'+ constants.UI.FULLSCREEN).on('click', function(e) { self.toggleFullscreen(); });
        },

        /*initHUD: function () {
            var halfWidth = this.canvasWidth * 0.5,
                halfHeight = this.canvasHeight * 0.5;

            // We will use 2D canvas element to render our HUD
            this.canvasHUD = document.createElement("canvas");

            // Again, set dimensions to fit
            this.canvasHUD.width = this.canvasWidth;
            this.canvasHUD.height = this.canvasHeight;

            // Create the camera and set the viewport to match the screen dimensions
            this.cameraHUD = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, 0, 30);

            // Create also a custom scene for HUD
            this.sceneHUD = new THREE.Scene();

            // Create texture from rendered graphics
            var textureHUD = new THREE.Texture(this.canvasHUD);
            textureHUD.needsUpdate = true;

            // Create HUD material
            var materialHUD = new THREE.MeshBasicMaterial({ map: textureHUD });
            materialHUD.transparent = true;

            // Create plane to render the HUD. This plane fills the whole screen
            var planeGeometry = new THREE.PlaneBufferGeometry(this.canvasWidth, this.canvasHeight);
            var plane = new THREE.Mesh(planeGeometry, materialHUD);
            this.sceneHUD.add(plane);
            this.sceneHUD.add(this.HUDGroup);
        },

        initMap: function () {
            var self = this,
                mapImg = this.mapSprite.material.map.image,
                imgHeight = this.canvas.offsetHeight * this.aptData.map.size,
                sizeOffset = imgHeight / mapImg.height,
                imgWidth = mapImg.width * sizeOffset;

            this.options.map.transform.size = {
                width: imgWidth,
                height: imgHeight,
            };

            this.mapSprite.scale.set(imgWidth, imgHeight, 1);

            // Add hotspots for each explorable room
            for (var room in this.aptData.map.room_locations) {
                var hotspotData = this.options.map_hotspot;
                var loc = this.aptData.map.room_locations[room];
                var x = (loc.x * sizeOffset - imgWidth) / imgWidth,
                    y = (imgHeight - loc.y * sizeOffset) / imgHeight;
                var w = hotspotData.transform.size.width / imgWidth,
                    h = hotspotData.transform.size.height / imgHeight;

                if (!hotspotData.hidden_at_start)
                    hotspotData.hidden_at_start = this.aptData.map.hidden_at_start;
                if (room === this.currentRoom) {
                    if (!hotspotData.current.color)
                        hotspotData.current.color = hotspotData.color;
                    if (!hotspotData.current.hidden_at_start)
                        hotspotData.current.hidden_at_start = hotspotData.hidden_at_start;
                    hotspotData = hotspotData.current;
                }

                var transform = {
                    pos: new THREE.Vector3(x, y, 5),
                    scale: new THREE.Vector3(w, h, 1)
                };
                var hotspotSprite = this.createHUDElement(hotspotData,
                    room,
                    transform,
                    { onclickCB: function() { self.changeRoom(this.name); } });
                this.mapSprite.add(hotspotSprite);
            }

            // Add button to minimize the map
            var minData = this.options.minimize_icon;
            var x = 0 * sizeOffset / imgWidth,
                y = (imgHeight + 0 * sizeOffset) / imgHeight;
            var w = minData.transform.size.width / imgWidth,
                h = minData.transform.size.height / imgHeight;
            if (!minData.hidden_at_start)
                minData.hidden_at_start = this.aptData.map.hidden_at_start;

            var transform = {
                pos: new THREE.Vector3(x, y, 5),
                center: new THREE.Vector2(1, 1),
                scale: new THREE.Vector3(w, h, 1)
            };
            var minSprite = this.createHUDElement(minData,
                constants.MINIMIZE_ICON,
                transform,
                { onclickCB: function() { self.hideMap(); } });
            this.mapSprite.add(minSprite);
        },

        createHUDElement: function (matData, name, transform, opts) {
            var sprite = new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map: new THREE.TextureLoader().load(matData.image, opts.onloadCB),
                    color: matData.color || '#fff',
                    opacity: matData.hidden_at_start ? 0 : 1
                })
            );
            var pos = transform.pos,
                scale = transform.scale;

            sprite.name = name;
            if (transform.center) sprite.center = transform.center;
            sprite.position.set(pos.x, pos.y, pos.z);
            sprite.scale.set(scale.x*this.sizeAlt, scale.y*this.sizeAlt, scale.z*this.sizeAlt);
            sprite.onclick = opts.onclickCB || undefined;
            sprite.resize = opts.onresizeCB || this.hudElementResize;
            this.HUDGroup.add(sprite);
            if (matData.background) {
                var bg = this.createBackground(matData.background, sprite);
                if (matData.hidden_at_start)
                    bg.material.opacity = 0;
            }
            return sprite;
        },

        createBackground: function (bgData, parent) {
            if (bgData.type === undefined)
                bgData.type = constants.IMAGE_TYPE.DEFAULT;

            var sprite;

            if (bgData.type === constants.IMAGE_TYPE.IMAGE) {
                var bgMaterial = new THREE.SpriteMaterial({
                    map: new THREE.TextureLoader().load(bgData.image),
                    color: bgData.color || '#fff'
                });
                sprite = new THREE.Sprite(bgMaterial);
            } else if (bgData.type === constants.IMAGE_TYPE.NINE_GRID) {
                console.warning('Nine Grid system is incomplete; avoid!');
                sprite = new NineGrid(bgData.image,
                    bgData.color,
                    bgData.split_points_hor,
                    bgData.split_points_ver);
            } else {
                console.error('Unavailable background type:', bgData.type);
            }
            parent.add(sprite);
            sprite.center.set(parent.center.x, parent.center.y);
            sprite.position.set(0, 0, -1);

            return sprite;
        },*/

        addHotspots: function () {
            var connectingRooms = this.aptData.rooms[this.currentRoom].connections;
            if (!connectingRooms)
                return;

            var self = this;
            connectingRooms.forEach(function (connectingRoom) {
                // Create the hotspot object
                var planeGeometry = new THREE.PlaneBufferGeometry(
                    self.options.hotspot.transform.size.width,
                    self.options.hotspot.transform.size.height
                );
                var hotspotMaterial = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(self.options.hotspot.image),
                    color: self.options.hotspot.color,
                    side: THREE.DoubleSide,
                    transparent: true
                });
                var hotspotMesh = new THREE.Mesh(planeGeometry, hotspotMaterial);
                hotspotMesh.name = connectingRoom;

                // Position the hotspot
                var dist = 250;
                var xThis = self.aptData.map.room_locations[self.currentRoom].x,
                    yThis = self.aptData.map.room_locations[self.currentRoom].y,
                    xOther = self.aptData.map.room_locations[connectingRoom].x,
                    yOther = self.aptData.map.room_locations[connectingRoom].y;
                var vRel = new THREE.Vector3(xThis - xOther, 0, yThis - yOther);
                var vRelNorm = vRel.normalize();
                hotspotMesh.position.set(vRelNorm.z * dist, 0, -vRelNorm.x * dist);
                hotspotMesh.lookAt(self.camera.position);

                self.hotspotGroup.add(hotspotMesh);
            });
            this.scene.add(this.hotspotGroup);
        },

        getPanorama: function (roomId) {
            var geometry, material;
            var room = this.aptData.rooms[roomId];

            switch (room.panorama.type) {
                case constants.PAN_TYPE.SPHERE:
                    geometry = new THREE.SphereBufferGeometry(500, 60, 40);
                    // invert the geometry on the x-axis so that all of the faces point inward
                    geometry.scale(-1, 1, 1);

                    material = new THREE.MeshBasicMaterial({
                        map: this.roomTextures[roomId]
                    });
                    break;
                case constants.PAN_TYPE.CUBE:
                    geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                    geometry.scale(1, 1, -1);

                    var textures = this.roomTextures[roomId];
                    material = [];
                    for (var i=0; i < 6; i+=1) {
                        material.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
                    }
                    break;
            }

            return {geometry: geometry, material: material};
        },

        getTexturesFromAtlasFile: function (atlasImgUrl, tilesNum) {
            var textures = [];
            var imageObj = new Image();
            imageObj.crossOrigin = "anonymous";

            for (var i=0; i < tilesNum; i+=1) {
                textures[i] = new THREE.Texture();
            }

            imageObj.onload = function () {
                var canvas, context;
                var tileWidth = imageObj.height;

                for (var i=0; i < textures.length; i+=1) {
                    canvas = document.createElement('canvas');
                    context = canvas.getContext('2d');
                    canvas.height = tileWidth;
                    canvas.width = tileWidth;
                    context.drawImage(imageObj, tileWidth * i, 0, tileWidth, tileWidth,
                        0, 0, tileWidth, tileWidth);
                    textures[i].image = canvas;
                    textures[i].needsUpdate = true;
                }
            };

            imageObj.src = atlasImgUrl;

            return textures;
        },

        getTransform: function (data) {
            return {
                pos: this.getPosition(data.position),
                center: this.getCenter(data.position.center),
                scale: this.getSize(data.size),
            };
        },

        getPosition: function (posData) {
            var pos = new THREE.Vector3();

            if (posData.right) {
                pos.x = this.rightPos(posData.right);
            } else {
                pos.x = this.leftPos(posData.left || 0);
            }
            if (posData.bottom) {
                pos.y = this.bottomPos(posData.bottom);
            } else {
                pos.y = this.topPos(posData.top || 0);
            }

            return pos;
        },

        getCenter: function (centerData) {
            var center = new THREE.Vector2(0.5, 0.5);

            if (centerData) {
                if (centerData.x !== undefined)
                    center.x = centerData.x;
                if (centerData.y !== undefined)
                    center.y = centerData.y;
            }

            return center;
        },

        getSize: function (sizeData) {
            var size = new THREE.Vector3(1, 1, 1);

            if (sizeData) {
                size.x = sizeData.width || 1;
                size.y = sizeData.height || 1;
            }

            return size;
        },

        getContainerDimensions: function () {
            return {
                width: $('#'+ constants.CONTAINER).width(),
                height: $('#'+ constants.CONTAINER).width() * this.options.canvas.height_difference,
            }
        },

        /*getSizeAlt: function () {
            var sizeAlt = 1;
            if ($(window).width() <= this.options.hud.mobile.width_at_most)
                sizeAlt = this.options.hud.mobile.size_alt;
            return sizeAlt;
        },*/

        getMargin: function () {
            var l = $('#'+ constants.CONTAINER).offset().left,
                r = $(window).width() - $('#'+ constants.CONTAINER).width() - l,
                t = $('#'+ constants.CONTAINER).offset().top,
                b = 0; //TODO: get correct margin-bottom
            return {left: l, right: r, top: t, bottom: b, width: l+r, height: t+b};
        },

        getPointerEventPos: function (event) {
            var rect = this.canvas.getBoundingClientRect();
            var clientX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
            var clientY = event.clientY || (event.touches && event.touches[0].clientY) || 0;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        },

        getFirstValidRCObj: function (intersects) {
            for (var i = 0; i < intersects.length; i += 1) {
                if (intersects[i].object && intersects[i].object.material.opacity > 0) {
                    return intersects[i].object;
                }
            }
            return undefined;
        },

        resetCamera: function (width, height) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            //this.cameraHUD.aspect = width / height;
            //this.cameraHUD.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        },

        resetUI: function (width, height) {
            $('#'+ constants.UI.MAIN).css({
                width: width,
                height: height,
            });
        },

        /*resetHUD: function (width, height) {
            for (var hudEl of this.HUDGroup.children) {
                hudEl.resize(width, height);
            }

            this.canvasHUD.width = width;
            this.canvasHUD.height = height;
        },

        hudElementResize: function (width, height) {
            var pan = window.pan_viewer,
                diffWidth = pan.startingWidth / width,
                diffHeight = pan.startingHeight / height,
                size = pan.getSize(pan.options[this.name].transform.size);

            this.scale.x = size.x * diffWidth * pan.sizeAlt;
            this.scale.y = size.y * diffHeight * pan.sizeAlt;
        },

        hudMapResize: async function (width, height) {
            while (!this.mapSprite.material.map.image)
                await util.delay(20);

            var pan = window.pan_viewer,
                aspect = height / width,
                diffHeight = pan.startingHeight / height,
                diffAspect = aspect / pan.options.canvas.height_difference,
                mapImg = this.material.map.image;

            var mapSize = function () {
                var sizeMin = pan.aptData.map.size,
                    sizeMax = 0.9,
                    size = sizeMin;
                if (util.isDevice())
                    size = Math.max(sizeMin, Math.min(size * diffHeight, sizeMax));
                return size;
            };

            var imgHeight = height * mapSize() * diffHeight,
                imgWidth = mapImg.width * (imgHeight / mapImg.height) * diffAspect;

            this.scale.set(imgWidth, imgHeight, 1);
        },*/

        onResize: /*async */function (newWidth, newHeight) {
            // Wait some time to make sure that fullscreenchange event has taken its time,
            // should it also have triggered at the same time.
            /*await util.delay(100);
            if (this.isFullscreen) return;*/

            var dims = this.getContainerDimensions();
            if (!newWidth) newWidth = dims.width;
            if (!newHeight) newHeight = dims.height;

            if (this.options.canvas.cover_window) {
                var margin = this.getMargin(),
                    w = $(window).width() - margin.width,
                    h = $(window).height() - margin.height;

                if (w * this.options.canvas.height_difference >= h) {
                    // Adapt canvas after the window's height
                    newHeight = h;
                    var diff = newHeight / this.canvasHeight;
                    newWidth = w * diff;
                }
            }

            $('#'+ constants.CONTAINER +' canvas').height(newHeight);
            //this.resetHUD(newWidth, newHeight);
            this.resetUI(newWidth, newHeight);
            this.resetCamera(newWidth, newHeight);

            this.canvas.style.width = "";
            this.canvasWidth = newWidth;
            this.canvasHeight = newHeight;
        },

        onFullscreenChange: function (event) {
            // Ignore if this event triggered outside of here
            if (!this.pressedFullscreenButton) {
                this.onResize();
                return;
            }
            var newWidth, newHeight;

            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen) {
                newWidth = $(window).width(),
                newHeight = $(window).height();

                // TODO: Change color and background when changing image too
                //var fsMat = this.sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                //fsMat.map = new THREE.TextureLoader().load(this.options.fullscreen_icon.off_icon.image);
                //fsMat.color.set(this.options.fullscreen_icon.off_icon.color
                //             || this.options.fullscreen_icon.color);
                //fsMat.needsUpdate = true;

                $('#'+ constants.CONTAINER).addClass(constants.FULLSCREEN);
                $('.'+ constants.PAN_ELEMENT).addClass(constants.FULLSCREEN);
                $('body').css({ 'overflow': 'hidden' });
            } else {
                //var fsMat = this.sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                //fsMat.map = new THREE.TextureLoader().load(this.options.fullscreen_icon.image);
                //fsMat.color.set(this.options.fullscreen_icon.color);
                //fsMat.needsUpdate = true;

                $('#'+ constants.CONTAINER).removeClass(constants.FULLSCREEN);
                $('.'+ constants.PAN_ELEMENT).removeClass(constants.FULLSCREEN);
                $('body').css({ 'overflow': '' });
            }
            this.onResize(newWidth, newHeight);
            this.pressedFullscreenButton = false;
        },

        onMouseover: function (event) {
            if (event.target.id.startsWith('pan_')) {
                this.isMouseover = true;
                if (event.target.parentElement === this.ui)
                    this.holdingUI = event.target;
                else
                    this.holdingUI = null;
            } else {
                this.isMouseover = false;
            }
        },

        /*onMouseout: function (event) {
            if (!event.target.id.startsWith('pan_'))
                this.isMouseover = false;
        },*/

        onMouseMove: function (event) {
            if (this.isUserInteracting) {
                var rot_speed = this.options.camera.mouse_rotation_speed
                this.lon = (this.clientXStart - event.clientX) * rot_speed + this.lonStart;
                this.lat = (event.clientY - this.clientYStart) * rot_speed + this.latStart;
            }

            // Update pointerVector for all the raycasting
            var mousePos = this.getPointerEventPos(event);
            this.pointerVector.x = (mousePos.x / this.canvas.offsetWidth) * 2 - 1;
            this.pointerVector.y = -(mousePos.y / this.canvas.offsetHeight) * 2 + 1;

            // Raycast the hotspots for the tooltip system
            this.hoveringObj = null;
            //this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
            //var objHUD = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
            if (!this.holdingUI) {
                this.raycaster.setFromCamera(this.pointerVector, this.camera);
                var intersects = this.raycaster.intersectObject(this.hotspotGroup, true);
                if (intersects.length > 0) {
                    this.latestPointerProjection = intersects[0].point;
                    this.hoveringObj = intersects[0].object;
                    this.showTooltip();
                }
            }

            if (!this.hoveringObj)
                this.hideTooltip();

            // Change mouse cursor to 'pointer' when hovering over a clickable element
            if (this.hoveringObj/* || (objHUD && objHUD.onclick)*/)
                $('html,body').css('cursor', 'pointer');
            else
                $('html,body').css('cursor', 'default');
        },

        onMouseDown: function (event) {
            if (!this.isMouseover) return;

            // Raycast the HUD elements
            //this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
            //this.holdingHUDEl = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));

            // Raycast the hotspot objects
            this.raycaster.setFromCamera(this.pointerVector, this.camera);
            this.holdingHotspot = this.getFirstValidRCObj(this.raycaster.intersectObject(this.hotspotGroup, true));

            if (!this.holdingUI) {
                this.autoRotate = false;
                this.decRotationRate = 0.9;
                this.isUserInteracting = true;

                this.clientXStart = event.clientX;
                this.clientYStart = event.clientY;
                this.lonStart = this.lonLast = this.lon;
                this.latStart = this.LatLast = this.lat;
            }
        },

        onMouseUp: function (event) {
            /*if (this.holdingHUDEl) {
                this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
                if (obj && obj === this.holdingHUDEl && obj.onclick) {
                    obj.onclick();
                }
            }
            else*/ if (this.holdingHotspot && !this.holdingUI) {
                this.raycaster.setFromCamera(this.pointerVector, this.camera);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.hotspotGroup, true));
                if (obj && obj === this.holdingHotspot) {
                    this.changeRoom(this.holdingHotspot.name);
                }
            }

            if (this.isUserInteracting) {
                this.velCam.set(this.lonAcc.average(), this.latAcc.average());
                this.lonAcc.clear();
                this.latAcc.clear();

                this.isUserInteracting = false;
            }
        },

        onTouchMove: function (event) {
            // Update pointerVector for all the raycasting
            var touchPos = this.getPointerEventPos(event);
            this.pointerVector.x = (touchPos.x / this.canvas.offsetWidth) * 2 - 1;
            this.pointerVector.y = -(touchPos.y / this.canvas.offsetHeight) * 2 + 1;

            if (this.isUserInteracting) {
                var clientX = event.touches[0].clientX;
                var clientY = event.touches[0].clientY;
                var rot_speed = this.options.camera.touch_rotation_speed;
                this.lon = (this.clientXStart - clientX) * rot_speed + this.lonStart;
                this.lat = (clientY - this.clientYStart) * rot_speed + this.latStart;
            }
        },

        onTouchStart: function (event) {
            if (event.target !== this.canvas)
                return;

            util.disableScroll();

            // Update pointerVector for all the raycasting
            var touchPos = this.getPointerEventPos(event);
            this.pointerVector.x = (touchPos.x / this.canvas.offsetWidth) * 2 - 1;
            this.pointerVector.y = -(touchPos.y / this.canvas.offsetHeight) * 2 + 1;

            // Raycast the HUD elements
            //this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
            //this.holdingHUDEl = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));

            // Raycast the hotspot objects
            this.raycaster.setFromCamera(this.pointerVector, this.camera);
            this.holdingHotspot = this.getFirstValidRCObj(this.raycaster.intersectObject(this.hotspotGroup, true));

            if (!this.holdingUI) {
                this.autoRotate = false;
                this.decRotationRate = 0.9;
                this.isUserInteracting = true;

                this.clientXStart = event.touches[0].clientX;
                this.clientYStart = event.touches[0].clientY;
                this.lonStart = this.lonLast = this.lon;
                this.latStart = this.LatLast = this.lat;
            }
        },

        onTouchEnd: function (event) {
            /*if (this.holdingHUDEl) {
                this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
                if (obj && obj === this.holdingHUDEl && obj.onclick)
                    obj.onclick();
            if (this.holdingUI) {
                this.holdingUI.onclick();
            }
            else*/ if (this.holdingHotspot && !this.holdingUI) {
                if (this.holdingHotspot === this.hoveringObj) {
                    this.changeRoom(this.holdingHotspot.name);
                    this.hoveringObj = undefined;
                }
                else {
                    this.raycaster.setFromCamera(this.pointerVector, this.camera);
                    var intersects = this.raycaster.intersectObject(this.hotspotGroup, true);
                    if (intersects.length > 0 && intersects[0].object === this.holdingHotspot) {
                        this.latestPointerProjection = intersects[0].point;
                        this.hoveringObj = intersects[0].object;
                        this.showTooltip();
                    }
                }
            }
            else {
                this.hoveringObj = undefined;
                this.hideTooltip();
            }

            if (this.isUserInteracting) {
                this.velCam.set(this.lonAcc.average(), this.latAcc.average());
                this.lonAcc.clear();
                this.latAcc.clear();

                this.isUserInteracting = false;
            }

            util.enableScroll();
        },

        animate: function () {
            var self = this;
            this.animating = requestAnimationFrame(function() { self.animate(); });
            this.update();
        },

        update: function () {
            var self = this;
            var delta = this.clock.getDelta();
            var autoRotateOpts = this.options.camera.auto_rotate;

            var dims = this.getContainerDimensions();
            if (!this.isFullscreen && (dims.width !== this.lastWidth || dims.height !== this.lastHeight)) {
                this.onResize(dims.width, dims.height);
                this.lastWidth = dims.width;
                this.lastHeight = dims.height;
            }

            if (this.isUserInteracting) {
                this.lonAcc.add(this.lon - this.lonLast);
                this.latAcc.add(this.lat - this.LatLast);
                this.lonLast = this.lon, this.LatLast = this.lat;

                clearTimeout(this.autoRotateTimeout);
                this.autoRotateTimeout = setTimeout(function () {
                    self.autoRotateTimeout = undefined;
                    self.velCam.set(0, 0);
                    self.autoRotate = true;
                }, autoRotateOpts.secs_to_rotate * 1000);
            } else if (!this.autoRotate) {
                if (this.options.camera.smooth_stop.enable) {
                    var decRate = 0.1 + this.decRotationRate;
                    var smoothOutRate = this.options.camera.smooth_stop.decrease_rate;
                    this.decRotationRate = Math.max(0, this.decRotationRate - smoothOutRate * delta);
                    this.velCam.set(Math.max(0, Math.abs(this.velCam.x) * decRate) * Math.sign(this.velCam.x),
                                    Math.max(0, Math.abs(this.velCam.y) * decRate) * Math.sign(this.velCam.y));

                    this.lon += this.velCam.x;
                    this.lat += this.velCam.y;
                }
            } else if (autoRotateOpts.enable) {
                var smoothLonRate = autoRotateOpts.smooth_in_x_rate,
                    smoothLatRate = autoRotateOpts.smooth_in_y_rate,
                    maxVelLon = autoRotateOpts.x_max_velocity,
                    maxVelLat = autoRotateOpts.y_max_velocity;

                // Smooth rotate lon
                this.velCam.x = Math.min(this.velCam.x + smoothLonRate * delta, maxVelLon);

                // Smooth lat close into 0
                if (Math.abs(this.lat) > 0.5) {
                    var velLat = Math.abs(this.velCam.y) + smoothLatRate * delta;
                    this.velCam.y = Math.min(velLat, maxVelLat) * -Math.sign(this.lat);
                } else if (Math.abs(this.velCam.y) > 0.001) {
                    this.velCam.y = Math.max(0, Math.abs(this.velCam.y) * 0.95) * Math.sign(this.velCam.y);
                } else {
                    this.velCam.y = 0;
                }

                this.lon += this.velCam.x;
                this.lat += this.velCam.y;
            }

            this.lat = Math.min(Math.max(-85, this.lat), 85);
            this.phi = THREE.Math.degToRad(90 - this.lat);
            this.theta = THREE.Math.degToRad(this.lon);

            this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
            this.camera.target.y = 500 * Math.cos(this.phi);
            this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
            this.camera.lookAt(this.camera.target);

            this.renderer.render(this.scene, this.camera);
            //this.renderer.render(this.sceneHUD, this.cameraHUD);
        },

        softDispose: function () {
            if (!this.animating) return;
            cancelAnimationFrame(this.animating);

            $('#' + constants.CONTAINER)[0].removeChild(this.canvas);
            this.renderer.dispose();
            this.skybox.geometry.dispose();
            this.skybox.material.dispose();

            this.disposeHotspots();
            //this.disposeHUD();
            this.disposeUI();

            this.renderer = this.scene = this.skybox =
            this.camera = this.canvas = undefined;
            this.currentRoom = null;

            document.removeEventListener('mouseover', this.listeners.mouseover, false);
            //document.removeEventListener('mouseout', this.listeners.mouseout, false);
            document.removeEventListener('mousemove', this.listeners.mousemove, false);
            document.removeEventListener('mousedown', this.listeners.mousedown, false);
            document.removeEventListener('mouseup', this.listeners.mouseup, false);
            document.removeEventListener('touchmove', this.listeners.touchmove, false);
            document.removeEventListener('touchstart', this.listeners.touchstart, false);
            document.removeEventListener('touchend', this.listeners.touchend, false);
            document.removeEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            //window.removeEventListener('resize', this.listeners.resize, false);

            if (this.isFullscreen) {
                util.closeFullscreen();
                $('#'+ constants.CONTAINER).removeClass(constants.FULLSCREEN);
                $('.'+ constants.PAN_ELEMENT).removeClass(constants.FULLSCREEN);
                $('body').css({ 'overflow': '' });
                this.isFullscreen = false;
            }

            this.softDisposed = true;
        },

        dispose: function () {
            if (!this.animating) return;
            this.softDispose();

            for (var roomID in this.roomTextures) {
                if (Array.isArray(this.roomTextures[roomID])) {
                    for (var atlasTexture of this.roomTextures[roomID]) {
                        atlasTexture.dispose();
                    }
                } else {
                    this.roomTextures[roomID].dispose();
                }
            }
            this.roomTextures = {};
            this.disposed = true;
        },

        /*disposeHUD: function () {
            for (var hudEl of this.HUDGroup.children) {
                hudEl.material.map.dispose();
                hudEl.material.dispose();
            }
            this.HUDGroup = new THREE.Group();
            this.canvasHUD = this.cameraHUD =
            this.sceneHUD = this.mapSprite = undefined;
        },*/

        disposeUI: function () {
            $('#'+ constants.UI.FULLSCREEN).off('click');
        },

        disposeHotspots: function () {
            for (var hotspot of this.hotspotGroup.children) {
                hotspot.material.map.dispose();
                hotspot.material.dispose();
            }
            this.hotspotGroup = new THREE.Group();
        },

        showTooltip: function () {
            var tooltipDiv = $('#'+ constants.TOOLTIP)[0];

            if (tooltipDiv && this.hoveringObj) {
                tooltipDiv.style.display = "block";

                var canvasData = this.canvas.getBoundingClientRect(),
                    halfWidth = this.canvasWidth * 0.5,
                    halfHeight = this.canvasHeight * 0.5;

                var tooltipPosition = this.latestPointerProjection.clone().project(this.camera);
                tooltipPosition.x = (tooltipPosition.x * halfWidth) + halfWidth + canvasData.left;
                tooltipPosition.y = -(tooltipPosition.y * halfHeight) + halfHeight + canvasData.top;

                var tootipWidth = tooltipDiv.offsetWidth;
                var tootipHeight = tooltipDiv.offsetHeight;

                tooltipDiv.style.left = tooltipPosition.x - tootipWidth * 0.5 + 'px';
                tooltipDiv.style.top = tooltipPosition.y - tootipHeight - 5 + 'px';

                tooltipDiv.innerText = util.prettyString(this.hoveringObj.name);
            }
        },

        hideTooltip: function () {
            $('#'+ constants.TOOLTIP).hide();
        },

        /*showMap: function () {
            // TODO: scale the background to encapsulate the map (by using 9-grid from prev. TODO)
            var mapIconSprite = this.sceneHUD.getObjectByName(constants.MAP_ICON);
            this.changeOpacity(mapIconSprite, 0);
            this.changeOpacity(this.mapSprite, 1);
        },

        hideMap: function () {
            var mapIconSprite = this.sceneHUD.getObjectByName(constants.MAP_ICON);
            this.changeOpacity(mapIconSprite, 1);
            this.changeOpacity(this.mapSprite, 0);
        },

        changeOpacity: function (sprite, opacity) {
            sprite.material.opacity = opacity;
            sprite.children.forEach(function (childSprite) {
                childSprite.material.opacity = opacity;
            });
        },*/

        changeRoom: function (roomId) {
            if (roomId === this.currentRoom)
                return;

            // Update map hotspot images to show which is the current room
            /*if (this.HUDGroup.getObjectByName(this.currentRoom)) {
                var prevRoomMat = this.HUDGroup.getObjectByName(this.currentRoom).material;
                var newRoomMat = this.HUDGroup.getObjectByName(roomId).material;
                prevRoomMat.map = new THREE.TextureLoader().load(this.options.map_hotspot.image);
                newRoomMat.map = new THREE.TextureLoader().load(this.options.map_hotspot.current.image);
                prevRoomMat.needsUpdate = true;
                newRoomMat.needsUpdate = true;
            }*/

            // Change panorama image
            // TODO: Some sort of transition, fade in and out of black?
            var panorama = this.getPanorama(roomId);
            this.skybox.geometry = panorama.geometry;
            this.skybox.material = panorama.material;
            this.currentRoom = roomId;

            // Change the hotspots
            this.scene.remove(this.hotspotGroup);
            this.disposeHotspots();
            this.addHotspots();

            this.hideTooltip();
            this.hoveringObj = undefined;
        },

        topPos: function (px) {
            return this.canvasHeight * 0.5 - px;
        },

        bottomPos: function (px) {
            return px - this.canvasHeight * 0.5;
        },

        leftPos: function (px) {
            return px - this.canvasWidth * 0.5;
        },

        rightPos: function (px) {
            return this.canvasWidth * 0.5 - px;
        },

        toggleMeasurements: function () {
            if (this.isShowingMeasurements) {
                this.hideMeasurements();
            } else {
                this.showMeasurements();
            }
        },

        showMeasurements: function () {
            //TODO: show measurements of walls, windows, doors, etc.
            var material = new THREE.MeshBasicMaterial({
                map: this.roomTextures[this.currentRoom]
            });
            var mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);

            this.isShowingMeasurements = true;
        },

        hideMeasurements: function () {
            //TODO: hide measurements

            this.isShowingMeasurements = false;
        },

        toggleFullscreen: function () {
            this.pressedFullscreenButton = true;
            if (bv.isFullscreen)
                this.onFullscreenChange();
            else if (this.isFullscreen)
                util.closeFullscreen();
            else
                util.openFullscreen();
        },
    };
})();
