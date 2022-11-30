import { Ship, Gameboard, Player } from "./factories";

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {

    const body = document.querySelector("body");

    while (body.lastChild) {
        if (body.lastChild.tagName === 'H1') break;
        body.removeChild(body.lastChild);
    };

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
    
    const P1GBElement = document.createElement('div');
    P1GBElement.classList = "player1 board";
    P1GB.board.forEach((row) => {
        row.forEach((space) => {
            const spaceElement = document.createElement('div');
            if (space === null) {
                spaceElement.textContent = "~";
                spaceElement.classList = "space";
            } else if (space >= 0) {
                spaceElement.textContent = space;
                spaceElement.setAttribute("id", space);
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
        
    const P2GBElement = document.createElement('div');
    P2GBElement.classList = "player2 board";
    P2GB.board.forEach((row, rowIndex) => {
        row.forEach((space, spaceIndex) => {
            const spaceElement = document.createElement('div');
            spaceElement.classList = "space enemy";
            spaceElement.setAttribute("id", spaceIndex);
            spaceElement.addEventListener("click", () => {
                console.log(P2GB.board);
                const result = P1.attack(P2GB, spaceIndex, rowIndex);
                console.log(P2GB.board);
                console.log(result);
                if (result === "miss") {
                    spaceElement.textContent = "X";
                    spaceElement.classList = "space hit";
                } else if (result === "hit") {
                    spaceElement.textContent = "O";
                    spaceElement.classList = "space hit";
                } else if (result === "invalid") {
                    alert("Move Invalid");
                }
            });
            P2GBElement.appendChild(spaceElement);
        });
    });

    body.appendChild(P1GBElement);
    body.appendChild(P2GBElement);

    // while (!P1GB.allShipsSunk() || P2GB.allShipsSunk()) {
    //     alert("playball!")
    // };
});