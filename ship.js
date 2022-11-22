export const Ship = (len) => {
    const length = len;
    let hits = 0;
    const getHits = () => {return hits};
    const hit = () => {hits += 1};
    return {length, getHits, hit};
}