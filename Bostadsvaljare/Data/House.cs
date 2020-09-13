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
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "1b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "3a", Status = "booked", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "4b", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9b", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7c", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "4a", Status = "booked", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9c", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9d", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7d", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "9b", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="V2" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "10a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "27b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked", Housetype="G3K" },
                    new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                    new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold", Housetype="G3K" },
                };
            }

            return houseData;
        }
    }
}
