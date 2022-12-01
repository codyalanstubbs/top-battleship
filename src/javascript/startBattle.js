import { Ship, Gameboard, Player } from "./factories";

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {

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
        P1GB.addShip(Ship(size), 0, index, "horizontal");
        P2GB.addShip(Ship(size), index, 0, "vertical");
    });
    
    // Build player 1 UI
    const P1GBElement = document.createElement('div');
    P1GBElement.classList = "player1 board grey";

    P1GB.board.forEach((row, rowIndex) => {
        row.forEach((space, spaceIndex) => {

            const spaceElement = document.createElement('div');

            spaceElement.setAttribute("id", "P1-"+rowIndex+"-"+spaceIndex);

            if (space === null) {
                spaceElement.textContent = "~";
                spaceElement.classList = "space";
            } else if (space >= 0) {
                spaceElement.textContent = space;
                spaceElement.classList = "space ship";
            } else if (space === "miss") {
                spaceElement.textContent = "X";
                spaceElement.classList = "space miss";
            } else {
                spaceElement.textContent = "O";
                spaceElement.classList = "space hit";
            }

            P1GBElement.appendChild(spaceElement);
        });
    });
       
    // Build player 2 UI
    const P2GBElement = document.createElement('div');
    P2GBElement.classList = "player2 board";

    P2GB.board.forEach((row, rowIndex) => {
        row.forEach((space, spaceIndex) => {

            const spaceElement = document.createElement('div');
            spaceElement.classList = "space enemy";
            spaceElement.setAttribute("id", spaceIndex);

            spaceElement.addEventListener("click", () => {
                
                const attackResult = P1.attack(P2GB, spaceIndex, rowIndex);

                if (attackResult.result === "miss") {
                    spaceElement.textContent = "X";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "hit") {
                    spaceElement.textContent = "O";
                    spaceElement.classList = "space hit";
                } else if (attackResult.result === "invalid") {
                    alert("Move Invalid");
                }

                P2GBElement.classList.toggle("grey");
                P1GBElement.classList.toggle("grey");

                setTimeout(() => {

                    setTimeout(() => {
                        P2GBElement.classList.toggle("grey");
                        P1GBElement.classList.toggle("grey");
                    }, 1000);

                    if (P2GB.allShipsSunk()) {
                        // Remove start menu elements
                        while (body.lastChild) {
                            if (body.lastChild.tagName === 'H1') break;
                            body.removeChild(body.lastChild);
                        };
                        body.lastChild.textContent = "Player 1 wins!";
                    }
                    
                    const computerAttack = P2.attack(P1GB, 0, 0, true);
                    const P1AttackedSpace = document.querySelector(`#P1-${computerAttack.yAttack}-${computerAttack.xAttack}`);
    
                    if (computerAttack.result === "miss") {
                        P1AttackedSpace.textContent = "X";
                        P1AttackedSpace.classList = "space miss";
                    } else if (computerAttack.result === "hit") {
                        P1AttackedSpace.textContent = "O";
                        P1AttackedSpace.classList = "space hit";
                    } else if (computerAttack.result === "invalid") {
                        alert("Move Invalid");
                    }
    
                    if (P1GB.allShipsSunk()) {
                        // Remove start menu elements
                        while (body.lastChild) {
                            if (body.lastChild.tagName === 'H1') break;
                            body.removeChild(body.lastChild);
                        };
                        body.lastChild.textContent = "Player 1 wins!";
                    }

                }, 2000)
                
            });

            P2GBElement.appendChild(spaceElement);
        });
    });

    body.appendChild(P1GBElement);
    body.appendChild(P2GBElement);

});