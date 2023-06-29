import { ReadStream } from "fs";
import CSVStream from "csv-reader";
import { Cell } from "../widgets/animated";

export function rexpaintCSVParse(file_stream: ReadStream) {
    const cells: Cell[][] = [];

    let x_data: Cell[] = [];
    let old_x = 0;
    let old_y = 0;

    file_stream
        .pipe(new CSVStream({ parseNumbers: false, trim: true }))
        .on("data", function (row: (string | number)[]) {
            const x = (row[0] as number);
            const y = (row[1] as number);
            const ascii_chr = String.fromCharCode((row[2] as number));
            const foreground = (row[3] as string);
            const background = (row[4] as string);
            // const cell = cells[x][y];
            // cell.f = ascii_chr;
            x_data.push()
            if (old_y !== y) {
                cells.push(x_data);
                x_data = [];
            }
            old_y = y;
            console.log(x, y)
        })
    
    console.log(
        cells
            .map(cell => {
                cell
                    .map(c => c.f)
                    .join("");
            })
            .join("")
    )
}