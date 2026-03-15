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