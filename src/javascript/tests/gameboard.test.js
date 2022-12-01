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

    test("Should add a hit to ship and return a hit value of 1", () => {
        expect(p2Gameboard.receiveAttack(0,1).result).toBe('hit');
    })
    
    test("Should return a hit value of 1", () => {
        expect(p2Gameboard.ships[0].getHits()).toBe(1);
    })
    
    test("Should return string 'miss'", () => {
        expect(p2Gameboard.receiveAttack(0,9).result).toBe("miss");
    })
    
    test("Should receive attack on an empty spot that was already hit and return 'invalid'", () => {
        expect(p2Gameboard.receiveAttack(0,9).result).toBe("invalid");
    })
    
    test("Should receive attack on a ship spot that has already been hit and return 'invalid'", () => {
        expect(p2Gameboard.receiveAttack(0,1).result).toBe("invalid");
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
