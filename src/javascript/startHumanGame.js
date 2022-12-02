import {
    Ship,
    Gameboard,
    Player
} from "./factories";

export const startHumanGame = () => {
    const body = document.querySelector("body");

    // Remove start menu elements
    while (body.lastChild) {
        if (body.lastChild.tagName === 'H1') break;
        body.removeChild(body.lastChild);
    };

    // Build game objects
    const P1 = Player();
    const P2 = Player();
    P2.computer = true;

    const P1GB = Gameboard();
    const P2GB = Gameboard();
    const shipSizes = [5, 4, 3, 3, 2];

    shipSizes.forEach((size, index) => {
        P1GB.addShipRandomly(Ship(size));
        P2GB.addShipRandomly(Ship(size));
    });

    // Build board mask
    const boardMask = document.createElement('div');
    boardMask.classList = "board-mask invisible";
    boardMask.textContent = "Click here for next player's turn."

    boardMask.addEventListener("click", () => {

        boardMask.classList.toggle("invisible");

        // Switch the grey coloring to indicate a shift of turns
        P1GBElement.classList.toggle("enemy");
        P2GBElement.classList.toggle("enemy");
        P1GBElement.classList.toggle("invisible");
        P2GBElement.classList.toggle("invisible");

        // Check if P2 destroyed all of P1's ships
        if (P1GB.allShipsSunk()) {
            // Remove start menu elements
            while (body.lastChild) {
                if (body.lastChild.tagName === 'H1') break;
                body.removeChild(body.lastChild);
            };
            body.lastChild.textContent = "Player 2 wins!";
        }

        // Check if P2 destroyed all of P1's ships
        if (P2GB.allShipsSunk()) {
            // Remove start menu elements
            while (body.lastChild) {
                if (body.lastChild.tagName === 'H1') break;
                body.removeChild(body.lastChild);
            };
            body.lastChild.textContent = "Player 2 wins!";
        }

    });

    // Build player 1 UI
    const P1GBElement = document.createElement('div');
    P1GBElement.classList = "player1 board enemy";

    P1GB.board.forEach((row, rowIndex) => {
        row.forEach((space, spaceIndex) => {

            const spaceElement = document.createElement('div');
            spaceElement.classList = "space";
            spaceElement.setAttribute("id", "P1-" + rowIndex + "-" + spaceIndex);

            // If P1 clicks, then...
            spaceElement.addEventListener("click", () => {

                P1GBElement.classList.toggle("no-events");
                P2GBElement.classList.toggle("no-events");

                // ...have P1's object attack player 2' gameboard
                const attackResult = P1.attack(P2GB, spaceIndex, rowIndex);

                // Modify P2's DOM gameboard accordingly
                if (attackResult.result === "miss") {
                    spaceElement.textContent = "X";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "hit") {
                    spaceElement.textContent = "O";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "invalid") {
                    alert("Move Invalid"); // This should not happen
                }

            });

            P1GBElement.appendChild(spaceElement);
        });
    });

    // Build player 2 UI
    const P2GBElement = document.createElement('div');
    P2GBElement.classList = "player2 board invisible no-events";

    P2GB.board.forEach((row, rowIndex) => {
        row.forEach((space, spaceIndex) => {

            const spaceElement = document.createElement('div');
            spaceElement.classList = "space";
            spaceElement.setAttribute("id", spaceIndex);


            // If P2 clicks, then...
            spaceElement.addEventListener("click", () => {

                P1GBElement.classList.toggle("no-events");
                P2GBElement.classList.toggle("no-events");

                // ...have P2's object attack player 1's gameboard
                const attackResult = P2.attack(P1GB, spaceIndex, rowIndex);

                // Modify P1's DOM gameboard accordingly
                if (attackResult.result === "miss") {
                    spaceElement.textContent = "X";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "hit") {
                    spaceElement.textContent = "O";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "invalid") {
                    alert("Move Invalid"); // This should not happen
                }

            });

            P2GBElement.appendChild(spaceElement);
        });
    });

    body.appendChild(boardMask);
    body.appendChild(P1GBElement);
    body.appendChild(P2GBElement);

}