const colorsList = [
    {1: '{"color1": "rgb(58,76,237)", "color2": "rgb(142,73,132)"}'},
    {2: '{"color1": "rgb(128,58,190)", "color2": "rgb(41,97,246)"}'},
    {3: '{"color1": "rgb(30,83,192)", "color2": "rgb(46,220,201)"}'},
    {4: '{"color1": "rgb(67,238,61)", "color2": "rgb(104,171,194)"}'},
    {5: '{"color1": "rgb(37,62,224)", "color2": "rgb(136,156,228)"}'},
    {6: '{"color1": "rgb(215,56,43)", "color2": "rgb(137,144,244)"}'},
    {7: '{"color1": "rgb(104,110,230)", "color2": "rgb(13,245,252)"}'},
    {8: '{"color1": "rgb(176,142,43)", "color2": "rgb(194,99,99)"}'},
    {9: '{"color1": "rgb(78,156,200)", "color2": "rgb(173,56,251)"}'},
    {10: '{"color1": "rgb(231,124,87)", "color2": "rgb(177,87,154)"}'},
    {11: '{"color1": "rgb(230,150,202)", "color2": "rgb(43,167,211)"}'},
    {12: '{"color1": "rgb(12,142,182)", "color2": "rgb(46,120,72)"}'},
    {13: '{"color1": "rgb(34,179,5)", "color2": "rgb(209,235,19)"}'},
    {14: '{"color1": "rgb(232,96,117)", "color2": "rgb(245,243,10)"}'},
    {15: '{"color1": "rgb(82,110,176)", "color2": "rgb(169,208,187)"}'},
    {16: '{"color1": "rgb(189,253,236)", "color2": "rgb(30,132,201)"}'},
    {17: '{"color1": "rgb(44,19,37)", "color2": "rgb(32,100,127)"}'},
    {18: '{"color1": "rgb(70,17,241)", "color2": "rgb(242,149,71)"}'},
    {19: '{"color1": "rgb(0,135,98)", "color2": "rgb(48,54,41)"}'},
    {20: '{"color1": "rgb(34,207,78)", "color2": "rgb(37,106,237)"}'},
    {21: '{"color1": "rgb(235,16,176)", "color2": "rgb(226,112,138)"}'},
    {22: '{"color1": "rgb(226,10,155)", "color2": "rgb(203,175,236)"}'},
    {23: '{"color1": "rgb(72,190,235)", "color2": "rgb(2,192,2)"}'},
    {24: '{"color1": "rgb(226,175,44)", "color2": "rgb(184,1,107)"}'},
    {25: '{"color1": "rgb(214,46,18)", "color2": "rgb(138,45,116)"}'},
    {26: '{"color1": "rgb(229,140,24)", "color2": "rgb(224,77,86)"}'},
    {27: '{"color1": "rgb(13,241,198)", "color2": "rgb(126,41,242)"}'},
    {28: '{"color1": "rgb(81,188,193)", "color2": "rgb(48,7,186)"}'},
    {29: '{"color1": "rgb(60,93,152)", "color2": "rgb(243,75,129)"}'},
    {30: '{"color1": "rgb(168,57,249)", "color2": "rgb(36,172,177)"}'},
    {31: '{"color1": "rgb(59,62,224)", "color2": "rgb(26,91,193)"}'},
    {32: '{"color1": "rgb(30,70,11)", "color2": "rgb(1,201,94)"}'},
    {33: '{"color1": "rgb(46,95,110)", "color2": "rgb(146,241,168)"}'},
    {34: '{"color1": "rgb(103,94,148)", "color2": "rgb(221,157,178)"}'},
    {35: '{"color1": "rgb(217,130,223)", "color2": "rgb(171,93,70)"}'},
    {36: '{"color1": "rgb(118,52,171)", "color2": "rgb(157,46,176)"}'},
    {37: '{"color1": "rgb(242,251,171)", "color2": "rgb(41,181,68)"}'},
    {38: '{"color1": "rgb(99,81,188)", "color2": "rgb(12,185,241)"}'},
    {39: '{"color1": "rgb(241,21,244)", "color2": "rgb(40,25,214)"}'},
    {40: '{"color1": "rgb(8,159,0)", "color2": "rgb(232,241,47)"}'},
    {41: '{"color1": "rgb(16,159,178)", "color2": "rgb(79,160,24)"}'},
    {42: '{"color1": "rgb(100,70,126)", "color2": "rgb(164,46,123)"}'},
    {43: '{"color1": "rgb(153,198,248)", "color2": "rgb(98,100,244)"}'},
    {44: '{"color1": "rgb(50,161,221)", "color2": "rgb(236,153,186)"}'},
    {45: '{"color1": "rgb(152,222,97)", "color2": "rgb(157,239,234)"}'},
    {46: '{"color1": "rgb(148,198,48)", "color2": "rgb(248,226,166)"}'},
    {47: '{"color1": "rgb(247,108,84)", "color2": "rgb(191,99,123)"}'},
    {48: '{"color1": "rgb(238,50,111)", "color2": "rgb(245,172,171)"}'},
    {49: '{"color1": "rgb(193,85,230)", "color2": "rgb(242,63,47)"}'},
    {50: '{"color1": "rgb(151,99,123)", "color2": "rgb(105,59,87)"}'},
    {51: '{"color1": "rgb(43,128,233)", "color2": "rgb(18,28,178)"}'},
    {52: '{"color1": "rgb(136,221,248)", "color2": "rgb(173,21,253)"}'},
    {53: '{"color1": "rgb(253,207,107)", "color2": "rgb(167,53,24)"}'},
    {54: '{"color1": "rgb(54,140,202)", "color2": "rgb(53,30,54)"}'},
    {55: '{"color1": "rgb(60,42,118)", "color2": "rgb(174,149,216)"}'},
    {56: '{"color1": "rgb(235,165,193)", "color2": "rgb(192,62,187)"}'},
    {57: '{"color1": "rgb(139,138,151)", "color2": "rgb(37,92,50)"}'},
    {58: '{"color1": "rgb(201,109,6)", "color2": "rgb(103,1,7)"}'},
    {59: '{"color1": "rgb(154,102,12)", "color2": "rgb(253,218,250)"}'},
    {60: '{"color1": "rgb(175,218,186)", "color2": "rgb(176,229,237)"}'},
    {61: '{"color1": "rgb(193,196,9)", "color2": "rgb(251,110,51)"}'},
    {62: '{"color1": "rgb(211,143,217)", "color2": "rgb(100,181,226)"}'},
    {63: '{"color1": "rgb(35,223,185)", "color2": "rgb(85,201,236)"}'},
    {64: '{"color1": "rgb(103,5,243)", "color2": "rgb(137,100,133)"}'}
];

const getColors = (startIndex = 0, limit = 16) => {
    return colorsList.slice(startIndex, startIndex+limit);
}

export default getColors;