import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { composeWidgets, totalMSToFrameNumber } from "./widgets/composer.js";
import { Player } from "./widgets/player.js";
import { reverse } from "./editors/reverse.js";
import { extend } from "./editors/extend.js";
import { parseAniFile, parseStringToCells } from "./widgets/parser.js";

export {
    // essentials
    AnimatedFrame, AnimatedWidget,

    // generators
    generateStripes,

    // compiles widgets
    composeWidgets, 
    
    // helpers
    totalMSToFrameNumber,

    // media player
    Player,

    // frame editors
    reverse, extend,

    // parsers
    parseAniFile, parseStringToCells
}