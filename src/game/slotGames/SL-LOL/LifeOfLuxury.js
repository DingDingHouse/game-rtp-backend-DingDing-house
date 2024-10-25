"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLLOL = void 0;
const helper_1 = require("./helper");
const RandomResultGenerator_1 = require("../RandomResultGenerator");
const gamble_1 = require("./gamble");
class SLLOL {
    constructor(currentGameData) {
        this.currentGameData = currentGameData;
        this.playerData = {
            haveWon: 0,
            currentWining: 0,
            totalbet: 0,
            rtpSpinCount: 0,
            totalSpin: 0,
            currentPayout: 0
        };
        console.log("Initializing SLLOL game");
        // console.log("currentGameData:", JSON.stringify(currentGameData, null, 2));
        try {
            this.settings = (0, helper_1.initializeGameSettings)(currentGameData, this);
            console.log("Game settings initialized");
            this.settings.reels = (0, helper_1.generateInitialReel)(this.settings);
            // console.log("Initial reels generated:", this.settings.reels);
            (0, helper_1.sendInitData)(this);
            console.log("credits : ", this.getPlayerData().credits);
        }
        catch (error) {
            console.error("Error initializing SLLOL game:", error);
        }
    }
    get initSymbols() {
        console.log("Getting initial symbols");
        const Symbols = this.currentGameData.gameSettings.Symbols || [];
        // console.log("Initial symbols:", Symbols);
        return Symbols;
    }
    sendMessage(action, message) {
        this.currentGameData.sendMessage(action, message);
    }
    sendError(message) {
        this.currentGameData.sendError(message);
    }
    sendAlert(message) {
        this.currentGameData.sendAlert(message);
    }
    incrementPlayerBalance(amount) {
        this.currentGameData.updatePlayerBalance(amount);
    }
    decrementPlayerBalance(amount) {
        this.currentGameData.deductPlayerBalance(amount);
    }
    getPlayerData() {
        return this.currentGameData.getPlayerData();
    }
    messageHandler(response) {
        switch (response.id) {
            case "SPIN":
                this.prepareSpin(response.data);
                this.spinResult();
                break;
            case "GENRTP":
                this.settings.currentLines = response.data.currentLines;
                this.settings.BetPerLines = this.settings.currentGamedata.bets[response.data.currentBet];
                this.settings.currentBet =
                    this.settings.currentGamedata.bets[response.data.currentBet] * this.settings.currentLines;
                this.getRTP(response.data.spins);
                break;
            case "GAMBLEINIT":
                const sendData = (0, gamble_1.sendInitGambleData)();
                this.decrementPlayerBalance(this.playerData.currentWining);
                this.playerData.haveWon -= this.playerData.currentWining;
                this.sendMessage("gambleInitData", sendData);
                break;
            case "GAMBLERESULT":
                let result = (0, gamble_1.getGambleResult)({ selected: response.data.selected });
                //calculate payout
                switch (result.playerWon) {
                    case true:
                        this.playerData.currentWining *= 2;
                        result.Balance = this.getPlayerData().credits + this.playerData.currentWining;
                        result.currentWinning = this.playerData.currentWining;
                        break;
                    case false:
                        result.currentWinning = 0;
                        result.Balance = this.getPlayerData().credits;
                        this.playerData.currentWining = 0;
                        break;
                }
                this.sendMessage("GambleResult", result);
                break;
            case "GAMBLECOLLECT":
                this.playerData.haveWon += this.playerData.currentWining;
                this.sendMessage("GambleCollect", this.playerData.currentWining);
                this.incrementPlayerBalance(this.playerData.currentWining);
                break;
            default:
                console.warn(`Unhandled message ID: ${response.id}`);
                this.sendError(`Unhandled message ID: ${response.id}`);
                break;
        }
    }
    prepareSpin(data) {
        this.settings.currentLines = data.currentLines;
        this.settings.BetPerLines = this.settings.currentGamedata.bets[data.currentBet];
        this.settings.currentBet = this.settings.BetPerLines * this.settings.currentLines;
    }
    spinResult() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playerData = this.getPlayerData();
                if (this.settings.currentBet > playerData.credits) {
                    this.sendError("Low Balance");
                    return;
                }
                //deduct only when freespin is not triggered
                if (this.settings.freeSpinCount <= 0) {
                    this.decrementPlayerBalance(this.settings.currentBet);
                    this.playerData.totalbet += this.settings.currentBet;
                }
                new RandomResultGenerator_1.RandomResultGenerator(this);
                this.checkResult();
            }
            catch (error) {
                this.sendError("Spin error");
                console.error("Failed to generate spin results:", error);
            }
        });
    }
    getRTP(spins) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let spend = 0;
                let won = 0;
                this.playerData.rtpSpinCount = spins;
                for (let i = 0; i < this.playerData.rtpSpinCount; i++) {
                    yield this.spinResult();
                    spend = this.playerData.totalbet;
                    won = this.playerData.haveWon;
                    console.log("Balance:", this.getPlayerData().credits);
                    console.log(`Spin ${i + 1} completed. ${this.playerData.totalbet} , ${won}`);
                }
                let rtp = 0;
                if (spend > 0) {
                    rtp = won / spend;
                }
                console.log('RTP calculated:', rtp * 100);
                return;
            }
            catch (error) {
                console.error("Failed to calculate RTP:", error);
                this.sendError("RTP calculation error");
            }
        });
    }
    checkResult() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.playerData.currentWining = 0;
                const { payout, winningCombinations } = (0, helper_1.checkWin)(this);
                // printWinningCombinations(winningCombinations)
                // console.log("balance:", this.getPlayerData().credits)
                // console.log("freespin:", {
                //   count: this.settings.freeSpinCount,
                //   isFreespin: this.settings.isFreeSpin,
                //   multipliers: this.settings.freeSpinMultipliers
                // })
                if (payout > 0) {
                    this.playerData.currentWining = payout;
                    this.playerData.haveWon += payout;
                    this.incrementPlayerBalance(this.playerData.currentWining);
                }
                else {
                    this.playerData.currentWining = 0;
                }
                // console.log("Payout checkwin: ", payout);
                //
                // this.gamebleTesting()
                // console.log("playerData :", this.playerData);
                // console.log("windata :", this.settings._winData.totalWinningAmount);
            }
            catch (error) {
                console.error("Error in checkResult:", error);
            }
        });
    }
}
exports.SLLOL = SLLOL;
