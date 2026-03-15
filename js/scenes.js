const scenes = {
    explore: function() {
        scene.innerHTML = 
            "<h1>Eksploracja</h1>"
            + "<div id='stats'>"
                + "HP: " + player.hp + "/" + player.maxHp 
                + " | Poziom: " + player.level 
                + " | XP: " + player.exp + "/" + player.expToNextLevel
                + " | Złoto: " + player.gold
                + " | Dusze: " + player.souls
                + " | Piętro: " + player.floor
                + " | Pokój: " + player.floorCount + "/8"
                + "</div>"
            + "<button id='btn-combat'>Walka</button>" 
            + "<button id='btn-shop'>Ulepszalnia</button>" 
            + "<button id='btn-skills'>Umiejętności</button>"
            + "<button id='btn-inventory'>Ekwipunek</button>"
            + "<button id='btn-save'>Zapisz</button>";
    },
    upgrade: function() {
    let html = "<h1>Ulepszalnia</h1>"
        + "<p>Złoto: " + player.gold + "</p>";
    
    for (const slot in player.equipment) {
        const item = player.equipment[slot];
        if (item) {
            const cost = (item.upgradeLevel + 1) * 20;
            html += "<p>" + item.name + " (lvl " + item.upgradeLevel + ")"
                + " <button onclick='upgradeItem(\"" + slot + "\")'>Ulepsz (" + cost + "g)</button></p>";
        }
    }
    
    html += "<button id='btn-explore'>Powrót</button>";
    scene.innerHTML = html;
},

    
    combat: function() {
        initCombat();
    },
    
    skills: function() {
        scene.innerHTML =
        "<h1>Drzewko Umiejętności</h1>"
        + "<p>Dusze: " + player.souls + "</p>"
        + "<button id='btn-skill-atk'>Atak +2 (3 dusze)</button>"
        + "<button id='btn-skill-hp'>Max HP +20 (3 dusze)</button>"
        + "<button id='btn-skill-gold'>Bonus złoto +5 (3 dusze)</button>"
        + "<button id='btn-explore'>Wróć</button>";
    },

    inventory: function() {
        scene.innerHTML = 
            "<h1>Ekwipunek</h1>"
            + "<div id='slots'>"
            + "<div class='slot' id='slot-helmet'>🪖 Hełm<br>" + "</div>"
            + "<div class='slot' id='slot-armor'>🛡️ Zbroja<br>" + "</div>"
            + "<div class='slot' id='slot-weapon'>⚔️ Broń<br>" + "</div>"
            + "<div class='slot' id='slot-ringAttack'>💍 Pierścień Ataku<br>" + "</div>"
            + "<div class='slot' id='slot-ringDefense'>💍 Pierścień Obrony<br>" + "</div>"
            + "<div class='slot' id='slot-accessory'>🔮 Akcesorium<br>" + "</div>"
            + "</div>"
            + "<div id='inventory'></div>"
            + "<button id='btn-explore'>Wróć</button>";
}
}