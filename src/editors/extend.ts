import { AnimatedFrame } from "../widgets/animated.js";

export function loop(
    frames: AnimatedFrame[],
    transition: AnimatedFrame[],
    repeat: number
): AnimatedFrame[] {
    const repeated_frames = [];
    for (let i = 0; i < repeat; i++) {
        repeated_frames.push(...transition);
        repeated_frames.push(...frames);
    }
    return repeated_frames;
}