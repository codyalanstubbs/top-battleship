import { Ship } from "../javascript/factories.js";

describe("Validate the Ship factory's getters", () => {
    const newShip = Ship(5);

    test("Should return ship length of 5", () => {
        expect(newShip.getLength()).toBe(5);
    });

    test("Should return no hits, e.g.: 0", () => {
        expect(newShip.getHits()).toBe(0);
    });

    test("Should return the default start coordinates [0, 0]", () => {
        expect(newShip.getStartCoord()).toStrictEqual([0,0]);
    });

    test("Should return the default end coordinates [0, 5-1]", () => {
        expect(newShip.getEndCoord()).toStrictEqual([0,4]);
    });
});

describe("Validate setting coordinates of horizontal ship", () => {
    const setShipH = Ship(5);
    setShipH.setCoord(1, 1, "horizontal");
    
    test("Should return the new start coordinates [1,1]", () => {
        expect(setShipH.getStartCoord()).toStrictEqual([1,1]);
    });
    
    test("Should return the new end coordinates [1+5-1, 1]", () => {
        expect(setShipH.getEndCoord()).toStrictEqual([5,1]);
    });
});

describe("Validate setting coordinates of vertical ship", () => {
    const setShipV = Ship(5);
    setShipV.setCoord(1, 1, "vertical");
    
    test("Should return the new start coordinates [1,1]", () => {
        expect(setShipV.getStartCoord()).toStrictEqual([1,1]);
    });
    
    test("Should return the new start coordinates [1, 1+5-1]", () => {
        expect(setShipV.getEndCoord()).toStrictEqual([1,5]);
    });
});

describe("Validate the ships isSunk method", () => {
    const ship = Ship(5);

    test("Should return 1 hit after 1 hit", () => {
        ship.hit();
        expect(ship.getHits()).toBe(1);
    });
    
    test("Should return false after only 1 hit", () => {
        expect(ship.isSunk()).toBe(false);
    });

    test("Should return true after 4 more hits", () => {          
        ship.hit();
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
})