import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { Compose, composeWidgets } from "./widgets/composer.js";
import { Player } from "./helpers/player.js";
import { Canvas } from "terminal-canvas";
import { reverse } from "./editors/reverse.js";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

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

const composed = composeWidgets({
    overlays: [
        {
            start_ms: 50, 
            animation: new AnimatedWidget(reverse(stripeGenerator({ x: 3, y: 2 }, 10, 10), 30))
        },
    ],
    length: 500
}, FRAMES60);
const player = new Player(400, 100);
player.play(composed, FRAMES15)