import { AnimatedFrame, parseStringToCells } from "../index.js";

export function typewriter(str: string, coords: { x: number, y: number }): AnimatedFrame[] {
    const typed: AnimatedFrame[] = [];
    let index = 0;
    while (index < str.length) {
        typed.push({
            overlays: [{
                message: parseStringToCells(str.slice(index)),
                coords
            }]
        });
        index++;
    }
    return typed;
}