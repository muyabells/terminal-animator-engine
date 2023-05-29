import { AnimatedFrame, AnimatedWidget } from "./animated.js";

/**
 * start_frame & start_ms shouldn't be specified together, it'll mess up calculations
 */
type Overlay = {
    start_frame?: number,
    start_ms?: number,
    animation: AnimatedWidget
};
export type Compose = {
    overlays: Overlay[],
    length?: number,
    ms_length?: number
}

export function composeWidgets(widget: Compose, FPS: number) {
    const fr: AnimatedFrame[] = [];
    const frame_length = widget.ms_length 
        ? totalMSToFrameNumber(widget.ms_length, FPS) 
        : (widget.length ?? 0);;

    for (let frame = 0; frame < frame_length; frame++) {
        const activated_widget = widget.overlays.filter((v) => {
            if (v.start_frame !== undefined) {
                return frame >= v.start_frame 
                    && (v.start_frame + (v.animation.getFrames().length - 1)) > frame;
            }
            if (v.start_ms !== undefined) {
                const frame_from_ms = totalMSToFrameNumber(v.start_ms, FPS)
                return frame >= frame_from_ms
                    && (frame_from_ms + (v.animation.getFrames().length - 1)) > frame;
            }
            throw Error("Didn't set the start_ms and start_frame tsk tsk tsk.")
        });
        fr.push({
            frame: activated_widget.flatMap(v => {
                v.animation.addFrameCount();
                return v.animation.getFrameNumber(v.animation.getFrameCount()).frame;
            }),
        });
    }
    return fr;
}

function frameNumberToTotalMS(frame_number: number, FPS: number) {
    return frame_number * (1 / fpsTofpms(FPS));
}
function totalMSToFrameNumber(ms: number, FPS: number) {
    return Math.floor(ms * fpsTofpms(FPS));
}
function fpsTofpms(FPS: number) {
    return FPS / 1000;
}