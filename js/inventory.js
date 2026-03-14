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
    if (player.inventory.length === 0) {
        inventory.innerHTML = "<p>Brak przedmiotów</p>";
    } else {
        let html = "";
        player.inventory.forEach(function(item) {
            html += "<p>" + item + " <button onclick='useItem(\"" + item + "\")'>Użyj</button></p>";
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