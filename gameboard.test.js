import { Gameboard, Ship } from "./factories.js";

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
    
    test("Check Gameboard.board array", () => {
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

    test("Check adding ship to board horizontally", () => {
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

    test("Check adding ship to board vertically", () => {
        expect(p1Gameboard.addShip(Ship(5), 9, 0, 'vertical')).toStrictEqual(gameboardWithShipV);
    });
})

describe("Validate successful hits", () => {
    const p2Gameboard = Gameboard();
    p2Gameboard.addShip(Ship(5), 0, 0, 'vertical');

    test("Receive attack on a ship spot", () => {
        expect(p2Gameboard.receiveAttack(0,1)).toBe(1);
    })
    
    test("Check that ship does receive hit", () => {
        expect(p2Gameboard.ships[0].getHits()).toBe(1);
    })
    
    test("Receive attack on an empty spot", () => {
        expect(p2Gameboard.receiveAttack(0,9)).toBe("miss");
    })
    
    test("Receive attack on an empty spot that was already hit", () => {
        expect(p2Gameboard.receiveAttack(0,9)).toBe("invalid");
    })
    
    test("Receive attack on a ship spot that has already been hit", () => {
        expect(p2Gameboard.receiveAttack(0,1)).toBe("invalid");
    })
    
    test("Check that ship does not receive additional hits", () => {
        expect(p2Gameboard.ships[0].getHits()).toBe(1);
    })
})

describe("Valide checking gameboard for sunk ships", () => {
    const p1Gameboard = Gameboard();
    const anotherShip = Ship(5);
    p1Gameboard.addShip(anotherShip, 0, 0, 'vertical');
    
    test("Check check if all ships sunk on a gameboard - false", () => {
        expect(p1Gameboard.allShipsSunk()).toBe(false);
    });

    test("Check check if all ships sunk on a gameboard - true", () => {
        p1Gameboard.receiveAttack(0,0);
        p1Gameboard.receiveAttack(0,1);
        p1Gameboard.receiveAttack(0,2);
        p1Gameboard.receiveAttack(0,3);
        p1Gameboard.receiveAttack(0,4);
        expect(p1Gameboard.allShipsSunk()).toBe(true);
    });
})
