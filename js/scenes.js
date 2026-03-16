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
        + "<div class='slot'>🪖 Hełm<br>Level: " + player.equipment.helmet.level + "<br>Szybkość ataku: " + player.equipment.helmet.timeAttack / 1000 + "s<br><button onclick='upgradeItem(\"helmet\")'>Ulepsz (" + player.equipment.helmet.upgradeLevel * 20 + "g)</button></div>"
        + "<div class='slot'>🛡️ Zbroja<br>Level: " + player.equipment.armor.level + "<br>Unik: " + player.equipment.armor.dodgeChance + "%<br><button onclick='upgradeItem(\"armor\")'>Ulepsz (" + player.equipment.armor.upgradeLevel * 20 + "g)</button></div>"
        + "<div class='slot'>⚔️ Broń<br>Level: " + player.equipment.weapon.level + "<br>Krytyk: " + player.equipment.weapon.critChance + "%<br><button onclick='upgradeItem(\"weapon\")'>Ulepsz (" + player.equipment.weapon.upgradeLevel * 20 + "g)</button></div>"
        + "<div class='slot'>💍 Pierścień Ataku<br>Level: " + player.equipment.ringAttack.level + "<br>Podwójny atak: " + player.equipment.ringAttack.doubleAttackChance + "%<br><button onclick='upgradeItem(\"ringAttack\")'>Ulepsz (" + player.equipment.ringAttack.upgradeLevel * 20 + "g)</button></div>"
        + "<div class='slot'>🔰 Pierścień Obrony<br>Level: " + player.equipment.ringDefense.level + "<br>Kontratak: " + player.equipment.ringDefense.counterChance + "%<br><button onclick='upgradeItem(\"ringDefense\")'>Ulepsz (" + player.equipment.ringDefense.upgradeLevel * 20 + "g)</button></div>"
        + "<div class='slot'>🔮 Akcesorium<br>Level: " + player.equipment.accessory.level + "<br>Regeneracja: " + player.equipment.accessory.regen + " HP/s<br><button onclick='upgradeItem(\"accessory\")'>Ulepsz (" + player.equipment.accessory.upgradeLevel * 20 + "g)</button></div>"
        + "</div>"
        + "<button id='btn-explore'>Wróć</button>";
}
}