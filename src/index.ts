// necessities
import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { composeWidgets, totalMSToFrameNumber } from "./widgets/composer.js";
import { Player } from "./widgets/player.js";

// generators
import { generateStripes } from "./generators/stripe.js";
import { stripeGenerator } from "./generators/stripe.js";
import { typewriter } from "./generators/typewriter.js";
import { generateWhiteFrames } from "./generators/white.js";
import { slider } from "./generators/slider.js";

// editors
import { reverse, loopReverse } from "./editors/reverse.js";
import { loop, prolongFrame, prolongFrames } from "./editors/extend.js";
import { cut } from "./editors/cut.js";
import { slow, fast } from "./editors/temporal.js";
import { fadeIn, fadeOut } from "./editors/fade.js";

// others
import { parseAniFile, parseStringToCells, parseStringsToFrames } from "./widgets/parser.js";
import { playAudio } from "./widgets/audio.js";
import { randRange } from "./helpers/random.js";

export {
    // essentials
    AnimatedFrame, AnimatedWidget,

    // generators
    generateStripes, stripeGenerator, typewriter, 
    generateWhiteFrames, slider,

    // compiles widgets
    composeWidgets, 
    
    // helpers
    totalMSToFrameNumber, randRange,

    // media player
    Player,

    // frame editors
    reverse, loop, cut, loopReverse, prolongFrame,
    slow, fast, prolongFrames, fadeIn, fadeOut,

    // parsers
    parseAniFile, parseStringToCells, parseStringsToFrames,

    // audio
    playAudio
}