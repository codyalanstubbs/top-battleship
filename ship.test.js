import { ship } from "./ship.js";

test("ship length 5", () => {
    expect(ship(5).length).toBe(5);
});