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
        public double Sqm { get; set; }
        public string Price { get; set; }
        public string Rent { get; set; }
        public double LandArea { get; set; }
        public string HouseNumber { get; set; }
        public string Status { get; set; }

       

        public static House Get(int id)
        {
            return houseData.Find(house => house.ID == id);
        }

        public static List<House> GetHouseData()
        {
            if (houseData == null) {
                int id = 1;
                houseData = new List<House> {
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "1", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "2", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "3", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "4", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "5", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "6", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "7", Status = "available", Housetype="G3K" },
                           new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "8", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "9", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "10", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "11", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "12", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "13", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "14", Status = "available", Housetype="G3K" },
                           new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "15", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "16", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "17", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "18", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "19", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "20", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "21", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "22", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "23", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "24", Status = "available", Housetype="V2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "25", Status = "available", Housetype="V2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "26", Status = "available", Housetype="V2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "27", Status = "available", Housetype="V2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "28", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "29", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "30", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "31", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "32", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "33", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "34", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 137, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "35", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "36", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "37", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "38", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "39", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "40", Status = "available", Housetype="G2" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "41", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "42", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "43", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "44", Status = "available", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "45", Status = "available", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "46", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "47", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "48", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "49", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "50", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "51", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "52", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "53", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "54", Status = "available", Housetype="G3K" },
                           new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "55", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "56", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "57", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "58", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "59", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "60", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "61", Status = "available", Housetype="G3K" },
                           new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "62", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "63", Status = "available", Housetype="G3K" },
                   new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "64", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "65", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "66", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "67", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "68", Status = "available", Housetype="G3K" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "69", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "70", Status = "available", Housetype="G3K" },

                };
            }

            return houseData;
        }
    }
}
