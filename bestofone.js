let userChoiceboo = function (event) {
    var result = battle(event.target.id);
    document.getElementById("userChoice").innerHTML = "<img src=\"./images/" + event.target.id + "Player.png\" class=\"rpsImage\">";
    document.getElementById("computerChoice").innerHTML = "<img src=\"./images/" + result[1] + "Enemy.png\" class=\"rpsImage\">";
    if (result[0] === "win") {
        document.getElementById("winner").innerHTML = "You win!";
    } else if (result[0] === "loss") {
        document.getElementById("winner").innerHTML = "You lose...";
    } else {
        document.getElementById("winner").innerHTML = "It's a draw";
    }
    updateHUDboo();
}

let updateHUDboo = function () {
    document.getElementById("rockOdds").innerHTML = String(computerOdds.rockOdds * 100).slice(0, 5) + "%";
    document.getElementById("paperOdds").innerHTML = String(computerOdds.paperOdds * 100).slice(0, 5) + "%";
    document.getElementById("scissorOdds").innerHTML = String(computerOdds.scissorOdds * 100).slice(0, 5) + "%";
    document.getElementById("playerName").innerHTML = localStorage.getItem('gamerName') === null ? "Player 1" : localStorage.getItem('gamerName');
}

updateHUDboo();

document.getElementById("rock").addEventListener("click", userChoiceboo)
document.getElementById("paper").addEventListener("click", userChoiceboo)
document.getElementById("scissors").addEventListener("click", userChoiceboo)
