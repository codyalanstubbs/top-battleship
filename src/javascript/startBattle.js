import { setupGame } from "./gameSetup";

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    setupGame();
});