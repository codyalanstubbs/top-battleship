export const Ship = (len) => {
    const length = len;
    const getLength = () => {return length};
    let hits = 0;
    const getHits = () => {return hits};
    const hit = () => {hits += 1};
    return {getLength, getHits, hit};
}