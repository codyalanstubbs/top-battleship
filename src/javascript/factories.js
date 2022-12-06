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

        // Check if...
        if (
            // ...potential spaces are not already taken in gameboard...AND
            checkPotentialSpacesNotOccupied(potentialShipSpaces, shipSpaces) &&
            // ...adjacent spaces are not already taken in gameboard...
            checkAdjacentSpacesNotOccupied(potentialShipSpaces, shipSpaces, axis)
        ) {

            // ...if neither then add ship to the ships array and board 
            shipIndex = ships.push(aShip) - 1;

            if (axis === 'horizontal') {

                for (i = shipStartX; i <= shipEndX; i++) {
                    board[shipStartY][i] = `${shipIndex}-${i-shipStartX}`;
                }

            } else if (axis === 'vertical') {

                for (i = shipStartY; i <= shipEndY; i++) {
                    board[i][shipStartX] = `${shipIndex}-${i-shipStartY}`;
                }

            }

            return board;
            
        } else {
            // ...if either are taken, then return false
            return false;
        }

    };
    
    const receiveAttack = (x, y) => {
        if (board[y][x] === null) {
            board[y][x] = 'miss';
            return {xAttack: x, yAttack: y, result: board[y][x]};
        } else if (board[y][x] !== null && board[y][x] !== 'miss' && board[y][x] !== 'hit') {
            const shipIndex = board[y][x].split("-")[0];
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

    const checkPotentialSpacesNotOccupied = (potentialShipSpaces, shipSpaces) => {
        // Check if any potential space is in the array of actual spaces taken
        return !shipSpaces.some(r => potentialShipSpaces.indexOf(r) >= 0);
    };

    const checkAdjacentSpacesNotOccupied = (potentialShipSpaces, shipSpaces, axis) => {
        let adjacentSpaces = [];
        
        // Calculate the adjacents spaces for potential ship spaces and...
        // ...add to adjacentSpaces array
        potentialShipSpaces.forEach((potentialSpace, index) => {

            if (axis === "vertical") {
                // For all potential vertical spaces...
                // ...if ith potential space not on far right, then check i+1 space
                if (potentialSpace % 10 !== 0) adjacentSpaces.push(potentialSpace +  0 + 1);
                // ...if ith potential space not on far left, then check i-1 space
                if ((potentialSpace - 1) % 10 !== 0) adjacentSpaces.push(potentialSpace +  0 - 1);

                if (index === 0) { // If first potential space, then...

                    // ...check adjacent space above potential space
                    adjacentSpaces.push(potentialSpace - 10 + 0);
                    // ...also...
                    // ...if ith potential space not on far right, then check i+1 space
                    if (potentialSpace % 10 !== 0) adjacentSpaces.push(potentialSpace - 10 + 1);
                    // ...if ith potential space not on far left, then check i-1 space
                    if ((potentialSpace - 1) % 10 !== 0) adjacentSpaces.push(potentialSpace - 10 - 1);

                } else if (index === potentialShipSpaces.length-1) {  // If last potential space, then...
                    // ...check adjacent space below potential space
                    adjacentSpaces.push(potentialSpace + 10 + 0);
                    // ...also...
                    // ...if ith potential space not on far right, then check i+1 space
                    if (potentialSpace % 10 !== 0) adjacentSpaces.push(potentialSpace + 10 + 1);
                    // ...if ith potential space not on far left, then check i-1 space
                    if ((potentialSpace - 1) % 10 !== 0) adjacentSpaces.push(potentialSpace + 10 - 1);
                }

            } else if (axis === "horizontal") {
                // For all potential vertical spaces...
                adjacentSpaces.push(potentialSpace + 10 + 0);
                adjacentSpaces.push(potentialSpace - 10 + 0);
                
                if (index === 0) {
                    // ...if ith potential space not on far left, then check i-1, i-9, i-11 spaces
                    if ((potentialSpace - 1) % 10 !== 0) {
                        adjacentSpaces.push(potentialSpace +  0 - 1);
                        adjacentSpaces.push(potentialSpace + 10 - 1);
                        adjacentSpaces.push(potentialSpace - 10 - 1);
                    }
                } else if (index === potentialShipSpaces.length-1) {
                    if (potentialSpace % 10 !== 0) { 
                        adjacentSpaces.push(potentialSpace +  0 + 1);
                        adjacentSpaces.push(potentialSpace + 10 + 1);
                        adjacentSpaces.push(potentialSpace - 10 + 1);
                    }
                }

            };
        })

        // Check if any adjacent space is in the array of actual spaces taken
        return !shipSpaces.some(r => adjacentSpaces.indexOf(r) >= 0);
    };

    const addShipRandomly = (aShip) => {

        // Determine the ships axis
        let axis;
        const zeroOne = Math.round(Math.random());
        (zeroOne === 0) ? axis = "vertical" : axis = "horizontal";
        
        // Determine the ships starting coordinates
        let x = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        let y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    
        if (axis === "vertical") {

            // Check that the ship is on the board...
            // ...if not then keep changing y until it is
            while (y + aShip.getLength() > 9) {
                y = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            };
    
        } else if (axis === "horizontal") {
                        
            // Check that the ship is on the board...
            // ...if not then keep changing x until it is
            while (x + aShip.getLength() > 9) {
                x = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            };
            
        }
        
        // Add the ship to the gameboard
        const addedShipResult = addShip(aShip, x, y, axis);
    
        // If the ship was not placed successfully...
        if (addedShipResult === false) {
            // ...keeping recursively run this function until it 
            // provides a successfuly result
            addShipRandomly(aShip);
        }
    
        return addedShipResult;
    };

    return {
        ships, board, addShip, receiveAttack, 
        allShipsSunk, getShipSpaces, addShipRandomly
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