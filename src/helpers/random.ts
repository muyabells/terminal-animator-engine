/**
 * Min is inclusive, max is exclusive
 * @param min 
 * @param max 
 * @returns 
 */
export function randRange(min: number, max: number) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}