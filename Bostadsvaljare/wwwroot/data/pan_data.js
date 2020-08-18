panData = {
    camera: {
        rotation_speed: 0.075,
        smooth_out: {
            enable: true,
            decrease_rate: 1
        },
        auto_rotate: {
            enable: true,
            secs_to_rotate: 30,
            smooth_in_x_rate: 0.05,
            x_max_velocity: 0.075,
            smooth_in_y_rate: 0.009,
            y_max_velocity: 0.05
        }
    },
    map_icon: {
        image: "IMG/icons/pan/map_icon.png",
        color: "#fff",
        transform: {
            position: {
                bottom: 15,
                right: 15,
                center: { x: 1, y: 0 }
            },
            size: {
                width: 50,
                height: 50
            }
        },
        background: {
            type: "image",
            image: "IMG/icons/pan/bg.png",
            color: "#1fa2a7"
        }
    },
    map_hotspot: {
        image: "IMG/icons/pan/plan_hotspot.png",
        color: "#2c91d2",
        transform: {
            size: {
                width: 22,
                height: 22
            }
        },
        current: {
            image: "IMG/icons/pan/plan_hotspot_current.png"
        }
    },
    minimize_icon: {
        image: "IMG/icons/pan/minimize_bg.png",
        color: "#c6b73a",
        transform: {
            position: {
                top: 0,
                right: 0,
                center: { x: 1, y: 1 }
            },
            size: {
                width: 28,
                height: 20
            }
        }
    },
    hotspot: {
        image: "IMG/icons/pan/hotspot.png",
        color: "#57b9de",
        transform: {
            size: {
                width: 16,
                height: 16
            }
        }
    },
    fullscreen_icon: {
        image: "IMG/icons/pan/fullscreen_on_icon.png",
        color: "#eee",
        transform: {
            position: {
                bottom: 15,
                left: 15,
                center: { x: 0, y: 0 }
            },
            size: {
                width: 50,
                height: 50
            }
        },
        background: {
            type: "image",
            image: "IMG/icons/pan/bg.png",
            color: "#1fa2a7"
        },
        off_icon: {
            image: "IMG/icons/pan/fullscreen_off_icon.png"
        }
    },
    measurements_icon: {
        image: "IMG/icons/pan/fullscreen_on_icon.png",
        color: "#eee",
        transform: {
            position: {
                bottom: 15,
                left: 90,
                center: { x: 0, y: 0 }
            },
            size: {
                width: 50,
                height: 50
            }
        },
        background: {
            type: "image",
            image: "IMG/icons/pan/bg.png",
            color: "#1fa2a7"
        },
        off_icon: {
            image: "IMG/icons/pan/fullscreen_off_icon.png"
        }
    }
};
