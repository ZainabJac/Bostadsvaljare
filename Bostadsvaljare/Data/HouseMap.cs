using Syncfusion.Blazor.PivotView;
using System.Collections.Generic;

namespace Bostadsvaljare.Data
{
    public class HouseMap
    {
        private static Dictionary<string, List<HouseMap>> data;
        private static readonly Dictionary<string, string> imageToVariant = new Dictionary<string, string> {
            { "IMG/Ext1-5area.png", "view-1" },
            { "IMG/Morgon.jpg", "view-1" },
            { "IMG/Natt.jpg", "view-1" },
            { "IMG/Oversikt_V2Optimerad.jpg", "view-2" },
            { "IMG/Ext1-5redAndgrey.png", "view-3" },
            { "IMG/Ext1-5red.png", "view-3" },
            { "IMG/Ext1-5grey.png", "view-3" },
            { "IMG/Extra_G3K(t).png", "view-1" }
        };

        public int ID { get; set; } = -1;
        public string HouseNumber { get; set; } = "N/A";
        public string TargetMap { get; set; } = "N/A";
        public string Coords { get; set; }

        public static Dictionary<string, List<HouseMap>> GetHouseMapData()
        {
            if (data == null)
            {
                data = new Dictionary<string, List<HouseMap>> {
                    { "view-1", new List<HouseMap> {
                        new HouseMap { HouseNumber = "1", Coords = "2352, 1976, 1963, 1931, 1879, 1921, 1884, 1843, 1966, 1835, 1971, 1780, 1965, 1780, 1972, 1706, 1978, 1705, 1983, 1649, 2298, 1681, 2292, 1806, 2353, 1813, 2347, 1861"  },
                        new HouseMap { HouseNumber = "2", Coords = "1218, 937, 1459, 1011, 1472, 994, 1470, 962, 1480, 952, 1487, 846, 1444, 809, 1284, 766, 1249, 839, 1254, 914"  },
                        new HouseMap { HouseNumber = "3", Coords = "1147, 979, 1388, 1053, 1401, 1036, 1401, 1005, 1409, 994, 1416, 888, 1377, 847, 1213, 808, 1178, 881, 1183, 956" },
                        new HouseMap { HouseNumber = "4", Coords = "913, 1128, 1164, 1195, 1178, 1172, 1174, 1140, 1196, 1126, 1189, 1007, 1147, 974, 977, 925, 939, 1002, 947, 1105" },
                        new HouseMap { HouseNumber = "5", Coords = "823, 1176, 1074, 1243, 1095, 1224, 1089, 1196, 1119, 1175, 1106, 1053, 1058, 1021, 888, 967, 849, 1050, 857, 1153" },
                        new HouseMap { HouseNumber = "6", Coords = "731, 1221, 985, 1296, 1005, 1275, 997, 1241, 1030, 1223, 1025, 1103, 969, 1067, 796, 1012, 757, 1095, 765, 1198" },
                        new HouseMap { HouseNumber = "7", Coords = "635, 1277, 888, 1360, 913, 1338, 905, 1309, 941, 1284, 929, 1159, 876, 1123, 697, 1067, 661, 1141, 669, 1254" },
                        new HouseMap { HouseNumber = "8", Coords = "529, 1328, 784, 1423, 813, 1398, 804, 1364, 842, 1340, 834, 1215, 773, 1179, 591, 1116, 553, 1198, 563, 1305"  },
                        new HouseMap { HouseNumber = "9", Coords = "418, 1387, 675, 1482, 703, 1463, 697, 1435, 745, 1405, 723, 1274, 662, 1238, 480, 1175, 438, 1259, 452, 1364" },
                        new HouseMap { HouseNumber = "10", Coords = "298, 1446, 565, 1562, 591, 1546, 582, 1497, 635, 1467, 616, 1335, 548, 1303, 364, 1233, 315, 1331, 332, 1423" },
                        new HouseMap { HouseNumber = "11", Coords = "1282, 893, 1523, 967, 1536, 944, 1534, 918, 1544, 908, 1545, 808, 1506, 774, 1352, 735, 1322, 796, 1318, 870" },
                        new HouseMap { HouseNumber = "12", Coords = "1571, 765, 1561, 690, 1515, 632, 1416, 682, 1380, 715, 1386, 786, 1355, 796, 1358, 830, 1427, 855, 1456, 841, 1462, 841"  },
                        new HouseMap { HouseNumber = "13", Coords = "1710, 786, 1713, 724, 1663, 661, 1553, 724, 1517, 757, 1523, 828, 1492, 838, 1495, 872, 1603, 894, 1734, 809, 1731, 775"  },
                        new HouseMap { HouseNumber = "14", Coords = "1264, 703, 1264, 620, 1224, 562, 1100, 604, 1064, 637, 1070, 708, 1039, 718, 1042, 752, 1111, 777, 1140, 763, 1146, 763"  },
                        new HouseMap { HouseNumber = "15", Coords = "1374, 739, 1374, 656, 1334, 598, 1210, 640, 1174, 673, 1180, 744, 1149, 754, 1152, 788, 1221, 813, 1250, 799, 1256, 799"   },
                       new HouseMap { HouseNumber = "16", Coords = "1893, 993, 2123, 1053, 2181, 1006, 2134, 994, 2144, 886, 2114, 850, 1936, 806, 1899, 882"   },
                        new HouseMap { HouseNumber = "17", Coords = "1788, 1064, 2018, 1124, 2076, 1077, 2034, 1061, 2042, 945, 2016, 915, 1829, 865, 1790, 947"   },
                       new HouseMap { HouseNumber = "18", Coords = "1687, 1134, 1921, 1204, 1984, 1151, 1940, 1136, 1951, 1019, 1915, 985, 1728, 935, 1689, 1017"   },
                       new HouseMap { HouseNumber = "19", Coords = "1987, 923, 2207, 983, 2261, 941, 2219, 929, 2228, 819, 2205, 786, 2031, 752, 2000, 820"   },
                      new HouseMap { HouseNumber = "20", Coords = "1929, 1517, 1881, 1512, 1882, 1453, 1943, 1444, 1957, 1358, 1968, 1280, 2230, 1306, 2226, 1383, 2231, 1379, 2231, 1424, 2282, 1432, 2276, 1473, 2277, 1511, 2228, 1505, 2230, 1422, 2230, 1383, 1954, 1359, 1943, 1446"   },
                       new HouseMap { HouseNumber = "21", Coords = "1917, 1607, 1862, 1603, 1868, 1538, 1929, 1529, 1944, 1445, 1955, 1360, 2232, 1386, 2226, 1471, 2228, 1507, 2282, 1515, 2277, 1554, 2277, 1600, 2229, 1594, 2227, 1557, 2228, 1506, 2225, 1470, 1948, 1448, 1943, 1447, 1930, 1533"   },
                      new HouseMap { HouseNumber = "22", Coords = "1912, 1703, 1850, 1699, 1851, 1644, 1852, 1628, 1918, 1618, 1932, 1534, 1943, 1449, 2230, 1474, 2222, 1565, 2228, 1565, 2229, 1598, 2284, 1602, 2281, 1678, 2224, 1671, 2228, 1597, 2229, 1564, 1935, 1541, 1930, 1540, 1919, 1616"   },
                      new HouseMap { HouseNumber = "23", Coords = "1965, 1813, 1829, 1800, 1834, 1726, 1913, 1717, 1929, 1539, 2227, 1568, 2222, 1672, 1984, 1648, 1976, 1704, 1969, 1703, 1963, 1780, 1970, 1783"   },

                    }},
                    { "view-2", new List<HouseMap> {
                        new HouseMap { HouseNumber = "24", Coords = "432, 840, 347, 870, 288, 807, 308, 798, 293, 784, 278, 737, 338, 715, 321, 668, 329, 610, 592, 536, 657, 655, 680, 758"  },
                        new HouseMap { HouseNumber = "25", Coords = "904, 922, 637, 1035, 633, 1033, 542, 1074, 466, 992, 492, 983, 471, 963, 453, 911, 521, 884, 505, 832, 505, 832, 524, 777, 809, 678, 884, 812"  },
                        new HouseMap { HouseNumber = "26", Coords = "1192, 1139, 908, 1296, 903, 1291, 811, 1346, 705, 1237, 727, 1226, 702, 1201, 687, 1146, 760, 1107, 746, 1050, 785, 998, 1093, 866, 1180, 1023" },
                        new HouseMap { HouseNumber = "27", Coords = "1125, 525, 1117, 444, 1041, 391, 920, 342, 866, 436, 881, 527, 998, 575, 1126, 531" },
                        new HouseMap { HouseNumber = "28", Coords = "1222, 491, 1125, 456, 1117, 373, 1158, 320, 1306, 277, 1358, 364, 1360, 405, 1388, 397, 1392, 436" },
                        new HouseMap { HouseNumber = "29", Coords = "1435, 576, 1324, 535, 1320, 448, 1373, 390, 1520, 342, 1578, 435, 1575, 481, 1614, 465, 1616, 491, 1616, 501" },
                        new HouseMap { HouseNumber = "30", Coords = "1694, 682, 1869, 585, 1871, 551, 1834, 570, 1835, 522, 1775, 420, 1633, 480, 1561, 543, 1560, 628" },
                        new HouseMap { HouseNumber = "31", Coords = "2368, 580, 2368, 576, 2446, 471, 2668, 555, 2696, 621, 2676, 675, 2747, 698, 2735, 741, 2649, 783, 2631, 774, 2613, 788, 2550, 762, 2552, 760, 2344, 678"  },
                        new HouseMap { HouseNumber = "32", Coords = "2494, 753, 2570, 785, 2557, 831, 2469, 880, 2450, 868, 2431, 883, 2368, 851, 2155, 757, 2171, 661, 2250, 546, 2482, 638, 2514, 700, 2497, 752" },
                        new HouseMap { HouseNumber = "33", Coords = "1983, 874, 1998, 772, 2083, 647, 2325, 759, 2369, 824, 2355, 886, 2433, 924, 2422, 972, 2321, 1026, 2298, 1010, 2266, 1032, 2204, 1000" },
                        new HouseMap { HouseNumber = "34", Coords = "2127, 1253, 2006, 1209, 1758, 1099, 1767, 989, 1837, 830, 2146, 936, 2175, 985, 2164, 1050, 2256, 1082, 2247, 1136, 2178, 1236, 2148, 1227" },
                        new HouseMap { HouseNumber = "35", Coords = "1942, 1532, 1535, 1329, 1535, 1211, 1619, 1022, 1805, 1100, 1813, 1090, 1872, 1117, 1862, 1125, 1959, 1162, 2007, 1198, 1995, 1272, 2102, 1319, 2091, 1369, 1997, 1507, 1967, 1493" },
                    }},
                    { "view-3", new List<HouseMap> {
                        new HouseMap { HouseNumber = "1", Coords = "167,759" },
                    }},
                };
                  
                List <House> houseData = House.GetHouseData();
                foreach (KeyValuePair<string, List<HouseMap>> view in data) {
                    foreach (HouseMap map in view.Value) {
                        if (map.HouseNumber != "N/A")
                            map.ID = houseData.Find(x => x.HouseNumber == map.HouseNumber).ID;
                    }
                }
            }

            return data;
        }

        public static string ImageNameToVariant(string fileName)
        {
            return imageToVariant[fileName];
        }

        public static string GetNameFromVariant(string variant)
        {
            foreach (KeyValuePair<string, string> image in imageToVariant) {
                if (image.Value == variant)
                    return image.Key;
            }
            return "";
        }
    }
}
