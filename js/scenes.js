const scenes = {
    explore: function() {
        scene.innerHTML = 
            "<h1>Eksploracja</h1>"
            + "<div id='stats'>HP: " + player.hp + "/" + player.maxHp + " | Złoto: " + player.gold + "</div>"
            + "<button id='btn-combat'>Walka</button>" 
            + "<button id='btn-shop'>Sklep</button>" 
            + "<button id='btn-explore'>Eksploracja</button>"
            + "<div id='inventory'></div>";
    },

    shop: function() {
        scene.innerHTML = 
            "<h1>Sklep</h1>" 
            + "<p>Złoto: " + player.gold + "</p>"
            + "<button id='btn-buy-1'>Kup Miksturę HP (10g)</button>"
            + "<button id='btn-buy-2'>Kup Miecz (20g)</button>"
            + "<button id='btn-buy-3'>Kup Tarcza (15g)</button>"
            + "<p id='msg'></p>"
            + "<button id='btn-explore'>Powrót</button>";
    },
    
    combat: function() {
        initCombat();
    }

}