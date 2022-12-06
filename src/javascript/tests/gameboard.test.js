import { Gameboard, Ship } from "../factories.js";

describe('Create gameboard', () => {
    const p1Gameboard = Gameboard();
    const mockGameboard = [
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
    
    test("Should return an array exactly equal to mock with no ships", () => {
        expect(p1Gameboard.board).toStrictEqual(mockGameboard);
    });

});

describe("Validate adding ships to gameboard", () => {
    const p1Gameboard = Gameboard();
    const gameboardWithShipH = [
        ['0-0', '0-1',  '0-2',  '0-3',  '0-4',  null,   null,   null,   null,   null],
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

    test("Should return an array with a ship with index 0 on row 0 columns 0 to 4", () => {
        expect(p1Gameboard.addShip(Ship(5), 0, 0, 'horizontal')).toStrictEqual(gameboardWithShipH);
    });

    // Since the same gameboard is being used to test the vertical addition
    // the index of the vertical addition will be 1 instead of zero since the
    // horizontal ship has already been added
    const gameboardWithShipV = [
        ['0-0', '0-1', '0-2',  '0-3',  '0-4',   null,   null,   null,   null,   '1-0'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-1'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-2'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-3'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-4'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];

    test("Should return an array with with both a horizontal ship (index=0) and vertical ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(5), 9, 0, 'vertical')).toStrictEqual(gameboardWithShipV);
    });

    // 
    const gameboardWithShipVH = [
        ['0-0', '0-1', '0-2',  '0-3',  '0-4',   null,   null,   null,   null,   '1-0'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-1'],
        ['2-0', '2-1', '2-2',  '2-3',  '2-4',   null,   null,   null,   null,   '1-2'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-3'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-4'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];

    test("Should return an array with two horizontal ships (index=0 & 2) and vertical ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(5), 0, 2, 'horizontal')).toStrictEqual(gameboardWithShipVH);
    });

    test("Should return false since it occurs right below ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(3), 7, 5, 'horizontal')).toStrictEqual(false);
    });
    
    const gameboardWith4Ships = [
        ['0-0', '0-1', '0-2',  '0-3',  '0-4',   null,   null,   null,   null,   '1-0'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-1'],
        ['2-0', '2-1', '2-2',  '2-3',  '2-4',   null,   null,   null,   null,   '1-2'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-3'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-4'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        ['3-0', '3-1', '3-2',  '3-3',  '3-4',   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];

    test("Should return false since it occurs right below ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(5), 0, 6, 'horizontal')).toStrictEqual(gameboardWith4Ships);
    });

    test("Should return false since it occurs right below ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(3), 7, 5, 'horizontal')).toStrictEqual(false);
    });
    
    const gameboardWith5Ships = [
        ['0-0', '0-1', '0-2',  '0-3',  '0-4',   null,   null,   null,   null,   '1-0'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-1'],
        ['2-0', '2-1', '2-2',  '2-3',  '2-4',   null,   null,   null,   null,   '1-2'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-3'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   '1-4'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        ['3-0', '3-1', '3-2',  '3-3',  '3-4',   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   '4-0',  '4-1',  '4-2'],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];
    
    test("Should return false since it occurs right below ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(3), 7, 7, 'horizontal')).toStrictEqual(gameboardWith5Ships);
    });
})

describe("Validate successful hits", () => {
    const p2Gameboard = Gameboard();
    p2Gameboard.addShip(Ship(5), 0, 0, 'vertical');

    test("Should return object with attack coordinates and 'hit' result", () => {
        const result01 = p2Gameboard.receiveAttack(0,1);
        expect(result01.xAttack).toBe(0);
        expect(result01.yAttack).toBe(1);
        expect(result01.result).toBe('hit');
        expect(result01.result).not.toBe('miss');
        expect(result01.result).not.toBe('invalid');
    })
    
    test("Should return a hit value of 1", () => {
        expect(p2Gameboard.ships[0].getHits()).toBe(1);
    })
    
    test("Should return object with attack coordinates and 'miss' result", () => {
        const result09 = p2Gameboard.receiveAttack(0,9);
        expect(result09.xAttack).toBe(0);
        expect(result09.yAttack).toBe(9);
        expect(result09.result).toBe('miss');
        expect(result09.result).not.toBe('hit');
        expect(result09.result).not.toBe('invalid');
    })
    
    test("Should return object with attack coordinates and 'invalid' result since missed spot was already fired at", () => {
        const result09 = p2Gameboard.receiveAttack(0,9);
        expect(result09.xAttack).toBe(0);
        expect(result09.yAttack).toBe(9);
        expect(result09.result).toBe('invalid');
        expect(result09.result).not.toBe('hit');
        expect(result09.result).not.toBe('miss');
    })
    
    test("Should return object with attack coordinates and 'invalid' result since ship/hit spot was already fired at", () => {
        const result09 = p2Gameboard.receiveAttack(0,1);
        expect(result09.xAttack).toBe(0);
        expect(result09.yAttack).toBe(1);
        expect(result09.result).toBe('invalid');
        expect(result09.result).not.toBe('hit');
        expect(result09.result).not.toBe('miss');
    })
    
    test("Should check that ship does not receive additional hits and returns 1", () => {
        expect(p2Gameboard.ships[0].getHits()).toBe(1);
    })
})

describe("Valide checking gameboard for sunk ships", () => {
    const p1Gameboard = Gameboard();
    const anotherShip = Ship(5);
    p1Gameboard.addShip(anotherShip, 0, 0, 'vertical');
    
    test("Should return false since no ships have been hit yet", () => {
        expect(p1Gameboard.allShipsSunk()).toBe(false);
    });

    test("Should return true since the only ship has been hit 5 times", () => {
        p1Gameboard.receiveAttack(0,0);
        p1Gameboard.receiveAttack(0,1);
        p1Gameboard.receiveAttack(0,2);
        p1Gameboard.receiveAttack(0,3);
        p1Gameboard.receiveAttack(0,4);
        expect(p1Gameboard.allShipsSunk()).toBe(true);
    });
})

describe("Make sure added ships cannot overlap", () => {
    const p1Gameboard = Gameboard();
    const anotherShip = Ship(5);
    
    test("Should return 10 since length of", () => {
        p1Gameboard.addShip(anotherShip, 0, 0, 'vertical');
        expect(p1Gameboard.getShipSpaces()).toStrictEqual([1,11,21,31,41]);
    });

    test("Should return false", () => {
        p1Gameboard.addShip(anotherShip, 0, 0, 'vertical');
        const result = p1Gameboard.addShip(anotherShip, 0, 0, 'vertical');
        expect(result).toStrictEqual(false);
    });
});

describe("Check add ships randomly works for 1 ship", () => {
    const shipLength = 5;
    const p1Gameboard = Gameboard();
    const anotherShip = Ship(shipLength);
    
    p1Gameboard.addShipRandomly(anotherShip);
    let shipSpaces = p1Gameboard.getShipSpaces();

    test("Should return board array - not false", () => {
        expect(shipSpaces).not.toBe(false);
    });

    test("Should return correct ship length", () => {
        expect(shipSpaces.length).toBe(shipLength);
    });

    test("Should return a number between 1 and 100", () => {
        shipSpaces.forEach((space) => {
            expect(space).toBeGreaterThanOrEqual(1);
            expect(space).toBeLessThanOrEqual(100);
        })
    });

});

describe("Check add ships randomly works for 5 ships", () => {
    const shipLengths = [5, 4, 3, 3, 2];
    const p1Gameboard = Gameboard();

    shipLengths.forEach((length) => {
        const anotherShip = Ship(length);
        p1Gameboard.addShipRandomly(anotherShip);
    })

    test("Should return 5", () => {
        expect(p1Gameboard.ships.length).toBe(5);
    });
});