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
import { fadeIn } from "../src/editors/fade.js";
import { randRange } from "../src/helpers/random.js";

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

function makeSeriesOfClouds(
    count: number,
    min_x: number, min_y: number,
    max_x: number, max_y: number,
) {
    const all_clouds = [];
    for (let i = 0; i < count; i++) {
        all_clouds.push({
            start_frame: 0, animation: new AnimatedWidget(fadeIn(
                loopReverse(
                    slow(
                        importAnimation("anim1", { x: randRange(min_x, max_x), y: randRange(min_y, max_y) }),
                    randRange(10, 13)),
                30),
            randRange(1, 6)))
        })
    }
    return all_clouds;
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
            start_frame: 0, animation: new AnimatedWidget(
                fadeIn(
                    prolongFrame(
                        importAnimation("sun", { x: 80, y: 4 }),
                    0, 400),
                1)
            )
        },
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
        ...makeSeriesOfClouds(10, 
            8,  0, 
            26, 20),
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