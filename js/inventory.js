function addItem(item) {
    player.inventory.push(item);
}

const itemCost = [8, 16, 24, 32, 48, 72, 128, 160, 224, 500, 1024, 2048, 4096, 8192, 16384, 32768, 65536];

function renderInventory() {
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
    const cost = upgradeCosts[item.upgradeLevel];
    if (player.wood >= cost) {
        player.wood -= cost;
        if (slot === "helmet") {
            item.timeAttack -= 100;
            item.upgradeLevel++;
            item.level++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Szybkość ataku: " + item.timeAttack / 1000 + "s");
        }
        if (slot === "armor") {
            item.dodgeChance += 1;
            item.upgradeLevel++;
            item.level++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Unik: " + item.dodgeChance + "%");
        }
        if (slot === "weapon") {
            item.critChance += 1;
            item.upgradeLevel++;
            item.level++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Krytyk: " + item.critChance + "%");
        }
        if (slot === "ringAttack") {
            item.doubleAttackChance += 1;
            item.level++;
            item.upgradeLevel++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Podwójny atak: " + item.doubleAttackChance + "%");
        }
        if (slot === "ringDefense") {
            item.counterChance += 1;
            item.level++;
            item.upgradeLevel++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Kontratak: " + item.counterChance + "%");
        }
        if (slot === "accessory") {
            item.regen += 5;
            item.level++;
            item.upgradeLevel++;
            notify("Ulepszono " + item.name + " do poziomu " + item.level + "! Regeneracja: " + item.regen + " HP/s");
        }
    } else {
        notify("Nie masz wystarczająco 🌲! Potrzebujesz " + formatNum(cost) + " 🌲");
    }
    loadScene("inventory");
    setupButtons();
}