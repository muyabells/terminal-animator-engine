import { randRange } from "../helpers/random.js";
import { AnimatedFrame, Cell, Frame } from "../widgets/animated.js";
import { parseStringToCells, parseStringsToFrames } from "../widgets/parser.js";
import { loop } from "./extend.js";

/**
 * Adds a fade-in before the animation starts.
 * 
 * Modifies the original array.
 * @param frames 
 * @returns 
 */
export function fadeIn(
    frames: AnimatedFrame[],
    speed: number
) {
    const first_frame = structuredClone(frames[0]); // why clone the thing when you can just modify it??
    const filled_maps = mapFilledCells(first_frame);

    for (let overlay_index = 0; overlay_index < filled_maps.length; overlay_index++) {
        const map = filled_maps[overlay_index];
        const overlay = first_frame.overlays[overlay_index];
        
        let speed_counter = 0;

        while (map.length > 0) {
            const coords = map.splice(randRange(0, map.length), 1)[0];
            const filled_cell = overlay.message[coords.y][coords.x];
            filled_cell.f = "";
            if (speed_counter >= speed) {
                frames.unshift({
                    overlays: structuredClone(first_frame.overlays)
                });
                speed_counter = 0;
            }
            speed_counter++;
        }
    }
    
    return frames;
}

export function fadeOut(
    frames: AnimatedFrame[],
    speed: number
) { // duplication issue
    const last_frame = structuredClone(frames.at(-1)); // starting from the end
    if (last_frame === undefined)
        throw Error("Your frames are empty, we can't fade out emptiness!");
    
    const filled_maps = mapFilledCells(last_frame);

    for (let overlay_index = 0; overlay_index < filled_maps.length; overlay_index++) {
        const map = filled_maps[overlay_index];
        const overlay = last_frame.overlays[overlay_index];
        
        let speed_counter = 0;

        while (map.length > 0) {
            const coords = map.splice(randRange(0, map.length), 1)[0];
            const filled_cell = overlay.message[coords.y][coords.x];
            filled_cell.f = "";
            if (speed_counter >= speed) {
                frames.push({ // pushing the frames at the end
                    overlays: structuredClone(last_frame.overlays)
                });
                speed_counter = 0;
            }
            speed_counter++;
        }
    }
    
    return frames;
}

function sliceRandomly(str: number[]) {
    
}

function mapFilledCells(frame: AnimatedFrame) {
    const mapped_overlays: { x: number, y: number }[][] = [];

    // mapping out every non-whitespace character in the frame
    // and turning it into coordinates to use for fade transitions.

    for (let i = 0; i < frame.overlays.length; i++) { // overlays, so you should take that into account too!
        const mapped_frame: { x: number, y: number }[] = []; 
        const content = frame.overlays[i];

        for (let y = 0; y < content.message.length; y++) {
            const x_axis = content.message[y];
            for (let x = 0; x < x_axis.length; x++) {
                const cell = x_axis[x];
                if (cell.f.search(" ") === -1) {
                    mapped_frame.push({ x, y });
                }
            }
        }

        mapped_overlays.push(mapped_frame);
    }

    return mapped_overlays;
}