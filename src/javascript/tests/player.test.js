import { Ship, Gameboard, Player } from "../factories.js";

const playerOne = Player();
const playerOneGB = Gameboard(); // Create empty gameboard for testing computer player

const playerTwo = Player();
playerTwo.computer = true;
const playerTwoGB = Gameboard();
const playerTwoShip = Ship(5);
playerTwoGB.addShip(playerTwoShip, 0, 0, 'vertical');

describe("Validate non-computer player can attack player two with hit and miss", () => {
    test("Should return 'hit' for a successful hit", () => {
        expect(playerOne.attack(playerTwoGB, 0, 0).result).toBe('hit');
    });
    
    test("Should return 'miss'", () => {
        expect(playerOne.attack(playerTwoGB, 0, 6).result).toBe("miss");
    });
});

describe("Validate a computer player", () => {
    test("Should confirm player 2 is a computer by returning true", () => {
        expect(playerTwo.computer).toBe(true);
    });
    
    test("Should confirm that playerTwo has attacked and missed", () => {
        expect(playerTwo.attack(playerOneGB, 0, 0).result).toBe("miss");
    });
});