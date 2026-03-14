const scene = document.getElementById('scene');
function loadScene(nazwa) {
    scenes[nazwa]();
}

function setupButtons() {
    const btnCombat = document.getElementById('btn-combat');
    const btnShop = document.getElementById('btn-shop');
    const btnExplore = document.getElementById('btn-explore');
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
        }
    }
}

loadScene("explore");
setupButtons();
renderInventory();