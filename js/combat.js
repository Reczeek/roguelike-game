const enemy = {
    name: "Goblin",
    hp: 30,
    maxHp: 30,
    attack: 5,
}

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
    enemy.hp -= player.attack;
    player.hp -= enemy.attack;
    if (enemy.hp <= 0) {
        loadScene("explore");
        return;
    }
    if (player.hp <= 0) {
        alert("Zginąłeś!");
        loadScene("explore");
        return;
    }
    startCombat();
}