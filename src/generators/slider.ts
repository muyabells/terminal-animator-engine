import { Cell, AnimatedFrame } from "../widgets/animated.js";
import { parseStringToCells } from "../widgets/parser.js";

export function slider(
    width: number, starting_index: number,
    message: string, coords: { x: number, y: number }
) {
    const frames: AnimatedFrame[] = [];
    const characters = message.split("");

    for (let i = 0; i < message.length; i++) {
        characters.unshift(characters.splice(-1, 1)[0]);
        frames.push({
            overlays: [{
                message: parseStringToCells(characters
                    .slice(starting_index, width + starting_index)
                    .join("")),
                coords
            }]
        })
    }

    return frames;
}

// console.dir(slider(5, 1, "what", { x: 10, y: 10 }), { depth: 10 });