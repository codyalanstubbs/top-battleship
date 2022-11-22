export const Ship = (len) => {
    const length = len;
    const getLength = () => {return length};
    let hits = 0;
    const getHits = () => {return hits};
    const hit = () => {hits += 1};
    const isSunk = () => {return hits === length};
    return {getLength, getHits, hit, isSunk};
}