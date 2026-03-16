const player = {
    name: "Gracz",
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    gold: 50,
    inventory: [],
    souls: 0,
    skills: {
        attackBonus: 0,
        hpBonus: 0,
        goldBonus: 0,
    },    
    equipment: {
    helmet: {timeAttack: 1500, level: 1, upgradeLevel: 1, name: "Hełm"},
    armor: {dodgeChance: 1, level: 1, upgradeLevel: 1, name: "Zbroja"},
    weapon: {critChance: 1, level: 1, upgradeLevel: 1, name: "Broń"},
    ringAttack: {doubleAttackChance: 1, level: 1, upgradeLevel: 1, name: "Pierścień Ataku"},
    ringDefense: {counterChance: 1, level: 1, upgradeLevel: 1, name: "Pierścień Obrony"},
    accessory: {regen: 10, level: 1, upgradeLevel: 1, name: "Akcesorium"}
    },
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    floorCount: 1,
    floor: 1,
    runBonusses: []

}

function checkLevelUp() {
    if (player.exp >= player.expToNextLevel) {
        player.level++;
        player.exp -= player.expToNextLevel;
        player.expToNextLevel += 35     
        player.maxHp += 20;
        player.hp = player.maxHp;
        player.attack += 3;
        notify("Poziom " + player.level + "! Twoje statystyki wzrosły!");
    }
}

function saveGame() {
    localStorage.setItem("player", JSON.stringify(player));
}

function loadGame() {
    const savedPlayer = localStorage.getItem("player");
    if (savedPlayer) {
        const saved = JSON.parse(savedPlayer);
        Object.assign(player, saved);
        Object.assign(player.equipment, saved.equipment || {});
    }
}


function notify(text) {
    console.log("notify wywołany:", text)
    const container = document.getElementById("notifications");
    if (!container) return;
    const notif = document.createElement("div");
    notif.classList.add("notif");
    notif.innerHTML = text;
    container.appendChild(notif);
    setTimeout(function() {
        notif.remove();
    }, 5000);
}

