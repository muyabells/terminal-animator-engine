import { AnimatedFrame } from "../index.js";
import { Cell, Frame } from "./animated.js";

type Color = { 
    r: number, g: number, b: number, 
    index: { 
        start: { line: number, character: number },
        end:   { line: number, character: number },
    },
};

export function parseAniFile(
    ani_output: string,
    coords: { x: number, y: number }
): AnimatedFrame[] {
    const frame_content_regex = /\d+:\s*<START>([\s\S]*?)<END>/g;
    const frame_matches = [...ani_output.matchAll(frame_content_regex)]
        .map(v => v[1]);

    // figure out how to format .ani files

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

export function parseStringToCells(
    complete_strings: string,
    ...colors: Color[]
): Cell[][] {
    const cell: Cell[][] = [];

    const str = complete_strings
        .split("\n")
        .map(v => v.replace("\r", "")); // removes duplication issue :)

    for (let line_index = 0; line_index < str.length; line_index++) {
        const line = str[line_index];
        const cell_innard: Cell[] = [];

        for (let character_index = 0; character_index < line.length; character_index++) {
            const character = line[character_index];

            cell_innard.push({
                f: character.trim(),
                color: parseColorRGB(line_index, character_index, colors)
            });
        }
        cell.push(cell_innard);
    }

    return cell;
}

function parseColorRGB(
    line_index: number, character_index: number,
    colors: Color[],
) {
    const color = colors?.find(v => {
        return ((v.index.start.line >= line_index) !== (v.index.start.character >= character_index))
            && ((v.index.end.line < line_index) === (v.index.end.character < character_index));
    });

    return color
        ? { r: color.r, g: color.g, b: color.b }
        : undefined;
}

console.log(parseStringToCells(
    `dsa <color 1, 2>dsfds</color> <color 1, 2, 3>dsfdsdsa</color>\nmelt fndskjfn`, 
        { r: 10, g: 10, b: 10,
            index: {
                start: { line: 0, character: 2 },
                end:   { line: 0, character: 10 },
            }
        },
        { r: 10, g: 10, b: 10,
            index: {
                start: { line: 1, character: 2 },
                end:   { line: 1, character: 6 },
            }
        },
));