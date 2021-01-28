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

        public static House Getcolor(string housenumber)
        {
            return houseData.Find(house => house.HouseNumber == housenumber);
        }

        public static List<House> GetHouseData()
        {
            if (houseData == null) {
                int id = 0;
                houseData = new List<House> {
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 595 000 kr", Rent = "5 450", HouseNumber = "1", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 475 000 kr", Rent = "5 450", HouseNumber = "2", Status = "available", Housetype="G3K-red" },
                   new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 425 000 kr", Rent = "5 450", HouseNumber = "3", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 350 000 kr", Rent = "5 450", HouseNumber = "4", Status = "available", Housetype="G3K-red" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 595 000 kr", Rent = "5 450", HouseNumber = "5", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 495 000 kr", Rent = "5 450", HouseNumber = "6", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 125 000 kr", Rent = "5 450", HouseNumber = "7", Status = "available", Housetype="G3K-grey" },
                           new House { ID = id++, Sqm = 148, LandArea=0, Price = "3 995 000 kr", Rent = "5 450", HouseNumber = "8", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "3 995 000 kr", Rent = "5 450", HouseNumber = "9", Status = "available", Housetype="G3K-grey" },
                   new House { ID = id++, Sqm = 148, LandArea=0, Price = "3 995 000 kr", Rent = "5 450", HouseNumber = "10", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 125 000 kr", Rent = "5 450", HouseNumber = "11", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 495 000 kr", Rent = "5 450", HouseNumber = "12", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 350 000 kr", Rent = "5 450", HouseNumber = "13", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 200 000 kr", Rent = "5 450", HouseNumber = "14", Status = "available", Housetype="G3K-red" },
                           new House { ID = id++, Sqm = 148, LandArea=0, Price = "4 300 000 kr", Rent = "5 450", HouseNumber = "15", Status = "available", Housetype="G3K-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "", Rent = "", HouseNumber = "16", Status = "showcase", Housetype="G3K-grey" },
                   new House { ID = id++, Sqm = 148, LandArea=309, Price = "5 650 000 kr", Rent = " ", HouseNumber = "17", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=350, Price = "5 750 000 kr", Rent = " ", HouseNumber = "18", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=553, Price = "5 995 000 kr", Rent = " ", HouseNumber = "19", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=313, Price = "5 550 000 kr", Rent = " ", HouseNumber = "20", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=239, Price = "5 375 000 kr", Rent = " ", HouseNumber = "21", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=308, Price = "5 475 000 kr", Rent = " ", HouseNumber = "22", Status = "available", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=362, Price = "5 695 000 kr", Rent = " ", HouseNumber = "23", Status = "available", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "24", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "25", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "26", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "27", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "28", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "29", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "30", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "31", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "32", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "33", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "34", Status = "comming", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, Price = "Kommer snart ", Rent = " ", HouseNumber = "35", Status = "comming", Housetype="G3K-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "36", Status = "comming", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "37", Status = "comming", Housetype="G3K-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "38", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "39", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "40", Status = "comming", Housetype="G2" },
                   new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "41", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "42", Status = "comming", Housetype="G2" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "43", Status = "comming", Housetype="G2" },
                    new House { ID = id++, Sqm = 150, LandArea=606, Price = "7 050 000 kr", Rent = " ", HouseNumber = "44", Status = "available", Housetype="V2-red" },
                    new House { ID = id++, Sqm = 150, LandArea=0, Price = "Visningshus", Rent = " ", HouseNumber = "45", Status = "showcase", Housetype="V2-grey" },
                     new House { ID = id++, Sqm = 150, LandArea=570, Price = "6 750 000 kr ", Rent = " ", HouseNumber = "46", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm = 150, LandArea=445, Price = "6 950 000 kr", Rent = " ", HouseNumber = "47", Status = "available", Housetype="V2-red" },
                    new House { ID = id++, Sqm = 150, LandArea=381, Price = "6 500 000 kr", Rent = " ", HouseNumber = "48", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm = 150, LandArea=439, Price = "6 950 000 kr", Rent = " ", HouseNumber = "49", Status = "available", Housetype="V2-red" },
                   new House { ID = id++, Sqm = 150, LandArea=380, Price = "6 550 000 kr", Rent = " ", HouseNumber = "50", Status = "available", Housetype="V2-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "51", Status = "comming", Housetype="V2-green" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "52", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "53", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "54", Status = "comming", Housetype="V2-green" },
                           new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "55", Status = "comming", Housetype="V2-green" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "56", Status = "comming", Housetype="G3K-top-red" },
                   new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "57", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "58", Status = "comming", Housetype="G3K-top-red" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "59", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "60", Status = "comming", Housetype="G3K-top-red" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "61", Status = "comming", Housetype="G3K-top-grey" },
                           new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "62", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "63", Status = "comming", Housetype="G3K-top-grey" },
                   new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "64", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "65", Status = "comming", Housetype="G3K-top-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "66", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "67", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "68", Status = "comming", Housetype="G3K-top-grey" },
                     new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "69", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "70", Status = "comming", Housetype="G3K-top-grey" },
                    new House { ID = id++, Sqm = 148, LandArea=0, Price = "Kommer snart ", Rent = " ", HouseNumber = "0", Status = "comming", Housetype="V2-color" },

                };
            }

            return houseData;
        }

    
    }
}
