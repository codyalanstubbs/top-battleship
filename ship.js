export const Ship = (len) => {
    const length    = len;
    let hits        = 0;
    const startCoord = [0,0];
    const endCoord = [0,len-1];

    const getStartCoord = () => {return startCoord};
    const getEndCoord   = () => {return endCoord};
    const getLength = () => {return length};
    const getHits   = () => {return hits};
    const hit       = () => {hits += 1};
    const isSunk    = () => {return hits === length};

    return {
        getStartCoord, getEndCoord, getLength, 
        getHits, hit, isSunk
    };
}