﻿var options = { ...panOptions };
var aptData;
var roomImages;
var self;
var initiated;
var elem;
var animation;
var camera, scene, renderer, skybox, container, canvas;
var cameraHUD, sceneHUD;
var clock = new THREE.Clock();
var isUserInteracting = false,
    clientXStart = 0, clientYStart = 0,
    lon = 180, lonLast = 0, lonStart = 0,
    lat = 0, LatLast = 0, latStart = 0,
    phi = 0, theta = 0;
var autoRotate = true,
    autoRotateTimeout,
    lonAcc = new Accumulator(20, true),
    latAcc = new Accumulator(20, true),
    velCam = new THREE.Vector2(),
    maxVelLon = options.camera.auto_rotate.x_max_velocity,
    maxVelLat = options.camera.auto_rotate.y_max_velocity,
    decRotationRate = 0;
var isMouseover = false,
    isFullscreen = false,
    isShowingMeasurements = false,
    canvasWidth = 0, canvasHeight = 0;
var mapSprite, currentRoom;
var raycaster = new THREE.Raycaster(),
    pointerVector = new THREE.Vector2(),
    hotspotGroup = new THREE.Group(),
    HUDGroup = new THREE.Group(),
    hoveredHUDEl, hoveredHotspot,
    latestPointerProjection,
    tooltipDisplayTimeout,
    hoveringObj;
var marginWidth, marginHeight;

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
        start: function (aptID) {
            aptData = window.apartments[aptID];
            this.reset();

            // Preload images to avoid loading them each time when changing rooms
            if (initiated !== aptID) {
                roomImages = {};
                for (var room in aptData.rooms) {
                    var panorama = aptData.rooms[room].panorama;
                    if (panorama.type === constants.PAN_TYPE.SPHERE)
                        roomImages[room] = new THREE.TextureLoader().load(panorama.imageURL);
                    else if (panorama.type === constants.PAN_TYPE.CUBE)
                        roomImages[room] = this.getTexturesFromAtlasFile(panorama.imageURL, 6);
                }

                this.changeRoom(aptData.entry);
                initiated = aptID;
            }

            this.animate();
        },

        reset: function () {
            elem = document.documentElement;
            container = $('#' + constants.CONTAINER)[0];
            container.oncontextmenu = function () { return false; };
            container.appendChild(canvas);

            // Reset some camera values
            clientXStart = 0, clientYStart = 0,
            lon = 180, lonLast = 0, lonStart = 0,
            lat = 0, LatLast = 0, latStart = 0,
            phi = 0, theta = 0;
            velCam = new THREE.Vector2();
            autoRotate = true;
            autoRotateTimeout = undefined;

            // Remove previous animation frame request
            cancelAnimationFrame(animation);

            // Map setup
            this.removeObjectByName(HUDGroup, 'map');
            var transform = this.getTransform(options.map.transform);
            transform.pos.z = -10;
            mapSprite = this.createHUDElement(aptData.map,
                constants.MAP,
                transform,
                undefined,
                this.initMap);

            // Hide map, which is always shown (for some reason)
            this.hideMap();
        },

        init: function () {
            if (initiated) return;

            self = this;
            container = $('#' + constants.CONTAINER)[0];
            container.oncontextmenu = function () { return false; };
            canvas = document.createElement("canvas");
            container.appendChild(canvas);

            marginWidth = window.innerWidth - container.offsetWidth;
            marginHeight = container.offsetTop;
            canvasWidth = container.offsetWidth;
            canvasHeight = canvasWidth*options.canvas.height_difference;

            var aspect = canvasWidth / canvasHeight;
            camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
            camera.target = new THREE.Vector3(0, 0, 0);
            scene = new THREE.Scene();

            skybox = new THREE.Mesh();
            scene.add(skybox);

            renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.autoClear = false;
            renderer.setPixelRatio(window.devicePixelRatio);
            this.resetSize(canvasWidth, canvasHeight);

            this.initHUD();

            // Map button setup
            // TODO: Make background its own 9-grid image and scale it up to fit map image when clicked
            //       Need to make sure the background is clickable as well (to bring up the map)
            var mapData = options.map_icon;
            var transform = this.getTransform(mapData.transform);
            this.createHUDElement(mapData,
                constants.MAP_ICON,
                transform,
                this.showMap);

            // Fullscreen button setup
            var fullscreenData = options.fullscreen_icon;
            var transform = this.getTransform(fullscreenData.transform);
            this.createHUDElement(fullscreenData,
                constants.FULLSCREEN_ICON,
                transform,
                this.toggleFullscreen);

            // Measurements button setup
            // TODO: Be able to show apartment measurements on walls, etc.
            // TODO: Make a different icon
            /*var measurementsData = options.measurements_icon;
            var transform = this.getTransform(measurementsData.transform);
            this.createHUDElement(measurementsData,
                constants.MEASUREMENTS_ICON,
                transform,
                this.toggleMeasurements);*/

            // Adding event listeners
            document.addEventListener('mouseover', this.onMouseover, false);
            document.addEventListener('mouseout', this.onMouseout, false);
            document.addEventListener('mousemove', this.onPointerMove, false);
            document.addEventListener('mousedown', this.onPointerDown, false);
            document.addEventListener('mouseup', this.onPointerUp, false);

            document.addEventListener('touchmove', this.onTouchMove, false);
            document.addEventListener('touchstart', this.onTouchStart, false);
            document.addEventListener('touchend', this.onTouchEnd, false);

            window.addEventListener('resize', this.onResize, false);
            document.addEventListener('fullscreenchange', this.onFullscreenChange, false);

            initiated = true;
        },

        initHUD: function () {
            var canvasData = canvas.getBoundingClientRect();
            var width = canvasData.width, height = canvasData.height;
            var halfWidth = width * 0.5, halfHeight = height * 0.5;

            // We will use 2D canvas element to render our HUD
            var canvasHUD = document.createElement("canvas");

            // Again, set dimensions to fit the screen
            canvasHUD.width = width;
            canvasHUD.height = height;

            // Create the camera and set the viewport to match the screen dimensions
            cameraHUD = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, 0, 30);

            // Create also a custom scene for HUD
            sceneHUD = new THREE.Scene();

            // Create texture from rendered graphics
            var textureHUD = new THREE.Texture(canvasHUD);
            textureHUD.needsUpdate = true;

            // Create HUD material
            var materialHUD = new THREE.MeshBasicMaterial({ map: textureHUD });
            materialHUD.transparent = true;

            // Create plane to render the HUD. This plane fills the whole screen
            var planeGeometry = new THREE.PlaneBufferGeometry(width, height);
            var plane = new THREE.Mesh(planeGeometry, materialHUD);
            sceneHUD.add(plane);
            sceneHUD.add(HUDGroup);
        },

        initMap: function () {
            var mapImg = mapSprite.material.map.image;
            var origHeight = mapImg.height;
            mapImg.height = canvas.offsetHeight * aptData.map.size;
            var sizeOffset = mapImg.height / origHeight;
            mapImg.width = mapImg.width * sizeOffset;

            var imgWidth = mapImg.width,
                imgHeight = mapImg.height;

            options.map.transform.size = {
                width: imgWidth,
                height: imgHeight,
            };

            mapSprite.scale.set(imgWidth, imgHeight, 1);

            // Add hotspots for each explorable room
            for (var room in aptData.map.room_locations) {
                var hotspotData = options.map_hotspot;
                var loc = aptData.map.room_locations[room];
                var x = (loc.x * sizeOffset - imgWidth) / imgWidth,
                    y = (imgHeight - loc.y * sizeOffset) / imgHeight;
                var w = hotspotData.transform.size.width / imgWidth,
                    h = hotspotData.transform.size.height / imgHeight;

                if (!hotspotData.hidden_at_start)
                    hotspotData.hidden_at_start = aptData.map.hidden_at_start;
                if (room === currentRoom) {
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
                var hotspotSprite = self.createHUDElement(hotspotData,
                    room,
                    transform,
                    function () { self.changeRoom(this.name); });
                mapSprite.add(hotspotSprite);
            }

            // Add button to minimize the map
            var minData = options.minimize_icon;
            var x = 0 * sizeOffset / imgWidth,
                y = (imgHeight + 0 * sizeOffset) / imgHeight;
            var w = minData.transform.size.width / imgWidth,
                h = minData.transform.size.height / imgHeight;
            if (!minData.hidden_at_start)
                minData.hidden_at_start = aptData.map.hidden_at_start;

            var transform = {
                pos: new THREE.Vector3(x, y, 5),
                center: new THREE.Vector2(1, 1),
                scale: new THREE.Vector3(w, h, 1)
            };
            var minSprite = self.createHUDElement(minData,
                constants.MINIMIZE_ICON,
                transform,
                self.hideMap);
            mapSprite.add(minSprite);
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
            HUDGroup.add(sprite);
            if (matData.background) {
                var bg = this.createBackground(matData.background, sprite);
                if (matData.hidden_at_start)
                    bg.material.opacity = 0;
            }
            return sprite;
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

        getSizeAlt: function () {
            var sizeAlt = 1;
            if (canvasWidth <= options.hud.mobile.width_at_most)
                sizeAlt = options.hud.mobile.size_alt;
            return sizeAlt;
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
            aptData.rooms[currentRoom].connections.forEach(function (connectingRoom) {
                // Create the hotspot object
                var planeGeometry = new THREE.PlaneBufferGeometry(
                    options.hotspot.transform.size.width,
                    options.hotspot.transform.size.height
                );
                var hotspotMaterial = new THREE.MeshBasicMaterial({
                    map: new THREE.TextureLoader().load(options.hotspot.image),
                    color: options.hotspot.color,
                    side: THREE.DoubleSide,
                    transparent: true
                });
                var hotspotMesh = new THREE.Mesh(planeGeometry, hotspotMaterial);
                hotspotMesh.name = connectingRoom;

                // Position the hotspot
                var dist = 250;
                var xThis = aptData.map.room_locations[currentRoom].x,
                    yThis = aptData.map.room_locations[currentRoom].y,
                    xOther = aptData.map.room_locations[connectingRoom].x,
                    yOther = aptData.map.room_locations[connectingRoom].y;
                var vRel = new THREE.Vector3(xThis - xOther, 0, yThis - yOther);
                var vRelNorm = vRel.normalize();
                hotspotMesh.position.set(vRelNorm.z * dist, 0, -vRelNorm.x * dist);
                hotspotMesh.lookAt(camera.position);

                hotspotGroup.add(hotspotMesh);
            });
            scene.add(hotspotGroup);
        },

        getPanorama: function (roomId) {
            var geometry, material;
            var room = aptData.rooms[roomId];

            switch (room.panorama.type) {
                case constants.PAN_TYPE.SPHERE:
                    geometry = new THREE.SphereBufferGeometry(500, 60, 40);
                    // invert the geometry on the x-axis so that all of the faces point inward
                    geometry.scale(-1, 1, 1);

                    material = new THREE.MeshBasicMaterial({
                        map: roomImages[roomId]
                    });
                    break;
                case constants.PAN_TYPE.CUBE:
                    geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                    geometry.scale(1, 1, -1);

                    var textures = roomImages[roomId];
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

        getPointerEventPos: function (event) {
            var rect = canvas.getBoundingClientRect();
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
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        },

        resetHUD: function (width, height) {
            var scaleDiffW = canvasWidth / width;
            var scaleDiffH = canvasHeight / height;

            var sizeAlt = self.getSizeAlt();
            HUDGroup.children.forEach(function (hudEl) {
                var size = self.getSize(options[hudEl.name].transform.size);
                if (hudEl.name === 'map') {
                    hudEl.scale.x = size.x * scaleDiffW;
                    hudEl.scale.y = size.y * scaleDiffH;
                } else {
                    hudEl.scale.x = size.x * sizeAlt * scaleDiffW;
                    hudEl.scale.y = size.y * sizeAlt * scaleDiffH;
                }
            });

            cameraHUD.aspect = width / height;
            cameraHUD.updateProjectionMatrix();
        },

        onResize: function (event) {
            var newWidth, newHeight;
            if ((window.innerWidth-marginWidth) * options.canvas.height_difference < window.innerHeight-marginHeight) {
                // Adapt canvas after the window's width
                newWidth = window.innerWidth - marginWidth;
                var diff = newWidth / canvasWidth;
                newHeight = canvasHeight * diff;
            } else {
                // Adapt canvas after the window's height
                newHeight = window.innerHeight - marginHeight;
                var diff = newHeight / canvasHeight;
                newWidth = canvasWidth * diff;
            }

            self.resetSize(newWidth, newHeight);
            self.resetHUD(newWidth, newHeight);

            canvas.style.width = newWidth + 'px';
            canvas.style.height = newHeight + 'px';
            canvasWidth = newWidth;
            canvasHeight = newHeight;
        },

        onFullscreenChange: function () {
            isFullscreen = !isFullscreen;
            if (isFullscreen) {
                self.resetSize(window.innerWidth, window.innerHeight);
                self.resetHUD(window.innerWidth, window.innerHeight);

                // TODO: Change color and background when changing image too
                var fsMat = sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                fsMat.map = new THREE.TextureLoader().load(options.fullscreen_icon.off_icon.image);
                fsMat.color.set(options.fullscreen_icon.off_icon.color
                    || options.fullscreen_icon.color);
                fsMat.needsUpdate = true;

                container.classList.add(constants.FULLSCREEN);
            } else {
                self.resetSize(canvasWidth, canvasHeight);
                self.resetHUD(canvasWidth, canvasHeight);

                var fsMat = sceneHUD.getObjectByName(constants.FULLSCREEN_ICON).material;
                fsMat.map = new THREE.TextureLoader().load(options.fullscreen_icon.image);
                fsMat.color.set(options.fullscreen_icon.color);
                fsMat.needsUpdate = true;

                container.classList.remove(constants.FULLSCREEN);
            }
        },

        onMouseover: function (event) {
            if (event.target === canvas) {
                isMouseover = true;
            }
        },

        onMouseout: function (event) {
            isMouseover = false;
        },

        onPointerMove: function (event) {
            if (isUserInteracting) {
                var rot_speed = options.camera.mouse_rotation_speed
                lon = (clientXStart - event.clientX) * rot_speed + lonStart;
                lat = (event.clientY - clientYStart) * rot_speed + latStart;
            }

            // Update pointerVector for all the raycasting
            var mousePos = self.getPointerEventPos(event);
            pointerVector.x = (mousePos.x / canvas.offsetWidth) * 2 - 1;
            pointerVector.y = -(mousePos.y / canvas.offsetHeight) * 2 + 1;

            // Raycast the hotspots for the tooltip system
            hoveringObj = null;
            raycaster.setFromCamera(pointerVector, camera);
            var intersects = raycaster.intersectObject(hotspotGroup, true);
            if (intersects.length > 0) {
                latestPointerProjection = intersects[0].point;
                hoveringObj = intersects[0].object;
                self.showTooltip();
            }
            else {
                self.hideTooltip();
            }

            // Change mouse cursor to 'pointer' when hovering over a clickable element
            if (hoveringObj) {
                $('html,body').css('cursor', 'pointer');
            } else {
                raycaster.setFromCamera(pointerVector, cameraHUD);
                var obj = self.getFirstValidRCObj(raycaster.intersectObject(HUDGroup, true));
                if (obj && obj.onclick)
                    $('html,body').css('cursor', 'pointer');
                else
                    $('html,body').css('cursor', 'default');
            }
        },

        onPointerDown: function (event) {
            // Raycast the HUD elements
            raycaster.setFromCamera(pointerVector, cameraHUD);
            hoveredHUDEl = self.getFirstValidRCObj(raycaster.intersectObject(HUDGroup, true));

            // Raycast the hotspot objects
            raycaster.setFromCamera(pointerVector, camera);
            hoveredHotspot = self.getFirstValidRCObj(raycaster.intersectObject(hotspotGroup, true));

            // TODO: Ignore isMouseover if using a mobile device/touchscreen
            if (isMouseover && event.clientX && !hoveredHUDEl) {
                autoRotate = false;
                decRotationRate = 0.9;
                isUserInteracting = true;

                var clientX = event.clientX || event.touches[0].clientX;
                var clientY = event.clientY || event.touches[0].clientY;
                clientXStart = clientX;
                clientYStart = clientY;
                lonStart = lonLast = lon;
                latStart = LatLast = lat;
            }
        },

        onPointerUp: function (event) {
            if (hoveredHUDEl) {
                raycaster.setFromCamera(pointerVector, cameraHUD);
                var obj = self.getFirstValidRCObj(raycaster.intersectObject(HUDGroup, true));
                if (obj && obj === hoveredHUDEl && obj.onclick) {
                    obj.onclick();
                }
            } else if (hoveredHotspot) {
                raycaster.setFromCamera(pointerVector, camera);
                var obj = self.getFirstValidRCObj(raycaster.intersectObject(hotspotGroup, true));
                if (obj && obj === hoveredHotspot) {
                    self.changeRoom(hoveredHotspot.name);
                }
            }

            if (isUserInteracting) {
                velCam.set(lonAcc.average(), latAcc.average());
                lonAcc.clear();
                latAcc.clear();
            }

            isUserInteracting = false;
        },

        onTouchMove: function (event) {
            // Ignore if more than one touch is registered
            if (event.target !== canvas || event.touches.length > 1)
                return;

            // Update pointerVector for all the raycasting
            var touchPos = self.getPointerEventPos(event);
            pointerVector.x = (touchPos.x / canvas.offsetWidth) * 2 - 1;
            pointerVector.y = -(touchPos.y / canvas.offsetHeight) * 2 + 1;

            if (isUserInteracting) {
                var clientX = event.touches[0].clientX;
                var clientY = event.touches[0].clientY;
                var rot_speed = options.camera.touch_rotation_speed;
                lon = (clientXStart - clientX) * rot_speed + lonStart;
                lat = (clientY - clientYStart) * rot_speed + latStart;
            }
        },

        onTouchStart: function (event) {
            // Ignore if more than one touch is registered
            if (event.target !== canvas || event.touches.length > 1)
                return;

            // Update pointerVector for all the raycasting
            var touchPos = self.getPointerEventPos(event);
            pointerVector.x = (touchPos.x / canvas.offsetWidth) * 2 - 1;
            pointerVector.y = -(touchPos.y / canvas.offsetHeight) * 2 + 1;

            // Raycast the HUD elements
            raycaster.setFromCamera(pointerVector, cameraHUD);
            hoveredHUDEl = self.getFirstValidRCObj(raycaster.intersectObject(HUDGroup, true));

            // Raycast the hotspot objects
            raycaster.setFromCamera(pointerVector, camera);
            hoveredHotspot = self.getFirstValidRCObj(raycaster.intersectObject(hotspotGroup, true));

            if (!hoveredHUDEl) {
                autoRotate = false;
                decRotationRate = 0.9;
                isUserInteracting = true;

                clientXStart = event.touches[0].clientX;
                clientYStart = event.touches[0].clientY;
                lonStart = lonLast = lon;
                latStart = LatLast = lat;
            }
        },

        onTouchEnd: function (event) {
            // Ignore if more than one touch is registered
            if (event.target !== canvas)
                return;

            if (hoveredHUDEl) {
                raycaster.setFromCamera(pointerVector, cameraHUD);
                var obj = self.getFirstValidRCObj(raycaster.intersectObject(HUDGroup, true));
                if (obj && obj === hoveredHUDEl && obj.onclick)
                    obj.onclick();
            }
            else if (hoveredHotspot) {
                if (hoveredHotspot === hoveringObj) {
                    self.changeRoom(hoveredHotspot.name);
                    hoveringObj = undefined;
                }
                else {
                    raycaster.setFromCamera(pointerVector, camera);
                    var intersects = raycaster.intersectObject(hotspotGroup, true);
                    if (intersects.length > 0 && intersects[0].object === hoveredHotspot) {
                        latestPointerProjection = intersects[0].point;
                        hoveringObj = intersects[0].object;
                        self.showTooltip();
                    }
                }
            }
            else {
                hoveringObj = undefined;
                self.hideTooltip();
            }

            if (isUserInteracting) {
                velCam.set(lonAcc.average(), latAcc.average());
                lonAcc.clear();
                latAcc.clear();
            }

            isUserInteracting = false;
        },

        animate: function () {
            animation = requestAnimationFrame(self.animate);
            self.update();
        },

        update: function () {
            var delta = clock.getDelta();

            if (isUserInteracting) {
                lonAcc.add(lon - lonLast);
                latAcc.add(lat - LatLast);
                lonLast = lon, LatLast = lat;

                clearTimeout(autoRotateTimeout);
                autoRotateTimeout = setTimeout(function () {
                    autoRotateTimeout = undefined;
                    velCam.set(0, 0);
                    autoRotate = true;
                }, options.camera.auto_rotate.secs_to_rotate * 1000);
            } else if (!autoRotate) {
                if (options.camera.smooth_out.enable) {
                    var decRate = 0.1 + decRotationRate;
                    var smoothOutRate = options.camera.smooth_out.decrease_rate;
                    decRotationRate = Math.max(0, decRotationRate - smoothOutRate * delta);
                    velCam.set(Math.max(0, Math.abs(velCam.x) * decRate) * Math.sign(velCam.x),
                               Math.max(0, Math.abs(velCam.y) * decRate) * Math.sign(velCam.y));

                    lon += velCam.x;
                    lat += velCam.y;
                }
            } else if (options.camera.auto_rotate.enable) {
                var smoothLonRate = options.camera.auto_rotate.smooth_in_x_rate;
                var smoothLatRate = options.camera.auto_rotate.smooth_in_y_rate;

                // Smooth rotate lon
                velCam.x = Math.min(velCam.x + smoothLonRate * delta, maxVelLon);

                // Smooth lat close into 0
                if (Math.abs(lat) > 0.5) {
                    var velLat = Math.abs(velCam.y) + smoothLatRate * delta;
                    velCam.y = Math.min(velLat, maxVelLat) * -Math.sign(lat);
                } else if (Math.abs(velCam.y) > 0.001) {
                    velCam.y = Math.max(0, Math.abs(velCam.y) * 0.95) * Math.sign(velCam.y);
                } else {
                    velCam.y = 0;
                }

                lon += velCam.x;
                lat += velCam.y;
            }

            lat = Math.min(Math.max(-85, lat), 85);
            phi = THREE.Math.degToRad(90 - lat);
            theta = THREE.Math.degToRad(lon);

            camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
            camera.target.y = 500 * Math.cos(phi);
            camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(camera.target);

            renderer.render(scene, camera);
            renderer.render(sceneHUD, cameraHUD);
        },

        showTooltip: function () {
            var tooltipDiv = $('#'+ constants.TOOLTIP)[0];

            if (tooltipDiv && hoveringObj) {
                tooltipDiv.style.display = "block";

                var canvasData = canvas.getBoundingClientRect();
                var canvasHalfWidth = canvasData.width * 0.5;
                var canvasHalfHeight = canvasData.height * 0.5;

                var tooltipPosition = latestPointerProjection.clone().project(camera);
                tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + canvasData.left;
                tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + canvasData.top;

                var tootipWidth = tooltipDiv.offsetWidth;
                var tootipHeight = tooltipDiv.offsetHeight;

                tooltipDiv.style.left = tooltipPosition.x - tootipWidth * 0.5 + 'px';
                tooltipDiv.style.top = tooltipPosition.y - tootipHeight - 5 + 'px';

                tooltipDiv.innerText = this.prettyString(hoveringObj.name);

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
            var mapIconSprite = sceneHUD.getObjectByName(constants.MAP_ICON);
            self.changeOpacity(mapIconSprite, 0);
            self.changeOpacity(mapSprite, 1);
        },

        hideMap: function () {
            var mapIconSprite = sceneHUD.getObjectByName(constants.MAP_ICON);
            self.changeOpacity(mapIconSprite, 1);
            self.changeOpacity(mapSprite, 0);
        },

        changeOpacity: function (sprite, opacity) {
            sprite.material.opacity = opacity;
            sprite.children.forEach(function (childSprite) {
                childSprite.material.opacity = opacity;
            });
        },

        changeRoom: function (roomId) {
            if (roomId === currentRoom) {
                return;
            }

            // Update map hotspot images to show which is the current room
            if (HUDGroup.getObjectByName(currentRoom)) {
                var prevRoomMat = HUDGroup.getObjectByName(currentRoom).material;
                var newRoomMat = HUDGroup.getObjectByName(roomId).material;
                prevRoomMat.map = new THREE.TextureLoader().load(options.map_hotspot.image);
                newRoomMat.map = new THREE.TextureLoader().load(options.map_hotspot.current.image);
                prevRoomMat.needsUpdate = true;
                newRoomMat.needsUpdate = true;
            }

            // Change panorama image
            // TODO: Some sort of transition, fade in and out of black?
            var panorama = this.getPanorama(roomId);
            skybox.geometry = panorama.geometry;
            skybox.material = panorama.material;
            currentRoom = roomId;

            // Change the hotspots
            scene.remove(hotspotGroup);
            hotspotGroup = new THREE.Group();
            this.addHotspots();

            this.hideTooltip();
            hoveringObj = undefined;
        },

        topPos: function (px) {
            var canvasData = canvas.getBoundingClientRect();
            return canvasData.height * 0.5 - px;
        },

        bottomPos: function (px) {
            var canvasData = canvas.getBoundingClientRect();
            return px - canvasData.height * 0.5;
        },

        leftPos: function (px) {
            var canvasData = canvas.getBoundingClientRect();
            return px - canvasData.width * 0.5;
        },

        rightPos: function (px) {
            var canvasData = canvas.getBoundingClientRect();
            return canvasData.width * 0.5 - px;
        },

        toggleMeasurements: function () {
            if (isShowingMeasurements) {
                self.hideMeasurements();
            } else {
                self.showMeasurements();
            }
        },

        showMeasurements: function () {
            //TODO: show measurements of walls, windows, doors, etc.
            var material = new THREE.MeshBasicMaterial({
                map: roomImages[currentRoom]
            });
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            isShowingMeasurements = true;
        },

        hideMeasurements: function () {
            //TODO: hide measurements

            isShowingMeasurements = false;
        },

        toggleFullscreen: function () {
            if (isFullscreen)
                self.closeFullscreen();
            else
                self.openFullscreen();
        },

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
