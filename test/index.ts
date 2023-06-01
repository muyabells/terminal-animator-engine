import { 
    AnimatedFrame, 
    AnimatedWidget,
    generateStripes,
    composeWidgets, 
    totalMSToFrameNumber,
    Player,
    reverse, 
    parseStringToCells,
    parseAniFile
} from "../src/index.js";
import { readFileSync } from "fs";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3  = 333;

// FRAME GENERATOR
function stripeGenerator(
    coords: { x: number, y: number }, 
    total_frames: number,
    seed: number
) {
    const main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            frame: [{
                message: generateStripes(i, 12, 1, seed), 
                coords: {
                    x: (i + i + i + i) + coords.x,
                    y: coords.y
                },
            }],
        });
    }
    return main_frames;
}

const dot: AnimatedFrame[] = parseAniFile(readFileSync("./frames/ani/anim1.ani").toString()).map(ani => {
    return {
        frame: [{
            message: ani,
            coords: { x: 3, y: 5 }
        }]
    }
})

// refractor start_ms to a helper function
// pass the result of that helper function to the frames category
const composed = composeWidgets({
    overlays: [
        { start_frame: 2, animation: new AnimatedWidget(reverse(dot, 3)) }
    ],
    length: 20
});
const player = new Player(400, 100);
player.play(composed, FRAMES3)