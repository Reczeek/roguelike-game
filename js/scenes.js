const scenes = {
    explore: function() {
        scene.innerHTML = 
            "<h1>Eksploracja</h1>"
            + "<div id='stats'>HP: " + player.hp + "/" + player.maxHp + " | Złoto: " + player.gold + "</div>"
            + "<button id='btn-combat'>Walka</button>" 
            + "<button id='btn-shop'>Sklep</button>" 
            + "<button id='btn-explore'>Eksploracja</button>";
    },

    shop: function() {
        scene.innerHTML = 
            "<h1>Sklep</h1>" 
            + "<button id='btn-explore'>Wróć</button>";
    },
    
    combat: function() {
        startCombat();
    }

}