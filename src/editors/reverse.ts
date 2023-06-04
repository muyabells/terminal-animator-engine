import { AnimatedFrame } from "../widgets/animated.js";

export function loopReverse(
    frames: AnimatedFrame[], 
    repeat: number
): AnimatedFrame[] {
    const total_frames = [];

    const reversed_frames = frames.slice().reverse();
    reversed_frames.pop();
    frames.pop();
    
    for (let i = 0; i < repeat; i++) {
        total_frames.push(...frames)
        total_frames.push(...reversed_frames)
    }
    return total_frames;
}

export function reverse(frames: AnimatedFrame[]): AnimatedFrame[] {
    return frames.slice().reverse();
}