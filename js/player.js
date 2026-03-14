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
    
}

function checkLevelUp() {
    if (player.exp >= player.expToNextLevel) {
        player.level++;
        player.exp -= player.expToNextLevel;
        player.expToNextLevel += 50     
        player.maxHp += 20;
        player.hp = player.maxHp;
        player.attack += 3;
        alert("Poziom " + player.level + "! Twoje statystyki wzrosły!");
    }
}