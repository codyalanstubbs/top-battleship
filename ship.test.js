import { Ship } from "./ship.js";

const newShip = Ship(5);

test("ship length 5", () => {
    expect(newShip.getLength()).toBe(5);
});

test("No hits on ship", () => {
    expect(newShip.getHits()).toBe(0);
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