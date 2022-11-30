import { Ship, Gameboard, Player } from "../javascript/factories.js";

const playerOne = Player();
const playerOneGB = Gameboard(); // Create empty gameboard for testing computer player

const playerTwo = Player();
playerTwo.computer = true;
const playerTwoGB = Gameboard();
const playerTwoShip = Ship(5);
playerTwoGB.addShip(playerTwoShip, 0, 0, 'vertical');

describe("Validate non-computer player can attack player two with hit and miss", () => {
    test("Should return 1 for a successful hit", () => {
        expect(playerOne.attack(playerTwoGB, 0, 0)).toBe(1);
    });
    
    test("Should return 'miss'", () => {
        expect(playerOne.attack(playerTwoGB, 0, 6)).toBe("miss");
    });
});

describe("Validate a computer player", () => {
    test("Should confirm player 2 is a computer by returning true", () => {
        expect(playerTwo.computer).toBe(true);
    });
    
    test("Should confirm that playerTwo has attacked and missed", () => {
        expect(playerTwo.attack(playerOneGB, 0, 0)).toBe("miss");
    });
});