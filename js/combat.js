const enemies = [
    { name: "Goblin", hp: 30, maxHp: 30, attack: 15, timeAttack: 1000 },
    { name: "Szkielet", hp: 50, maxHp: 50, attack: 25, timeAttack: 1200 },
    { name: "Troll", hp: 80, maxHp: 80, attack: 37, timeAttack: 1500 },
    { name: "Demon", hp: 120, maxHp: 120, attack: 49, timeAttack: 1800 },
]

const bosses = [
    { name: "Król Goblinów", hp: 200, maxHp: 200, attack: 30, timeAttack: 1500 },
    { name: "Lich", hp: 350, maxHp: 350, attack: 40, timeAttack: 2000 },
    { name: "Smok", hp: 500, maxHp: 500, attack: 55, timeAttack: 2200 },
]

let enemy = {};
let enemyInterval = null;
let playerInterval = null;
let combatActive = false;

function startCombat() {
    scene.innerHTML =
        "<h1>Przeciwnik: " + enemy.name + "</h1>"
        + "<p>HP wroga: " + enemy.hp + "/" + enemy.maxHp + "</p>"
        + "<p>HP gracza: " + player.hp + "/" + player.maxHp + "</p>"
        + "<button id='btn-explore'>Uciekaj</button>";

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
        player.floorCount++;
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
}

function initCombat() {
    combatActive = false;
    clearInterval(enemyInterval);
    clearInterval(playerInterval);

    if (player.floorCount === 8) {
        const bossIndex = Math.min(player.floor - 1, bosses.length - 1);
        const bossTemplate = bosses[bossIndex];
        enemy = { ...bossTemplate };
        notify("Boss: " + enemy.name + " pojawił się!");
        player.floorCount = 0;
        player.floor++;
    } else {
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        enemy = { ...randomEnemy };
    }

    combatActive = true;
    startCombat();

    enemyInterval = setInterval(function () {
        enemyAttack();
    }, enemy.timeAttack);

    const helmetTime = player.equipment.helmet ? player.equipment.helmet.timeAttack : 1000;
    playerInterval = setInterval(function () {
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