"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameData = exports.moolahPayOut = void 0;
exports.moolahPayOut = [5, 10, 15, 20];
// {
//     "id": "SL-PM",
//     "matrix": {
//         "x": 5,
//         "y": 3
//     },
//     linesApiData: [
//         [1, 1, 1, 1, 1],
//         [0, 0, 0, 0, 0],
//         [2, 2, 2, 2, 2],
//         [0, 1, 2, 1, 0],
//         [2, 1, 0, 1, 2],
//         [1, 0, 1, 2, 1],
//         [1, 2, 1, 0, 1],
//         [0, 0, 1, 2, 2],
//         [2, 2, 1, 0, 0],
//         [0, 1, 0, 1, 0],
//         [2, 1, 2, 1, 2],
//         [1, 0, 0, 0, 1],
//         [1, 2, 2, 2, 1],
//         [0, 1, 1, 1, 0],
//         [2, 1, 1, 1, 2],
//         [1, 1, 0, 1, 1],
//         [1, 1, 2, 1, 1],
//         [2, 0, 2, 0, 2],
//         [0, 2, 0, 2, 0],
//         [2, 0, 1, 0, 2],
//         [0, 2, 1, 2, 0],
//         [0, 2, 2, 2, 0],
//         [2, 0, 0, 0, 2],
//         [1, 0, 2, 0, 1],
//         [1, 2, 0, 2, 1],
//     ],
//     "bets": [
//         0.1,
//         0.25,
//         0.5,
//         0.75,
//         1
//     ],
//     "Symbols": [
//         {
//             "Name": "0",
//             "Id": 0,
//             "reelInstance": {
//                 "0": 9,
//                 "1": 9,
//                 "2": 9,
//                 "3": 9,
//                 "4": 9
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     100,
//                     0
//                 ],
//                 [
//                     50,
//                     0
//                 ],
//                 [
//                     25,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "1",
//             "Id": 1,
//             "reelInstance": {
//                 "0": 9,
//                 "1": 9,
//                 "2": 9,
//                 "3": 9,
//                 "4": 9
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     100,
//                     0
//                 ],
//                 [
//                     50,
//                     0
//                 ],
//                 [
//                     25,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "2",
//             "Id": 2,
//             "reelInstance": {
//                 "0": 9,
//                 "1": 9,
//                 "2": 9,
//                 "3": 9,
//                 "4": 9
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     100,
//                     0
//                 ],
//                 [
//                     50,
//                     0
//                 ],
//                 [
//                     25,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "3",
//             "Id": 3,
//             "reelInstance": {
//                 "0": 9,
//                 "1": 9,
//                 "2": 9,
//                 "3": 9,
//                 "4": 9
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     100,
//                     0
//                 ],
//                 [
//                     50,
//                     0
//                 ],
//                 [
//                     25,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "4",
//             "Id": 4,
//             "reelInstance": {
//                 "0": 9,
//                 "1": 9,
//                 "2": 9,
//                 "3": 9,
//                 "4": 9
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     100,
//                     0
//                 ],
//                 [
//                     50,
//                     0
//                 ],
//                 [
//                     25,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "5",
//             "Id": 5,
//             "reelInstance": {
//                 "0": 4,
//                 "1": 4,
//                 "2": 4,
//                 "3": 4,
//                 "4": 4
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     200,
//                     0
//                 ],
//                 [
//                     80,
//                     0
//                 ],
//                 [
//                     40,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "6",
//             "Id": 6,
//             "reelInstance": {
//                 "0": 4,
//                 "1": 4,
//                 "2": 4,
//                 "3": 4,
//                 "4": 4
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     200,
//                     0
//                 ],
//                 [
//                     80,
//                     0
//                 ],
//                 [
//                     40,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "7",
//             "Id": 7,
//             "reelInstance": {
//                 "0": 4,
//                 "1": 4,
//                 "2": 4,
//                 "3": 4,
//                 "4": 4
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     200,
//                     0
//                 ],
//                 [
//                     80,
//                     0
//                 ],
//                 [
//                     40,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "8",
//             "Id": 8,
//             "reelInstance": {
//                 "0": 4,
//                 "1": 4,
//                 "2": 4,
//                 "3": 4,
//                 "4": 4
//             },
//             "useWildSub": true,
//             "multiplier": [
//                 [
//                     200,
//                     0
//                 ],
//                 [
//                     80,
//                     0
//                 ],
//                 [
//                     40,
//                     0
//                 ]
//             ]
//         },
//         {
//             "Name": "FreeSpin",
//             "Id": 9,
//             "reelInstance": {
//                 "0": 3,
//                 "1": 3,
//                 "2": 3,
//                 "3": 3,
//                 "4": 3
//             },
//             "description": "Activates 3, 5, or 10 free spins when 3, 4, or 5 symbols appear anywhere on the result matrix.",
//             "useWildSub": false,
//             "multiplier": [
//                 [
//                     0,
//                     10
//                 ],
//                 [
//                     0,
//                     5
//                 ],
//                 [
//                     0,
//                     3
//                 ]
//             ]
//         },
//         {
//             "Name": "Wild",
//             "Id": 10,
//             "reelInstance": {
//                 "0": 2,
//                 "1": 2,
//                 "2": 2,
//                 "3": 2,
//                 "4": 2
//             },
//             "description": "Substitutes for all symbols except Jackpot, Free Spin, Bonus, and Scatter.",
//             "useWildSub": false,
//             "multiplier": [
//             ]
//         },
//         {
//             "Name": "Jackpot",
//             "Id": 11,
//             "reelInstance": {
//                 "0": 1,
//                 "1": 1,
//                 "2": 1,
//                 "3": 1,
//                 "4": 1
//             },
//             "description": "Mega win triggered by 5 Jackpot symbols appearing anywhere on the result matrix. Payout: 5000x",
//             "useWildSub": false,
//             "multiplier": [
//             ],
//             "defaultAmount": 5000,
//             "symbolsCount": 5,
//             "increaseValue": 5
//         },
//     ]
// }
exports.gameData = [{
        "id": "SL-CM",
        "isSpecial": true,
        "matrix": {
            "x": 3,
            "y": 1
        },
        "bets": [
            1,
            5,
            10
        ],
        "results": [
            [
                "0",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "5"
            ],
            [
                "0",
                "0",
                "6"
            ],
            [
                "0",
                "5",
                "0"
            ],
            [
                "0",
                "5",
                "5"
            ],
            [
                "0",
                "5",
                "6"
            ],
            [
                "1",
                "0",
                "0"
            ],
            [
                "2",
                "0",
                "0"
            ],
            [
                "3",
                "0",
                "0"
            ],
            [
                "0",
                "0",
                "3"
            ],
            [
                "0",
                "5",
                "3"
            ],
            [
                "0",
                "3",
                "0"
            ],
            [
                "1",
                "0",
                "5"
            ],
            [
                "4",
                "0",
                "0"
            ],
            [
                "1",
                "5",
                "0"
            ],
            [
                "1",
                "0",
                "3"
            ],
            [
                "1",
                "3",
                "0"
            ],
            [
                "2",
                "0",
                "5"
            ],
            [
                "2",
                "5",
                "0"
            ],
            [
                "2",
                "0",
                "3"
            ],
            [
                "2",
                "3",
                "0"
            ],
            [
                "0",
                "3",
                "5"
            ],
            [
                "3",
                "0",
                "5"
            ],
            [
                "3",
                "5",
                "0"
            ],
            [
                "0",
                "3",
                "3"
            ],
            [
                "3",
                "0",
                "3"
            ],
            [
                "3",
                "3",
                "0"
            ],
            [
                "1",
                "0",
                "6"
            ],
            [
                "4",
                "0",
                "5"
            ],
            [
                "4",
                "5",
                "0"
            ],
            [
                "1",
                "5",
                "5"
            ],
            [
                "1",
                "5",
                "3"
            ],
            [
                "4",
                "0",
                "3"
            ],
            [
                "4",
                "3",
                "0"
            ],
            [
                "1",
                "3",
                "5"
            ],
            [
                "1",
                "3",
                "3"
            ],
            [
                "2",
                "0",
                "6"
            ],
            [
                "2",
                "5",
                "5"
            ],
            [
                "2",
                "5",
                "3"
            ],
            [
                "2",
                "3",
                "5"
            ],
            [
                "2",
                "3",
                "3"
            ],
            [
                "0",
                "3",
                "6"
            ],
            [
                "3",
                "0",
                "6"
            ],
            [
                "3",
                "5",
                "5"
            ],
            [
                "3",
                "5",
                "3"
            ],
            [
                "3",
                "3",
                "5"
            ],
            [
                "3",
                "3",
                "3"
            ],
            [
                "1",
                "5",
                "6"
            ],
            [
                "4",
                "5",
                "5"
            ],
            [
                "4",
                "0",
                "6"
            ],
            [
                "4",
                "5",
                "3"
            ],
            [
                "4",
                "3",
                "5"
            ],
            [
                "4",
                "3",
                "3"
            ],
            [
                "1",
                "3",
                "6"
            ],
            [
                "2",
                "5",
                "6"
            ],
            [
                "2",
                "3",
                "6"
            ],
            [
                "3",
                "5",
                "6"
            ],
            [
                "3",
                "3",
                "6"
            ],
            [
                "4",
                "5",
                "6"
            ],
            [
                "4",
                "3",
                "6"
            ]
        ],
        "probabilities": [
            700,
            40,
            30,
            30,
            25,
            10,
            50,
            25,
            20,
            28.9799,
            60,
            30,
            40,
            40,
            40,
            20,
            20,
            15,
            15,
            10,
            10,
            3,
            3,
            3,
            3,
            3,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.03,
            0.03,
            0.3,
            0.3,
            0.2,
            0.1,
            0.1,
            0.01,
            0.01,
            0.001,
            0.001,
            0.00001
        ],
        "redspinprobability": 5,
        "Symbols": [
            {
                "Name": "Blank",
                "Id": 0,
                "payout": "",
                "canCallRedSpin": false,
                "canCallRespin": false
            },
            {
                "Name": "1",
                "Id": 1,
                "payout": "1",
                "canCallRedSpin": true,
                "canCallRespin": false
            },
            {
                "Name": "2",
                "Id": 2,
                "payout": "2",
                "canCallRedSpin": true,
                "canCallRespin": false
            },
            {
                "Name": "5",
                "Id": 3,
                "payout": "5",
                "canCallRedSpin": true,
                "canCallRespin": false
            },
            {
                "Name": "10",
                "Id": 4,
                "payout": "10",
                "canCallRedSpin": false,
                "canCallRespin": false
            },
            {
                "Name": "0",
                "Id": 5,
                "payout": "0",
                "canCallRedSpin": false,
                "canCallRespin": true
            },
            {
                "Name": "doubleZero",
                "Id": 6,
                "payout": "00",
                "canCallRedSpin": false,
                "canCallRespin": true
            }
        ]
    }];
