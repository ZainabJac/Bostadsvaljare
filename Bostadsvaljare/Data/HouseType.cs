using System.Collections.Generic;

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
        private static readonly Dictionary<string, HouseType> data = new Dictionary<string, HouseType> {
            { "G3K", new HouseType {
                Floorplans = new List<string> {
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                },
                Images = new List<Image> {
                    new Image { Source="IMG/G3K(t) - Översikt.png", Type=ImageType.Image },
                    new Image { Source="IMG/G3K(t) - Soffgrupp.png", Type=ImageType.Image },
                    new Image { Source="IMG/G3K(t)Vind Vardagsrum.png", Type=ImageType.Image },
                    new Image { Source="IMG/G3K(t) - Vind 1.png", Type=ImageType.VR, Link="https://player.vimeo.com/video/393178231" },
                    new Image { Source="IMG/G3K(t) - Vind 1.png", Type=ImageType.Panorama, Link="apt_data" },
                },
                Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
            }},
            { "V2", new HouseType {
                Floorplans = new List<string> {
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                    "IMG/Planritning-3D-exempelhus-enplan-141-kvm.jpg",
                },
                Images = new List<Image> {
                    new Image { Source="IMG/G3K(t) - Soffgrupp.png", Type=ImageType.Image },
                    new Image { Source="IMG/G3K(t) - röd.jpg", Type=ImageType.Image },
                    new Image { Source="IMG/G3K(t) - svart.jpg", Type=ImageType.Image },
                    new Image { Source="IMG/Extra_G3K(t).png", Type=ImageType.VR, Link="https://player.vimeo.com/video/393178231" },
                    new Image { Source="IMG/Extra 2_G3K(t).png", Type=ImageType.Panorama, Link="apt_data" },
                },
                Comment = "Med sin kubistiska utformning och minimalistiska formspråk sticker lägenheten ut från mängden. Här är det de anspråkslösa detaljerna som väcker intresset. Det stilrent takade entrépartiet följs upp invändigt av ett effektfullt ljusschakt med full takhöjd genom båda våningsplanen och ett högt glasparti."
            }},
        };

        public class Image
        {
            public string Source { get; set; }
            public ImageType Type { get; set; }
            public string Link { get; set; }
        }

        public List<string> Floorplans { get; set; }
        public List<Image> Images { get; set; }
        public string Comment { get; set; }

        public static HouseType GetData(string type)
        {
            return data[type];
        }
    }
}
