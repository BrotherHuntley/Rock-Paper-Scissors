// Function inputs the odds for computer rolling rock and paper, outputs randomly selected option
let computerChoice = function (rockOdds, paperOdds) {
    var rand = Math.random()
    if (rand < rockOdds) {
        return 'rock'
    } else if (rand < rockOdds + paperOdds) {
        return 'paper'
    } else {
        return 'scissors'
    }
}

let battle = function (userSelected) {
    var computerSelected = computerChoice(computerOdds.rockOdds, computerOdds.paperOdds);
    if (userSelected === computerSelected) {
        return ["draw", computerSelected]

    } else if ((userSelected === "rock" && computerSelected === "scissors") ||
        (userSelected === "scissors" && computerSelected === "paper") ||
        (userSelected === "paper" && computerSelected === "rock") ||
        (userSelected === "fan" && (computerSelected === "rock" || computerSelected === "paper")) ||
        (userSelected === "rollingPin" && (computerSelected === "rock" || computerSelected === "scissors")) ||
        (userSelected === "boot" && (computerSelected === "scissors" || computerSelected === "paper"))) {
        return ["win", computerSelected]

    } else if ((userSelected === "fan" && computerSelected === "scissors") ||
        (userSelected === "rollingPin" && computerSelected === "paper") ||
        (userSelected === "boot" && computerSelected === "rock")) {
        document.getElementById(userSelected).className = "hideButton"
        return ["loss", computerSelected]

    } else {
        return ["loss", computerSelected]
    }
}

let updateHUD = function () {
    document.getElementById("rockOdds").innerHTML = String(computerOdds.rockOdds * 100).slice(0, 5) + "%";
    document.getElementById("paperOdds").innerHTML = String(computerOdds.paperOdds * 100).slice(0, 5) + "%";
    document.getElementById("scissorOdds").innerHTML = String(computerOdds.scissorOdds * 100).slice(0, 5) + "%";
    document.getElementById("monsterNumber").innerHTML = userState.currentRound;

    var hearts = "";
    var shields = "";
    for (var i = 1; i <= userHP.maxHP; i++) {
        if (userHP.currentHP >= i) {
            hearts += "<span class=\"redHeart\">&#9829;</span>"
        } else {
            hearts += "<span class=\"blackHeart\">&#9829;</span>"
        }
    }
    for (var i = 0; i < userHP.shield; i++) {
        shields += "<span class=\"shield\">&#128737;&#65039;</span>"
    }
    document.getElementById("healthPoints").innerHTML = hearts + shields;

    var monsterHearts = ""
    for (var i = monster.winsRequired; i > 0; i--) {
        if (monster.currentWins < i) {
            monsterHearts += "<span class=\"redHeart\">&#9829;</span>";
        } else {
            monsterHearts += "<span class=\"blackHeart\">&#9829;</span>";
        }
    }
    document.getElementById("monsterHealth").innerHTML = monsterHearts;

    var monsterBubbles = "";
    for (var i = 0; i < monsters.length; i++) {
        var isBeatColor = ""
        if (userState.currentRound > i + 1) {
            isBeatColor = "&#128994;"
        } else if (userState.currentRound === i + 1) {
            isBeatColor = "&#128993;"
        } else {
            isBeatColor = "&#128308;"
        }
        monsterBubbles += "<span class=\"" + monsters[i].level + "Monster\">" + isBeatColor + "</span>";
    }
    document.getElementById("monsterTrack").innerHTML = monsterBubbles;
}

let monsterGenerator = function (challenge) {
    switch (challenge) {
        case ("easy"):
            var winsRequiredGen = Math.round(Math.random()) + 1;
            break;
        case ("medium"):
            var winsRequiredGen = Math.round(Math.random()) + 3;
            break;
        case ("boss"):
            var winsRequiredGen = Math.round(Math.random()) + 5;
            break;
    }
    return {
        winsRequired: winsRequiredGen,
        currentWins: 0,
        level: challenge,
        addWin: function () { this.currentWins += 1 },
    }
}

let userChoice = function (event) {
    if (userState.gameState === "battle") {
        var result = battle(event.target.id);
        document.getElementById("userChoice").innerHTML = "<img src=\"./images/" + event.target.id +".png\" width=\"100px\">";
        document.getElementById("computerChoice").innerHTML = "<img src=\"./images/" + result[1] +".png\" width=\"100px\">";
        if (result[0] === "win") {
            monster.addWin();
            document.getElementById("winner").innerHTML = "You win!";
        } else if (result[0] === "loss") {
            userHP.changeHP(-1);
            if (event.target.id === "fan" || event.target.id === "rollingPin" || event.target.id === "boot") {
                document.getElementById("winner").innerHTML = "You lose, and your " + event.target.innerHTML + " broke!";
            } else {
                document.getElementById("winner").innerHTML = "You lose...";
            }
            
        } else {
            document.getElementById("winner").innerHTML = "It's a draw";
        }
        updateHUD();
        if (userHP.currentHP === 0) {
            document.getElementById("winner").innerHTML = "You died on monster number " + userState.currentRound;
            userState.gameState = "lost"
        } else if (monster.currentWins === monster.winsRequired && userState.currentRound === 10) {
            document.getElementById("winner").innerHTML = "You beat the final boss! <br>You win the game!";
        } else if (monster.currentWins === monster.winsRequired) {
            document.getElementById("winner").innerHTML = "You beat the monster";
            advanceHandler();
        }
    } else {
        console.log("You may not battle the inbetween")
    }
}


let advanceHandler = function () {
    if (userState.gameState === "battle") {
        if (monster.currentWins === monster.winsRequired) {
            userState.gameState = "inBetween"
            buffDisplay()
        } else {
            alert("NOO")
        }
    } else if (userState.gameState === "lost") {
        gameReset();
    } else {
        userState.currentRound += 1;
        monster = monsters[userState.currentRound - 1];
        userState.gameState = "battle"
    }

    updateHUD();
}


let gameReset = function () {
    userHP.currentHP = 5;
    userHP.maxHP = 5;
    userHP.shield = 0;
    computerOdds.rockOdds = 0.333333;
    computerOdds.paperOdds = 0.333333;
    computerOdds.scissorOdds = 0.333333;
    userState.currentRound = 1;
    userState.gameState = "battle"
    buffReset();
    thisGameBuffs = buffs.slice()
    document.getElementById("userChoice").innerHTML = "";
    document.getElementById("computerChoice").innerHTML = "";
    document.getElementById("winner").innerHTML = "";
    monsterList();
    updateHUD();
}

let monsterList = function () {
    var monsterArray = [];
    var numMonsters = 10;
    for (var i = 0; i < numMonsters; i++) {
        if (i === 0) {
            monsterArray.push(monsterGenerator("easy"));
        } else if (i < numMonsters / 2) {
            var chance = Math.random() * 10;
            monsterArray.push(chance < 3 ? monsterGenerator("medium") : monsterGenerator("easy"));
        } else if (i < numMonsters - 1) {
            var chance = Math.random() * 10;
            monsterArray.push(chance > 3 ? monsterGenerator("medium") : monsterGenerator("easy"));
        } else {
            monsterArray.push(monsterGenerator("boss"));
        }
    }
    monsters = monsterArray;
}

let buffDisplay = function () {
    var buffChoiceNumber = 3
    arr = [];
    while (arr.length < buffChoiceNumber) {
        var r = Math.floor(Math.random() * thisGameBuffs.length);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    document.getElementById("buffTitle").className = "showTitle"
    document.getElementById("option1").innerHTML = thisGameBuffs[arr[0]].name;
    document.getElementById("option1").className = "showButton"
    document.getElementById("option2").innerHTML = thisGameBuffs[arr[1]].name;
    document.getElementById("option2").className = "showButton"
    document.getElementById("option3").innerHTML = thisGameBuffs[arr[2]].name;
    document.getElementById("option3").className = "showButton"
}

let buffChoice = function (event) {
    var chosenBuff = thisGameBuffs.find(buff => buff.name === event.target.innerHTML)
    chosenBuff.effect();
    thisGameBuffs = thisGameBuffs.filter(buff => buff.name !== event.target.innerHTML);
    buffReset();
    advanceHandler();
    updateHUD();
    document.getElementById("winner").innerHTML = "New " + monster.level + " monster!"
}

let buffReset = function() {
    document.getElementById("buffTitle").className = "hideTitle"
    document.getElementById("option1").innerHTML = "";
    document.getElementById("option1").className = "hideButton"
    document.getElementById("option2").innerHTML = "";
    document.getElementById("option2").className = "hideButton"
    document.getElementById("option3").innerHTML = "";
    document.getElementById("option3").className = "hideButton"
}