//Tracks player health points. Change amount to add or subtract HP and increase maxHP to add to the maxHP
let userHP = {
    currentHP: 5,
    maxHP: 5,
    shield: 0,
    changeHP: function (changeAmount) {
        if (changeAmount > 0) {
            this.currentHP = (this.currentHP + changeAmount) > this.maxHP ? this.maxHP : this.currentHP + changeAmount;
        } else {
            if (this.shield > 0 && this.shield >= -changeAmount) {
                this.shield += changeAmount;
            } else {
                this.currentHP += this.shield + changeAmount;
            }
        }
    },
    increaseMaxHP: function (changeAmount) {
        this.maxHP += changeAmount;
        this.currentHP += changeAmount;
    },
    addShield: function (changeAmount) {
        this.shield += changeAmount
    }
}

let computerOdds = {
    rockOdds: 0.333333,
    paperOdds: 0.333333,
    scissorOdds: 0.333333,
    changeOdds: function (target, changeAmount) {
        if (target === "rock") {
            this.rockOdds += changeAmount
            this.paperOdds -= changeAmount / 2;
            this.scissorOdds -= changeAmount / 2;
        } else if (target === "paper") {
            this.paperOdds += changeAmount
            this.rockOdds -= changeAmount / 2;
            this.scissorOdds -= changeAmount / 2;
        } else {
            this.scissorOdds += changeAmount
            this.paperOdds -= changeAmount / 2;
            this.rockOdds -= changeAmount / 2;
        }
    }
}

let monster = {
    winsRequired: 3,
    currentWins: 0,
    level: "easy",
    addWin: function () { this.currentWins += 1 },
}

let monsters = {

}

let userState = {
    currentRound: 1,
    gameState: "battle"
}

let buffs = [
    {
        name: "Decrease enemy rock odds by 10%",
        effect: function () { computerOdds.changeOdds("rock", -0.1) }
    },
    {
        name: "Decrease enemy paper odds by 10%",
        effect: function () { computerOdds.changeOdds("paper", -0.1) }
    },
    {
        name: "Decrease enemy scissors odds by 10%",
        effect: function () { computerOdds.changeOdds("scissors", -0.1) }
    },
    {
        name: "Decrease enemy rock odds by 5%",
        effect: function () { computerOdds.changeOdds("rock", -0.05) }
    },
    {
        name: "Decrease enemy paper odds by 5%",
        effect: function () { computerOdds.changeOdds("paper", -0.05) }
    },
    {
        name: "Decrease enemy scissors odds by 5%",
        effect: function () { computerOdds.changeOdds("scissors", -0.05) }
    },
    {
        name: "Increase enemy rock odds by 10%",
        effect: function () { computerOdds.changeOdds("rock", 0.1) }
    },
    {
        name: "Increase enemy paper odds by 10%",
        effect: function () { computerOdds.changeOdds("paper", 0.1) }
    },
    {
        name: "Increase enemy scissors odds by 10%",
        effect: function () { computerOdds.changeOdds("scissors", 0.1) }
    },
    {
        name: "Increase enemy rock odds by 5%",
        effect: function () { computerOdds.changeOdds("rock", 0.05) }
    },
    {
        name: "Increase enemy paper odds by 5%",
        effect: function () { computerOdds.changeOdds("paper", 0.05) }
    },
    {
        name: "Increase enemy scissors odds by 5%",
        effect: function () { computerOdds.changeOdds("scissors", 0.05) }
    },
    {
        name: "Gain 1 shield",
        effect: function () { userHP.addShield(1)}
    },
    {
        name: "Gain 2 shield",
        effect: function () { userHP.addShield(2)}
    },
    {
        name: "Gain 1 max HP",
        effect: function () { userHP.increaseMaxHP(1)}
    },
    {
        name: "Gain 2 max HP",
        effect: function () { userHP.increaseMaxHP(2)}
    },
    {
        name: "Gain a fan (beats rock and paper, scissors destroy it)",
        effect: function() {
            document.getElementById("fan").className = "showButton"
        }
    },
    {
        name: "Gain a rolling pin (beats rock and scissors, paper destroys it)",
        effect: function() {
            document.getElementById("rollingPin").className = "showButton"
        }
    },
    {
        name: "Gain a boot (beats scissors and paper, rock destroys it)",
        effect: function() {
            document.getElementById("rollingPin").className = "showButton"
        }
    },
]

let thisGameBuffs = buffs.slice();
