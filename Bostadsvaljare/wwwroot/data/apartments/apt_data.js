someUniqueHouseID = {
    entry: "vardagsrum",
    map: {
        image: "IMG/apts/floor_plan.png",
        size: 0.6,
        hidden_at_start: true,
        room_locations: {
            vardagsrum: { x: 185, y: 215 },
            kok: { x: 85, y: 330 },
            vind: { x: 65, y: 200 },
        }
    },
    rooms: {

        vardagsrum: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/LivingroomPano_2-A_Ready.jpg"
            },
            measurements: ""
        },

        kok: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/KithchenPano_2-A_Ready.jpg"
            },
            measurements: ""
        },

        vind: {
            panorama: {
                type: "sphere",
                imageURL: "IMG/apts/VindPano_2-A_Ready.jpg"
            },
            measurements: ""
        },
    }
};
