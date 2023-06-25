import zlib from "zlib";
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
    loopReverse,
    typewriter,
    parseStringsToFrames,
    fadeIn, fadeOut,
    randRange,
    prolongFrames,
    generateWhiteFrames,
    slider
} from "../src/index.js";
import jsonfile from "jsonfile";
import { readFileSync, writeFileSync } from "fs";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

function importAnimation(file: string, coords: { x: number, y: number }) {
    return parseAniFile(readFileSync(`./frames/ani/${file}.tani`).toString(), coords);
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

const features = new AnimatedWidget(composeWidgets({
    layers: [
        {
            start_frame: 0, animation: new AnimatedWidget(
                fadeIn(
                    prolongFrame(
                        importAnimation("sun", { x: 60, y: 0 }),
                    0, 400),
                5)
            )
        },
        {
            start_frame: 0, animation: new AnimatedWidget(prolongFrame(
                importAnimation("flag", { x: 35, y: 30 }),
            0, 400))
        },
    ],
    length: 400
}));

const composed = composeWidgets({
    layers: [
        { start_frame: 0, animation: features },
        { start_frame: 0, animation: new AnimatedWidget(
                loop(
                    slow(
                        slider(40, 0, "Plus, there's just something I enjoy about people who are incredibly honest and straightforward to the point of being weird fuckers whomst embrace their awful parts ", { x: 10, y: 40 }),
                    2),
                10)
            )
        },
        {
            start_frame: 3, animation: new AnimatedWidget(
                loopReverse(
                    reverse(
                        fast(
                            prolongFrames(
                                typewriter(
                                    msg
                                        .split("\n")
                                        .reverse()
                                        .join("\n"),
                                { x: 5, y: 10 }),

                                [
                                    { n: 131, repeat: 30 },
                                    { n: 0, repeat: 30 },
                                ]
                            ),
                        1)
                    ),
                10)
            )
        },
        ...makeSeriesOfClouds(10, 
            2,  0, 
            50, 3),
        {
            start_frame: 360, animation: new AnimatedWidget(
                prolongFrame(
                    fadeIn(
                        generateWhiteFrames(80, 60, { x: 0, y: 1 }, 1, 1.2),
                    250),
                19, 60)
            )
        },
        {
            start_frame: 0, animation: new AnimatedWidget(
                fadeOut(
                    generateWhiteFrames(80, 60, { x: 0, y: 1 }, 1, 1.2),
                250),
            )
        }
    ],
    length: 400,
});

// should really use a stream ovah here
// writeFileSync("./frames/json/composed-brotli.txt", zlib.brotliCompressSync(Buffer.from(JSON.stringify(composed))));
const player = new Player(80, 60);

// const a = zlib.brotliDecompressSync(readFileSync("./frames/json/composed-brotli.txt")).toString()
player.play(composed, FRAMES15);
// npx tsc => node index.ts