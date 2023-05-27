import { Canvas } from "terminal-canvas";
import Audic from "audic";
import { drawFrame } from "./widgets/scene.js";
import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { composeWidgets } from "./widgets/composer.js";
const canvas = new Canvas();
const audic = new Audic("./media/credits.mp3");

const total_frames = 100;
const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

// FRAME GENERATOR
function stripeGenerator(coords: { x: number, y: number }, total_frames: number) {
    let main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            frame: [{
                message: generateStripes(2, 11, 5, Math.random() * 1000), 
                coords,
            }],
        });
    }
    return main_frames;
}

const composed = composeWidgets({
    main: new AnimatedWidget(stripeGenerator({ x: 2, y: 2 }, total_frames)),
    overlays: [
        { start_frame: 25, animation: new AnimatedWidget(stripeGenerator({ x: 16, y: 2 }, total_frames)) },
    ]
});


// PLAYER
canvas.hideCursor();
let song_timer = { ms: 0, s: 0, min: 0 };
let frame_count = 0;
let end_perf = 0;

// await audic.play();
setInterval(() => {
    if (song_timer.s >= 60) {
        song_timer.min += 1;
        song_timer.s = 0;
    }
    if (song_timer.ms >= 1000) {
        song_timer.s += 1;
        song_timer.ms = song_timer.ms - 1000;
    }
    const frame = composed[frame_count];
    const perf = performance.now();
    canvas.eraseScreen();

    canvas
        .moveTo(0, 0)
        .foreground(`rgb(200, 200, 200)`)
        .write(`Frame number: ${frame_count}`)
        .moveTo(30, 0)
        .write(`Time: ${audic.currentTime} seconds`)
        .moveTo(60, 0)
        .write(`Runtime Frame Rate: ${Math.floor(1000 / end_perf)}`)
        .moveTo(27, 1)
        .foreground(`rgb(238, 255, 105)`)
        .write(`Renderer Performance Test`)
        .foreground(`rgb(200, 200, 200)`);

    drawFrame(canvas, frame);
    canvas.flush();

    song_timer.ms += FRAMES15;

    end_perf = performance.now() - perf;
    frame_count = ++frame_count % total_frames;
}, FRAMES15);
