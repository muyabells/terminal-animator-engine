import { AnimatedFrame, AnimatedWidget } from "./animated.js";

type Overlay = {
    start_frame: number,
    animation: AnimatedWidget
};
export type Compose = {
    overlays: Overlay[],
    length: number,
}

export function composeWidgets(widget: Compose) {
    const fr: AnimatedFrame[] = [];

    for (let frame = 0; frame < widget.length; frame++) {
        const activated_widget = widget.overlays.filter((v) => {
            if (v.start_frame !== undefined) {
                return frame >= v.start_frame 
                    && (v.start_frame + (v.animation.getFrames().length)) > frame;
            }
            throw Error("Didn't set the start_ms and start_frame tsk tsk tsk.")
        });
        fr.push({
            frame: activated_widget.flatMap(v => {
                const fra = v.animation.getFrameNumber(v.animation.getFrameCount()).frame
                v.animation.addFrameCount();
                return fra;
            }),
        });
    }
    return fr;
}


export function totalMSToFrameNumber(ms: number, FPS: number) {
    return Math.floor(ms * fpsTofpms(FPS));
}
function fpsTofpms(FPS: number) {
    return FPS / 1000;
}