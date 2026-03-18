//localStorage.clear();
loadGame();

const scene = document.getElementById('scene');
function loadScene(nazwa) {
    scenes[nazwa]();
}

function setupButtons() {
    const btnCombat = document.getElementById('btn-combat');
    const btnExplore = document.getElementById('btn-explore');
    const btnInventory = document.getElementById('btn-inventory');
    const btnSave = document.getElementById('btn-save');
    const btnRebirth = document.getElementById('btn-rebirth');
    const btnDoRebirth = document.getElementById('btn-do-rebirth');
    const btnMetaHelmet = document.getElementById('btn-meta-helmet');
    const btnMetaArmor = document.getElementById('btn-meta-armor');
    const btnMetaWeapon = document.getElementById('btn-meta-weapon');
    const btnMetaRingAtk = document.getElementById('btn-meta-ringAtk');
    const btnMetaRingDef = document.getElementById('btn-meta-ringDef');
    const btnMetaAccessory = document.getElementById('btn-meta-accessory');
    const btnMetaSoulMult = document.getElementById('btn-meta-soulMult');
    const btnMine = document.getElementById('btn-mine');
    const imgTree = document.getElementById('img-tree');
    const btnMineLumberjacks = document.getElementById('btn-mine-lumberjacks');
    const btnMineUpgrade = document.getElementById('btn-mine-upgrade');
    const btnUpgradeAxe = document.getElementById('btn-upgrade-axe');
    const btnUpgradeTree = document.getElementById('btn-upgrade-tree');
    const btnUpgradeStorage = document.getElementById('btn-upgrade-storage');

    if (btnCombat) {
        btnCombat.onclick = function() {
            loadScene("combat");
            setupButtons();
        }
    }

    if (btnExplore) {
        btnExplore.onclick = function() {
            loadScene("explore");
            setupButtons();
            renderInventory();
        }
    }

    if (btnInventory) {
        btnInventory.onclick = function() {
            loadScene("inventory");
            setupButtons();
            renderInventory();
        }
    }

    if (btnSave) {
        btnSave.onclick = function() {
            saveGame();
            notify("Gra została zapisana!");
        }
    }

    if (btnRebirth) {
        btnRebirth.onclick = function() {
            if (confirm("Czy na pewno chcesz się odrodzić? Stracisz cały postęp, ale będziesz mógł zacząć od nowa z bonusami!")) {
                loadScene("rebirth");
                setupButtons();
            } else {
                notify("Odrodzenie anulowane.");
                loadScene("explore");
                setupButtons();
            }
        }
    }

    if (btnDoRebirth) {
        btnDoRebirth.onclick = function() {
            if (confirm("Czy na pewno? Cały postęp tej runy zostanie utracony!")) {
                doRebirth();
            }
        }
    }

    if (btnMetaHelmet) {
        btnMetaHelmet.onclick = function() {
            const cost = (player.meta.helmetLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.helmetLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie hełmu poprawione! (poziom " + player.meta.helmetLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaArmor) {
        btnMetaArmor.onclick = function() {
            const cost = (player.meta.armorLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.armorLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie zbroi poprawione! (poziom " + player.meta.armorLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaWeapon) {
        btnMetaWeapon.onclick = function() {
            const cost = (player.meta.weaponLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.weaponLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie broni poprawione! (poziom " + player.meta.weaponLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaRingAtk) {
        btnMetaRingAtk.onclick = function() {
            const cost = (player.meta.ringAtkLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.ringAtkLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie pierścienia ataku poprawione! (poziom " + player.meta.ringAtkLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaRingDef) {
        btnMetaRingDef.onclick = function() {
            const cost = (player.meta.ringDefLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.ringDefLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie pierścienia obrony poprawione! (poziom " + player.meta.ringDefLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaAccessory) {
        btnMetaAccessory.onclick = function() {
            const cost = (player.meta.accessoryLevel + 1) * 2;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.accessoryLevel++;
                player.meta.weaponUpgradeBonus += 1;
                notify("Ulepszenie akcesorium poprawione! (poziom " + player.meta.accessoryLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMetaSoulMult) {
        btnMetaSoulMult.onclick = function() {
            const cost = (player.meta.soulMultLevel + 1) * 5;
            if (player.souls >= cost) {
                player.souls -= cost;
                player.meta.soulMultLevel++;
                player.meta.soulMultiplier += 1;
                notify("+1 💀 z bossa! (poziom " + player.meta.soulMultLevel + ")");
                loadScene("rebirth");
                setupButtons();
            } else { notify("Za mało 💀! Potrzebujesz " + cost + "."); }
        }
    }

    if (btnMine) {
        btnMine.onclick = function() {
            loadScene("mine");
            setupButtons();
        }
    }

    if (imgTree) {
        imgTree.onclick = function() {
            if (player.wood < player.mine.maxWood) {
                player.wood = Math.min(player.wood + player.mine.woodPerClick, player.mine.maxWood);
                loadScene("mine");
                setupButtons();
            } else {
                notify("Magazyn pełny!");
            }
        }
    }

    if (btnMineLumberjacks) {
        btnMineLumberjacks.onclick = function() {
            loadScene("mine_lumberjacks");
            setupButtons();
        }
    }

    if (btnMineUpgrade) {
        btnMineUpgrade.onclick = function() {
            loadScene("mine_upgrade");
            setupButtons();
        }
    }

    if (btnUpgradeAxe) {
        btnUpgradeAxe.onclick = function() {
            const cost = axeCosts[player.mine.axeLevel];
            if (cost === undefined) { notify("Siekiera na MAX poziomie!"); return; }
            if (player.gold >= cost) {
                player.gold -= cost;
                player.mine.axeLevel++;
                player.mine.woodPerClick += axeBonus;
                notify("Siekiera ulepszona! (poziom " + player.mine.axeLevel + ") | +" + axeBonus + " 🪵/klik");
                loadScene("mine_upgrade");
                setupButtons();
            } else { notify("Za mało 🪙! Potrzebujesz " + cost + "🪙"); }
        }
    }

    if (btnUpgradeTree) {
        btnUpgradeTree.onclick = function() {
            const cost = treeCosts[player.mine.treeLevel];
            if (cost === undefined) { notify("Drzewo na MAX poziomie!"); return; }
            if (player.gold >= cost) {
                player.gold -= cost;
                const bonus = treeBonus[player.mine.treeLevel];
                player.mine.woodPerClick += bonus;
                player.mine.treeLevel++;
                notify("Drzewo ulepszone! (poziom " + player.mine.treeLevel + ") | +" + bonus + " 🪵/klik");
                loadScene("mine_upgrade");
                setupButtons();
            } else { notify("Za mało 🪙! Potrzebujesz " + cost + "🪙"); }
        }
    }

    if (btnUpgradeStorage) {
        btnUpgradeStorage.onclick = function() {
            const nextStorage = storageLevels[player.mine.storageLevel + 1];
            if (!nextStorage) { notify("Magazyn na MAX poziomie!"); return; }
            if (player.gold >= nextStorage.cost) {
                player.gold -= nextStorage.cost;
                player.mine.storageLevel++;
                player.mine.maxWood = nextStorage.capacity;
                notify("Magazyn ulepszony! Pojemność: " + nextStorage.capacity);
                loadScene("mine_upgrade");
                setupButtons();
            } else { notify("Za mało 🪙! Potrzebujesz " + nextStorage.cost + "🪙"); }
        }
    }
}

function doRebirth() {
    const savedMeta = player.meta;
    const savedSouls = player.souls;
    const savedRuns = player.meta.totalRuns + 1;

    player.hp = 100;
    player.maxHp = 100;
    player.attack = 10;
    player.defense = 5;
    player.gold = 0;
    player.exp = 0;
    player.level = 1;
    player.expToNextLevel = 100;
    player.floor = 1;
    player.floorCount = 1;
    player.inventory = [];
    player.skills = { attackBonus: 0, hpBonus: 0, goldBonus: 0 };
    player.runBonuses = [];

    player.meta = savedMeta;
    player.meta.totalRuns = savedRuns;
    player.souls = savedSouls;

    notify("Odrodzenie! Runa #" + savedRuns + " rozpoczęta.");
    loadScene("explore");
    setupButtons();
}

loadScene("explore");
setupButtons();