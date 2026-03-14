const scene = document.getElementById('scene');
function loadScene(nazwa) {
    scenes[nazwa]();
}

function setupButtons() {
    const btnCombat = document.getElementById('btn-combat');
    const btnShop = document.getElementById('btn-shop');
    const btnExplore = document.getElementById('btn-explore');
    btnCombat.onclick = function() {
        loadScene("combat");
    }
    btnShop.onclick = function() {
        loadScene("shop");
    }
    btnExplore.onclick = function() {
        loadScene("explore");
    }
}

loadScene("explore");
setupButtons();