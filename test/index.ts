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
import { readFileSync, writeFileSync, createReadStream } from "fs";
import { rexpaintCSVParse } from "../src/helpers/csv_rexpaint.js";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

function importAnimation(file: string, coords: { x: number, y: number }) {
    return parseAniFile(readFileSync(`./frames/ani/${file}.tani`).toString(), coords);
}
// should really use a stream ovah here
// writeFileSync("./frames/json/composed-brotli.txt", zlib.brotliCompressSync(Buffer.from(JSON.stringify(composed))));
const player = new Player(80, 60);
rexpaintCSVParse(createReadStream("./frames/ani/raining_cloud.csv", { encoding: "utf-8" }))
// const a = JSON.parse(zlib.brotliDecompressSync(readFileSync("./frames/json/composed-brotli.txt")).toString());
// player.play(, FRAMES15);
// npx tsc => node index.ts