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

    for (const line of str) {
        const cell_innard = [];

        const opening_color_tag_index = line.indexOf("<color");
        const closing_color_tag_index = line.indexOf("</color>")

        const color_matches = line
            .replaceAll(/<color (.*?)>/g, "")

        for (let character_index = 0; character_index < line.length; character_index++) {
            const character = line[character_index];
            cell_innard.push({
                f: character,

            })
        }
        cell.push(cell_innard);
    }

    return cell;
}

function getColorTag(str: string) {
    const startTag = "<color ";
    const endTag = ">";
    let startIndex = str.indexOf(startTag);
    
    while (startIndex !== -1) {
        const endIndex = str.indexOf(endTag, startIndex + startTag.length);

        if (endIndex !== -1) {
            const numbersStr = str.substring(startIndex + startTag.length, endIndex);
            const numbers = numbersStr.split(",").map(numStr => parseInt(numStr.trim(), 10));

            console.log(numbers);
        } else {
            console.log("No closing tag found.");
        }

        startIndex = str.indexOf(startTag, endIndex);
    }
}

const a = [];
for (let i = 0; i < 1000; i++) {
    a.push(`<color ${i}, ${i}, ${i}>`);
}
console.log(getColorTag(a.join(" ")))