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


function dot(coords: { x: number, y: number }) {
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

// TODO?: encode the save into .ani format
// const composed = jsonfile.readFileSync("./frames/json/save.json");

const composed = composeWidgets({
    overlays: Array.from({ length: 10 }, (v, k) => {
        return { start_frame: k, animation: new AnimatedWidget(reverse(dot({ x: 3 + k + k, y: 1 }), 5)) }
    }),
    length: 50,
});

// jsonfile.writeFileSync("./frames/json/save.json", composed);


const player = new Player(400, 100);
// playAudio(createReadStream("./media/credits.wav"))
player.play(composed, FRAMES30);