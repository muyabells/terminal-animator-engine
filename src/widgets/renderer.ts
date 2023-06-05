// PROJECT "THE DIVINE COMEDY"

import { Canvas } from "terminal-canvas";
import { AnimatedFrame, Cell } from "./animated.js";

export function drawFrame(canvas: Canvas, frames: AnimatedFrame) {
    for (const frame of frames.overlays) {
        for (let y = 0; y < frame.message.length; y++) {
            const line = frame.message[y];
            for (let x = 0; x < line.length; x++) {
                const cell: Cell = line[x];
                canvas
                    .moveTo(frame.coords.x + x, frame.coords.y + y)
                    .write(cell.f);
                
                if (cell.color)
                    canvas.foreground(`rgb(${cell.color.r}, ${cell.color.g}, ${cell.color.b})`)
            }
        }
    }
}