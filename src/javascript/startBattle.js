import {
    startComputerGame
} from "./startComputerGame";
import {
    startHumanGame
} from "./startHumanGame";

const startComputerBtn = document.querySelector("#start.computer");
startComputerBtn.addEventListener("click", () => {
    startComputerGame()
});

const startFriendBtn = document.querySelector("#start.friend");
startFriendBtn.addEventListener("click", () => {
    startHumanGame()
});