import { Ship, Gameboard, Player } from "./factories.js";

const playerOne = Player();
const playerOneGB = Gameboard(); // Create empty gameboard for testing computer player

const playerTwo = Player();
playerTwo.computer = true;
const playerTwoGB = Gameboard();
const playerTwoShip = Ship(5);
playerTwoGB.addShip(playerTwoShip, 0, 0, 'vertical');

test("Check if P1's attack on P2's gameboard works - hit", () => {
    expect(playerOne.attack(playerTwoGB, 0, 0)).toBe(1);
});

test("Check if P1's attack on P2's gameboard works - miss", () => {
    expect(playerOne.attack(playerTwoGB, 0, 6)).toBe("miss");
});

test("Check if playerTwo is a computer", () => {
    expect(playerTwo.computer).toBe(true);
});

test("Check if P2's attack on P1's gameboard works - miss", () => {
    expect(playerTwo.attack(playerOneGB, 0, 0)).toBe("miss");
});