import { AnimatedFrame, AnimatedWidget } from "./animated.js";

type Layer = {
    start_frame: number,
    animation: AnimatedWidget
};
export type Compose = {
    layers: Layer[],
    length: number,
}
/**
 * The lower the overlays are, the higher "layer" they will appear
 * @param widget AnimatedWidgets
 * @returns AnimatedFrame
 */
export function composeWidgets(widget: Compose) {
    const fr: AnimatedFrame[] = [];

    for (let frame = 0; frame < widget.length; frame++) {
        const activated_widget = widget.layers.filter((v) => {
            return frame >= v.start_frame 
                && (v.start_frame + (v.animation.getFrames().length)) > frame;
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