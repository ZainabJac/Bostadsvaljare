using System.Collections.Generic;
using System.Numerics;

namespace Bostadsvaljare.Data
{
    public enum ImageType
    {
        Image,
        Panorama,
        VR
    }

    public class HouseType
    {
        private static Dictionary<string, HouseType> data;

        public class Image
        {
            public int RoomID { get; set; }
            public string Source { get; set; }
            public ImageType Type { get; set; }
            public string Link { get; set; }
        }

        public class Floorplan
        {
            public class Room
            {
                public Vector2 Coords { get; set; }
                public int RoomID { get; set; }
            }

            public string Source { get; set; }
            public List<Room> Rooms { get; set; }
        }

        public List<Floorplan> Floorplans { get; set; }
        public List<Image> Images { get; set; }
        public string Comment { get; set; }

        public static HouseType GetData(string type)
        {
            if (data == null) {
                data = new Dictionary<string, HouseType> {
                    { "G3K", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { RoomID = 0, Source="IMG/G3K(t) - Översikt.png", Type=ImageType.Image },
                            new Image { RoomID = 1, Source="IMG/G3K(t) - Soffgrupp.png", Type=ImageType.Image },
                            new Image { RoomID = 2, Source="IMG/G3K(t)Vind Vardagsrum.png", Type=ImageType.Image },
                            new Image { RoomID = 3, Source="IMG/G3K(t) - Vind 1.png", Type=ImageType.VR, Link="https://player.vimeo.com/video/393178231" },
                            new Image { RoomID = 4, Source="IMG/G3K(t) - Vind 1.png", Type=ImageType.Panorama, Link="apt_data" },
                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},
                    { "V2", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                            new Floorplan { Source = "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { Coords = new Vector2 { X = 700, Y = 300 }, RoomID = 0 },
                                new Floorplan.Room { Coords = new Vector2 { X = 1160, Y = 510 }, RoomID = 1 },
                                new Floorplan.Room { Coords = new Vector2 { X = 800, Y = 720 }, RoomID = 4 },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { RoomID = 0, Source="IMG/G3K(t) - Soffgrupp.png", Type=ImageType.Image },
                            new Image { RoomID = 1, Source="IMG/G3K(t) - röd.jpg", Type=ImageType.Image },
                            new Image { RoomID = 2, Source="IMG/G3K(t) - svart.jpg", Type=ImageType.Image },
                            new Image { RoomID = 3, Source="IMG/Extra_G3K(t).png", Type=ImageType.VR, Link="https://player.vimeo.com/video/393178231" },
                            new Image { RoomID = 4, Source="IMG/Extra 2_G3K(t).png", Type=ImageType.Panorama, Link="apt_data" },
                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},
                };
            }

            return data[type];
        }
    }
}
