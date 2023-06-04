import { AnimatedFrame } from "../index.js";
import { Cell, Frame } from "./animated.js";

export function parseAniFile(
    ani_output: string,
): Cell[][] [] {
    const frame_content_regex = /\d+:\s*<START>([\s\S]*?)<END>/g;
    const frame_matches = [...ani_output.matchAll(frame_content_regex)]
        .map(v => v[1]);

    const ani_frames = [];
    for (const frame of frame_matches) {
        const cell: Cell[][] = parseStringToCells(frame);
        ani_frames.push(cell);
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