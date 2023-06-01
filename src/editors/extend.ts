import { AnimatedFrame } from "../widgets/animated.js";

export function loop(
    frames: AnimatedFrame[],
    repeat: number,
    transition?: AnimatedFrame[],
): AnimatedFrame[] {
    const repeated_frames = [];
    for (let i = 0; i < repeat; i++) {
        if (transition)
            repeated_frames.push(...transition);
        repeated_frames.push(...frames);
    }
    return repeated_frames;
}