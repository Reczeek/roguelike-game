const scenes = {
    explore: function() {
        scene.innerHTML = 
            "<h1>Eksploracja</h1>"
            + "<div id='stats'>"
                + "HP: " + player.hp + "/" + player.maxHp 
                + " | Poziom: " + player.level 
                + " | XP: " + player.exp + "/" + player.expToNextLevel
                + " | Złoto: " + player.gold 
                + "</div>"
            + "<button id='btn-combat'>Walka</button>" 
            + "<button id='btn-shop'>Sklep</button>" 
            + "<button id='btn-skills'>Umiejętności</button>"
            + "<button id='btn-inventory'>Ekwipunek</button>"
            + "<button id='btn-save'>Zapisz</button>";
    },

    shop: function() {
        scene.innerHTML = 
            "<h1>Sklep</h1>" 
            + "<p>Złoto: " + player.gold + "</p>"
            + "<button id='btn-buy-1'>Kup Miksturę HP (10g)</button>"
            + "<button id='btn-buy-2'>Kup Broń (20g)</button>"
            + "<button id='btn-buy-3'>Kup Zbroję (15g)</button>"
            + "<p id='msg'></p>"
            + "<button id='btn-explore'>Powrót</button>";
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
            + "<div class='slot' id='slot-helmet'>🪖 Hełm<br>" + (player.equipment.helmet || "pusty") + "</div>"
            + "<div class='slot' id='slot-armor'>🛡️ Zbroja<br>" + (player.equipment.armor || "pusty") + "</div>"
            + "<div class='slot' id='slot-weapon'>⚔️ Broń<br>" + (player.equipment.weapon || "pusty") + "</div>"
            + "<div class='slot' id='slot-ringAttack'>💍 Pierścień Ataku<br>" + (player.equipment.ringAttack || "pusty") + "</div>"
            + "<div class='slot' id='slot-ringDefense'>💍 Pierścień Obrony<br>" + (player.equipment.ringDefense || "pusty") + "</div>"
            + "<div class='slot' id='slot-accessory'>🔮 Akcesorium<br>" + (player.equipment.accessory || "pusty") + "</div>"
            + "</div>"
            + "<div id='inventory'></div>"
            + "<button id='btn-explore'>Wróć</button>";
}
}