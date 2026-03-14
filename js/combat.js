const enemies = [
    { name: "Goblin", hp: 30, maxHp: 30, attack: 5 },
    { name: "Szkielet", hp: 50, maxHp: 50, attack: 8 },
    { name: "Troll", hp: 80, maxHp: 80, attack: 12 },
    { name: "Demon", hp: 120, maxHp: 120, attack: 18 },
]

let enemy = {};

const lootTable = ["Broń", "Zbroja",
     "Mikstura HP", "Amulet Mocy",
      "Hełm", "Pierścień Ataku",
       "Pierścień Obrony"];

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
    if (enemy.hp <= 0) {
        dropLoot();
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    if (player.hp <= 0) {
        if (player.hp < 0) player.hp = 0;
        alert("Zginąłeś!");
        player.hp = player.maxHp;
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    startCombat();
}

function initCombat() {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    enemy = { ...randomEnemy };
    startCombat();
}

function dropLoot() {
    const lootItem = lootTable[Math.floor(Math.random() * lootTable.length)];
    addItem(lootItem);
    alert("Zdobyłeś: " + lootItem);
    const goldLoot = (Math.floor(Math.random() * 16) + 5) + player.skills.goldBonus;
    player.gold += goldLoot;
    alert("Zdobyłeś: " + goldLoot + " złota!");
    const soulLoot = Math.floor(Math.random() * 5) + 1;
    player.souls += soulLoot;
    if (soulLoot === 1) {
        alert("Zdobyłeś " + soulLoot + " duszę!");
    }
    if (soulLoot > 1 && soulLoot < 5) {
        alert("Zdobyłeś " + soulLoot + " dusze!");
    } else if (soulLoot === 5) {
        alert("Zdobyłeś " + soulLoot + " dusz!");
    }
    const expLoot = Math.floor(Math.random() * 50) + 1;
    player.exp += expLoot;
    alert("Zdobyłeś " + expLoot + " doświadczenia!");
    checkLevelUp();
}