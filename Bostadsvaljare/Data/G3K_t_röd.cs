using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bostadsvaljare.Data
{
    public class G3K_t_röd
    {

        public enum ImageType
        {
            Image,
            Panorama,
            VR,
            Imagemap
        }

        public string Source { get; set; }
        public string Alt { get; set; }
        public ImageType ImgType { get; set; }
        public string Link { get; set; }
    }

}
