import { Gameboard, Ship } from "./factories.js";

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
const newShip = Ship(5);
test("Check adding ship to board horizontally", () => {
    expect(p1Gameboard.addShip(newShip, 0, 0, 'horizontal')).toStrictEqual(gameboardWithShipH);
});


const p2Gameboard = Gameboard();
const newShipV = Ship(5);

const gameboardWithShipV = [
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [0,     null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,  null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,  null,   null,   null,   null,   null,   null,   null,   null,   null]
];

test("Check adding ship to board vertically", () => {
    expect(p2Gameboard.addShip(newShipV, 0, 0, 'vertical')).toStrictEqual(gameboardWithShipV);
});

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

test("Check check if all ships sunk on a gameboard - false", () => {
    expect(p2Gameboard.allShipsSunk()).toBe(false);
})

const sunkGameboard = Gameboard();
const anotherShip = Ship(5);
sunkGameboard.addShip(anotherShip, 0, 0, 'vertical');
sunkGameboard.receiveAttack(0,0);
sunkGameboard.receiveAttack(0,1);
sunkGameboard.receiveAttack(0,2);
sunkGameboard.receiveAttack(0,3);
sunkGameboard.receiveAttack(0,4);

test("Check check if all ships sunk on a gameboard - true", () => {
    expect(sunkGameboard.allShipsSunk()).toBe(true);
});