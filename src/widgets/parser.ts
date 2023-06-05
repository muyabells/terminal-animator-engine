import { AnimatedFrame } from "../index.js";
import { Cell, Frame } from "./animated.js";

export function parseAniFile(
    ani_output: string,
    coords: { x: number, y: number }
): AnimatedFrame[] {
    const frame_content_regex = /\d+:\s*<START>([\s\S]*?)<END>/g;
    const frame_matches = [...ani_output.matchAll(frame_content_regex)]
        .map(v => v[1]);

    return parseStringsToFrames(frame_matches, coords);
}

export function parseStringsToFrames(
    frames: string[],
    coords: { x: number, y: number },
) {
    const ani_frames: AnimatedFrame[] = [];
    for (const frame of frames) {
        const cell: Cell[][] = parseStringToCells(frame);
        ani_frames.push({
            overlays: [{
                message: cell,
                coords: coords,
            }]
        });
    }
    return ani_frames;
}

export function parseStringToCells(complete_strings: string): Cell[][] {
    const cell: Cell[][] = [];

    const str = complete_strings
        .split("\n")
        .map(v => v.replace("\r", "")); // removes duplication issue :)

    for (const y of str) {
        const al = [];
        for (const x of y) {
            al.push({
                f: x,
                // color not supported!
            })
        }
        cell.push(al)
    }

    return cell;
}