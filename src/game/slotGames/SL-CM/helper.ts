import { WinData } from "../BaseSlotGame/WinData";
import { convertSymbols, UiInitData } from "../../Utils/gameUtils";
import { SLCM } from "./cashMachineBase";

/**
 * Initializes the game settings using the provided game data and game instance.
 * @param gameData - The data used to configure the game settings.
 * @param gameInstance - The instance of the SLCM class that manages the game logic.
 * @returns An object containing initialized game settings.
 */
export function initializeGameSettings(gameData: any, gameInstance: SLCM) {
    return {
        id: gameData.gameSettings.id,
        isSpecial: gameData.gameSettings.isSpecial,
        matrix: gameData.gameSettings.matrix,
        bets: gameData.gameSettings.bets,
        Symbols: gameInstance.initSymbols,
        resultSymbolMatrix: [],
        currentGamedata: gameData.gameSettings,
        _winData: new WinData(gameInstance),
        currentBet: 0,
        currentLines: 0,
        BetPerLines: 0,
        reels: [],
        lastRedSpin: [],
        lastReSpin: [],
        hasRespin: false,
        hasRedrespin: { initialpay: 0, state: false },
        freezeIndex: [],
        reSpinWinIndex: []
    };
}

/**
 * Generates the initial reel setup based on the game settings.
 * @param gameSettings - The settings used to generate the reel setup.
 * @returns A 2D array representing the reels, where each sub-array corresponds to a reel.
 */
export function generateInitialReel(gameSettings: any): string[][] {
    const reels = [[], [], []];
    gameSettings.Symbols.forEach(symbol => {
        for (let i = 0; i < 3; i++) {
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

/**
 * Sends the initial game and player data to the client.
 * @param gameInstance - The instance of the SLCM class containing the game settings and player data.
 */
export function sendInitData(gameInstance: SLCM) {
    const reels = generateInitialReel(gameInstance.settings);
    gameInstance.settings.reels = reels;
    const dataToSend = {
        GameData: {
            Reel: reels,
            Bets: gameInstance.settings.currentGamedata.bets,
            autoSpin: [1, 5, 10, 20],
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

/**
 * Checks if the result contains symbols that require a respin.
 * @param result - The array of result symbols to check.
 * @returns A boolean indicating whether the respin pattern is present.
 */
export function hasRespinPattern(result: any[]): boolean {
    const hasRespin = result.some(element => element.Name === "0" || element.Name === "doubleZero")
    return hasRespin
}

/**
 * Checks if the result contains symbols that trigger a red respin.
 * @param result - The array of result symbols to check.
 * @returns A boolean indicating whether the red respin pattern is present.
 */
export function hasRedspinPatttern(result: any[]): boolean {
    const hasRedspin = result.some(element => element.Name === "1" || element.Name === "2" || element.Name === "5")
    return hasRedspin
}
/**
 * Initiates a respin if the current result contains respin symbols.
 * @param settings - The settings object containing game settings and state.
 * @param currentArr - The array of current result symbols.
 */
export async function initiateRespin(gameInstance: SLCM, currentArr: any[]) {
    // console.log('RE-SPIN');
    // const settings = gameInstance.settings;
    // settings.hasRespin = true;
    // settings.lastReSpin = currentArr.map(item => item.Id);
    // const currentFreezeIndexes = currentArr
    //     .map((item, index) => (item.Name === "0" || item.Name === "doubleZero" ? index : -1))
    //     .filter(index => index !== -1);
    // settings.freezeIndex = currentFreezeIndexes;
    // if (settings.freezeIndex.length > 0 && settings.hasRespin) {
    //     gameInstance.spinResult();
    // }
}

/**
 * Initiates a red respin if the current result contains red respin symbols.
 * @param settings - The settings object containing game settings and state.
 * @param currentArr - The array of current result symbols.
 */
export async function initiateRedRespin(gameInstance: SLCM, currentArr: any[]) {
    console.log('RED-RE-SPIN');
    const settings = gameInstance.settings;
    settings.hasRedrespin.state = true;
    settings.lastReSpin = currentArr.map(item => item.Id);
    const currentFreezeIndexes = currentArr
        .map((item, index) => (item.Name === "1" || item.Name === "2" || item.Name === "5" ? index : -1))
        .filter(index => index !== -1);
    settings.freezeIndex = currentFreezeIndexes;

    if (settings.freezeIndex.length > 0 && settings.hasRedrespin.state) {
        gameInstance.spinResult(); 
    }
}
