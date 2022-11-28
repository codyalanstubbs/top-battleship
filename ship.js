export const Ship = (len) => {
    const length    = len;
    let hits        = 0;
    let startCoord  = [ 0,  0 ];
    let endCoord    = [ 0,  len-1];

    const getStartCoord = () => {return startCoord};
    const getEndCoord   = () => {return endCoord};
    const getLength     = () => {return length};
    const getHits       = () => {return hits};
    const hit           = () => {hits += 1};
    const isSunk        = () => {return hits === length};

    const setCoord  = (startX, startY, axis) => {
        startCoord[0]   = startX;
        startCoord[1]   = startY;
        
        if (axis === 'horizontal') {
            endCoord[0]     = startX + length - 1;
            endCoord[1]     = startY;
        } else if ('vertical') {
            endCoord[0]     = startX;
            endCoord[1]     = startY + length - 1;
        }

        return [startCoord, endCoord];
    }

    return {
        getStartCoord, getEndCoord, getLength, 
        getHits, hit, isSunk, setCoord
    };
}

export const Gameboard = () => {
    let board = [
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];

    let ships = [];

    const addShip = (aShip, startX, startY, axis) => {
        aShip.setCoord(startX, startY, axis);

        const shipIndex     = ships.push(aShip) - 1;
        const shipStartX    = aShip.getStartCoord()[0];
        const shipStartY    = aShip.getStartCoord()[1];
        const shipEndX      = aShip.getEndCoord()[0];
        const shipEndY      = aShip.getEndCoord()[1];
        let i;

        if (axis === 'horizontal') {
            for (i = shipStartX; i <= shipEndX; i++) {
                board[shipStartY][i] = shipIndex;
            }
        } else if (axis === 'vertical') {
            for (i = shipStartY; i <= shipEndY+1; i++) {
                board[i][shipStartX] = shipIndex;
            }
        }

        return board;
    }

    return {board, addShip};
}