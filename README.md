<p align="center">
    <img src="https://github.com/muyabells/terminal-animator-engine/assets/134768752/b14cae44-ac9c-43f0-9033-8f08c3f38819" width="200"/>
</p>

# Terminal Animator 📜🖊

> **A functional approach to animation.** Aiming for high customizability and minimal boilerplate.

> This is built for animating videos with ASCII art.

You can make your own animations in the terminal using this library. 
However, it's still ~~very in the works~~ almost done! 

Performance is not a priority right now, so if you want to change bad performing code, please make it readable.


## High-Priority: To Do Features
- Color support `(75% complete * color support is in experimental!)`

## Code Example

Full example is in test/index.ts

```ts
// creating the loading frames
function loading(coords: { x: number, y: number }): AnimatedFrame[] {
    return parseStringsToFrames(["/", "-", "\\", "|", "/", "-", "\\"], coords);
}
// helper function for getting frames from a .tani file
function importAnimation(file: string, coords: { x: number, y: number }) {
    return parseAniFile(readFileSync(`./frames/ani/${file}.tani`).toString(), coords);
}

// composes those frames into giant series of frames lasting 30 frames only
const composed = composeWidgets({
    layers: [
        { start_frame: 3, animation: new AnimatedWidget(
            loop( // repeats the loading animation 10 times
                loading({ x: 2, y: 2 }), 10
            )
        )},
    ],
    length: 30,
});

// plays the animation with 15 FPS and a 100x100 canvas
const player = new Player(100, 100);
player.play(composed, FRAMES15);

// you could also pass in the frames directly
player.play(loading({ x: 2, y: 2 }), 10);
```

## How It Works
![terminal-animator-02](https://github.com/muyabells/terminal-animator-engine/assets/134768752/2e6605f5-b8d8-4afa-85f6-1a72bb5d1a4c)

## Original Purpose
Built for animating ![Frums' Wavetapper](https://www.youtube.com/watch?v=-lRPEny5jug), but I got extremely fed up with my spaghetti code. Thus, I made my own framework for animating.
