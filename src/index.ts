import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { composeWidgets } from "./widgets/composer.js";
import { Player } from "./helpers/player.js";

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


const player = new Player(20, 20);
player.play(composed, FRAMES15);