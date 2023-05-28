import fs from "fs";
import portAudio from "naudiodon";

// Create an instance of AudioIO with outOptions (defaults are as below), which will return a WritableStream
const ao = portAudio.AudioIO({
  outOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 44100,
    deviceId: -1, // Use -1 or omit the deviceId to select the default device
    closeOnError: true, // Close the stream if an audio error is detected, if set false then just log the error
    framesPerBuffer: 60
  }
});

// Create a stream to pipe into the AudioOutput
// Note that this does not strip the WAV header so a click will be heard at the beginning
const rs = 
  fs.createReadStream('../media/credits.wav')
    .on("data", (s) => {
      console.log(s);
    })

// Start piping data and start streaming
rs.pipe(ao);
ao.start();