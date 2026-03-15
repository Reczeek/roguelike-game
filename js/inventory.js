function addItem(item){
    player.inventory.push(item);
}

function showInventory() {
    player.inventory.forEach(function(item) {
        console.log(item);
    });
}

function renderInventory() {
    const inventory = document.getElementById("inventory");
    if (!inventory) return;
    if (player.inventory.length === 0) {
        inventory.innerHTML = "<p>Brak przedmiotów</p>";
    } else {
        let html = "";
        player.inventory.forEach(function(item) {
            if (item === "Mikstura HP") {
                html += "<p>" + item + " <button onclick='useItem(\"" + item + "\")'>Użyj</button></p>";
            } else {
                html += "<p>" + item + " <button onclick='equipItem(\"" + item + "\")'>Załóż</button></p>";
        }
        });
        inventory.innerHTML = html;
    }
}

function useItem(itemName) {
    if (itemName === "Mikstura HP") {
        player.hp += 30;
        if (player.hp > player.maxHp) {
            player.hp = player.maxHp;
        }
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("explore");
        setupButtons();
        renderInventory();
    }

}

function equipItem(itemName) {
    if (itemName === "Broń") {
        player.equipment.weapon = "Broń";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
        
    }   
    if (itemName === "Zbroja") {
        player.equipment.armor = "Zbroja";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
    }
    if (itemName === "Pierścień Ataku") {
        player.equipment.ringAttack = "Pierścień Ataku";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
    }
    if (itemName === "Pierścień Obrony") {
        player.equipment.ringDefense = "Pierścień Obrony";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
    }
    if (itemName === "Amulet Mocy") {
        player.equipment.accessory = "Amulet Mocy";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
    }
    if (itemName === "Hełm") {
        player.equipment.helmet = "Hełm";
        const index = player.inventory.indexOf(itemName);
        player.inventory.splice(index, 1);
        loadScene("inventory");
        renderInventory();
    }
    console.log(player.equipment)
}