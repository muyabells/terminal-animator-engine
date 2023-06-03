import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { composeWidgets, totalMSToFrameNumber } from "./widgets/composer.js";
import { Player } from "./widgets/player.js";
import { reverse } from "./editors/reverse.js";
import { loop } from "./editors/extend.js";
import { parseAniFile, parseStringToCells } from "./widgets/parser.js";
import { playAudio } from "./widgets/audio.js";
import { cut } from "./editors/cut.js";

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
    reverse, loop, cut, 

    // parsers
    parseAniFile, parseStringToCells,

    // audio
    playAudio
}