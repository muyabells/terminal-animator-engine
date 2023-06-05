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
import { parseStringsToFrames } from "../src/widgets/parser.js";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

function importAnimation(file: string, coords: { x: number, y: number }) {
    return parseAniFile(readFileSync(`./frames/ani/${file}.ani`).toString(), coords);
}

function loading(coords: { x: number, y: number }): AnimatedFrame[] {
    return parseStringsToFrames(["/", "-", "\\", "|", "/", "-", "\\"], coords);
}

const msg = `
Terminal Animator Demo
Made by muyabells.

    animating on the terminal. :D
Features done: Ease-of-use of
Features needed: Color.
`;

const all_clouds = [
    {
        start_frame: 0, animation: new AnimatedWidget(loopReverse(
            slow(
                importAnimation("anim1", { x: 10, y: 3 }),
            10),
        30))
    },
    {
        start_frame: 0, animation: new AnimatedWidget(loopReverse(
            slow(
                importAnimation("anim1", { x: 15, y: 5 }),
            8),
        30))
    },
    {
        start_frame: 0, animation: new AnimatedWidget(loopReverse(
            slow(
                importAnimation("anim1", { x: 5, y: 2 }),
            12),
        30))
    },
    {
        start_frame: 0, animation: new AnimatedWidget(loopReverse(
            slow(
                importAnimation("anim1", { x: 3, y: 8 }),
            7),
        30))
    },
    {
        start_frame: 0, animation: new AnimatedWidget(loopReverse(
            slow(
                importAnimation("anim1", { x: 12, y: 12 }),
            15),
        30))
    }
]

const composed = composeWidgets({
    layers: [
        {
            start_frame: 0, animation: new AnimatedWidget(prolongFrame(
                importAnimation("sun", { x: 60, y: 4 }),
            0, 400))
        },
        ...all_clouds,
        {
            start_frame: 0, animation: new AnimatedWidget(prolongFrame(
                importAnimation("flag", { x: 35, y: 13 }),
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
                            msg.length + 18, 20),
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

// jsonfile.writeFileSync("./frames/json/composed.json", composed);

const player = new Player(100, 50);
player.play(composed, FRAMES15);