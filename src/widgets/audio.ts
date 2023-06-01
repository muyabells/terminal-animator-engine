import { ReadStream } from "fs";
import { AudioIO } from "naudiodon";

export function playAudio(
	// Create a stream to pipe into the AudioOutput
	// Note that this does not strip the WAV header so a click will be heard at the beginning
	stream: ReadStream,

	sampleFormat: 8 | 16 = 16,
	sampleRate: number = 44100
) {
	// Create an instance of AudioIO with outOptions (defaults are as below), which will return a WritableStream
	const ao = AudioIO({
		outOptions: {
		  channelCount: 2,
		  sampleFormat: sampleFormat,
		  sampleRate: sampleRate,
		  deviceId: -1, // Use -1 or omit the deviceId to select the default device
		  closeOnError: true, // Close the stream if an audio error is detected, if set false then just log the error
		}
	});

	// Start piping data and start streaming
	stream.pipe(ao);
	ao.start();
}

// const rs = fs.createReadStream('../media/credits.wav');
