const enemy = {
    name: "Goblin",
    hp: 30,
    maxHp: 30,
    attack: 5,
}

const lootTable = ["Broń", "Zbroja",
     "Mikstura HP", "Amulet Mocy",
      "Hełm", "Pierścień Ataku",
       "Pierścień Obrony"];

function startCombat() {
    scene.innerHTML = 
        "<h1>Walka z Goblinem</h1>" 
        + "<p>HP wroga: " + enemy.hp + "/" + enemy.maxHp + "</p>"
        + "<p>HP gracza: " + player.hp + "/" + player.maxHp + "</p>"
        + "<button id='btn-attack'>Atakuj</button>"
        + "<button id='btn-explore'>Uciekaj</button>";
    const btnAttack = document.getElementById('btn-attack');
    if (btnAttack) {
        btnAttack.onclick = function() {
            attack();
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
        alert("Zginąłeś!");
        loadScene("explore");
        setupButtons();
        renderInventory();
        return;
    }
    startCombat();
}

function initCombat() {
    enemy.hp = enemy.maxHp;
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
}