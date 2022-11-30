import { Gameboard, Player } from "./factories";
import { placeAllShips } from "./placeAllShips";

export const setupGame = () => {
    const P1 = Player();
    const P2 = Player();
    P2.computer = true;
    
    const P1GB = Gameboard();
    console.log(placeAllShips(P1GB));
    const P2GB = Gameboard();
    console.log(placeAllShips(P2GB));
    
    // while (!P1GB.allShipsSunk() || P2GB.allShipsSunk()) {
    //     alert("playball!")
    // };
};