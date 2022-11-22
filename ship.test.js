import { ship } from "./ship.js";

test("ship length = 0", () => {
    expect(ship(0).length).toBe("Ship length must be greater than 0");
});