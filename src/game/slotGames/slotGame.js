"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSlotGame_1 = __importDefault(require("./BaseSlotGame/BaseSlotGame"));
const cashMachineBase_1 = require("./SL-CM/cashMachineBase");
const crazy777Base_1 = require("./SL-CRZ/crazy777Base");
const wheelOfFortuneBase_1 = require("./SL-WOF/wheelOfFortuneBase");
const planetMoolahBase_1 = require("./SL-PM(MOOLAH)/planetMoolahBase");
const stinkinRichBase_1 = require("./SL-SR/stinkinRichBase");
const OneOfAKindBase_1 = require("./SL-ONE/OneOfAKindBase");
const bloodEternalBase_1 = require("./SL-BE/bloodEternalBase");
const breakingBadBase_1 = require("./SL-BB/breakingBadBase");
const LifeOfLuxury_1 = require("./SL-LOL/LifeOfLuxury");
const zeusBase_1 = require("./SL-Z3/zeusBase");
const buffaloTrailBase_1 = require("./SL-BT/buffaloTrailBase");
const TimeMachineBase_1 = require("./SL-TM/TimeMachineBase");
class SlotGameManager {
    constructor(currentGameData) {
        // console.log("Requesting Game : ",currentGameData.gameSettings.id);
        this.currentGameData = currentGameData;
        this.gameClassMapping = {
            "SL-CM": cashMachineBase_1.SLCM, "SL-CRZ": crazy777Base_1.SLCRZ, "SL-WOF": wheelOfFortuneBase_1.SLWOF, "SL-PM": planetMoolahBase_1.SLPM, "SL-BE": bloodEternalBase_1.SLBE,
            "SL-ONE": OneOfAKindBase_1.SLONE, "SL-LOL": LifeOfLuxury_1.SLLOL, "SL-SR": stinkinRichBase_1.SLSR, "SL-BB": breakingBadBase_1.SLBB, "SL-Z3": zeusBase_1.SLZEUS,
            "SL-TM": TimeMachineBase_1.SLTM,
            "SL-BT": buffaloTrailBase_1.SLBT,
        };
        const slotGameClass = this.gameClassMapping[currentGameData.gameSettings.id];
        if (slotGameClass) {
            this.currentGame = new slotGameClass(currentGameData);
        }
        else {
            this.currentGame = new BaseSlotGame_1.default(currentGameData);
            // throw new Error(`No game class found for id: ${currentGameData.gameSettings.id}`);
        }
    }
}
exports.default = SlotGameManager;
