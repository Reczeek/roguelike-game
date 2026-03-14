const scene = document.getElementById('scene');
function loadScene(nazwa) {
    scenes[nazwa]();
}

function setupButtons() {
    const btnCombat = document.getElementById('btn-combat');
    const btnShop = document.getElementById('btn-shop');
    const btnExplore = document.getElementById('btn-explore');
    const btnBuy1 = document.getElementById('btn-buy-1');
    const btnBuy2 = document.getElementById('btn-buy-2');
    const btnBuy3 = document.getElementById('btn-buy-3');
    const btnskills = document.getElementById('btn-skills');
    const btnskillsatk = document.getElementById('btn-skill-atk');
    const btnskillshp = document.getElementById('btn-skill-hp');
    const btnskillsgold = document.getElementById('btn-skill-gold');
    const btnInventory = document.getElementById('btn-inventory');
    if (btnCombat) {
        btnCombat.onclick = function() {
            loadScene("combat");
            setupButtons();
        }
    }
    if (btnShop) {
        btnShop.onclick = function() {
            loadScene("shop");
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
    if (btnBuy1) {
        btnBuy1.onclick = function() {
            if (player.gold >= 10) {
                player.gold -= 10;
                addItem("Mikstura HP");
                loadScene("shop");
                setupButtons();
                document.getElementById("msg").innerHTML = "Kupiłeś: Mikstura HP!";
            } else {
                alert("Nie masz wystarczająco złota!");
            }
        }
    }
    if (btnBuy2) {
        btnBuy2.onclick = function() {
            if (player.gold >= 20) {
                player.gold -= 20;
                addItem("Miecz");
                loadScene("shop");
                setupButtons();
                document.getElementById("msg").innerHTML = "Kupiłeś: Miecz!";
            } else {
                alert("Nie masz wystarczająco złota!");
            }
        }
    }
    if (btnBuy3) {
        btnBuy3.onclick = function() {
            if (player.gold >= 15) {
                player.gold -= 15;
                addItem("Tarcza");
                loadScene("shop");
                setupButtons();
                document.getElementById("msg").innerHTML = "Kupiłeś: Tarcza!";
            } else {
                alert("Nie masz wystarczająco złota!");
            }
        }
    }
    if (btnskills) {
        btnskills.onclick = function() {
            loadScene("skills");
            setupButtons();
        }
    }
    if (btnskillsatk) {
        btnskillsatk.onclick = function() {
            if (player.souls >= 3) {
                player.souls -= 3;
                player.skills.attackBonus += 2;
                loadScene("skills");
                setupButtons();
            }
        }
    }
    if (btnskillshp) {
        btnskillshp.onclick = function() {
            if (player.souls >= 3) {
                player.souls -= 3;
                player.skills.hpBonus += 20;
                player.maxHp += 20;
                player.hp += 20;
                loadScene("skills");
                setupButtons();
            }
        }
    }
    if (btnskillsgold) {
        btnskillsgold.onclick = function() {
            if (player.souls >= 3) {
                player.souls -= 3;
                player.skills.goldBonus += 5;
                loadScene("skills");
                setupButtons();
            }
        }
    }

    if (btnInventory) {
        btnInventory.onclick = function() {
            loadScene("inventory");
            setupButtons();
            renderInventory();
        }
    }

}


loadScene("explore");
setupButtons();