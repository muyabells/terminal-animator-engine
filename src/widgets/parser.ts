import { AnimatedFrame } from "../index.js";
import { Cell, Frame } from "./animated.js";

type ColorParameters = {
    r: number,
    g: number,
    b: number,
}

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
                color: undefined
            });
        }
        cell.push(cell_innard);
    }

    return cell;
}

export function badHTMLParser(stri: string) {
    const str_split = stri
        .split("\n")
        .map(v => v.replace("\r", "")); // removes duplication issue :)

    const state = {
        applied_effects: new Map<string, string>(),
        effect: "",
        parameters: "",
        // locks for adding effects into applied_effects
        effect_add_lock: false,
        // locks for adding parameters
        parameter_add_lock: false,
        // lock for end
        is_ending: false,
        // lock for blocking it from being added into the parsed thing
        is_included: false,
    }

    for (let line_index = 0; line_index < str_split.length; line_index++) {
        const line = str_split[line_index];
        for (let character_index = 0; character_index < line.length; character_index++) {
            const character = line[character_index];
            characterParser(character, state);

            if (state.is_included && character !== ">")
                console.log(`${[...state.applied_effects.entries()]} => ${character}`);
        }
    }
}

badHTMLParser("who are you, who am <color(paraamm)> I <p(wtf)>II</p>??? </color>  aa")

function characterParser(
    character: string,
    state: {
        applied_effects: Map<string, string>,
        effect: string,
        parameters: string,
        effect_add_lock: boolean,
        parameter_add_lock: boolean,
        is_ending: boolean,
        is_included: boolean,
    }
) {
    switch (character) {
        case "/":
            state.is_ending = true;
            break;
        case "<":
            state.effect_add_lock = true;
            state.is_ending = false;
            state.effect = "";
            state.is_included = false;
            break;
        case ">":
            if (!state.is_ending) {
                state.applied_effects.set(state.effect, state.parameters);
            } else {
                state.applied_effects.delete(state.effect);
            }
            state.is_included = true;
            break;
        case "(":
            state.effect_add_lock = false;
            state.parameter_add_lock = true;
            break;
        case ")":
            state.parameter_add_lock = false;
            break;
        default:
            if (state.effect_add_lock) {
                state.effect += character;
                break;
            }
            if (state.parameter_add_lock) {
                state.parameters += character;
                break;
            }
            state.is_included = true;
            break;
    }
}