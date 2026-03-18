const enemies = [
    { name: "Szczur",  hp: 30,  maxHp: 30,  attack: 15, timeAttack: 1000, image: 'assets/images/Rat.jpg',    goldMin: 1,   goldMax: 3   },
    { name: "Goblin",  hp: 60,  maxHp: 60,  attack: 25, timeAttack: 1200, image: 'assets/images/Goblin.png', goldMin: 3,   goldMax: 8   },
    { name: "Troll",   hp: 80,  maxHp: 80,  attack: 37, timeAttack: 1500, image: 'assets/images/Troll.png',  goldMin: 8,   goldMax: 20  },
    { name: "Demon",   hp: 120, maxHp: 120, attack: 49, timeAttack: 1200, image: 'assets/images/Demon.png',  goldMin: 20,  goldMax: 50  },
]

const bosses = [
    { name: "Szczuras",       hp: 70,  maxHp: 70,  attack: 30, timeAttack: 1500, image: 'assets/images/Szczuras.png',   isBoss: true, goldMin: 15,  goldMax: 30  },
    { name: "Król Goblinów",  hp: 350, maxHp: 350, attack: 40, timeAttack: 1600, image: 'assets/images/GoblinKing.png', isBoss: true, goldMin: 80,  goldMax: 150 },
    { name: "Smok",           hp: 500, maxHp: 500, attack: 55, timeAttack: 1800, image: 'assets/images/Dragon.png',     isBoss: true, goldMin: 300, goldMax: 600 },
]

const floorData = [
    { enemies: [{e: "Szczur", w: 100}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 80}, {e: "Goblin", w: 20}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 60}, {e: "Goblin", w: 40}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 40}, {e: "Goblin", w: 60}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 20}, {e: "Goblin", w: 70}, {e: "Troll", w: 10}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 10}, {e: "Goblin", w: 70}, {e: "Troll", w: 20}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 2},  {e: "Goblin", w: 60}, {e: "Troll", w: 38}], boss: "Król Goblinów" },
    { enemies: [{e: "Goblin", w: 40}, {e: "Troll", w: 60}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 20}, {e: "Troll", w: 70}, {e: "Demon", w: 10}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 10}, {e: "Troll", w: 70}, {e: "Demon", w: 20}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 2},  {e: "Troll", w: 60}, {e: "Demon", w: 38}], boss: "Smok" },
]

const axeCosts =     [2, 20, 40, 60, 100, 300, 700, 1500, 3300, 8000, 13000, 19000, 30000, 70000, 120000, 300000, 700000];
const axeBonus =     4; // drewno za klik za każdy poziom
const treeCosts =    [2000, 120000];
const treeBonus =    [100, 1000]; // woodPerClick bonus za każdy poziom drzewa
const storageLevels = [
    { cost: 0,      capacity: 20      },
    { cost: 300,    capacity: 200     },
    { cost: 3000,   capacity: 2000    },
    { cost: 14000,  capacity: 20000   },
    { cost: 150000, capacity: 200000  },
    { cost: 400000, capacity: 2000000 },
]

const lumberjackData = [
    { name: "Drwal 1", unlockCost: 50,    levelCost: 30,    woodPerSec: 0.2  },
    { name: "Drwal 2", unlockCost: 500,   levelCost: 200,   woodPerSec: 2    },
    { name: "Drwal 3", unlockCost: 3000,  levelCost: 1500,  woodPerSec: 20   },
    { name: "Drwal 4", unlockCost: 15000, levelCost: 8000,  woodPerSec: 50   },
    { name: "Drwal 5", unlockCost: 60000, levelCost: 30000, woodPerSec: 100  },
    { name: "Drwal 6", unlockCost: 200000,levelCost: 100000,woodPerSec: 300  },
    { name: "Drwal 7", unlockCost: 700000,levelCost: 350000,woodPerSec: 500  },
]

const tempBonuses = [
    { name: "+5% atak", apply: function() { player.attack = Math.floor(player.attack * 1.05); }},
    { name: "+10% max HP", apply: function() { player.maxHp *= 1.1; player.hp *= 1.1; }},
    { name: "+10% 🪙 z walk", apply: function() { player.skills.goldBonus += 10; }},
    { name: "+5% krytyk", apply: function() { player.equipment.weapon.critChance += 5; }},
    { name: "Regeneracja +10 HP/s", apply: function() { player.equipment.accessory.regen += 10; }},
    { name: "+5% szansa kontratak", apply: function() { player.equipment.ringDefense.counterChance += 5; }},
]

function getRandomEnemy() {
    const floorIndex = Math.min(player.floor - 1, floorData.length - 1);
    const floor = floorData[floorIndex];
    const roll = Math.floor(Math.random() * 100) + 1;
    let cumulative = 0;
    for (const entry of floor.enemies) {
        cumulative += entry.w;
        if (roll <= cumulative) {
            return enemies.find(e => e.name === entry.e);
        }
    }
    return enemies[0];
}

function getBoss() {
    const floorIndex = Math.min(player.floor - 1, floorData.length - 1);
    const bossName = floorData[floorIndex].boss;
    return bosses.find(b => b.name === bossName);
}

let enemy = {};
let enemyInterval = null;
let playerInterval = null;
let combatActive = false;

function startCombat() {
    scene.innerHTML =
        "<h1>Przeciwnik: " + enemy.name + "</h1>"
        + "<img src='" + enemy.image + "' style='width:450px;height:450px;object-fit:contain;''>"
        + "<div class='hp-bar-container'><span>" + enemy.name + "</span><div class='hp-bar'><div class='hp-fill' style='width:" + (enemy.hp / enemy.maxHp * 100) + "%; background-color:" + getHpColor(enemy.hp, enemy.maxHp) + "'></div></div><span>" + enemy.hp + "/" + enemy.maxHp + "</span></div>"
        + "<div class='hp-bar-container'><span>Gracz</span><div class='hp-bar'><div class='hp-fill' style='width:" + (player.hp / player.maxHp * 100) + "%; background-color:" + getHpColor(player.hp, player.maxHp) + "'></div></div><span>" + player.hp + "/" + player.maxHp + "</span></div>";

    const btnEscape = document.getElementById('btn-explore');
    if (btnEscape) {
        btnEscape.onclick = function () {
            combatActive = false;
            clearInterval(enemyInterval);
            clearInterval(playerInterval);
            loadScene("explore");
            setupButtons();
        }
    }
}

function enemyAttack() {
    if (!combatActive) return;
    const counterChance = player.equipment.ringDefense ? player.equipment.ringDefense.counterChance : 0;
    const dodgeChance = player.equipment.armor ? player.equipment.armor.dodgeChance : 0;
    const counterLos = Math.floor(Math.random() * 100) + 1;
    const dodgeLos = Math.floor(Math.random() * 100) + 1;

    if (counterLos <= counterChance) {
        enemy.hp -= enemy.attack;
    } else if (dodgeLos <= dodgeChance) {
        player.hp -= enemy.attack * 0.5;
    } else {
        player.hp -= enemy.attack;
    }

    checkCombatEnd();
    if (combatActive) startCombat();
}

function playerAttack() {
    if (!combatActive) return;
    const critChance = player.equipment.weapon ? player.equipment.weapon.critChance : 0;
    const doubleChance = player.equipment.ringAttack ? player.equipment.ringAttack.doubleAttackChance : 0;
    const regen = player.equipment.accessory ? player.equipment.accessory.regen : 0;
    const critLos = Math.floor(Math.random() * 100) + 1;
    const doubleLos = Math.floor(Math.random() * 100) + 1;

    if (critLos <= critChance) {
        enemy.hp -= player.attack * 2.5;
        showSlash();
        player.hp += regen;
        if (player.hp > player.maxHp) player.hp = player.maxHp;
    } else if (doubleLos <= doubleChance) {
        enemy.hp -= player.attack * 2;
        showSlash();
        player.hp += regen;
        if (player.hp > player.maxHp) player.hp = player.maxHp;
    } else {
        enemy.hp -= player.attack + player.skills.attackBonus;
        showSlash();
        player.hp += regen;
        if (player.hp > player.maxHp) player.hp = player.maxHp;
    }

    checkCombatEnd();
    if (combatActive) startCombat();
}

function checkCombatEnd() {
    if (!combatActive) return;
    if (player.hp <= 0) {
        combatActive = false;
        clearInterval(enemyInterval);
        clearInterval(playerInterval);
        if (player.hp < 0) player.hp = 0;
        notify("Zginąłeś!");
        player.floorCount = 1;
        player.hp = player.maxHp;
        player.gold = Math.floor(player.gold * 0.7);
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    if (enemy.hp <= 0) {
        combatActive = false;
        clearInterval(enemyInterval);
        clearInterval(playerInterval);
        dropLoot();
        const wasBoss = enemy.isBoss;
        player.floorCount++;
        if (wasBoss) {
            showBossReward();
        } else {
            initCombat();
            setupButtons();
            renderInventory();
        }
        return;
    }
}

function initCombat() {
    combatActive = false;
    clearInterval(enemyInterval);
    clearInterval(playerInterval);

    if (player.floorCount === 8) {
        const bossTemplate = getBoss();
        enemy = { ...bossTemplate };
        notify("Boss: " + enemy.name + " pojawił się!");
        player.floorCount = 0;
        player.floor++;
    } else {
        const randomEnemy = getRandomEnemy();
        enemy = { ...randomEnemy };
    }

    combatActive = true;
    startCombat();

    enemyInterval = setInterval(function() {
        enemyAttack();
    }, enemy.timeAttack);

    const helmetTime = player.equipment.helmet ? player.equipment.helmet.timeAttack : 1000;
    playerInterval = setInterval(function() {
        playerAttack();
    }, helmetTime);
}

function dropLoot() {
    const goldLoot = Math.floor(Math.random() * (enemy.goldMax - enemy.goldMin + 1)) + enemy.goldMin;
    player.gold += goldLoot;
    notify("Zdobyłeś: " + goldLoot + " 🪙!");

    if (enemy.isBoss) {
        const soulLoot = player.meta ? player.meta.soulMultiplier : 1;
        player.souls += soulLoot;
        notify("Zdobyłeś " + soulLoot + (soulLoot === 1 ? "💀!" : soulLoot < 5 ? " 💀!" : " 💀!"));
    }

    const expLoot = Math.floor(Math.random() * 50) + 1;
    player.exp += expLoot;
    notify("Zdobyłeś " + expLoot + " doświadczenia!");
    checkLevelUp();
}

function showBossReward() {
    const indices = [];
    while (indices.length < 3) {
        const r = Math.floor(Math.random() * tempBonuses.length);
        if (!indices.includes(r)) indices.push(r);
    }

    const b0 = tempBonuses[indices[0]];
    const b1 = tempBonuses[indices[1]];
    const b2 = tempBonuses[indices[2]];

    scene.innerHTML =
        "<h1>Wybierz nagrodę</h1>"
        + "<button id='bonus-0'>" + b0.name + "</button>"
        + "<button id='bonus-1'>" + b1.name + "</button>"
        + "<button id='bonus-2'>" + b2.name + "</button>"
        + "<button id='btn-explore'>Uciekaj</button>";

    document.getElementById('bonus-0').onclick = function() {
        b0.apply();
        player.runBonuses.push(b0.name);
        notify("Wybrano: " + b0.name);
        initCombat();
    }
    document.getElementById('bonus-1').onclick = function() {
        b1.apply();
        player.runBonuses.push(b1.name);
        notify("Wybrano: " + b1.name);
        initCombat();
    }
    document.getElementById('bonus-2').onclick = function() {
        b2.apply();
        player.runBonuses.push(b2.name);
        notify("Wybrano: " + b2.name);
        initCombat();
    }
    document.getElementById('btn-explore').onclick = function() {
        loadScene("explore");
        setupButtons();
    }
}

function getHpColor(hp, maxHp) {
    const percent = hp / maxHp * 100;
    if (percent > 50) return "#2d8a2d";
    if (percent > 25) return "#cc7700";
    return "#8b0000";
}

function showSlash() {
    const img = document.querySelector('img');
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const slash = document.createElement('div');
    slash.classList.add('slash');
    slash.style.position = 'fixed';
    slash.style.left = (rect.left + Math.random() * rect.width) + 'px';
    slash.style.top = (rect.top + Math.random() * rect.height) + 'px';
    document.body.appendChild(slash);
    setTimeout(function() { slash.remove(); }, 300);
}