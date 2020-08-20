someUniqueHouseID = {
    entry: "vardagsrum",
    map: {
        image: "IMG/apts/floor_plan.png",
        background: {
            type: "image",
            image: "IMG/apts/bg.png",
            color: "#1fa2a7"
        },
        transform: {
            position: {
                bottom: 15,
                right: 15,
                center: { x: 1, y: 0 }
            }
        },
        size: 0.6,
        start_invisible: true,
        room_locations: {
            sovrum_1: { x: 85, y: 330 },
            vardagsrum: { x: 185, y: 215 },
            badrum: { x: 65, y: 200 },
            sovrum_2: { x: 112, y: 88 },
            kub_test: { x: 25, y: 25 }
        }
    },
    rooms: {
        kub_test: {
            panorama: {
                type: "cube",
                imageURL: "IMG/apts/6x1 cubemap-1.jpg"
            },
            connections: [],
            measurements: ""
        },
        sovrum_2: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/50529059_345003612753842_2555757440951910400_n.jpg"
            },
            connections: [
                "vardagsrum"
            ],
            measurements: ""
        },
        vardagsrum: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/50539551_337712853497077_8975541879730864128_n.jpg"
            },
            connections: [
                "sovrum_1",
                "badrum",
                "sovrum_2"
            ],
            measurements: ""
        },
        badrum: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/50742035_2268850793348595_967562269573513216_n.jpg"
            },
            connections: [
                "vardagsrum"
            ],
            measurements: ""
        },
        sovrum_1: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/51308491_2494186343988019_5495318412219383808_n.jpg"
            },
            connections: [
                "vardagsrum"
            ],
            measurements: ""
        }
    }
};
