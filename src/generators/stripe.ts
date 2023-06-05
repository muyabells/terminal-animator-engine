import { AnimatedFrame, Cell } from "../widgets/animated.js";

export function fract(x: number) {
    return x - Math.floor(x);
}

export function mix(x: number, y: number, a: number) {
    return x*(1-a)+y*a;
}

export function generateRandomBlock(
    x: number, 
    y: number, 
    progression: number,
    seed: number,
    limit: number,
) {
    return Math.floor(fract(Math.sin(mix((x + progression) * 0.5, (y + progression) * 0.5, seed))) * limit);
}

export function generateStripes(
    i: number,
    width: number, height: number,
    seed: number,
    character?: string
): Cell[][] {
    const matrix: Cell[][] = []

    for (let y = 0; y < height; y++) {
        const y_block_array: Cell[] = [];
        for (let x = 0; x < width; x++) {
            const res = generateRandomBlock(x, y, i, seed, 180);
            y_block_array.push({ f: character ?? "█", color: {
                r: res, g: res, b: res
            }});
        }
        matrix.push(y_block_array);
    }
    return matrix;
}

export function stripeGenerator(
    coords: { x: number, y: number }, 
    total_frames: number,
    seed: number
) {
    const main_frames: AnimatedFrame[] = [];
    for (let i = 0; i < total_frames; i++) {
        main_frames.push({
            overlays: [{
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