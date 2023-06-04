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

export function prolongFrame(
    frames: AnimatedFrame[],
    frame_number: number,
    repeat: number,
): AnimatedFrame[] {
    const result_frames = [];
    
    result_frames.push(...frames.slice(0, frame_number));
    for (let i = 0; i < repeat; i++) {
        result_frames.push(...frames.slice(frame_number, frame_number + 1))
    }
    result_frames.push(...frames.slice(frame_number + 1))

    return result_frames;
}