import { setupGame } from "./gameSetup";
import { emptyBody } from "./emptyBody";

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    emptyBody();
    setupGame();
});