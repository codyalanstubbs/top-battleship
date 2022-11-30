import { Ship, Gameboard, Player } from "./ship.js";

const newShip = Ship(5);
let i = 1;
test(`${i++}) `+"ship length 5", () => {
    expect(newShip.getLength()).toBe(5);
});

test(`${i++}) `+"No hits on ship", () => {
    expect(newShip.getHits()).toBe(0);
});

test(`${i++}) `+"Get start coordinates", () => {
    expect(newShip.getStartCoord()).toStrictEqual([0,0]);
});

test(`${i++}) `+"Get end coordinates", () => {
    expect(newShip.getEndCoord()).toStrictEqual([0,4]);
});

const setShipH = Ship(5);
setShipH.setCoord(1, 1, "horizontal");

test(`${i++}) `+"Set new coordinates horizontally - check start", () => {
    expect(setShipH.getStartCoord()).toStrictEqual([1,1]);
});

test(`${i++}) `+"Set new coordinates horizontally - check end", () => {
    expect(setShipH.getEndCoord()).toStrictEqual([5,1]);
});

const setShipV = Ship(5);
setShipV.setCoord(1, 1, "vertical");

test(`${i++}) `+"Set new coordinates vertically - check start", () => {
    expect(setShipV.getStartCoord()).toStrictEqual([1,1]);
});

test(`${i++}) `+"Set new coordinates vertically - check end", () => {
    expect(setShipV.getEndCoord()).toStrictEqual([1,5]);
});

const hitShip = Ship(5);
hitShip.hit();
test(`${i++}) `+"Add hit to ship", () => {
    expect(hitShip.getHits()).toBe(1);
});

test(`${i++}) `+"Check if ship sunk after one hit", () => {
    expect(hitShip.isSunk()).toBe(false);
});

const sunkShip = Ship(5);
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
test(`${i++}) `+"Check if ship sunk after five hits", () => {
    expect(sunkShip.isSunk()).toBe(true);
});

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

test(`${i++}) `+"Check Gameboard.board array", () => {
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

test(`${i++}) `+"Check adding ship to board horizontally", () => {
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

test(`${i++}) `+"Check adding ship to board vertically", () => {
    expect(p2Gameboard.addShip(newShipV, 0, 0, 'vertical')).toStrictEqual(gameboardWithShipV);
});

test(`${i++}) `+"Receive attack on a ship spot", () => {
    expect(p2Gameboard.receiveAttack(0,1)).toBe(1);
})

test(`${i++}) `+"Check that ship does receive hit", () => {
    expect(p2Gameboard.ships[0].getHits()).toBe(1);
})

test(`${i++}) `+"Receive attack on an empty spot", () => {
    expect(p2Gameboard.receiveAttack(0,9)).toBe("miss");
})

test(`${i++}) `+"Receive attack on an empty spot that was already hit", () => {
    expect(p2Gameboard.receiveAttack(0,9)).toBe("invalid");
})

test(`${i++}) `+"Receive attack on a ship spot that has already been hit", () => {
    expect(p2Gameboard.receiveAttack(0,1)).toBe("invalid");
})

test(`${i++}) `+"Check that ship does not receive additional hits", () => {
    expect(p2Gameboard.ships[0].getHits()).toBe(1);
})

test(`${i++}) `+"Check check if all ships sunk on a gameboard - false", () => {
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

test(`${i++}) `+"Check check if all ships sunk on a gameboard - true", () => {
    expect(sunkGameboard.allShipsSunk()).toBe(true);
});

const playerOne = Player();
const playerOneGB = Gameboard(); // Create empty gameboard for testing computer player

const playerTwo = Player();
playerTwo.computer = true;
const playerTwoGB = Gameboard();
const playerTwoShip = Ship(5);
playerTwoGB.addShip(playerTwoShip, 0, 0, 'vertical');

test(`${i++}) `+"Check if P1's attack on P2's gameboard works - hit", () => {
    expect(playerOne.attack(playerTwoGB, 0, 0)).toBe(1);
});

test(`${i++}) `+"Check if P1's attack on P2's gameboard works - miss", () => {
    expect(playerOne.attack(playerTwoGB, 0, 6)).toBe("miss");
});

test(`${i++}) `+"Check if playerTwo is a computer", () => {
    expect(playerTwo.computer).toBe(true);
});

test(`${i++}) `+"Check if P2's attack on P1's gameboard works - miss", () => {
    expect(playerTwo.attack(playerOneGB, 0, 0)).toBe("miss");
});