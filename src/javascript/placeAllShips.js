import { Ship } from "./factories";

export const placeAllShips = (gameboard) => {
    const ships = [
        {name: "carrier",       size: 5},
        {name: "battleship",    size: 4},
        {name: "cruiser",       size: 3},
        {name: "submarine",     size: 3},
        {name: "destroyer",     size: 2}
    ];

    ships.forEach((ship, index) => {
        gameboard.addShip(Ship(ship.size), 0, index, "horizontal");
    })

    return gameboard.board;
};