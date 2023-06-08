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

/**
 * Weak copy.
 * @param frames 
 * @param prolonged_frames 
 */
export function prolongFrames(
    frames: AnimatedFrame[],
    prolonged_frames: { n: number, repeat: number }[]
) {
    const result_frames: AnimatedFrame[] = [];

    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const frame_to_prolong = prolonged_frames.find(v => v.n === i);
        if (frame_to_prolong) {
            for (let repeat = 0; repeat < frame_to_prolong.repeat; repeat++) {
                result_frames.push(frame);
            }
            continue;
        }

        result_frames.push(frame);
    }

    return result_frames;
}