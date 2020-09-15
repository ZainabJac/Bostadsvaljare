panOptions = {
    camera: {
        mouse_rotation_speed: 0.075,
        touch_rotation_speed: 0.375,
        smooth_stop: {
            enable: true,
            decrease_rate: 1
        },
        auto_rotate: {
            enable: true,
            secs_to_rotate: 10,
            smooth_in_x_rate: 0.05,
            x_max_velocity: 0.075,
            smooth_in_y_rate: 0.009,
            y_max_velocity: 0.05
        }
    },
    canvas: {
        cover_window: false,
        height_difference: 0.75
    },
    hud: {
        mobile: {
            width_at_most: 768,
            size_alt: 0.4
        }
    },
    map: {
        transform: {
            position: {
                bottom: 15,
                right: 15,
                center: { x: 1, y: 0 }
            }
        }
    },
    map_icon: {
        image: "IMG/icons/pan/map_icon.png",
        color: "#415965",
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
        }
        
    },
    map_hotspot: {
        image: "IMG/icons/pan/plan_hotspot.png",
        color: "#415965",
        transform: {
            size: {
                width: 13,
                height: 13
            }
        },
        current: {
            image: "IMG/icons/pan/plan_hotspot_current.png"
        }
    },
    minimize_icon: {
        image: "IMG/icons/pan/Closeicon.png",
        color: "#415965",
        transform: {
            position: {
                top: 0,
                right: 0,
                center: { x: 1, y: 1 }
            },
            size: {
                width: 15,
                height: 15
            },
        },
      
    },
    hotspot: {
        image: "IMG/icons/pan/hotspot.png",
        color: "#415965",
        transform: {
            size: {
                width: 16,
                height: 16
            }
        }
    },
    fullscreen_icon: {
        image: "IMG/icons/pan/fullscreen_on_icon.png",
        color: "#415965",
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
       
        off_icon: {
            image: "IMG/icons/pan/fullscreen_off_icon.png"
        }
    },
    measurements_icon: {
        image: "IMG/icons/pan/fullscreen_on_icon.png",
        color: "#415965",
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
     
        off_icon: {
            image: "IMG/icons/pan/fullscreen_off_icon.png"
        }
    }
};
