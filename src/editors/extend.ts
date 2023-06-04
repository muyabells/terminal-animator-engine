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

export function prolongFrames(
    frames: AnimatedFrame[],
    min: number,
    repeat: number,
): AnimatedFrame[] {
    const result_frames = [];
    result_frames.push(...frames.slice(0, min));
    for (let i = 0; i < repeat; i++) {
        result_frames.push(...frames.slice(min, min + 1))
    }

    return result_frames;
}