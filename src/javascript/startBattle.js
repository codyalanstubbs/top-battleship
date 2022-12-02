import { startComputerGame } from "./startComputerGame";

const startComputerBtn = document.querySelector("#start.computer");
startComputerBtn.addEventListener("click", () => {startComputerGame()});

const startFriendBtn = document.querySelector("#start.friend");
startFriendBtn.addEventListener("click", () => {alert("Not yet!")});