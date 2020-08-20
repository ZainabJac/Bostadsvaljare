using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bostadsvaljare.Data
{
    public class Houses
    {
        public int ID { get; set; }
        public int Area { get; set; }
        public string Housetype { get; set; }
        public double Sqm { get; set; }
        public string Price { get; set; }
        public double LandArea { get; set; }
        public string HouseNumber { get; set; }
        public string Status { get; set; }
    }
        
}
