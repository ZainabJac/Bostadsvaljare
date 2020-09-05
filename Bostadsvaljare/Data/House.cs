﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bostadsvaljare.Data
{
    public class House
    {
        public int ID { get; set; }
        public int Area { get; set; }
        public string Housetype { get; set; }
        public double Sqm { get; set; }
        public string Price { get; set; }
        public string Rent { get; set; }
        public double LandArea { get; set; }
        public string HouseNumber { get; set; }
        public string Status { get; set; }

        public static List<House> GetHouseData()
        {
            List<House> houseData = new List<House>();
            int id = 0;
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "1b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "3a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "4b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7c", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "4a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9c", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9d", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7d", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "9b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "10a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "27b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7a", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "7b", Status = "available" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8a", Status = "booked" });
            houseData.Add(new House { ID = id++, Sqm = 91, Price = "4 700 000 ", Rent = "3 800 ", HouseNumber = "8b", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 110, Price = "5 200 000 ", Rent = "5 900 ", HouseNumber = "9a", Status = "sold" });
            houseData.Add(new House { ID = id++, Sqm = 120, Price = "5 400 000 ", Rent = "5 400 ", HouseNumber = "9a", Status = "sold" });

            return houseData;
        }
    }
}
