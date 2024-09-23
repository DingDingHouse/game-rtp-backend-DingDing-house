import { WinData } from "../BaseSlotGame/WinData";
import { convertSymbols, gameCategory, PlayerData, UiInitData } from "../../Utils/gameUtils";
import { SLPM } from "./planetMoolahBase"
import { specialIcons } from "./types";
import { RandomResultGenerator } from "../RandomResultGenerator";

/**
* Initializes the game settings using the provided game data and game instance.
* @param gameData - The data used to configure the game settings.
* @param gameInstance - The instance of the SLCM class that manages the game logic.
* @returns An object containing initialized game settings.
*/
export function initializeGameSettings(gameData: any, gameInstance: SLPM) {
    return {
        id: gameData.gameSettings.id,
        matrix: gameData.gameSettings.matrix,
        bets: gameData.gameSettings.bets,
        Symbols: gameInstance.initSymbols,
        resultSymbolMatrix: [],
        currentGamedata: gameData.gameSettings,
        lineData: [],
        _winData: new WinData(gameInstance),
        currentBet: 0,
        currentLines: 0,
        BetPerLines: 0,
        reels: [],
        hasCascading: false,
        cascadingNo: 0,
        lastReel: [],
        tempReel: [],
        jackpot: {
            symbolName: "",
            symbolsCount: 0,
            symbolId: 0,
            defaultAmount: 0,
            increaseValue: 0,
            useJackpot: false,
        },
        freeSpin: {
            symbolID: "-1",
            freeSpinMuiltiplier: [],
            freeSpinStarted: false,
            freeSpinsAdded: false,
            freeSpinCount: 0,
            noOfFreeSpins: 0,
            useFreeSpin: false,
        },
        wild: {
            SymbolName: "",
            SymbolID: -1,
            useWild: false,
        },
    };
}
/**
 * Generates the initial reel setup based on the game settings.
 * @param gameSettings - The settings used to generate the reel setup.
 * @returns A 2D array representing the reels, where each sub-array corresponds to a reel.
 */
export function generateInitialReel(gameSettings: any): string[][] {
    const reels = [[], [], [], [], []];
    gameSettings.Symbols.forEach(symbol => {
        for (let i = 0; i < 5; i++) {
            const count = symbol.reelInstance[i] || 0;
            for (let j = 0; j < count; j++) {
                reels[i].push(symbol.Id);
            }
        }
    });
    reels.forEach(reel => {
        shuffleArray(reel);
    });
    return reels;
}
/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
 * @param array - The array to be shuffled.
 */
function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function makePayLines(gameInstance: SLPM) {
    const { settings } = gameInstance
    settings.currentGamedata.Symbols.forEach((element) => {
        if (!element.useWildSub) {
            handleSpecialSymbols(element, gameInstance);
        }
    });
}

function handleSpecialSymbols(symbol: any, gameInstance: SLPM) {
    switch (symbol.Name) {
        case specialIcons.jackpot:
            gameInstance.settings.jackpot.symbolName
            gameInstance.settings.jackpot.symbolId = symbol.Id;
            gameInstance.settings.jackpot.symbolsCount = symbol.symbolsCount;
            gameInstance.settings.jackpot.defaultAmount = symbol.defaultAmount;
            gameInstance.settings.jackpot.increaseValue = symbol.increaseValue;
            gameInstance.settings.jackpot.useJackpot = true;
            break;
        case specialIcons.wild:
            gameInstance.settings.wild.SymbolName = symbol.Name;
            gameInstance.settings.wild.SymbolID = symbol.Id;
            gameInstance.settings.wild.useWild = true;
            break;
        default:
            break;
    }
}
//CHECK WINS ON PAYLINES WITH OR WITHOUT WILD
//check for win function
export function checkForWin(gameInstance: SLPM) {
    try {
        const { settings } = gameInstance;
        const winningLines = [];
        let totalPayout = 0;
        settings.lineData.forEach((line, index) => {
            const firstSymbolPosition = line[0];
            settings.lastReel.push(settings.resultSymbolMatrix)
            let firstSymbol = settings.resultSymbolMatrix[firstSymbolPosition][0];


            if (settings.wild.useWild && firstSymbol === settings.wild.SymbolID.toString()) {
                firstSymbol = findFirstNonWildSymbol(line, gameInstance);
            }

            if (Object.values(specialIcons).includes(settings.currentGamedata.Symbols[firstSymbol].Name as specialIcons)) {
                console.log("Special Icon Matched : ", settings.currentGamedata.Symbols[firstSymbol].Name)
                return;
            }

            const { isWinningLine, matchCount, matchedIndices } = checkLineSymbols(firstSymbol, line, gameInstance);
            if (isWinningLine && matchCount >= 3) {
                const symbolMultiplier = accessData(firstSymbol, matchCount, gameInstance);
                console.log(matchedIndices)
                if (symbolMultiplier > 0) {
                    totalPayout += symbolMultiplier;
                    settings._winData.winningLines.push(index);
                    winningLines.push({
                        line,
                        symbol: firstSymbol,
                        multiplier: symbolMultiplier,
                        matchCount
                    });
                    console.log(`Line ${index + 1}:`, line);
                    console.log(`Payout for Line ${index + 1}:`, 'payout', symbolMultiplier);
                    const formattedIndices = matchedIndices.map(({ col, row }) => `${col},${row}`);
                    const validIndices = formattedIndices.filter(index => index.length > 2);
                    if (validIndices.length > 0) {
                        settings._winData.winningSymbols.push(validIndices);
                    }
                }
            }
        });
        settings._winData.totalWinningAmount = totalPayout * settings.BetPerLines;
        switch (true) {
            case winningLines.length >= 1 && settings.cascadingNo < 4:
                settings.cascadingNo += 1;
                settings.hasCascading = true
                new RandomResultGenerator(gameInstance);
                settings.tempReel = settings.resultSymbolMatrix;
                break;
            default:
                settings.cascadingNo = 0;
                settings.hasCascading = false
                break;
        }
        ExtractTempReelsWiningSym(gameInstance)
        return winningLines;
    } catch (error) {
        console.error("Error in checkForWin", error);
        return [];
    }
}

function ExtractTempReelsWiningSym(gameInstance: SLPM) {
    const { settings } = gameInstance;
    const valuesWithIndices = settings._winData.winningSymbols.flatMap(symbolIndices => {
        return symbolIndices.map(indexStr => {
            const [row, col] = indexStr.split(',').map(Number);
            return {
                index: { col, row }
            };
        });
    });

    // console.log(valuesWithIndices, 'Winning symbols with their indices');
    return valuesWithIndices;
}




//checking matching lines with first symbol and wild subs
function checkLineSymbols(firstSymbol: string, line: number[], gameInstance: SLPM): { isWinningLine: boolean, matchCount: number, matchedIndices: { col: number, row: number }[] } {
    const { settings } = gameInstance
    try {

        const wildSymbol = settings.wild.SymbolID.toString() || "";
        let matchCount = 1;
        let currentSymbol = firstSymbol;
        const matchedIndices: { col: number, row: number }[] = [{ col: 0, row: line[0] }];

        for (let i = 1; i < line.length; i++) {
            const rowIndex = line[i];
            const symbol = settings.resultSymbolMatrix[rowIndex][i];

            if (symbol === undefined) {
                console.error(`Symbol at position [${rowIndex}, ${i}] is undefined.`);
                return { isWinningLine: false, matchCount: 0, matchedIndices: [] };
            }

            // if (i === 1 && currentSymbol !== wildSymbol) {

            //     break;
            // }

            if (symbol === currentSymbol || symbol === wildSymbol) {
                matchCount++;
                matchedIndices.push({ col: i, row: rowIndex });
            } else if (currentSymbol === wildSymbol) {
                currentSymbol = symbol;
                matchCount++;
                matchedIndices.push({ col: i, row: rowIndex });
            } else {
                break;
            }
        }

        return { isWinningLine: matchCount >= 3, matchCount, matchedIndices };
    } catch (error) {
        console.error('Error in checkLineSymbols:', error);
        return { isWinningLine: false, matchCount: 0, matchedIndices: [] };
    }
}


//checking first non wild symbol in lines which start with wild symbol
function findFirstNonWildSymbol(line, gameInstance: SLPM) {
    try {
        const { settings } = gameInstance
        const wildSymbol = settings.wild.SymbolID.toString();
        for (let i = 0; i < line.length; i++) {
            const rowIndex = line[i];
            const symbol = settings.resultSymbolMatrix[rowIndex][i];
            if (symbol !== wildSymbol) {
                return symbol;
            }
        }
        return wildSymbol;
    } catch (error) {
        // console.error("Error in findFirstNonWildSymbol:");
        return null;
    }
}

//payouts to user according to symbols count in matched lines
function accessData(symbol, matchCount, gameInstance: SLPM) {
    const { settings } = gameInstance
    try {
        const symbolData = settings.currentGamedata.Symbols.find(s => s.Id.toString() === symbol.toString());
        if (symbolData) {
            const multiplierArray = symbolData.multiplier;
            if (multiplierArray && multiplierArray[5 - matchCount]) {
                return multiplierArray[5 - matchCount][0]
            }
        }
        return 0;
    } catch (error) {
        // console.error("Error in accessData:");

        return 0;
    }
}

//
/**
 * Sends the initial game and player data to the client.
 * @param gameInstance - The instance of the SLCM class containing the game settings and player data.
 */
export function sendInitData(gameInstance: SLPM) {
    gameInstance.settings.lineData = gameInstance.settings.currentGamedata.linesApiData;
    UiInitData.paylines = convertSymbols(gameInstance.settings.Symbols);
    const reels = generateInitialReel(gameInstance.settings);
    gameInstance.settings.reels = reels;
    const dataToSend = {
        GameData: {
            Reel: reels,
            Bets: gameInstance.settings.currentGamedata.bets,

        },
        UIData: UiInitData,
        PlayerData: {
            Balance: gameInstance.getPlayerData().credits,
            haveWon: gameInstance.playerData.haveWon,
            currentWining: gameInstance.playerData.currentWining,
            totalbet: gameInstance.playerData.totalbet,
        },
    };
    gameInstance.sendMessage("InitData", dataToSend);
}