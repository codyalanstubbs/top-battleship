import { Ship, Gameboard, Player } from "./factories.js";

export const setUpGame = () => {
    const P1 = Player();
    const P2 = Player();
    P2.computer = true;
    
    const P1GB = Gameboard();
    const P2GB = Gameboard();
    
    while (!P1GB.allShipsSunk() || P2GB.allShipsSunk()){
        alert("playball!")
    };
};