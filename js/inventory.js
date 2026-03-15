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
    const cost = (item.upgradeLevel + 1) * 20;
    if (player.gold >= cost) {
        player.gold -= cost;
        item.upgradeLevel++;
        loadScene("upgrade");
        setupButtons();
        document.getElementById("msg").innerHTML = "Ulepszyłeś: " + item.name + " do poziomu " + item.upgradeLevel + "!";
    } else {
        notify("Nie masz wystarczająco złota!");
    }
    loadScene("upgrade");
    setupButtons();
}

function getEquipmentBonus(bonusType) {
    let total = 0;
    for (const slot in player.equipment) {
        const item = player.equipment[slot];
        if (item && item.bonuses[bonusType]) {
            total += item.bonuses[bonusType] + (item.upgradeLevel * 0.5);
        }
    }
    return total;
}