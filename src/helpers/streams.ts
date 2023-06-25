import { WriteStream } from "fs";
import { PassThrough } from "stream";

export function safeStreams(read: PassThrough, write: WriteStream) {
    read.on('data', function (chunk) {
        // according to docs the value of result variable is: 
        // Returns: <boolean> false if the stream wishes for the calling code to wait for the 'drain' event to be emitted before continuing to write additional data; otherwise true.
        const result = write.write(chunk);
    
        if(!result) {
            console.log("BACKPRESSURE");
            read.pause();
        }
    });
    
    write.on('drain', () => {
        console.log("DRAINED");
        read.resume();
    });
    
    read.on('end', function () {
        console.log("reading done");
        write.end();
    });
    
    write.on('close', function () {
        console.log("Writing done.");
    })
}