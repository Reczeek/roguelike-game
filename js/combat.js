const enemies = [
    { name: "Goblin", hp: 30, maxHp: 30, attack: 5 },
    { name: "Szkielet", hp: 50, maxHp: 50, attack: 8 },
    { name: "Troll", hp: 80, maxHp: 80, attack: 12 },
    { name: "Demon", hp: 120, maxHp: 120, attack: 18 },
]

const bosses = [
    { name: "Król Goblinów", hp: 200, maxHp: 200, attack: 25 },
    { name: "Lich", hp: 350, maxHp: 350, attack: 40 },
    { name: "Smok", hp: 500, maxHp: 500, attack: 60 },
]

let enemy = {};


function startCombat() {
    scene.innerHTML = 
        "<h1>Przeciwnik: " + enemy.name + "</h1>" 
        + "<p>HP wroga: " + enemy.hp + "/" + enemy.maxHp + "</p>"
        + "<p>HP gracza: " + player.hp + "/" + player.maxHp + "</p>"
        + "<button id='btn-attack'>Atakuj</button>"
        + "<button id='btn-explore'>Uciekaj</button>";
    const btnAttack = document.getElementById('btn-attack');
    if (btnAttack) {
        btnAttack.onclick = function() {
            attack();
        }
    const btnEscape = document.getElementById('btn-explore');
    if (btnEscape) {
        btnEscape.onclick = function() {
            loadScene("explore");
            setupButtons();
        }
    }
}
    }

function attack(){
    enemy.hp -= player.attack + player.skills.attackBonus;
    player.hp -= enemy.attack;
    if (player.hp < 0) player.hp = 0;
    if (enemy.hp <= 0) {
        dropLoot();
        player.floorCount++;
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    if (player.hp <= 0) {
        if (player.hp < 0) player.hp = 0;
        notify("Zginąłeś!");
        player.floorCount = 1;
        player.hp = player.maxHp;
        player.gold = Math.floor(player.gold * 0.7)
        player.xp = Math.floor(player.xp * 0.8)
        player.hp = player.maxHp
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    startCombat();
}

function initCombat() {
    if (player.floorCount  === 8) {
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
    startCombat();
}

function dropLoot() {
    const chance = player.floorCount === 0 ? 50 : 20;
    if (Math.random() * 100 < chance) {
        const lootItem = { ...itemList[Math.floor(Math.random() * itemList.length)], upgradeLevel: 0 };
        console.log(lootItem)
        addItem(lootItem);
        notify("Zdobyłeś: " + lootItem.name);
    }
    const goldLoot = (Math.floor(Math.random() * 16) + 5) + player.skills.goldBonus;
    player.gold += goldLoot;
    notify("Zdobyłeś: " + goldLoot + " złota!");
    const soulLoot = Math.floor(Math.random() * 5) + 1;
    player.souls += soulLoot;
    if (soulLoot === 1) {
        notify("Zdobyłeś " + soulLoot + " duszę!");
    }
    if (soulLoot > 1 && soulLoot < 5) {
        notify("Zdobyłeś " + soulLoot + " dusze!");
    } else if (soulLoot === 5) {
        notify("Zdobyłeś " + soulLoot + " dusz!");
    }
    const expLoot = Math.floor(Math.random() * 50) + 1;
    player.exp += expLoot;
    notify("Zdobyłeś " + expLoot + " doświadczenia!");
    checkLevelUp();
}