import { Cell, AnimatedFrame } from "../widgets/animated.js";

function generateWhiteFrame(width: number, height: number) {
    const matrix: Cell[][] = []

    for (let y = 0; y < height; y++) {
        const y_block_array: Cell[] = [];
        for (let x = 0; x < width; x++) {
            y_block_array.push({ 
                f: "#",
                color: {
                    r: 173, g: 173, b: 173
                }
            });
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
) {
    const main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            overlays: [{
                message: generateWhiteFrame(width, height), 
                coords,
            }],
        });
    }
    return main_frames;
}