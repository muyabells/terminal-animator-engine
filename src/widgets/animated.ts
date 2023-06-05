// why is message a string[]? to make x, y access easier
    // use message.split("\n") on it before inserting the message!

export type Cell = { 
    f: string, 
    color?: {
        r: number, g: number, b: number
    }
}
export type Frame = {
    message: Cell[][],
    coords: { x: number, y: number }, // pull this out to be provided by the person
}

// the individual frames
export type AnimatedFrame = {
    // overlays
    overlays: Frame[],
};

export class AnimatedWidget {
    private frame_count = 0;
    constructor(private frames: AnimatedFrame[]) {}
    getFrames() {return this.frames;}
    getFrameNumber(n: number) {return this.frames[n]};
    addFrameCount() {
        this.frame_count = ++this.frame_count % this.frames.length;
    }
    getFrameCount() {return this.frame_count;}
}