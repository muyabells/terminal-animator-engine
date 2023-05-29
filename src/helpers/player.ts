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
    private printPerformance(perf: number) {
        this.canvas
            .moveTo(0, 0)
            .eraseLine()
            .foreground(`rgb(255, 255, 255)`)
            .write(`Perf: ${perf} | Frame Number: ${this.frame_count}`)
    }
    play(composed_frames: AnimatedFrame[], MS: number) {
        this.canvas.hideCursor();

        let perf = 0;
        setInterval(() => {
            this.measureTime();
            const frame = composed_frames[this.frame_count];

            const past_perf = performance.now();
            this.canvas.eraseScreen();
            this.printPerformance(perf);
            drawFrame(this.canvas, frame);
            this.canvas.flush()

            perf = performance.now() - past_perf;

            this.countTime(MS);
            this.frame_count = ++this.frame_count % (composed_frames.length - 1);
        }, MS)
    }
}