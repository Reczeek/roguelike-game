function addItem(item){
    player.inventory.push(item);
}

function showInventory() {
    player.inventory.forEach(function(item) {
        console.log(item);
    });
}