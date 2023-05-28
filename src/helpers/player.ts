import { Canvas } from "terminal-canvas";
import { AnimatedFrame } from "../widgets/animated.js";
import { drawFrame } from "../widgets/scene.js";

export class Player {
    private canvas: Canvas;

    private song_timer = { ms: 0, s: 0, min: 0 };
    private frame_count = 0;
    constructor(width: number, height: number) {
        this.canvas = new Canvas({ width, height });
    }
    private measureTime() {
        if (this.song_timer.s >= 60) {
            this.song_timer.min += 1;
            this.song_timer.s = 0;
        }
        if (this.song_timer.ms >= 1000) {
            this.song_timer.s += 1;
            this.song_timer.ms = this.song_timer.ms - 1000;
        }
    }
    private countTime(MS: number) {
        this.song_timer.ms += MS;
    }
    play(composed_frames: AnimatedFrame[], MS: number) {
        this.canvas.hideCursor();
        setInterval(() => {
            this.measureTime();
            const frame = composed_frames[this.frame_count];

            this.canvas.eraseScreen();
            drawFrame(this.canvas, frame);
            this.canvas.flush()

            this.countTime(MS);
            this.frame_count = ++this.frame_count % (composed_frames.length - 1);
        }, MS)
    }
}