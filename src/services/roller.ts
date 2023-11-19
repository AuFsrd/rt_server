export const roll = (sides: number, times: number, offset: number = 0) => {
    let result = 0;
    for (let i = 0; i < times; i++) {
        result += Math.floor(Math.random() * sides) + offset;
    }
    return result;
}