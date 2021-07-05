using System;
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
       public string HouseFact { get; set; }

        public static House Get(int id)
        {
            return houseData.Find(house => house.ID == id);


        }

        public static House Getcolor(string housenumber)
        {
            return new House { ID = 0, Sqm = "148 m²", LandArea = "-", Price = "-", Rent = "-", HouseNumber = "0", Status = "available", Housetype = "V2-color" };
        }

        public static List<House> GetHouseData()
        {
            if (houseData == null) {
                int id = 1;
                houseData = new List<House> {
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "1", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr1.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "2", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr2.pdf" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "3", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr3.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "4", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr4.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "5", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr5.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "6", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr6.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "7", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr7.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "8", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr8.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "9", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr9.pdf" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "10", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr10.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "11", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr11.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "12", Status = "sold", Housetype="G3K-grey" , HouseFact="Brf1Husnr12.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "13", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr13.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "14", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr14.pdf" },
                           new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "15", Status = "sold", Housetype="G3K-red" , HouseFact="Brf1Husnr15.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "16", Status = "showcase", Housetype="G3K-grey" , HouseFact="Ag3Husnr16.pdf" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="309 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "17", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr17.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="350 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "18", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr18.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="553 m²", Price = "-", Rent = "-",Propertytyp = "Äganderätt", HouseNumber = "19", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr19.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="313 m²", Price = "-", Rent = "-",  Propertytyp = "Äganderätt", HouseNumber = "20", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr20.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="239 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "21", Status = "booked", Housetype="G3K-grey" , HouseFact="Ag3Husnr21.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="308 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "22", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr22.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="362 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "23", Status = "sold", Housetype="G3K-grey" , HouseFact="Ag3Husnr23.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "24", Status = "available", Housetype="G2" , HouseFact="Brf2Hus24-29.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "25", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "26", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "27", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "28", Status = "available", Housetype="G2" , HouseFact="Brf2Hus28-33.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "29", Status = "available", Housetype="G2" , HouseFact="Brf2Hus24-29.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "30", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "31", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "32", Status = "available", Housetype="G2" , HouseFact="Brf2Hus25-26-27-30-31-32.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "33", Status = "available", Housetype="G2" , HouseFact="Brf2Hus28-33.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "34", Status = "available", Housetype="G3K-grey" , HouseFact="Brf2Hus34.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "35", Status = "available", Housetype="G3K-grey" , HouseFact="Brf2Hus35-36.pdf" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "36", Status = "available", Housetype="G3K-grey" , HouseFact="Brf2Hus35-36.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "37", Status = "available", Housetype="G3K-grey" , HouseFact="Brf2Hus37.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "38", Status = "booked", Housetype="G2" , HouseFact="Brf2Hus38.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "39", Status = "booked", Housetype="G2" , HouseFact="Brf2Hus39-40-41-42.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "40", Status = "available", Housetype="G2" , HouseFact="Brf2Hus39-40-41-42.pdf" },
                   new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "41", Status = "available", Housetype="G2" , HouseFact="Brf2Hus39-40-41-42.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "42", Status = "available", Housetype="G2" , HouseFact="Brf2Hus39-40-41-42.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "43", Status = "booked", Housetype="G2" , HouseFact="Brf2Hus43.pdf" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="606 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "44", Status = "sold", Housetype="V2-red" , HouseFact="Ag1Husnr44.pdf" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "45", Propertytyp = "Äganderätt", Status = "showcase", Housetype="V2-grey" , HouseFact="Ag1Husnr45.pdf" },
                     new House { ID = id++, Sqm ="150 m²", LandArea="570 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "46", Status = "sold", Housetype="V2-grey" , HouseFact="Ag1Husnr46.pdf" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="445 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "47", Status = "sold", Housetype="V2-red" , HouseFact="Ag1Husnr47.pdf" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="381 m²", Price = "-", Rent = "-",  Propertytyp = "Äganderätt", HouseNumber = "48", Status = "sold", Housetype="V2-grey" , HouseFact="Ag1Husnr48.pdf" },
                    new House { ID = id++, Sqm ="150 m²", LandArea="439 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "49", Status = "sold", Housetype="V2-red" , HouseFact="Ag1Husnr49.pdf" },
                   new House { ID = id++, Sqm ="150 m²", LandArea="380 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt",  HouseNumber = "50", Status = "sold", Housetype="V2-grey" , HouseFact="Ag1Husnr50.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "51", Status = "booked", Housetype="V2-green" , HouseFact="Ag1Husnr51.pdf" },
                     new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "52", Status = "booked", Housetype="V2-green" , HouseFact="Ag1Husnr52.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "53", Status = "available", Housetype="V2-green" , HouseFact="Ag1Husnr53.pdf" },
                    new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "54", Status = "available", Housetype="V2-green" , HouseFact="Ag1Husnr54.pdf" },
                           new House { ID = id++, Sqm = "-", LandArea="-", Price = "-", Rent = "-", HouseNumber = "55", Status = "available", Housetype="V2-green" , HouseFact="Ag1Husnr55.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "56", Status = "available", Housetype="G3K-top-red" , HouseFact="" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "57", Status = "available", Housetype="G3K-top-red" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "58", Status = "available", Housetype="G3K-top-red" , HouseFact="" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "59", Status = "available", Housetype="G3K-top-red" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "60", Status = "available", Housetype="G3K-top-red" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "61", Status = "booked", Housetype="G3K-top-grey" , HouseFact="" },
                           new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "62", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "63", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                   new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "64", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "65", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "66", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "67", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "68", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                     new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "69", Status = "available", Housetype="G3K-top-grey" , HouseFact="" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "70", Status = "booked", Housetype="G3K-top-grey" , HouseFact="" },


                };

               
            }

            return houseData;
        }

    
    }
}
