import { GameData } from "../BaseSlotGame/gameType";
import { WinData } from "../BaseSlotGame/WinData";

export interface Symbol {
    Name: string;
    Id: number;
    payout: string;
    canCallRedSpin: boolean;
    canCallRespin: boolean;
    reelInstance: { [key: string]: number };
}

//enum for magent trigger 
enum position {
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export  interface SLBBSETTINGS {
    id: string;
    matrix: { x: number, y: number };
    currentGamedata: GameData;
    resultSymbolMatrix: any[];
    prevresultSymbolMatrix: any[];
    heisenbergSymbolMatrix:any[];
    lineData: any[],
    _winData: WinData | undefined;
    currentBet: number;
    currentLines: number;
    BetPerLines: number;
    bets: number[];
    reels: any[][];
    heisenbergReels:any[][],
    Symbols: Symbol[];
    magnet:{
      isEnabled: boolean;
      isTriggered: boolean;
      position: number,//0:null, 1: TOP_LEFT, 2: TOP_RIGHT, 3: BOTTOM_LEFT, 4: BOTTOM_RIGHT
      triggerProb : number
    },
    jackpot: {
        symbolName: string;
        symbolsCount: number;
        symbolId: number;
        defaultAmount: number;
        increaseValue: number;
        useJackpot: boolean;
    },
    freeSpin: {
        symbolID: string,
        freeSpinMuiltiplier: any[],
        freeSpinStarted: boolean,
        freeSpinCount: number,
        noOfFreeSpins: number,
        useFreeSpin: boolean,
        freeSpinsAdded: boolean,
    };
    wild: {
        SymbolName: string;
        SymbolID: number;
        useWild: boolean
    };
    link: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;
    };
    megalink: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;

    };
    cashCollect: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;
    };
    coins: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;
    };
    prizeCoin: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;
    };
    losPollos: {
        SymbolName: string;
        SymbolID: string;
        useWild: boolean;
    };
    heisenberg:{
        isTriggered:boolean;
        freeSpin: {
            freeSpinStarted: boolean,
            freeSpinsAdded: boolean,
            freeSpinCount: number ,
            noOfFreeSpins: number,
            // useFreeSpin: false,
          };
        payout:number;
    };
    cashCollectPrize:{
        isTriggered:boolean,
        payout:number,
      }
}
