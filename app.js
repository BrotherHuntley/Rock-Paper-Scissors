monsterList();
monster = monsters[0];
updateHUD();

document.getElementById("rock").addEventListener("click", userChoice)
document.getElementById("paper").addEventListener("click", userChoice)
document.getElementById("scissors").addEventListener("click", userChoice)
document.getElementById("fan").addEventListener("click", userChoice)
document.getElementById("rollingPin").addEventListener("click", userChoice)
document.getElementById("boot").addEventListener("click", userChoice)



document.getElementById("option1").addEventListener("click", buffChoice)
document.getElementById("option2").addEventListener("click", buffChoice)
document.getElementById("option3").addEventListener("click", buffChoice)

document.getElementById("newGame").addEventListener("click", gameReset)