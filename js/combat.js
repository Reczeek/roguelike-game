const enemies = [
    { name: "Szczur", hp: 30, maxHp: 30, attack: 15, timeAttack: 1000, image: 'assets/images/Rat.jpg' },
    { name: "Goblin", hp: 60, maxHp: 60, attack: 25, timeAttack: 1200, image: 'assets/images/Goblin.png' },
    { name: "Troll", hp: 80, maxHp: 80, attack: 37, timeAttack: 1500, image: 'assets/images/Troll.png' },
    { name: "Demon", hp: 120, maxHp: 120, attack: 49, timeAttack: 1200, image: 'assets/images/Demon.png' },
]

const bosses = [
    { name: "Szczuras", hp: 70, maxHp: 70, attack: 30, timeAttack: 1500, image: 'assets/images/Szczuras.png' },
    { name: "Król Goblinów", hp: 350, maxHp: 350, attack: 40, timeAttack: 1600, image: 'assets/images/GoblinKing.png' },
    { name: "Smok", hp: 500, maxHp: 500, attack: 55, timeAttack: 1800, image: 'assets/images/Dragon.png' },
]

const floorData = [
    { enemies: [{e: "Szczur", w: 100}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 80}, {e: "Goblin", w: 20}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 60}, {e: "Goblin", w: 40}], boss: "Szczuras" },
    { enemies: [{e: "Szczur", w: 40}, {e: "Goblin", w: 60}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 20}, {e: "Goblin", w: 70}, {e: "Troll", w: 10}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 10}, {e: "Goblin", w: 70}, {e: "Troll", w: 20}], boss: "Król Goblinów" },
    { enemies: [{e: "Szczur", w: 2}, {e: "Goblin", w: 60}, {e: "Troll", w: 38}], boss: "Król Goblinów" },
    { enemies: [{e: "Goblin", w: 40}, {e: "Troll", w: 60}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 20}, {e: "Troll", w: 70}, {e: "Demon", w: 10}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 10}, {e: "Troll", w: 70}, {e: "Demon", w: 20}], boss: "Smok" },
    { enemies: [{e: "Goblin", w: 2}, {e: "Troll", w: 60}, {e: "Demon", w: 38}], boss: "Smok" },
]

const tempBonuses = [
    { name: "+5% atak", apply: function() { player.attack = Math.floor(player.attack * 1.05); }},
    { name: "+10% max HP", apply: function() { player.maxHp *= 1.1; player.hp *= 1.1; }},
    { name: "+10% złoto z walk", apply: function() { player.skills.goldBonus += 10; }},
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
        +  "<div class='hp-bar-container'><span>" + enemy.name + "</span><div class='hp-bar'><div class='hp-fill' style='width:" + (enemy.hp / enemy.maxHp * 100) + "%; background-color:" + getHpColor(enemy.hp, enemy.maxHp) + "'></div></div><span>" + enemy.hp + "/" + enemy.maxHp + "</span></div>"
         + "<div class='hp-bar-container'><span>Gracz</span><div class='hp-bar'><div class='hp-fill' style='width:" + (player.hp / player.maxHp * 100) + "%; background-color:" + getHpColor(player.hp, player.maxHp) + "'></div></div><span>" + player.hp + "/" + player.maxHp + "</span></div>"

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
        player.hp += regen
        if (player.hp > player.maxHp) player.hp = player.maxHp;
    } else if (doubleLos <= doubleChance) {
        enemy.hp -= player.attack * 2;
        player.hp += regen;
        if (player.hp > player.maxHp) player.hp = player.maxHp;
    } else {
        enemy.hp -= player.attack + player.skills.attackBonus;
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
    const wasBoss = player.floorCount === 0;
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
    const goldLoot = (Math.floor(Math.random() * 16) + 5) + player.skills.goldBonus;
    player.gold += goldLoot;
    notify("Zdobyłeś: " + goldLoot + " złota!");
    const soulLoot = Math.floor(Math.random() * 5) + 1;
    player.souls += soulLoot;
    if (soulLoot === 1) {
        notify("Zdobyłeś " + soulLoot + " duszę!");
    } else if (soulLoot < 5) {
        notify("Zdobyłeś " + soulLoot + " dusze!");
    } else {
        notify("Zdobyłeś " + soulLoot + " dusz!");
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