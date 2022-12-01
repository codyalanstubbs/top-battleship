import { Ship, Gameboard, Player } from "../factories.js";

const playerOne = Player();
const playerOneGB = Gameboard(); // Create empty gameboard for testing computer player

const playerTwo = Player();
playerTwo.computer = true;
const playerTwoGB = Gameboard();
const playerTwoShip = Ship(5);
playerTwoGB.addShip(playerTwoShip, 0, 0, 'vertical');

describe("Validate non-computer player can attack player two with hit and miss", () => {
    test("Should return attack coordinates and 'hit'", () => {
        const result00 = playerOne.attack(playerTwoGB, 0, 0);
        expect(result00.xAttack).toBe(0);
        expect(result00.yAttack).toBe(0);
        expect(result00.result).toBe('hit');
        expect(result00.result).not.toBe('miss');
        expect(result00.result).not.toBe('invalid');
    });
    
    test("Should return attack coordinates and 'miss'", () => {
        const result06 = playerOne.attack(playerTwoGB, 0, 6);
        expect(result06.xAttack).toBe(0);
        expect(result06.yAttack).toBe(6);
        expect(result06.result).toBe('miss');
        expect(result06.result).not.toBe('hit');
        expect(result06.result).not.toBe('invalid');
    });
});

describe("Validate a computer player", () => {
    test("Should return attack coordinates and return 'miss'", () => {
        // Using negative numbers as inputs since the true argument 
        // should change the x and y values because it indicates a computer
        // player is attacking
        const result00P2 = playerTwo.attack(playerOneGB, -1, -1, true);

        expect(result00P2.xAttack).toBeGreaterThanOrEqual(0);
        expect(result00P2.xAttack).not.toBeGreaterThan(9);
        expect(result00P2.xAttack).not.toBeLessThan(0);

        expect(result00P2.yAttack).toBeGreaterThanOrEqual(0);
        expect(result00P2.yAttack).not.toBeGreaterThan(9);
        expect(result00P2.yAttack).not.toBeLessThan(0);

        expect(result00P2.result).toBe('miss');
        expect(result00P2.result).not.toBe('hit');
        expect(result00P2.result).not.toBe('invalid');
    });
});