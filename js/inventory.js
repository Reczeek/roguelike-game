function addItem(item) {
    player.inventory.push(item);
}

function renderInventory() {
    console.log(player.inventory)
    const inventory = document.getElementById("inventory");
    if (!inventory) return;
    if (player.inventory.length === 0) {
        inventory.innerHTML = "<p>Brak przedmiotów</p>";
        return;
    }
    let html = "";
    player.inventory.forEach(function(item, index) {
        html += "<p>" + item.name + " (lvl " + item.upgradeLevel + ")"
            + " <button onclick='equipItem(" + index + ")'>Załóż</button></p>";
    });
    inventory.innerHTML = html;
}

function equipItem(index) {
    const item = player.inventory[index];
    player.equipment[item.slot] = item;
    player.inventory.splice(index, 1);
    loadScene("inventory");
    renderInventory();
    setupButtons();
}

function upgradeItem(slot) {
    const item = player.equipment[slot];
    const cost = item.upgradeLevel * 20;
    if (player.gold >= cost) {
        player.gold -= cost;
        if (slot === "helmet") {
            item.timeAttack -= 100;
            item.upgradeLevel++;
            item.level++;
        }
        if (slot === "armor") {
            item.dodgeChance += 1;
            item.upgradeLevel++;
            item.level++;
        }
        if (slot === "weapon") {
            item.critChance += 1;
            item.upgradeLevel++;
            item.level++;
        }
        if (slot === "ringAttack") {
            item.doubleAttackChance += 1;
            item.level++;
            item.upgradeLevel++;
        }
        if (slot === "ringDefense") {
            item.counterChance += 1;
            item.level++;
            item.upgradeLevel++;
        }
        if (slot === "accessory") {
            item.regen += 5;
            item.level++;
            item.upgradeLevel++;
        }
    } else {
        notify("Nie masz wystarczająco złota!");
    }
    loadScene("inventory");
    setupButtons();
}