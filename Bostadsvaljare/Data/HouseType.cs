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
                                new Floorplan.Room { RoomID = 6, Coords = new Vector2 { X = 300, Y = 250 } },
                                new Floorplan.Room { RoomID = 7, Coords = new Vector2 { X = 520, Y = 220 } },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Adjust-KitchenG3KT2.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/360vardagsrumplaceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360motkökplceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/360vindplaceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/ZoFVLMtIU0ojCILGEjYb", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },                        
                            new Image { Source="IMG/Ext1-5grey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5red.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5redAndgrey.jpg", Type=ImageType.Image },

                  




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
