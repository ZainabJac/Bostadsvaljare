using System.Collections.Generic;
using System.Numerics;

namespace Bostadsvaljare.Data
{
    public enum ImageType
    {
        Image,
        Panorama,
        VR,
        Roundme
    }

    public class HouseType
    {
        private static Dictionary<string, HouseType> data;

        public class Image
        {
            public string Source { get; set; }
            public ImageType Type { get; set; }
            public string Link { get; set; }
            public string RoomName { get; set; }
        }

        public class Floorplan
        {
            public class Room
            {
                public int RoomID { get; set; }
                public Vector2 Coords { get; set; }
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
                            new Floorplan { Source = "IMG/plan1.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 0, Coords = new Vector2 { X = 700, Y = 120 } },
                                new Floorplan.Room { RoomID = 3, Coords = new Vector2 { X = 700, Y = 300 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 540, Y = 300 } },
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 600, Y = 170 } },
                                new Floorplan.Room { RoomID = 2, Coords = new Vector2 { X = 430, Y = 300 } },
                            }},
                            new Floorplan { Source = "IMG/plan2.png", Rooms = new List<Floorplan.Room> {
                                
                            }},
                            new Floorplan { Source = "IMG/plan3.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 5, Coords = new Vector2 { X = 180, Y = 220 } },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3kt-Vardagsrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kt-vardagsrum(kitchen).jpg", Type=ImageType.Image },
                             new Image { Source="IMG/Adjust-KitchenG3KT.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3KT-LIVINGROOMPANO.jpg", Type=ImageType.Roundme, Link="https://roundme.com/tour/622855/view/1975510/", RoomName="vardagsrum" },
                            new Image { Source="IMG/G3kt-vardagsrum(kitchen).jpg", Type=ImageType.Panorama, Link="apt_data", RoomName="kok" },
                            new Image { Source="IMG/G3KT-VIND.jpg", Type=ImageType.Panorama, Link="apt_data", RoomName="vind" },
                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},
                    { "V2", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "IMG/plan1.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 0, Coords = new Vector2 { X = 700, Y = 300 } },
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 1160, Y = 510 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 800, Y = 720 } },
                            }},
                            new Floorplan { Source = "IMG/plan1.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 0, Coords = new Vector2 { X = 700, Y = 300 } },
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 1160, Y = 510 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 800, Y = 720 } },
                            }},
                            new Floorplan { Source = "IMG/plan1.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 0, Coords = new Vector2 { X = 700, Y = 300 } },
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 1160, Y = 510 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 800, Y = 720 } },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3K(t) - Soffgrupp.png", Type=ImageType.Image },
                            new Image { Source="IMG/G3K(t) - röd.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3K(t) - svart.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Extra_G3K(t).png", Type=ImageType.VR, Link="https://player.vimeo.com/video/393178231" },
                            new Image { Source="IMG/Extra 2_G3K(t).png", Type=ImageType.Panorama, Link="apt_data", RoomName="vardagsrum" },
                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},
                };
            }

            return data[type];
        }
    }
}
