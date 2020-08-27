const constants = {
    CONTAINER: 'pan_container',
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
        roomImages: {},
        elem: null, container: null, canvas: null,
        camera: null, scene: null, renderer: null, skybox: null,
        cameraHUD: null, sceneHUD: null, canvasHUD: null,
        clock: new THREE.Clock(),
        initiated: null, animating: null,
        isUserInteracting: false,
        clientXStart: 0, clientYStart: 0,
        lon: 180, lonLast: 0, lonStart: 0,
        lat: 0, LatLast: 0, latStart: 0,
        phi: 0, theta: 0,
        autoRotate: true,
        autoRotateTimeout: null,
        lonAcc: new Accumulator(20, true),
        latAcc: new Accumulator(20, true),
        velCam: new THREE.Vector2(),
        decRotationRate: 0,
        isMouseover: false,
        isFullscreen: false,
        isShowingMeasurements: false,
        canvasWidth: 0, canvasHeight: 0,
        startingWidth: 0, startingHeight: 0,
        mapSprite: null, currentRoom: null,
        raycaster: new THREE.Raycaster(),
        pointerVector: new THREE.Vector2(),
        hotspotGroup: new THREE.Group(),
        HUDGroup: new THREE.Group(),
        holdingHUDEl: null, holdingHotspot: null,
        hoveringObj: null,
        latestPointerProjection: null,
        tooltipDisplayTimeout: null,
        listeners: {},

        start: function (aptID) {
            this.aptData = window.apartments[aptID];
            this.reset();
            this.onResize();

            // Preload images to avoid loading them each time when changing rooms
            if (this.initiated !== aptID) {
                this.roomImages = {};
                for (var room in this.aptData.rooms) {
                    var panorama = this.aptData.rooms[room].panorama;
                    if (panorama.type === constants.PAN_TYPE.SPHERE)
                        this.roomImages[room] = new THREE.TextureLoader().load(panorama.imageURL);
                    else if (panorama.type === constants.PAN_TYPE.CUBE)
                        this.roomImages[room] = this.getTexturesFromAtlasFile(panorama.imageURL, 6);
                }

                this.changeRoom(this.aptData.entry);
                this.initiated = aptID;
            }

            this.animate();
        },

        reset: function () {
            var self = this;

            this.elem = document.documentElement;
            this.container = $('#' + constants.CONTAINER)[0];
            this.container.oncontextmenu = function () { return false; };
            this.container.appendChild(this.canvas);

            this.startingWidth = this.canvasWidth = this.container.offsetWidth;
            this.startingHeight = this.canvasHeight = this.canvasWidth * this.options.canvas.height_difference;

            // Reset some camera values
            this.clientXStart = 0, this.clientYStart = 0,
            this.lon = 180, this.lonLast = 0, this.lonStart = 0,
            this.lat = 0, this.LatLast = 0, this.latStart = 0,
            this.phi = 0, this.theta = 0;
            this.velCam = new THREE.Vector2();
            this.autoRotate = true;
            this.autoRotateTimeout = undefined;

            this.initHUD();

            // Map setup
            var transform = this.getTransform(this.options.map.transform);
            transform.pos.z = -10;
            this.mapSprite = this.createHUDElement(this.aptData.map,
                constants.MAP,
                transform,
                undefined,
                function() { self.initMap(); });

            // Hide map, which is always shown (for some reason)
            this.hideMap();

            // Adding event listeners
            document.addEventListener('mouseover', this.listeners.mouseover, false);
            document.addEventListener('mouseout', this.listeners.mouseout, false);
            document.addEventListener('mousemove', this.listeners.mousemove, false);
            document.addEventListener('mousedown', this.listeners.mousedown, false);
            document.addEventListener('mouseup', this.listeners.mouseup, false);

            document.addEventListener('touchmove', this.listeners.touchmove, false);
            document.addEventListener('touchstart', this.listeners.touchstart, false);
            document.addEventListener('touchend', this.listeners.touchend, false);

            document.addEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            window.addEventListener('resize', this.listeners.resize, false);
        },

        init: function () {
            if (this.initiated) return;

            var self = this;

            var aspect = this.canvasWidth ? this.canvasWidth / this.canvasHeight
                                          : 100 / (100*this.options.canvas.height_difference);
            this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
            this.camera.target = new THREE.Vector3(0, 0, 0);
            this.scene = new THREE.Scene();

            this.skybox = new THREE.Mesh();
            this.scene.add(this.skybox);

            this.canvas = document.createElement("canvas");
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
            this.renderer.autoClear = false;
            this.renderer.setPixelRatio(window.devicePixelRatio);

            this.listeners.mouseover = function (e) { self.onMouseover(e); };
            this.listeners.mouseout = function (e) { self.onMouseout(e); };
            this.listeners.mousemove = function (e) { self.onMouseMove(e); };
            this.listeners.mousedown = function (e) { self.onMouseDown(e); };
            this.listeners.mouseup = function (e) { self.onMouseUp(e); };
            this.listeners.touchmove = function (e) { self.onTouchMove(e); };
            this.listeners.touchstart = function (e) { self.onTouchStart(e); };
            this.listeners.touchend = function (e) { self.onTouchEnd(e); };
            this.listeners.fullscreenchange = function (e) { self.onFullscreenChange(e); };
            this.listeners.resize = function (e) { self.onResize(e); };

            this.initiated = true;
        },

        initHUD: function () {
            var self = this;
            var halfWidth = this.canvasWidth * 0.5,
                halfHeight = this.canvasHeight * 0.5;

            // We will use 2D canvas element to render our HUD
            this.canvasHUD = document.createElement("canvas");

            // Again, set dimensions to fit the screen
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

            // Map button setup
            // TODO: Make background its own 9-grid image and scale it up to fit map image when clicked
            //       Need to make sure the background is clickable as well (to bring up the map)
            var mapData = this.options.map_icon;
            var transform = this.getTransform(mapData.transform);
            this.createHUDElement(mapData,
                constants.MAP_ICON,
                transform,
                function() { self.showMap(); });

            // Fullscreen button setup
            var fullscreenData = this.options.fullscreen_icon;
            var transform = this.getTransform(fullscreenData.transform);
            this.createHUDElement(fullscreenData,
                constants.FULLSCREEN_ICON,
                transform,
                function() { self.toggleFullscreen(); });

            // Measurements button setup
            // TODO: Be able to show apartment measurements on walls, etc.
            // TODO: Make a different icon
            /*var measurementsData = this.options.measurements_icon;
            var transform = this.getTransform(measurementsData.transform);
            this.createHUDElement(measurementsData,
                constants.MEASUREMENTS_ICON,
                transform,
                function() { self.toggleMeasurements(); });*/
        },

        initMap: function () {
            var self = this;
            var mapImg = this.mapSprite.material.map.image;
            var origHeight = mapImg.height;
            mapImg.height = this.canvas.offsetHeight * this.aptData.map.size;
            var sizeOffset = mapImg.height / origHeight;
            mapImg.width = mapImg.width * sizeOffset;

            var imgWidth = mapImg.width,
                imgHeight = mapImg.height;

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
                    function() { self.changeRoom(this.name); });
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
                function() { self.hideMap(); });
            this.mapSprite.add(minSprite);
        },

        createHUDElement: function (matData, name, transform, onclick, onload) {
            var sprite = new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map: new THREE.TextureLoader().load(matData.image, onload),
                    color: matData.color || '#fff',
                    opacity: matData.hidden_at_start ? 0 : 1
                })
            );
            var pos = transform.pos,
                scale = transform.scale,
                sizeAlt = this.getSizeAlt();

            sprite.name = name;
            if (transform.center) sprite.center = transform.center;
            sprite.position.set(pos.x, pos.y, pos.z);
            sprite.scale.set(scale.x*sizeAlt, scale.y*sizeAlt, scale.z*sizeAlt);
            sprite.onclick = onclick || undefined;
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
        },

        addHotspots: function () {
            var self = this;
            this.aptData.rooms[this.currentRoom].connections.forEach(function (connectingRoom) {
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
                        map: this.roomImages[roomId]
                    });
                    break;
                case constants.PAN_TYPE.CUBE:
                    geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                    geometry.scale(1, 1, -1);

                    var textures = this.roomImages[roomId];
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

        getSizeAlt: function () {
            var sizeAlt = 1;
            if ($(window).width() <= this.options.hud.mobile.width_at_most)
                sizeAlt = this.options.hud.mobile.size_alt;
            return sizeAlt;
        },

        getMargin: function () {
            var l = this.container.offsetLeft,
                r = $(window).width() - this.container.offsetWidth - l,
                t = this.container.offsetTop,
                b = parseInt(this.container.style.marginBottom) || 0;
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

        resetSize: function (width, height) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        },

        resetHUD: function (width, height) {
            var self = this,
                scaleDiffW = this.startingWidth / width,
                scaleDiffH = this.startingHeight / height;

            var sizeAlt = this.getSizeAlt();
            this.HUDGroup.children.forEach(function (hudEl) {
                var size = self.getSize(self.options[hudEl.name].transform.size);
                if (hudEl.name === 'map') {
                    hudEl.scale.x = size.x * scaleDiffW * sizeAlt;
                    hudEl.scale.y = size.y * scaleDiffH * sizeAlt;
                } else {
                    hudEl.scale.x = size.x * scaleDiffW * sizeAlt;
                    hudEl.scale.y = size.y * scaleDiffH * sizeAlt;
                }
            });

            this.canvasHUD.width = width;
            this.canvasHUD.height = height;
            this.cameraHUD.aspect = width / height;
            this.cameraHUD.updateProjectionMatrix();
        },

        onResize: async function (event) {
            // Wait some time to make sure that fullscreenchange event has taken its time,
            // should it also have triggered at the same time.
            await util.delay(50);
            if (this.isFullscreen) return;

            var newWidth, newHeight;
            var margin = this.getMargin();
            if (($(window).width() - margin.width) * this.options.canvas.height_difference < $(window).height() - margin.height) {
                // Adapt canvas after the window's width
                newWidth = $(window).width() - margin.width;
                var diff = newWidth / this.canvasWidth;
                newHeight = this.canvasHeight * diff;
            } else {
                // Adapt canvas after the window's height
                newHeight = $(window).height() - margin.height;
                var diff = newHeight / this.canvasHeight;
                newWidth = this.canvasWidth * diff;
            }

            this.canvas.style.width = newWidth + 'px';
            this.canvas.style.height = newHeight + 'px';
            this.resetSize(newWidth, newHeight);
            this.resetHUD(newWidth, newHeight);

            this.canvasWidth = newWidth;
            this.canvasHeight = newHeight;
        },

        onFullscreenChange: function () {
            this.isFullscreen = !this.isFullscreen;
            if (this.isFullscreen) {
                this.resetSize($(window).width(), $(window).height());
                this.resetHUD($(window).width(), $(window).height());

                // TODO: Change color and background when changing image too
                var fsMat = this.sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                fsMat.map = new THREE.TextureLoader().load(this.options.fullscreen_icon.off_icon.image);
                fsMat.color.set(this.options.fullscreen_icon.off_icon.color
                             || this.options.fullscreen_icon.color);
                fsMat.needsUpdate = true;

                this.container.classList.add(constants.FULLSCREEN);
            } else {
                this.resetSize(this.canvasWidth, this.canvasHeight);
                this.resetHUD(this.canvasWidth, this.canvasHeight);

                var fsMat = this.sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                fsMat.map = new THREE.TextureLoader().load(this.options.fullscreen_icon.image);
                fsMat.color.set(this.options.fullscreen_icon.color);
                fsMat.needsUpdate = true;

                this.container.classList.remove(constants.FULLSCREEN);
            }
        },

        onMouseover: function (event) {
            if (event.target === this.canvas) {
                this.isMouseover = true;
            }
        },

        onMouseout: function (event) {
            this.isMouseover = false;
        },

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
            this.raycaster.setFromCamera(this.pointerVector, this.camera);
            var intersects = this.raycaster.intersectObject(this.hotspotGroup, true);
            if (intersects.length > 0) {
                this.latestPointerProjection = intersects[0].point;
                this.hoveringObj = intersects[0].object;
                this.showTooltip();
            }
            else {
                this.hideTooltip();
            }

            // Change mouse cursor to 'pointer' when hovering over a clickable element
            if (this.hoveringObj) {
                $('html,body').css('cursor', 'pointer');
            } else {
                this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
                if (obj && obj.onclick)
                    $('html,body').css('cursor', 'pointer');
                else
                    $('html,body').css('cursor', 'default');
            }
        },

        onMouseDown: function (event) {
            if (!this.isMouseover) return;

            // Raycast the HUD elements
            this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
            this.holdingHUDEl = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));

            // Raycast the hotspot objects
            this.raycaster.setFromCamera(this.pointerVector, this.camera);
            this.holdingHotspot = this.getFirstValidRCObj(this.raycaster.intersectObject(this.hotspotGroup, true));

            if (!this.holdingHUDEl) {
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
            if (!this.isMouseover) return;

            if (this.holdingHUDEl) {
                this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
                if (obj && obj === this.holdingHUDEl && obj.onclick) {
                    obj.onclick();
                }
            } else if (this.holdingHotspot) {
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
            if (!this.isUserInteracting) return;

            // Ignore if more than one touch is registered
            if (event.target !== this.canvas || event.touches.length > 1)
                return;

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
            // Ignore if more than one touch is registered
            if (event.target !== this.canvas || event.touches.length > 1)
                return;

            // Update pointerVector for all the raycasting
            var touchPos = this.getPointerEventPos(event);
            this.pointerVector.x = (touchPos.x / this.canvas.offsetWidth) * 2 - 1;
            this.pointerVector.y = -(touchPos.y / this.canvas.offsetHeight) * 2 + 1;

            // Raycast the HUD elements
            this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
            this.holdingHUDEl = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));

            // Raycast the hotspot objects
            this.raycaster.setFromCamera(this.pointerVector, this.camera);
            this.holdingHotspot = this.getFirstValidRCObj(this.raycaster.intersectObject(this.hotspotGroup, true));

            if (!this.holdingHUDEl) {
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
            if (!this.isUserInteracting) return;

            // Ignore if more than one touch is registered
            if (event.target !== this.canvas)
                return;

            if (this.holdingHUDEl) {
                this.raycaster.setFromCamera(this.pointerVector, this.cameraHUD);
                var obj = this.getFirstValidRCObj(this.raycaster.intersectObject(this.HUDGroup, true));
                if (obj && obj === this.holdingHUDEl && obj.onclick)
                    obj.onclick();
            }
            else if (this.holdingHotspot) {
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
            this.renderer.render(this.sceneHUD, this.cameraHUD);
        },

        dispose: function () {
            if (!this.animating) return;

            cancelAnimationFrame(this.animating);
            this.HUDGroup.children.length = 0;

            document.removeEventListener('mouseover', this.listeners.mouseover, false);
            document.removeEventListener('mouseout', this.listeners.mouseout, false);
            document.removeEventListener('mousemove', this.listeners.mousemove, false);
            document.removeEventListener('mousedown', this.listeners.mousedown, false);
            document.removeEventListener('mouseup', this.listeners.mouseup, false);
            document.removeEventListener('touchmove', this.listeners.touchmove, false);
            document.removeEventListener('touchstart', this.listeners.touchstart, false);
            document.removeEventListener('touchend', this.listeners.touchend, false);
            document.removeEventListener('fullscreenchange', this.listeners.fullscreenchange, false);
            window.removeEventListener('resize', this.listeners.resize, false);
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

                tooltipDiv.innerText = this.prettyString(this.hoveringObj.name);

                setTimeout(function () {
                    tooltipDiv.style.opacity = 1.0;
                }, 25);
            }
        },

        hideTooltip: function () {
            var tooltipDiv = $('#'+ constants.TOOLTIP)[0];
            if (tooltipDiv) {
                tooltipDiv.style.display = "none";
                tooltipDiv.style.opacity = 0.0;
            }
        },

        showMap: function () {
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
        },

        changeRoom: function (roomId) {
            if (roomId === this.currentRoom) {
                return;
            }

            // Update map hotspot images to show which is the current room
            if (this.HUDGroup.getObjectByName(this.currentRoom)) {
                var prevRoomMat = this.HUDGroup.getObjectByName(this.currentRoom).material;
                var newRoomMat = this.HUDGroup.getObjectByName(roomId).material;
                prevRoomMat.map = new THREE.TextureLoader().load(this.options.map_hotspot.image);
                newRoomMat.map = new THREE.TextureLoader().load(this.options.map_hotspot.current.image);
                prevRoomMat.needsUpdate = true;
                newRoomMat.needsUpdate = true;
            }

            // Change panorama image
            // TODO: Some sort of transition, fade in and out of black?
            var panorama = this.getPanorama(roomId);
            this.skybox.geometry = panorama.geometry;
            this.skybox.material = panorama.material;
            this.currentRoom = roomId;

            // Change the hotspots
            this.scene.remove(this.hotspotGroup);
            this.hotspotGroup = new THREE.Group();
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
                map: this.roomImages[this.currentRoom]
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
            if (this.isFullscreen)
                this.closeFullscreen();
            else
                this.openFullscreen();
        },

        openFullscreen: function () {
            if (this.elem.requestFullscreen) {
                this.elem.requestFullscreen();
            } else if (this.elem.mozRequestFullScreen) { /* Firefox */
                this.elem.mozRequestFullScreen();
            } else if (this.elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                this.elem.webkitRequestFullscreen();
            } else if (this.elem.msRequestFullscreen) { /* IE/Edge */
                this.elem.msRequestFullscreen();
            }
        },

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
    };
})();
