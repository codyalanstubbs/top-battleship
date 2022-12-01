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
    test("Should confirm player 2 is a computer by returning true", () => {
        expect(playerTwo.computer).toBe(true);
    });
    
    test("Should return attack coordinates and return 'miss'", () => {
        const result00P2 = playerTwo.attack(playerOneGB, 0, 0);
        expect(result00P2.xAttack).toBe(0);
        expect(result00P2.yAttack).toBe(0);
        expect(result00P2.result).toBe('miss');
        expect(result00P2.result).not.toBe('hit');
        expect(result00P2.result).not.toBe('invalid');
    });
});