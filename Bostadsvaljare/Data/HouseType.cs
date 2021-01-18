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

            public string Thumbnail { get; set; }
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
                            new Floorplan { Source = "IMG/plan1.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 0, Coords = new Vector2 { X = 964, Y = 334 } },
                                new Floorplan.Room { RoomID = 3, Coords = new Vector2 { X = 965, Y = 511 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 700, Y = 571 } },
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 885, Y = 415 } },
                                new Floorplan.Room { RoomID = 2, Coords = new Vector2 { X = 592, Y = 571 } },
                            }},
                            new Floorplan { Source = "IMG/plan2.jpg", Rooms = new List<Floorplan.Room> {
                                
                            }},
                            new Floorplan { Source = "IMG/plan3.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 6, Coords = new Vector2 { X = 569, Y = 446 } },
                                new Floorplan.Room { RoomID = 5, Coords = new Vector2 { X = 340, Y = 450 } },
                                new Floorplan.Room { RoomID = 7, Coords = new Vector2 { X = 850, Y = 450 } },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Adjust-KitchenG3KT2.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/360vardagsrumplaceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360motkökplceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/360vindplaceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/6CquaWdm6YJXayR1DK9v", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },                        
                            new Image { Source="IMG/Ext1-5grey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5red.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5redAndgrey.jpg", Type=ImageType.Image },

                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},

                    { "G2", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "IMG/plan1.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 1, Coords = new Vector2 { X = 964, Y = 334 } },
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 965, Y = 511 } },
                                new Floorplan.Room { RoomID = 5, Coords = new Vector2 { X = 700, Y = 571 } },
                                new Floorplan.Room { RoomID = 2, Coords = new Vector2 { X = 885, Y = 415 } },
                                new Floorplan.Room { RoomID = 3, Coords = new Vector2 { X = 592, Y = 571 } },
                            }},
                            new Floorplan { Source = "IMG/plan2.jpg", Rooms = new List<Floorplan.Room> {

                            }},
                            new Floorplan { Source = "IMG/plan3.jpg", Rooms = new List<Floorplan.Room> {
                            
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G2-Hus_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Adjust-KitchenG3KT2.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/360vardagsrumplaceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360motkökplceholder.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                    

                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},




                    { "V2", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "IMG/plan1_low.jpg", Rooms = new List<Floorplan.Room> {
                          
                            }},
                            new Floorplan { Source = "IMG/plan2_low.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 4, Coords = new Vector2 { X = 1150, Y = 1280 } },
                                new Floorplan.Room { RoomID = 3, Coords = new Vector2 { X = 800, Y = 720 } },
                            }},
                         
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/V2Redhouse_medium_low.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png" },
                            new Image { Source="IMG/Gata_grey_medium_low.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png"},
                            new Image { Source="IMG/Gata_Greens_medium_low.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png"},
                            new Image { Source="IMG/V2_Sovrum_Master_medium_low_25.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png"},
                            new Image { Source="IMG/V2_Badrum_medium_25_canvas.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png" },
                            new Image { Source="IMG/Mood_red_webttestMedium.jpg", Type=ImageType.Image, Thumbnail="IMG/color thumbnail.png" },


                        },


                       
                    }},
                };
            }

            return data[type];
        }
    }
}
