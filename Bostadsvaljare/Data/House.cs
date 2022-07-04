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
            if (houseData == null)
            {
                int id = 1;
                houseData = new List<House> {
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "1", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr1.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "2", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr2.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "3", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr3.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "4", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr4.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "5", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr5.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "6", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr6.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "7", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr7.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "8", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr8.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "9", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr9.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "10", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr10.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "11", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr11.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "12", Status = "sold", Housetype="G3K-grey", HouseFact="Brf1Husnr12.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "13", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr13.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "14", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr14.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "5 450 kr/mån", Propertytyp = "Bostadsrätt", HouseNumber = "15", Status = "sold", Housetype="G3K-red", HouseFact="Brf1Husnr15.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "16", Status = "showcase", Housetype="G3K-grey", HouseFact="Ag3Husnr16.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="309 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "17", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr17.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="350 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "18", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr18.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="553 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "19", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr19.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="313 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "20", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr20.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="239 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "21", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr21.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="308 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "22", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr22.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="362 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "23", Status = "sold", Housetype="G3K-grey", HouseFact="Ag3Husnr23.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="265 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "24", Status = "sold", Housetype="G2", HouseFact="BRF2_24.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="153 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "25", Status = "sold", Housetype="G2", HouseFact="BRF2_25.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="153 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "26", Status = "sold", Housetype="G2", HouseFact="BRF2_26.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="153 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "27", Status = "sold", Housetype="G2", HouseFact="BRF2_27.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="203 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "28", Status = "sold", Housetype="G2", HouseFact="BRF2_28.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="205 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "29", Status = "sold", Housetype="G2", HouseFact="BRF2_29.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="154 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "30", Status = "sold", Housetype="G2", HouseFact="BRF2_30.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="154 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "31", Status = "sold", Housetype="G2", HouseFact="BRF2_31.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="151 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "32", Status = "sold", Housetype="G2", HouseFact="BRF2_32.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="227 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "33", Status = "sold", Housetype="G2", HouseFact="BRF2_33.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="327 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "34", Status = "sold", Housetype="G3K-grey", HouseFact="BRF2_34.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="167 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "35", Status = "sold", Housetype="G3K-grey", HouseFact="BRF2_35.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="179 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "36", Status = "sold", Housetype="G3K-grey", HouseFact="BRF2_36.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="283 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "37", Status = "sold", Housetype="G3K-grey", HouseFact="BRF2_37.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="307 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "38", Status = "sold", Housetype="G2", HouseFact="BRF2_38.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="244 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "39", Status = "sold", Housetype="G2", HouseFact="BRF2_39.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="238 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "40", Status = "sold", Housetype="G2", HouseFact="BRF2_40.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="232 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "41", Status = "sold", Housetype="G2", HouseFact="BRF2_41.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="225 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "42", Status = "sold", Housetype="G2", HouseFact="BRF2_42.pdf" },
                    new House { ID = id++, Sqm = "151 m²", LandArea="305 m²", Price = "-", Rent = "5 500 kr/mån", HouseNumber = "43", Status = "sold", Housetype="G2", HouseFact="BRF2_43.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="606 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "44", Status = "sold", Housetype="V2-red", HouseFact="Ag1Husnr44.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="-", Price = "-", Rent = "-", HouseNumber = "45", Propertytyp = "Äganderätt", Status = "showcase", Housetype="V2-grey", HouseFact="Ag1Husnr45.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="570 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "46", Status = "sold", Housetype="V2-grey", HouseFact="Ag1Husnr46.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="445 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "47", Status = "sold", Housetype="V2-red", HouseFact="Ag1Husnr47.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="381 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "48", Status = "sold", Housetype="V2-grey", HouseFact="Ag1Husnr48.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="439 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "49", Status = "sold", Housetype="V2-red", HouseFact="Ag1Husnr49.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="380 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "50", Status = "sold", Housetype="V2-grey", HouseFact="Ag1Husnr50.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="414 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "51", Status = "sold", Housetype="V2-green", HouseFact="Ag1Husnr51.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="387 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "52", Status = "sold", Housetype="V2-green", HouseFact="Ag1Husnr52.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="380 m²", Price = "7 880 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "53", Status = "available", Housetype="V2-green", HouseFact="Ag1Husnr53.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="384 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "54", Status = "sold", Housetype="V2-green", HouseFact="Ag1Husnr54.pdf" },
                    new House { ID = id++, Sqm = "150 m²", LandArea="474 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "55", Status = "sold", Housetype="V2-green", HouseFact="Ag1Husnr55.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="380 m²", Price = "7 070 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "56", Status = "available", Housetype="G3K-top-red", HouseFact="ag2_56.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="272 m²", Price = "6 820 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "57", Status = "available", Housetype="G3K-top-red", HouseFact="ag2_57.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="357 m²", Price = "6 970 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "58", Status = "available", Housetype="G3K-top-red", HouseFact="ag2_58.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="410 m²", Price = "7 170 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "59", Status = "available", Housetype="G3K-top-red", HouseFact="ag2_59.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="345 m²", Price = "6 850 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "60", Status = "booked", Housetype="G3K-top-red", HouseFact="ag2_60.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="380 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "61", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_61.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="225 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "62", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_62.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="221 m²", Price = "6 870 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "63", Status = "available", Housetype="G3K-top-grey", HouseFact="ag2_63.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="296 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "64", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_64.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="191 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "65", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_65.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="169 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "66", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_66.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="182 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "67", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_67.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="196 m²", Price = "6 070 000 kr", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "68", Status = "available", Housetype="G3K-top-grey", HouseFact="ag2_68.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="209 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "69", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_69.pdf" },
                    new House { ID = id++, Sqm = "148 m²", LandArea="343 m²", Price = "-", Rent = "-", Propertytyp = "Äganderätt", HouseNumber = "70", Status = "sold", Housetype="G3K-top-grey", HouseFact="ag2_70.pdf" },
                };
            }

            return houseData;
        }
    }
}
