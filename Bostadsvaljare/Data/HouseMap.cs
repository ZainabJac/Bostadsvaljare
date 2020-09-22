using Syncfusion.Blazor.PivotView;
using System.Collections.Generic;

namespace Bostadsvaljare.Data
{
    public class HouseMap
    {
        private static Dictionary<string, List<HouseMap>> data;
        private static readonly Dictionary<string, string> imageToView = new Dictionary<string, string> {
            { "IMG/Oversiktsbild1-5.jpg", "view-1" },
            { "IMG/Morgon.jpg", "view-1" },
            { "IMG/Natt.jpg", "view-1" },
            { "IMG/ext. 2.jpg", "view-2" },
            { "IMG/Gatuvy1-5.jpg", "view-3" },
            { "IMG/GRK-röd.jpg", "view-3" },
            { "IMG/G3kT-grey.jpg", "view-3" },
            { "IMG/Extra_G3K(t).png", "view-1" }
        };

        public int ID { get; set; }
        public string HouseNumber { get; set; }
        public string IMCoords { get; set; }

        public static Dictionary<string, List<HouseMap>> GetHouseMapData()
        {
            if (data == null) {
                data = new Dictionary<string, List<HouseMap>> {
                    { "view-1", new List<HouseMap> {
                        new HouseMap { HouseNumber = "1", IMCoords = "167,759,158,714,187,660,279,697,322,717,329,782,302,803,303,824,289,834,227,810,148,776,140,749"  },
                        new HouseMap { HouseNumber = "2", IMCoords = "388,743,381,678,347,660,249,625,227,677,316,715,331,777,355,787,364,766"  },
                        new HouseMap { HouseNumber = "3", IMCoords = "446,714,439,652,405,625,316,596,293,640,382,681,389,749,413,755,426,736,425,727" },
                        new HouseMap { HouseNumber = "4", IMCoords = "469,715,449,711,439,650,353,605,377,568,464,599,494,620,500,677,476,693,481,705" },
                        new HouseMap { HouseNumber = "5", IMCoords = "551,647,545,587,517,567,428,540,409,578,495,620,501,674,525,678,536,671,529,660" },
                        new HouseMap { HouseNumber = "6", IMCoords = "463,550,478,513,567,541,597,563,599,619,580,629,582,646,575,654,552,647,548,587,521,567" },
                        new HouseMap { HouseNumber = "7", IMCoords = "621,626,600,620,596,561,512,520,531,488,613,514,644,537,647,592,631,599,631,615" },
                        new HouseMap { HouseNumber = "8", IMCoords = "639,531,712,553,738,558,746,553,745,538,739,532,754,528,753,474,732,452,648,431,627,469,626,505,610,503,609,511"  },
                        new HouseMap { HouseNumber = "9", IMCoords = "777,535,754,527,753,472,675,436,687,409,770,433,790,451,793,505,783,513,786,527,784,527" },
                        new HouseMap { HouseNumber = "10", IMCoords = "794,505,811,511,811,492,820,491,805,478,828,485,828,433,812,413,725,388,713,418,762,429,779,436,790,450" },
                        new HouseMap { HouseNumber = "11", IMCoords = "859,469,828,462,825,428,807,404,834,380,883,353,910,387,910,416,920,412,920,431,907,439" },
                        new HouseMap { HouseNumber = "12", IMCoords = "776,403,726,389,750,365,804,337,829,369,828,386,800,409"  },
                        new HouseMap { HouseNumber = "13", IMCoords = "647,431,610,421,609,405,626,399,626,383,624,363,643,339,711,319,732,355,732,377,722,387,718,400,691,407,681,410,674,421,668,427,657,430"  },
                        new HouseMap { HouseNumber = "14", IMCoords = "671,334,650,301,581,321,559,348,559,389,607,406,629,399,626,378,623,364,644,341"  },
                        new HouseMap { HouseNumber = "15", IMCoords = "1009,1032,1009,1002,1009,993,1053,983,1056,957,1063,882,1234,896,1231,963,1258,968,1259,1059,1056,1038"   },
                       new HouseMap { HouseNumber = "16", IMCoords = "1054,970,981,962,982,933,983,926,1020,919,1029,892,1033,826,1190,837,1195,847,1215,853,1218,895,1190,892,1073,885,1061,883"   },
                        new HouseMap { HouseNumber = "17", IMCoords = "1023,912,988,906,991,881,989,872,1026,864,1032,828,1190,837,1214,848,1215,803,1193,800,1188,783,1036,773"   },
                       new HouseMap { HouseNumber = "18", IMCoords = "1186,783,1193,795,1210,797,1211,756,1188,754,1184,733,1043,723,1037,767,1032,828,1026,858,995,855,998,829,996,818,1027,812,1040,773"   },
                       new HouseMap { HouseNumber = "19", IMCoords = "1030,810,1002,806,1002,780,1003,772,1034,765,1043,721,1047,678,1187,688,1187,735,1044,724"   },
                      new HouseMap { HouseNumber = "20", IMCoords = "1006,656,885,619,899,601,903,544,921,502,1026,527,1040,560,1039,605,1060,612,1032,641"   },
                       new HouseMap { HouseNumber = "21", IMCoords = "1082,600,1111,576,1113,555,1088,549,1089,509,1077,490,979,464,961,511,1027,526,1041,563,1040,590"   },
                      new HouseMap { HouseNumber = "22", IMCoords = "1128,562,1089,546,1087,511,1080,488,1013,472,1030,433,1123,453,1138,474,1138,510,1156,517,1157,537"   },
                      new HouseMap { HouseNumber = "23", IMCoords = "1159,518,1139,507,1140,473,1128,451,1061,435,1077,400,1169,422,1183,442,1179,475,1179,496,1201,501,1194,507,1188,513,1174,524"   },
                    }},
                    { "view-2", new List<HouseMap> {
                        new HouseMap { HouseNumber = "1", IMCoords = "167,759,158,714,187,660,279,697,322,717,329,782,302,803,303,824,289,834,227,810,148,776,140,749"  },
                        new HouseMap { HouseNumber = "2", IMCoords = "388,743,381,678,347,660,249,625,227,677,316,715,331,777,355,787,364,766"  },
                        new HouseMap { HouseNumber = "3", IMCoords = "446,714,439,652,405,625,316,596,293,640,382,681,389,749,413,755,426,736,425,727" },
                        new HouseMap { HouseNumber = "4", IMCoords = "469,715,449,711,439,650,353,605,377,568,464,599,494,620,500,677,476,693,481,705" },
                        new HouseMap { HouseNumber = "5", IMCoords = "551,647,545,587,517,567,428,540,409,578,495,620,501,674,525,678,536,671,529,660" },
                        new HouseMap { HouseNumber = "6", IMCoords = "463,550,478,513,567,541,597,563,599,619,580,629,582,646,575,654,552,647,548,587,521,567" },
                        new HouseMap { HouseNumber = "7", IMCoords = "621,626,600,620,596,561,512,520,531,488,613,514,644,537,647,592,631,599,631,615" },
                    }},
                                        { "view-3", new List<HouseMap> {
                        new HouseMap { HouseNumber = "1", IMCoords = "167" },
              
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
