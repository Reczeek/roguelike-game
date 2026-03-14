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
        inventory.innerHTML = "";
        player.inventory.forEach(function(item) {
            inventory.innerHTML += "<p>" + item + "</p>";
        });
        inventory.innerHTML += html
    }

}