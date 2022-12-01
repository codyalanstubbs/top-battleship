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

        const shipStartX    = aShip.getStartCoord()[0];
        const shipStartY    = aShip.getStartCoord()[1];
        const shipEndX      = aShip.getEndCoord()[0];
        const shipEndY      = aShip.getEndCoord()[1];
        let i;
        let shipIndex;

        const potentialShipSpaces = getPotentialShipSpaces(shipStartX , shipEndX, shipStartY, shipEndY);
        const shipSpaces = getShipSpaces();

        // Check if potential square is not already taken in gameboard...
        if (checkPotentialNotInGameboard(potentialShipSpaces, shipSpaces)) {

            // ...if not then add it to the ships array and board 
            shipIndex = ships.push(aShip) - 1;

            if (axis === 'horizontal') {

                for (i = shipStartX; i <= shipEndX; i++) {
                    board[shipStartY][i] = shipIndex;
                }

            } else if (axis === 'vertical') {

                for (i = shipStartY; i <= shipEndY; i++) {
                    board[i][shipStartX] = shipIndex;
                }

            }

            return board;
            
        } else {
            // ...if it is taken, then return false
            return false;
        }

    };
    
    const receiveAttack = (x, y) => {
        if (board[y][x] === null) {
            board[y][x] = 'miss';
            return {xAttack: x, yAttack: y, result: board[y][x]};
        } else if (board[y][x] !== null && board[y][x] !== 'miss' && board[y][x] !== 'hit') {
            const shipIndex = board[y][x];
            board[y][x] = 'hit';
            ships[shipIndex].hit();
            return {xAttack: x, yAttack: y, result: 'hit'};
        } else {
            return {xAttack: x, yAttack: y, result: 'invalid'};
        }
    }

    const allShipsSunk = () => {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {return false};
        }
        return true;
    }

    const getShipSpaces = () => {
        let shipSpaces = [];
        let counter = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                counter++;
                if (board[i][j] !== null) shipSpaces.push(counter)
            }
        }
        return shipSpaces;
    }

    const getPotentialShipSpaces = (startX, endX, startY, endY) => {
        let potentialShipSpaces = [];
        
        if (startX === endX) {
            for (let i = startY; i <= endY; i++) {
                potentialShipSpaces.push(i*10 + startX + 1);  
            }
        } else if (startY === endY) {
            for (let i = startX; i <= endX; i++) {
                potentialShipSpaces.push(startY*10 + i + 1);  
            }
        };

        return potentialShipSpaces;
    };

    const checkPotentialNotInGameboard = (potentialShipSpaces, shipSpaces) => {
        // Check if any potential space is in the array of actual spaces taken
        return !shipSpaces.some(r => potentialShipSpaces.indexOf(r) >= 0);
    };

    return {
        ships, board, addShip, receiveAttack, 
        allShipsSunk, getShipSpaces
    };
}

export const Player = () => {

    const attack = (enemyGameboard, x, y, computer = false) => {
        let xAttack = x;
        let yAttack = y;
        if (computer === true) {
            xAttack = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            yAttack = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        }

        let attackResult = enemyGameboard.receiveAttack(xAttack, yAttack)

        // Check if the receivedAttack was invalid - only relevant for the 
        // computer player since humans won't be able to click a space twice
        // because of the click event
        if (attackResult.result === "invalid") {
            attackResult = attack(enemyGameboard, x, y, computer);
        }

        return attackResult;
    };

    return {attack};
}