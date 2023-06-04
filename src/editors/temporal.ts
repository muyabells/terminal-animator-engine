import { AnimatedFrame } from "../index.js";

export function slow(
    frames: AnimatedFrame[],
    factor: number // 1 - 2 - 3 (1 normal) (3 slowest)
) {
    const slowed_frames = [];

    for (const frame of frames) {
        for (let i = 0; i < factor; i++) {
            slowed_frames.push(frame);
        }
    }

    return slowed_frames;
}

export function fast(
    frames: AnimatedFrame[],
    factor: number, // 1 - 2 - 3 (1 fastest) (3 slowest)
) {
    const fast_frames = [];
    let count = 0;
    for (const frame of frames) {
        if (factor < count) {
            fast_frames.push(frame);
            count = 0;
        }
        count++;
    }
    
    return fast_frames;
}