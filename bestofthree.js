let userChoicebot = function (event) {
    var result = battle(event.target.id);
    document.getElementById("userChoice").innerHTML = "<img src=\"./images/" + event.target.id + "Player.png\" class=\"rpsImage\">";
    document.getElementById("computerChoice").innerHTML = "<img src=\"./images/" + result[1] + "Enemy.png\" class=\"rpsImage\">";
    if (result[0] === "win") {
        winTracker.addPlayerWin();
        document.getElementById("winner").innerHTML = "You win!";
    } else if (result[0] === "loss") {
        winTracker.addComputerWin();
        document.getElementById("winner").innerHTML = "You lose...";
    } else {
        document.getElementById("winner").innerHTML = "It's a draw";
    }

    if (winTracker.playerTotalWins === 2) {
        document.getElementById("winner").innerHTML = "You won the best of 3!";
        document.getElementById("newGame").className = 'showButton'
        document.getElementById("rock").disabled = true;
        document.getElementById("paper").disabled = true;
        document.getElementById("scissors").disabled = true;
    } else if (winTracker.cpuTotalWins === 2) {
        document.getElementById("winner").innerHTML = "You lost the best of 3...";
        document.getElementById("newGame").className = 'showButton'
        document.getElementById("rock").disabled = true;
        document.getElementById("paper").disabled = true;
        document.getElementById("scissors").disabled = true;
    }
    updateHUDbot();
}

let updateHUDbot = function () {
    document.getElementById("rockOdds").innerHTML = String(computerOdds.rockOdds * 100).slice(0, 5) + "%";
    document.getElementById("paperOdds").innerHTML = String(computerOdds.paperOdds * 100).slice(0, 5) + "%";
    document.getElementById("scissorOdds").innerHTML = String(computerOdds.scissorOdds * 100).slice(0, 5) + "%";
    document.getElementById("playerName").innerHTML = localStorage.getItem('gamerName') === null ? "Player 1" : localStorage.getItem('gamerName');

    var playerWinTracker = "&nbsp;"
    for (var i = 0; i < winTracker.playerTotalWins; i++ ) {
        playerWinTracker += "<span class=\"fa fa-circle playerDot\">&nbsp;</span>"
    }
    document.getElementById("playerWinTracker").innerHTML = playerWinTracker

    var cpuWinTracker = "&nbsp;"
    for (var i = 0; i < winTracker.cpuTotalWins; i++ ) {
        cpuWinTracker += "<span class=\"fa fa-circle cpuDot\">&nbsp;</span>"
    }
    document.getElementById("cpuWinTracker").innerHTML = cpuWinTracker
    
}

let newGame = function () {
    winTracker.playerTotalWins = 0;
    winTracker.cpuTotalWins = 0;
    document.getElementById("newGame").className = 'hideButton'
    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;
    document.getElementById("winner").innerHTML = "&nbsp;";
    updateHUDbot();
}

let winTracker = {
    playerTotalWins: 0,
    cpuTotalWins: 0,
    addPlayerWin: function () { this.playerTotalWins += 1 },
    addComputerWin: function () { this.cpuTotalWins += 1 },
}

updateHUDbot();

document.getElementById("rock").addEventListener("click", userChoicebot)
document.getElementById("paper").addEventListener("click", userChoicebot)
document.getElementById("scissors").addEventListener("click", userChoicebot)
document.getElementById("newGame").addEventListener("click", newGame)
