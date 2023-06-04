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

const msg = "Your spells have no power over me since \nthe only thing i know for real...\nTHERE WILL BE BLOODSHED\nTHE MAN IN THE MIRROR NODS HIS HEAD";
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
                                    { x: 30, y: 6 }),
                                0, 20),
                            152, 20),
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
    length: 180,
});

const player = new Player(100, 50);
player.play(composed, FRAMES15);