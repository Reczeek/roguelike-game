const scenes = {
    explore: function() {
        scene.innerHTML = 
            "<h1>Eksploracja</h1>"
            + "<div id='stats'>"
                + "❤️: " + player.hp + "/" + player.maxHp 
                + " | ⭐ " + player.level 
                + " | ✨ " + player.exp + "/" + player.expToNextLevel
                + " | 🪙 " + player.gold
                + " | 💀 " + player.souls
                + " | 🏰 " + player.floor
                + " | 🚪 " + player.floorCount + "/8"
                + "</div>"
            + "<button id='btn-combat'>Walka</button>" 
            + "<button id='btn-inventory'>Ekwipunek</button>"
            + "<button id='btn-mine'>Kopalnia</button>"
            + "<button id='btn-rebirth'>Odrodzenie</button>"
            + "<button id='btn-save'>Zapisz</button>";
    },

    upgrade: function() {
        let html = "<h1>Ulepszalnia</h1>"
            + "<p>🪙 " + player.gold + "</p>";
        
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
    },

    rebirth: function() {
        scene.innerHTML =
            "<h1>Odrodzenie</h1>"
            + "<p>Poświęć swoje postępy, aby zdobyć trwałe bonusy w kolejnych runach.</p>"
            + "<p>💀 " + player.souls + "</p>"
            + "<div id='rebirth-perks'>"
                + "<button id='btn-meta-helmet'>Lepsze ulepszenie hełmu (" + ((player.meta.helmetLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-armor'>Lepsze ulepszenie zbroi (" + ((player.meta.armorLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-weapon'>Lepsze ulepszenie broni (" + ((player.meta.weaponLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-ringAtk'>Lepsze ulepszenie pierścienia ataku (" + ((player.meta.ringAtkLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-ringDef'>Lepsze ulepszenie pierścienia obrony (" + ((player.meta.ringDefLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-accessory'>Lepsze ulepszenie akcesorium (" + ((player.meta.accessoryLevel + 1) * 2) + " 💀)</button>"
                + "<button id='btn-meta-soulMult'>+1 💀 z bossa (" + ((player.meta.soulMultLevel + 1) * 5) + " 💀)</button>"
            + "</div>"
            + "<button id='btn-do-rebirth'>⚡ ODRODŹ SIĘ</button>"
            + "<button id='btn-explore'>Wróć</button>";
    },


    mine: function() {
    const treeImages = ['assets/images/young_tree.png', 'assets/images/tree_2.png', 'assets/images/bigtree.png'];
    scene.innerHTML =
        "<h1>Kopalnia</h1>"
        + "<p>🪵 " + player.wood + " / " + player.mine.maxWood + "</p>"
        + "<img id='img-tree' src='" + treeImages[player.mine.treeLevel] + "' style='width:900px;height:900px;object-fit:contain;cursor:pointer;'>"
        + "<button id='btn-mine-lumberjacks'>Drwale</button>"
        + "<button id='btn-mine-upgrade'>Ulepszenia</button>"
        + "<button id='btn-explore'>Wróć</button>";
},

    mine_upgrade: function() {
    const axeCost = axeCosts[player.mine.axeLevel] || "MAX";
    const treeCost = treeCosts[player.mine.treeLevel] || "MAX";
    const nextStorage = storageLevels[player.mine.storageLevel + 1];
    scene.innerHTML =
        "<h1>Ulepszenia Kopalni</h1>"
        + "<p>🪙 " + player.gold + "</p>"
        + "<p>Siekiera poziom: " + player.mine.axeLevel + " | 🪵 za klik: " + player.mine.woodPerClick + "</p>"
        + "<button id='btn-upgrade-axe'>Ulepsz siekierę (" + axeCost + "🪙)</button>"
        + "<p>Drzewo poziom: " + player.mine.treeLevel + "</p>"
        + "<button id='btn-upgrade-tree'>Ulepsz drzewo (" + treeCost + "🪙)</button>"
        + "<p>Magazyn poziom: " + player.mine.storageLevel + " | Pojemność: " + player.mine.maxWood + "</p>"
        + (nextStorage ? "<button id='btn-upgrade-storage'>Ulepsz magazyn (" + nextStorage.cost + "🪙)</button>" : "<p>Magazyn MAX</p>")
        + "<button id='btn-mine'>Wróć</button>";
},

    mine_lumberjacks: function() {
    scene.innerHTML =
        "<h1>Drwale</h1>"
        + "<button id='btn-mine'>Wróć</button>";
}
}
