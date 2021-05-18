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

                public string Top { get; set; }

                public string Left { get; set; }

                public string IconClass { get; set; }
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
                    { "G3K-grey", new HouseType {
                             Floorplans = new List<Floorplan> {
                                    new Floorplan { Source = "IMG/G3(kt)-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 6, Left = "63.5%", Top="54%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 4, Left = "56%", Top="60%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 2, Left = "63%", Top="30%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 5, Left = "74%", Top="42%", IconClass="fas fa-street-view"  },
                                new Floorplan.Room { RoomID = 3, Left = "63%", Top="41%",  IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "36%", Top="45%",  IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 8, Left = "31%", Top="59%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-2-50.png", Rooms = new List<Floorplan.Room> {
                                 new Floorplan.Room { RoomID = 9, Left = "34%", Top="52%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 10, Left = "59%", Top="53%", IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 11, Left = "47%", Top="34%", IconClass="fas fa-video" },

                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-3-a50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 12, Left = "44%", Top="52%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 13,  Left = "53%", Top="44%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 14, Left = "64%", Top="33%", IconClass="fas fa-camera"},
                                  new Floorplan.Room { RoomID = 15, Left = "47%", Top="31%", IconClass="fas fa-video" },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/Ext1-5redAndgrey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5grey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Adjust-KitchenG3KT2.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready50.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360Iconplaceholder-g3k-living.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/Bathroom_1-(G3_Floor-1).jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready_25_VR.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525519517", RoomName="kok" },
                            new Image { Source="IMG/G3_Sovrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3-G2_Badrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3_Sovrum_vr25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525570276", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/panoplaceholderaddict25.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/6CquaWdm6YJXayR1DK9v", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/g3kfloor3workandplay_vr_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525540496", RoomName="kok" },
                            new Image { Source="IMG/20210121_Uterum-1_1_25.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-1_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-2_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-3_3D_medium.jpg", Type=ImageType.Image },


                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},
                         { "G3K-red", new HouseType {
                      Floorplans = new List<Floorplan> {
                                    new Floorplan { Source = "IMG/G3(kt)-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 6, Left = "63.5%", Top="54%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 4, Left = "56%", Top="60%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 2, Left = "63%", Top="30%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 5, Left = "74%", Top="42%", IconClass="fas fa-street-view"  },
                                new Floorplan.Room { RoomID = 3, Left = "63%", Top="41%",  IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "36%", Top="45%",  IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 8, Left = "31%", Top="59%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-2-50.png", Rooms = new List<Floorplan.Room> {
                                 new Floorplan.Room { RoomID = 9, Left = "34%", Top="52%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 10, Left = "59%", Top="53%", IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 11, Left = "47%", Top="34%", IconClass="fas fa-video" },

                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-3-a50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 12, Left = "44%", Top="52%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 13,  Left = "53%", Top="44%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 14, Left = "64%", Top="33%", IconClass="fas fa-camera"},
                                  new Floorplan.Room { RoomID = 15, Left = "47%", Top="31%", IconClass="fas fa-video" },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/Ext1-5redAndgrey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Ext1-5red.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Adjust-KitchenG3KT2.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready50.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360Iconplaceholder-g3k-living.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/Bathroom_1-(G3_Floor-1).jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready_25_VR.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525519517", RoomName="kok" },
                            new Image { Source="IMG/G3_Sovrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3-G2_Badrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3_Sovrum_vr25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525570276", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/panoplaceholderaddict25.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/6CquaWdm6YJXayR1DK9v", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/g3kfloor3workandplay_vr_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525540496?background=1", RoomName="kok" },
                            new Image { Source="IMG/20210121_Uterum-1_1_25.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-1_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-2_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-3_3D_medium.jpg", Type=ImageType.Image },

                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},

                     { "G3K-top-grey", new HouseType {
                            Floorplans = new List<Floorplan> {
                                    new Floorplan { Source = "IMG/G3(kt)-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 6, Left = "63.5%", Top="54%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 4, Left = "56%", Top="60%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 2, Left = "63%", Top="30%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 5, Left = "74%", Top="42%", IconClass="fas fa-street-view"  },
                                new Floorplan.Room { RoomID = 3, Left = "63%", Top="41%",  IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "36%", Top="45%",  IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 8, Left = "31%", Top="59%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-2-50.png", Rooms = new List<Floorplan.Room> {
                                 new Floorplan.Room { RoomID = 9, Left = "34%", Top="52%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 10, Left = "59%", Top="53%", IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 11, Left = "47%", Top="34%", IconClass="fas fa-video" },

                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-3-a50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 12, Left = "44%", Top="52%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 13,  Left = "53%", Top="44%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 14, Left = "64%", Top="33%", IconClass="fas fa-camera"},
                                  new Floorplan.Room { RoomID = 15, Left = "47%", Top="31%", IconClass="fas fa-video" },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3G3kt-Område-11Gata_25.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/Ext1-5grey.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready50.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360Iconplaceholder-g3k-living.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/Bathroom_1-(G3_Floor-1).jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready_25_VR.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525519517", RoomName="kok" },
                            new Image { Source="IMG/G3_Sovrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3-G2_Badrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3_Sovrum_vr25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525570276", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/panoplaceholderaddict25.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/6CquaWdm6YJXayR1DK9v", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/g3kfloor3workandplay_vr_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525540496", RoomName="kok" },
                            new Image { Source="IMG/20210121_Uterum-1_1_25.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-1_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-2_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-3_3D_medium.jpg", Type=ImageType.Image },

                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},

                       { "G3K-top-red", new HouseType {
                        Floorplans = new List<Floorplan> {
                                    new Floorplan { Source = "IMG/G3(kt)-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 6, Left = "63.5%", Top="54%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 4, Left = "56%", Top="60%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 2, Left = "63%", Top="30%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 5, Left = "74%", Top="42%", IconClass="fas fa-street-view"  },
                                new Floorplan.Room { RoomID = 3, Left = "63%", Top="41%",  IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "36%", Top="45%",  IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 8, Left = "31%", Top="59%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-2-50.png", Rooms = new List<Floorplan.Room> {
                                 new Floorplan.Room { RoomID = 9, Left = "34%", Top="52%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 10, Left = "59%", Top="53%", IconClass="fas fa-camera" },
                                  new Floorplan.Room { RoomID = 11, Left = "47%", Top="34%", IconClass="fas fa-video" },

                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-3-a50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 12, Left = "44%", Top="52%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 13,  Left = "53%", Top="44%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 14, Left = "64%", Top="33%", IconClass="fas fa-camera"},
                                  new Floorplan.Room { RoomID = 15, Left = "47%", Top="31%", IconClass="fas fa-video" },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G3G3kt-Område-11Gata_25.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/Ext1-5red.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready50.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360Iconplaceholder-g3k-living.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/Bathroom_1-(G3_Floor-1).jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready_25_VR.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525519517", RoomName="kok" },
                            new Image { Source="IMG/G3_Sovrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3-G2_Badrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3_Sovrum_vr25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525570276", RoomName="kok" },
                            new Image { Source="IMG/G3kfloor3sofa.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/panoplaceholderaddict25.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/6CquaWdm6YJXayR1DK9v", RoomName="vind" },
                            new Image { Source="IMG/G3kfloor3workAndplay.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/g3kfloor3workandplay_vr_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525540496", RoomName="kok" },
                            new Image { Source="IMG/20210121_Uterum-1_1_25.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-1_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-2_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-3_3D_medium.jpg", Type=ImageType.Image },

                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},

                    { "G2", new HouseType {
                        Floorplans = new List<Floorplan> {
                           new Floorplan { Source = "IMG/G3(kt)-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 5, Left = "63.5%", Top="54%", IconClass="fas fa-street-view"},
                                new Floorplan.Room { RoomID = 3, Left = "56%", Top="60%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 1, Left = "63%", Top="30%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 4, Left = "74%", Top="42%", IconClass="fas fa-street-view"  },
                                new Floorplan.Room { RoomID = 2, Left = "63%", Top="41%",  IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 6, Left = "36%", Top="45%",  IconClass="fas fa-camera" },
                                 new Floorplan.Room { RoomID = 7, Left = "31%", Top="59%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G3(kt)-Plan-2-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 8, Left = "34%", Top="52%", IconClass="fas fa-camera"  },
                                new Floorplan.Room { RoomID = 9, Left = "59%", Top="53%", IconClass="fas fa-camera" },
                                       new Floorplan.Room { RoomID = 10, Left = "59%", Top="34%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/G2-Plan-3-50.png", Rooms = new List<Floorplan.Room> {
                                 new Floorplan.Room { RoomID = 11, Left = "50%", Top="35%", IconClass="fas fa-street-view" },
                                   new Floorplan.Room { RoomID = 12, Left = "55%", Top="41%", IconClass="fas fa-video" },
                            }},
                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/G2_Backside_25.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G2-Hus_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3kfloor1sofa.jpg", Type=ImageType.Image},
                            new Image { Source="IMG/G3kfloor1livingAndKitchen.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready50.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/5KtHD5XRR9URI3CE0W2V", RoomName="vardagsrum" },
                            new Image { Source="IMG/360Iconplaceholder-g3k-living.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/zbbOja9JGWDzc5v1WVZe", RoomName="kok" },
                            new Image { Source="IMG/Bathroom_1-(G3_Floor-1).jpg", Type=ImageType.Image },
                            new Image { Source="IMG/Livingroom_Extra_Ready_25_VR.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525519517", RoomName="kok" },
                            new Image { Source="IMG/G3_Sovrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3-G2_Badrum.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3_Sovrum_vr25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525570276", RoomName="kok" },
                            new Image { Source="IMG/360placeholderG2vind.jpg", Type=ImageType.Roundme, Link="https://roundme.com/embed/JKgK4Wb7OeqM4tfrHu6Y", RoomName="vind" },
                                new Image { Source="360vind.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/526129528", RoomName="kok" },
                            new Image { Source="IMG/G3(kt)-Plan-1_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G3(kt)-Plan-2_3D_medium.jpg", Type=ImageType.Image },
                            new Image { Source="IMG/G2-Plan-3_3D_medium.jpg", Type=ImageType.Image },


                        },
                        Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
                    }},


                

                    { "V2-grey", new HouseType {
                        Floorplans = new List<Floorplan> {
                                new Floorplan { Source = "IMG/V2-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 1, Left = "75%", Top="39%" , IconClass="fas fa-camera"},
                                new Floorplan.Room { RoomID = 10, Left = "68%", Top="9%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                    new Floorplan.Room { RoomID = 3, Left = "56%", Top="32%", IconClass="fas fa-street-view" },
                                     new Floorplan.Room { RoomID = 4, Left = "31%", Top="69%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/V2-Plan-2-48.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 9, Left = "62%", Top="57%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 2, Left = "64%", Top="35%", IconClass="fas fa-camera" },
                                   new Floorplan.Room { RoomID = 8, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                       new Floorplan.Room { RoomID = 5, Left = "67%", Top="25%", IconClass="fas fa-street-view" },
                                        new Floorplan.Room { RoomID = 6, Left = "47%", Top="53%", IconClass="fas fa-video" },

                            }},

                        },
                        Images = new List<Image> {                       
                            new Image { Source="IMG/Gata_grey_medium_low.jpg", Type=ImageType.Image, },
                            new Image { Source="IMG/V2_Allrum_plan1_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan2_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan1_75_50_Pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/LJdehwUq2x8sEg9ISr38", RoomName="vardagsrum" },
                            new Image { Source="IMG/V2_Allrum_plan1_VR_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525597946"},
                            new Image { Source="IMG/V2_Allrum_plan2_75_50_pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/6MsTWsWFbHNuQFZI22iZ",RoomName="allrum" },
                            new Image { Source="IMG/V2_Allrum_plan2_25_vr.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525598066?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" },
                            new Image { Source="IMG/Bathroom_3_(V2_Floor-1).jpg", Type=ImageType.Image,  },                           
                            new Image { Source="IMG/V2_Sovrum_Master_60.jpg", Type=ImageType.Image, },
                            new Image { Source="IMG/V2_Badrum_medium_25_canvas.jpg", Type=ImageType.Image,  },              
                            new Image { Source="IMG/Mood_red_webttestMedium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/20210122_Uterum-V2_25.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-1_3D_medium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-2_3D_medium.jpg", Type=ImageType.Image,  },
                           

                        },




                       
                    }},

                      { "V2-green", new HouseType {
                          Floorplans = new List<Floorplan> {
                                   new Floorplan { Source = "IMG/V2-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 1, Left = "75%", Top="39%" , IconClass="fas fa-camera"},
                                new Floorplan.Room { RoomID = 10, Left = "68%", Top="9%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                    new Floorplan.Room { RoomID = 3, Left = "56%", Top="32%", IconClass="fas fa-street-view" },
                                     new Floorplan.Room { RoomID = 4, Left = "31%", Top="69%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/V2-Plan-2-48.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 9, Left = "62%", Top="57%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 2, Left = "64%", Top="35%", IconClass="fas fa-camera" },
                                   new Floorplan.Room { RoomID = 8, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                       new Floorplan.Room { RoomID = 5, Left = "67%", Top="25%", IconClass="fas fa-street-view" },
                                        new Floorplan.Room { RoomID = 6, Left = "47%", Top="53%", IconClass="fas fa-video" },

                            }},

                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/Gata_Greens_medium_low.jpg", Type=ImageType.Image, },
                           new Image { Source="IMG/V2_Allrum_plan1_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan2_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan1_75_50_Pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/LJdehwUq2x8sEg9ISr38", RoomName="vardagsrum" },
                            new Image { Source="IMG/V2_Allrum_plan1_VR_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525597946"},
                            new Image { Source="IMG/V2_Allrum_plan2_75_50_pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/6MsTWsWFbHNuQFZI22iZ",RoomName="allrum" },
                            new Image { Source="IMG/V2_Allrum_plan2_25_vr.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525598066?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" },
                            new Image { Source="IMG/Bathroom_3_(V2_Floor-1).jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Sovrum_Master_60.jpg", Type=ImageType.Image, },
                            new Image { Source="IMG/V2_Badrum_medium_25_canvas.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/Mood_red_webttestMedium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/20210122_Uterum-V2_25.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-1_3D_medium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-2_3D_medium.jpg", Type=ImageType.Image,  },
                        },





                    }},

                        { "V2-red", new HouseType {
                                 Floorplans = new List<Floorplan> {
                             new Floorplan { Source = "IMG/V2-Plan-1-50.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 1, Left = "75%", Top="39%" , IconClass="fas fa-camera"},
                                new Floorplan.Room { RoomID = 10, Left = "68%", Top="9%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 7, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                    new Floorplan.Room { RoomID = 3, Left = "56%", Top="32%", IconClass="fas fa-street-view" },
                                     new Floorplan.Room { RoomID = 4, Left = "31%", Top="69%", IconClass="fas fa-video" },
                            }},
                            new Floorplan { Source = "IMG/V2-Plan-2-48.png", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 9, Left = "62%", Top="57%", IconClass="fas fa-camera" },
                                new Floorplan.Room { RoomID = 2, Left = "64%", Top="35%", IconClass="fas fa-camera" },
                                   new Floorplan.Room { RoomID = 8, Left = "31%", Top="44%", IconClass="fas fa-camera" },
                                       new Floorplan.Room { RoomID = 5, Left = "67%", Top="25%", IconClass="fas fa-street-view" },
                                        new Floorplan.Room { RoomID = 6, Left = "47%", Top="53%", IconClass="fas fa-video" },

                            }},

                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/V2Redhouse_medium_low.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan1_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan2_75_50.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Allrum_plan1_75_50_Pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/LJdehwUq2x8sEg9ISr38", RoomName="vardagsrum" },
                            new Image { Source="IMG/V2_Allrum_plan1_VR_25.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525597946"},
                            new Image { Source="IMG/V2_Allrum_plan2_75_50_pano.jpg", Type=ImageType.Roundme, Link=" https://roundme.com/embed/6MsTWsWFbHNuQFZI22iZ",RoomName="allrum" },
                            new Image { Source="IMG/V2_Allrum_plan2_25_vr.jpg", Type=ImageType.Roundme, Link="https://player.vimeo.com/video/525598066?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" },
                            new Image { Source="IMG/Bathroom_3_(V2_Floor-1).jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2_Sovrum_Master_60.jpg", Type=ImageType.Image, },
                            new Image { Source="IMG/V2_Badrum_medium_25_canvas.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/Mood_red_webttestMedium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/20210122_Uterum-V2_25.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-1_3D_medium.jpg", Type=ImageType.Image,  },
                            new Image { Source="IMG/V2-Plan-2_3D_medium.jpg", Type=ImageType.Image,  },

                        },


                        //iframesen måste ha olika sources. 


                    }},

                       { "V2-color", new HouseType {
                        Floorplans = new List<Floorplan> {
                            new Floorplan { Source = "V2_3D_Floor_Plan_1.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 4, Left = "10%", Top="60%" , IconClass="fas fa-dragon"  /*Coords = new Vector2 { X = 1150, Y = 1280 }*/ },
                                new Floorplan.Room { RoomID = 3, Left = "30%", Top="40%", IconClass="fas fa-dragon" /*Coords = new Vector2 { X = 800, Y = 720 }*/ },
                            }},
                            new Floorplan { Source = "IMG/plan2_low.jpg", Rooms = new List<Floorplan.Room> {
                                new Floorplan.Room { RoomID = 4, Left = "10%", Top="60%" /*Coords = new Vector2 { X = 1150, Y = 1280 }*/ },
                                new Floorplan.Room { RoomID = 3, Left = "30%", Top="40%" /*Coords = new Vector2 { X = 800, Y = 720 }*/ },
                            }},

                        },
                        Images = new List<Image> {
                            new Image { Source="IMG/Red_25.jpg", Type=ImageType.Image, Thumbnail="IMG/rodT.jpg" },
                            new Image { Source="IMG/Grey-Light_25.jpg", Type=ImageType.Image, Thumbnail="IMG/LjusgraT.jpg"},
                            new Image { Source="IMG/Grey-Dark_25.jpg", Type=ImageType.Image, Thumbnail="IMG/MorkgraT.jpg"},
                            new Image { Source="IMG/Green-Light_25.jpg", Type=ImageType.Image, Thumbnail="IMG/LjusgronT.jpg"},
                            new Image { Source="IMG/Green-Middle_25.jpg", Type=ImageType.Image, Thumbnail="IMG/MellangronT.jpg" },
                            new Image { Source="IMG/Green-Darkest_25.jpg", Type=ImageType.Image, Thumbnail="IMG/MorkgronT.jpg" },

                        },





                    }},
                };
            }

            return data[type];
        }
    }
}
