import { AnimatedFrame, AnimatedWidget } from "./animated.js";

type Overlay = {
    start_frame: number,
    animation: AnimatedWidget
};
type Compose = {
    main: AnimatedWidget,
    overlays: Overlay[]
}

export function composeWidgets(widget: Compose) {
    const fr: AnimatedFrame[] = [];
    // TODO: Please figure out how overlays will work.
    // AnimationWidgets => AnimationFrames for playback
    const frames = widget.main.getFrames();
    for (let frame = 0; frame < frames.length; frame++) {
        const activated_widget = widget.overlays.filter((v) => {
            return frame >= v.start_frame && (v.animation.getFrames().length - 1) > frame;
        });
        activated_widget.push({
            start_frame: 0,
            animation: widget.main
        })
        fr.push({
            frame: activated_widget.flatMap(v => {
                v.animation.addFrameCount();
                return v.animation.getFrameNumber(v.animation.getFrameCount()).frame;
            })
        });
    }
    return fr;
}