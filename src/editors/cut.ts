import { AnimatedFrame } from "../widgets/animated.js";

export function cut(
    frames: AnimatedFrame[], 
    frame_number: number
): AnimatedFrame[] {
    return frames.slice(frame_number);
}