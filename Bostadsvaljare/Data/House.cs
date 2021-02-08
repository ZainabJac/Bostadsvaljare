﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bostadsvaljare.Data
{
    public class House
    {
        private static List<House> houseData;

        public int ID { get; set; }
        public int Area { get; set; }
        public string Housetype { get; set; }
        public string Sqm { get; set; }
        public string Price { get; set; }
        public string Rent { get; set; }
        public string LandArea { get; set; }
        public string HouseNumber { get; set; }
        public string Status { get; set; }
        public string Propertytyp { get; set; }

       

        public static House Get(int id)
        {
            return houseData.Find(house => house.ID == id);


        }

        public static House Getcolor(string housenumber)
        {
            return new House { ID = 0, Sqm = "148 m²", LandArea = "-", Price = "-", Rent = "-", HouseNumber = "0", Status = "comming", Housetype = "V2-color" };
        }

        public static List<House> GetHouseData()
        {
            if (houseData == null) {
                int id = 0;
                houseData = new List<House> {
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 595 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "1", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 475 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "2", Status = "available", Housetype="G3K-red" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 425 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "3", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 350 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "4", Status = "available", Housetype="G3K-red" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 595 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "5", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 495 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "6", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 125 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "7", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "3 995 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "8", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "3 995 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "9", Status = "available", Housetype="G3K-grey" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "3 995 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "10", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 125 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "11", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 495 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "12", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 350 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "13", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 200 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "14", Status = "available", Housetype="G3K-red" },
                           new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "4 300 000 kr", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "15", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "16", Status = "showcase", Housetype="G3K-grey" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="309 m²", Price = "5 650 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "17", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="350 m²", Price = "5 750 000 kr", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "18", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="553 m²", Price = "5 995 000 kr", Rent = "-",Propertytyp = "Äganderätt", HouseNumber = "19", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="313 m²", Price = "5 550 000 kr", Rent = "-",  Propertytyp = "Äganderätt", HouseNumber = "20", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="239 m²", Price = "5 375 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "21", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="308 m²", Price = "5 475 000 kr", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "22", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="362 m²", Price = "5 695 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "23", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "24", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "25", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "26", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "27", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "28", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "29", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "30", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "31", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "32", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "33", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "34", Status = "comming", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "35", Status = "comming", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "36", Status = "comming", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "37", Status = "comming", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "38", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "39", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "40", Status = "comming", Housetype="G2" },
                   new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "41", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "42", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "43", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="606 m²", Price = "7 050 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "44", Status = "available", Housetype="V2-red" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "45", Propertytyp = "Äganderätt", Status = "showcase", Housetype="V2-grey" },
                     new House { ID = id++, Sqm ="150 m²", LandArea="570 m²", Price = "6 750 000 kr ", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "46", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="445 m²", Price = "6 950 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "47", Status = "available", Housetype="V2-red" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="381 m²", Price = "6 500 000 kr", Rent = "-",  Propertytyp = "Äganderätt", HouseNumber = "48", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="439 m²", Price = "6 950 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "49", Status = "available", Housetype="V2-red" },
                   new House { ID = id++, Sqm ="150 m²", LandArea="380 m²", Price = "6 550 000 kr", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "50", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "51", Status = "comming", Housetype="V2-green" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "52", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "53", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "54", Status = "comming", Housetype="V2-green" },
                           new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "55", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "56", Status = "comming", Housetype="G3K-top-red" },
                   new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "57", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "58", Status = "comming", Housetype="G3K-top-red" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "59", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "60", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "61", Status = "comming", Housetype="G3K-top-grey" },
                           new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "62", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "63", Status = "comming", Housetype="G3K-top-grey" },
                   new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "64", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "65", Status = "comming", Housetype="G3K-top-grey" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "66", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "67", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "68", Status = "comming", Housetype="G3K-top-grey" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "69", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "70", Status = "comming", Housetype="G3K-top-grey" },


                };

               
            }

            return houseData;
        }

    
    }
}
