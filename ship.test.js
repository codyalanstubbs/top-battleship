import { ship } from "./ship.js";

test("ship length 5", () => {
    expect(ship(5).length).toBe(5);
});

test("No hits on ship", () => {
    expect(ship(5).hits).toBe(0);
});