import { randRange } from "../helpers/random.js";
import { Cell, AnimatedFrame } from "../widgets/animated.js";

function generateWhiteFrame(width: number, height: number, color_variance_min: number, color_variance_max: number) {
    const matrix: Cell[][] = []

    for (let y = 0; y < height; y++) {
        const y_block_array: Cell[] = [];
        for (let x = 0; x < width; x++) {
            const color_addition = randRange(color_variance_min, color_variance_max);
            y_block_array.push({
                f: "#",
                color: {
                    r: 80 + color_addition,
                    g: 80 + color_addition,
                    b: 80 + color_addition,
                }
            });
            // console.dir(y_block_array, { depth: null })
        }
        matrix.push(y_block_array);
    }
    return matrix;
}

export function generateWhiteFrames(
    width: number, 
    height: number, 
    coords: { x: number, y: number },
    total_frames: number,
    color_variance: number,
) {
    const main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            overlays: [{
                message: generateWhiteFrame(width, height, 1, 100),
                coords,
            }],
        });
    }
    return main_frames;
}