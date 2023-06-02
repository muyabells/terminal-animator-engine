import { 
    AnimatedFrame, 
    AnimatedWidget,
    generateStripes,
    composeWidgets, 
    totalMSToFrameNumber,
    Player,
    reverse, 
    parseStringToCells,
    parseAniFile,
    loop,
    playAudio
} from "../src/index.js";
import jsonfile from "jsonfile";
import {
    readFileSync,
    createReadStream,
} from "fs";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3  = 333;

function clouds(coords: { x: number, y: number }) {
    return parseAniFile(readFileSync("./frames/ani/anim1.ani").toString())
        .map(ani => {
            return {
                frame: [{
                    message: ani,
                    coords: coords
                }]
            }
        });
}

function loading(coords: { x: number, y: number }): AnimatedFrame[] {
    return [
        { 
            frame: [{ message: parseStringToCells(`/`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`-`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`\\`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`|`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`/`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`-`), coords }]
        },
        { 
            frame: [{ message: parseStringToCells(`\\`), coords }]
        },
    ]
}

const composed = composeWidgets({
    overlays: [
        { start_frame: 0, animation: new AnimatedWidget(loop(clouds({ x: 10, y: 3 }), 10)) },
        { start_frame: 3, animation: new AnimatedWidget(loop(loading({ x: 2, y: 2 }), 10)) },
    ],
    length: 30,
});

const player = new Player(100, 100);
player.play(composed, FRAMES15);

// player.play(loop(loading({ x: 2, y: 2 }), 10), FRAMES15);