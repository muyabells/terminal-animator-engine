import { AnimatedFrame, AnimatedWidget } from "./widgets/animated.js";
import { generateStripes } from "./generators/stripe.js";
import { Compose, composeWidgets } from "./widgets/composer.js";
import { Player } from "./helpers/player.js";
import { Canvas } from "terminal-canvas";

const FRAMES60 = 16;
const FRAMES30 = 33;
const FRAMES25 = 40;
const FRAMES15 = 66;
const FRAMES3 = 333;

// FRAME GENERATOR
function stripeGenerator(coords: { x: number, y: number }, total_frames: number) {
    const main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            frame: [{
                message: generateStripes(2, 11, 5, Math.random() * 1000), 
                coords: {
                    x: i,
                    y: i
                },
            }],
        });
    }
    return main_frames;
}

const total_frames = 100;
function instructionGenerator(overlays: number) {
    const instructions: Compose = {
        overlays: [],
        length: 10
    }
    for (let i = 0; i < overlays; i++) {
        instructions.overlays.push(
            { start_frame: i, animation: new AnimatedWidget(stripeGenerator({ x: 3, y: 2 }, total_frames)) }
        )
    }
        
    return instructions;
}

const composed = composeWidgets(instructionGenerator(10));
const player = new Player(400, 200);
// player.play(composed, FRAMES60)
