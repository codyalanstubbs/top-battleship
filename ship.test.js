import { Ship } from "./ship.js";

const newShip = Ship(5);

test("ship length 5", () => {
    expect(newShip.length).toBe(5);
});

test("No hits on ship", () => {
    expect(newShip.getHits()).toBe(0);
});

const hitShip = Ship(5);
hitShip.hit();
test("Add hit to ship", () => {
    expect(hitShip.getHits()).toBe(1);
});