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
        helmet: null,
        armor: null,
        weapon: null,
        ringAttack: null,
        ringDefense: null,
        accessory: null
    },
    level: 1,
    exp: 0,
    expToNextLevel: 100,
    floorCount: 1,
    floor: 1,

}

function checkLevelUp() {
    if (player.exp >= player.expToNextLevel) {
        player.level++;
        player.exp -= player.expToNextLevel;
        player.expToNextLevel += 50     
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
        Object.assign(player, JSON.parse(savedPlayer));
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