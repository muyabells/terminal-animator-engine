import { AnimatedFrame } from "../index.js";
import { Cell, Frame } from "./animated.js";

type ColorParameters = {
    r: number,
    g: number,
    b: number,
}
type Parameters = ColorParameters | {};


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
/*
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
*/

export function parseStringToCells(complete_strings: string): Cell[][] {
    const cell: Cell[][] = [];
    const str_split = complete_strings
        .split("\n")
        .map(v => v.replace("\r", "")); // removes duplication issue :)
    const state = {
        applied_effects: new Map<string, Parameters>(),
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
        const cell_innard: Cell[] = [];

        for (let character_index = 0; character_index < line.length; character_index++) {
            const character = line[character_index];
            characterParser(character, state, parameterParser);

            if (state.is_included && character !== ">") {
                const params = state.applied_effects.get("color");
                

                cell_innard.push({
                    f: character.trim(),
                    color: (params && isColor(params)) ?
                        {
                            r: params.r,
                            g: params.g,
                            b: params.b
                        } : undefined
                })
            }
                // console.log(`${JSON.stringify([...state.applied_effects.values()])} => ${character} => ${state.parameters}`);
        }
        cell.push(cell_innard);
    }

    return cell;
}

function parameterParser(effect: string, parameter: string): Parameters {
    switch (effect) {
        case "color":
            const [r, g, b] = parameter
                .split(",")
                .map(v => {
                    const i = parseInt(v.trim(), 10);
                    if (Number.isNaN(i)) {
                        throw Error(`Parameter ${parameter} is unable to be converted into a number.`);
                    }
                    return i;
                });
            return { r, g, b };
            break;
        default:
            return {};
            break;
    }
}

function characterParser(
    character: string,
    state: {
        applied_effects: Map<string, Parameters>,
        effect: string,
        parameters: string,
        effect_add_lock: boolean,
        parameter_add_lock: boolean,
        is_ending: boolean,
        is_included: boolean,
    },
    parameter_handlers: (effect: string, parameter: string) => Parameters,
) {
    switch (character) {
        case "/":
            state.is_ending = true;
            break;
        case "<":
            state.effect_add_lock = true;
            state.is_ending = false;
            state.effect = "";
            state.parameters = "";
            state.is_included = false;
            break;
        case ">":
            if (!state.is_ending) {
                state.applied_effects.set(state.effect, parameter_handlers(state.effect, state.parameters));
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

// TYPE CHECK
function isColor(param: Parameters): param is ColorParameters {
    return (param as ColorParameters).r !== undefined &&
        (param as ColorParameters).g !== undefined &&
        (param as ColorParameters).b !== undefined;
}