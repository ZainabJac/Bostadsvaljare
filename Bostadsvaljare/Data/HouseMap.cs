using Syncfusion.Blazor.PivotView;
using System.Collections.Generic;

namespace Bostadsvaljare.Data
{
    public class HouseMap
    {
        private static Dictionary<string, List<HouseMap>> data;
        private static readonly Dictionary<string, string> imageToView = new Dictionary<string, string> {
            { "IMG/Dag.jpg", "view-1" },
            { "IMG/Morgon.jpg", "view-1" },
            { "IMG/Natt.jpg", "view-1" },
            { "IMG/ext. 2.jpg", "view-2" },
        };

        public int ID { get; set; }
        public string HouseNumber { get; set; }
        public string IMCoords { get; set; }

        public static Dictionary<string, List<HouseMap>> GetHouseMapData()
        {
            if (data == null) {
                data = new Dictionary<string, List<HouseMap>> {
                    { "view-1", new List<HouseMap> {
                        new HouseMap { HouseNumber = "7a", IMCoords = "558,130,558,206,550,212,550,272,576,288,578,315,311,322,307,148,556,130" },
                        new HouseMap { HouseNumber = "7b", IMCoords = "311,324,576,315,571,373,551,380,553,400,553,438,571,447,576,461,313,463" },
                        new HouseMap { HouseNumber = "9a", IMCoords = "574,463,574,539,553,542,553,602,578,609,313,604,308,461,463,461" },
                        new HouseMap { HouseNumber = "9b", IMCoords = "313,607,583,611,576,701,551,712,553,766,313,753" },
                        new HouseMap { HouseNumber = "9c", IMCoords = "580,885,576,773,544,764,313,753,311,870,437,879" },
                        new HouseMap { HouseNumber = "8a", IMCoords = "578,90,940,63,942,281,580,290,551,270,551,211,558,128,558,110,574,106" },
                        new HouseMap { HouseNumber = "8b", IMCoords = "578,292,942,279,942,456,576,461,551,436,551,391,553,378,569,371" },
                        new HouseMap { HouseNumber = "1b", IMCoords = "576,463,942,456,942,616,578,611,553,602,553,546,574,537" },
                        new HouseMap { HouseNumber = "3a", IMCoords = "583,613,947,616,944,784,574,771,551,766,551,710,576,699" },
                        new HouseMap { HouseNumber = "4a", IMCoords = "940,63,953,97,1387,70,1389,281,953,292,940,274" },
                        new HouseMap { HouseNumber = "4b", IMCoords = "940,283,953,290,1387,279,1387,458,956,456,944,456" },
                        new HouseMap { HouseNumber = "7c", IMCoords = "942,456,953,458,1389,458,1387,618,956,609,942,607" },
                        new HouseMap { HouseNumber = "7d", IMCoords = "944,609,1387,620,1389,796,944,780" },
                    }},
                    { "view-2", new List<HouseMap> {
                        new HouseMap { HouseNumber = "7a", IMCoords = "143,259,119,127,513,262,658,107,673,110,753,137,748,147,749,236,756,240,760,296,643,433" },
                        new HouseMap { HouseNumber = "7b", IMCoords = "144,262,168,402,647,580,760,431,757,394,702,367,640,435" },
                        new HouseMap { HouseNumber = "9a", IMCoords = "167,403,191,540,658,713,760,568,760,527,711,503,653,580" },
                        new HouseMap { HouseNumber = "9b", IMCoords = "195,542,212,649,660,824,762,686,764,643,725,628,658,714" },
                        new HouseMap { HouseNumber = "9c", IMCoords = "213,653,226,750,681,948,851,685,769,647,769,685,665,828" },
                        new HouseMap { HouseNumber = "8a", IMCoords = "787,1,786,149,971,211,1074,73,1078,1" },
                        new HouseMap { HouseNumber = "8b", IMCoords = "791,150,788,289,961,348,1065,215,1070,173,1016,157,969,211" },
                        new HouseMap { HouseNumber = "1b", IMCoords = "791,292,790,422,957,477,1047,350,1053,310,1015,292,967,351" },
                        new HouseMap { HouseNumber = "3a", IMCoords = "791,424,957,479,1005,415,1044,429,1041,468,952,602,790,537" },
                    }},
                };

                List<House> houseData = House.GetHouseData();
                foreach (KeyValuePair<string, List<HouseMap>> view in data) {
                    foreach (HouseMap map in view.Value) {
                        map.ID = houseData.Find(x => x.HouseNumber == map.HouseNumber).ID;
                    }
                }
            }

            return data;
        }

        public static string ImageNameToView(string fileName)
        {
            return imageToView[fileName];
        }
    }
}
