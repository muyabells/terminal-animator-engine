import { AnimatedFrame, Cell, Frame } from "../widgets/animated.js";
import { parseStringToCells, parseStringsToFrames } from "../widgets/parser.js";
import { loop } from "./extend.js";

function loading(coords: { x: number, y: number }): AnimatedFrame[] {
    return parseStringsToFrames(["/", "-", "\\", "|", "/", "-", "\\"], coords);
}

fadeIn(loading({ x: 5, y: 5 }))

export function fadeIn(frames: AnimatedFrame[]) {
    const first_frame = frames[0];
    const filled_map = mapFilledCells(first_frame);

    first_frame.overlays[0].message[filled_map[0].x][filled_map[0].y]
}

export function fadeOut(frames: AnimatedFrame[]) {
    
}

function mapFilledCells(frame: AnimatedFrame) {
    const filled_cells: { x: number, y: number }[] = [];

    // mapping out every non-whitespace character in the frame
    // and turning it into coordinates to use for fade transitions.

    for (const content of frame.overlays) { // frame is an overlay, so you should take into account that too!
        for (let y = 0; y < content.message.length; y++) {
            const x_axis = content.message[y];
            for (let x = 0; x < x_axis.length; x++) {
                const cell = x_axis[x];
                if (cell.f.search(" ") === -1) {
                    filled_cells.push({ x, y });
                }
            }
        }
    }

    return filled_cells;
}