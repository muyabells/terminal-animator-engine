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
    playAudio,
    prolongFrame,
    slow,
    fast,
    loopReverse
} from "../src/index.js";
import jsonfile from "jsonfile";
import {
    readFileSync,
    createReadStream,
} from "fs";
import { typewriter } from "../src/generators/typewriter.js";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

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

function flag(coords: { x: number, y: number }) {
    return parseAniFile(readFileSync("./frames/ani/flag.ani").toString())
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

const msg = `
Terminal Animator Demo
Made by muyabells.

    animating on the terminal. :D          
Features done: Ease-of-use of
Features needed: Color.               
`;
const composed = composeWidgets({
    layers: [
        {
            start_frame: 0, animation: new AnimatedWidget(loopReverse(
                slow(
                    clouds({ x: 10, y: 3 }),
                10),
            30))
        },
        {
            start_frame: 0, animation: new AnimatedWidget(loopReverse(
                slow(
                    clouds({ x: 15, y: 5 }),
                8),
            30))
        },
        {
            start_frame: 0, animation: new AnimatedWidget(loopReverse(
                slow(
                    clouds({ x: 5, y: 2 }),
                12),
            30))
        },
        {
            start_frame: 0, animation: new AnimatedWidget(loopReverse(
                slow(
                    clouds({ x: 3, y: 8 }),
                7),
            30))
        },
        {
            start_frame: 0, animation: new AnimatedWidget(loopReverse(
                slow(
                    clouds({ x: 12, y: 12 }),
                15),
            30))
        },
        {
            start_frame: 0, animation: new AnimatedWidget(prolongFrame(
                flag({ x: 35, y: 13 }),
            0, 400))
        },
        {
            start_frame: 3, animation: new AnimatedWidget(
                loopReverse(
                    reverse(
                        fast(
                            prolongFrame( // smell.
                                prolongFrame(
                                    typewriter(
                                        msg
                                            .split("\n")
                                            .reverse()
                                            .join("\n"),
                                    { x: 40, y: 6 }),
                                0, 20),
                            14, 20),
                        1)
                    ),
                10)
            )
        },
        {
            start_frame: 0, animation: new AnimatedWidget(
                slow(
                    loop(
                        loading({ x: 30, y: 3 }), 
                    30),
                6)
            )
        },
        {
            start_frame: 2, animation: new AnimatedWidget(
                slow(
                    loop(
                        loading({ x: 40, y: 3 }), 
                    30),
                6)
            )
        },
        {
            start_frame: 4, animation: new AnimatedWidget(
                slow(
                    loop(
                        loading({ x: 50, y: 3 }), 
                    30),
                6)
            )
        },
    ],
    length: 400,
});

const player = new Player(100, 50);
player.play(composed, FRAMES15);