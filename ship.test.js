import { Ship, Gameboard } from "./ship.js";

const newShip = Ship(5);

test("ship length 5", () => {
    expect(newShip.getLength()).toBe(5);
});

test("No hits on ship", () => {
    expect(newShip.getHits()).toBe(0);
});

test("Get start coordinates", () => {
    expect(newShip.getStartCoord()).toStrictEqual([0,0]);
});

test("Get end coordinates", () => {
    expect(newShip.getEndCoord()).toStrictEqual([0,4]);
});

const setShipH = Ship(5);
setShipH.setCoord(1, 1, "horizontal");

test("Set new coordinates horizontally - check start", () => {
    expect(setShipH.getStartCoord()).toStrictEqual([1,1]);
});

test("Set new coordinates horizontally - check end", () => {
    expect(setShipH.getEndCoord()).toStrictEqual([5,1]);
});

const setShipV = Ship(5);
setShipV.setCoord(1, 1, "vertical");

test("Set new coordinates vertically - check start", () => {
    expect(setShipV.getStartCoord()).toStrictEqual([1,1]);
});

test("Set new coordinates vertically - check end", () => {
    expect(setShipV.getEndCoord()).toStrictEqual([1,5]);
});

const hitShip = Ship(5);
hitShip.hit();
test("Add hit to ship", () => {
    expect(hitShip.getHits()).toBe(1);
});

test("Check if ship sunk after one hit", () => {
    expect(hitShip.isSunk()).toBe(false);
});

const sunkShip = Ship(5);
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
sunkShip.hit();
test("Check if ship sunk after five hits", () => {
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