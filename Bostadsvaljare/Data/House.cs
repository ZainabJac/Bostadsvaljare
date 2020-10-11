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
                int id = 0;
                houseData = new List<House> {
                    new House { ID = 1, Sqm = 148, Price = "Kommer snart ", Rent = "3 800 ", HouseNumber = "1", Status = "available", Housetype="V2Color" },
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

                    //new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="V2" },
                 
                };
            }

            return houseData;
        }
    }
}
