const scenes = {
    explore: function() {
        scene.innerHTML = "<h1>Eksploracja</h1>" + "<button id='btn-combat'>Walka</button>" + "<button id='btn-shop'>Sklep</button>" + "<button id='btn-explore'>Eksploracja</button>";
    },
    combat: function() {
        scene.innerHTML = "<h1>Walka</h1>" + "<button id='btn-explore'>Wróć</button>";
    },
    shop: function() {
        scene.innerHTML = "<h1>Sklep</h1>" + "<button id='btn-explore'>Wróć</button>";
    },

}