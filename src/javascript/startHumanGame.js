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
    
    const P1Spaces = document.createElement('div');
    P1Spaces.classList = "player1 spaces";

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

            P1Spaces.appendChild(spaceElement);
        });
    });

    const P1Title = document.createElement("h3");
    P1Title.textContent = "Player 1";

    P1GBElement.appendChild(P1Title);
    P1GBElement.appendChild(P1Spaces);

    // Build player 2 UI
    const P2GBElement = document.createElement('div');
    P2GBElement.classList = "player2 board invisible no-events";

    const P2Spaces = document.createElement('div');
    P2Spaces.classList = "player2 spaces";
    
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

            P2Spaces.appendChild(spaceElement);
        });
    });

    const P2Title = document.createElement("h3");
    P2Title.textContent = "Player 2";

    P2GBElement.appendChild(P2Title);
    P2GBElement.appendChild(P2Spaces);
   
    // Build player 1 ship tracker
    const shipTrackerOne = document.createElement("div");
    shipTrackerOne.classList = "ship-tracker";
    shipTrackerOne.setAttribute("id", "one");

    // Build player 2 ship tracker
    const shipTrackerTwo = document.createElement("div");
    shipTrackerTwo.classList = "ship-tracker";
    shipTrackerTwo.setAttribute("id", "two");
    
    // Build and add ships to the ship trackers
    shipSizes.forEach((size, index) => {

        // Build player 1 ship
        const shipOne = document.createElement("div");
        shipOne.classList = "ship";
        shipOne.setAttribute("id", "ship-"+size);

        // Build player 2 ship
        const shipTwo = document.createElement("div");
        shipTwo.classList = "ship";
        shipTwo.setAttribute("id", "ship-"+size);

        for (let i = 0; i < size; i++) {
            // Build player 1 ship spaces
            const shipSpaceOne = document.createElement("div");
            shipSpaceOne.classList = "space";

            // Build player 2 ship spaces
            const shipSpaceTwo = document.createElement("div");
            shipSpaceTwo.classList = "space";

            shipOne.appendChild(shipSpaceOne);
            shipTwo.appendChild(shipSpaceTwo);
        }
        
        shipTrackerOne.appendChild(shipOne);
        shipTrackerTwo.appendChild(shipTwo);
    });

    // Build both players gameboards
    const gameboardOne = document.createElement("div");
    gameboardOne.classList = "gameboard-one";

    const gameboardTwo = document.createElement("div");
    gameboardTwo.classList = "gameboard-two";

    // Build the overall gameboards container
    const gameboardsContainer = document.createElement("div");
    gameboardsContainer.classList = "gameboards";
    
    // Append each element into their respective container
    gameboardOne.appendChild(shipTrackerOne);
    gameboardOne.appendChild(P1GBElement);

    gameboardTwo.appendChild(P2GBElement);        
    gameboardTwo.appendChild(shipTrackerTwo);
    
    gameboardsContainer.appendChild(gameboardOne);
    gameboardsContainer.appendChild(gameboardTwo);

    // Add gameboards container and all children to the docmument body
    body.appendChild(gameboardsContainer);

}