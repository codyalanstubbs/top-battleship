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
        [0,     0,      0,      0,      0,      null,   null,   null,   null,   null],
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
        [0,     0,      0,      0,      0,      null,   null,   null,   null,   1],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   1],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   1],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   1],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   1],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
        [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
    ];

    test("Should return an array with with both a horizontal ship (index=0) and vertical ship (index=1)", () => {
        expect(p1Gameboard.addShip(Ship(5), 9, 0, 'vertical')).toStrictEqual(gameboardWithShipV);
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