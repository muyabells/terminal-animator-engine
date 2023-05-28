import { AnimatedFrame, AnimatedWidget } from "./animated.js";

type Overlay = {
    start_frame: number,
    animation: AnimatedWidget
};
export type Compose = {
    overlays: Overlay[],
    length: number
}

export function composeWidgets(widget: Compose) {
    const fr: AnimatedFrame[] = [];

    for (let frame = 0; frame < widget.length; frame++) {
        const activated_widget = widget.overlays.filter((v) => {
            return frame >= v.start_frame && (v.animation.getFrames().length - 1) > frame;
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