const upgradeCosts = [
  8, 16, 24, 32, 48, 72, 122, 160, 224, 300, 500, 900, 1300, 1500, 2100, 3200,
  8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 204800, 409600,
  819200, 1638400, 3276800, 6553600, 13107200, 26214400, 52428800, 104857600,
  209715200, 419430400, 838860800, 1677721600,
];

function unlockLumberjack(index) {
  const data = lumberjackData[index];
  const lj = player.mine.lumberjacks[index];
  if (player.gold >= data.unlockCost) {
    player.gold -= data.unlockCost;
    lj.unlocked = true;
    lj.level = 1;
    notify(data.name + " odblokowany!");
    loadScene("mine_lumberjacks");
    setupButtons();
  } else {
    notify("Za mało gold! Potrzebujesz " + data.unlockCost + "g.");
  }
}

function upgradeLumberjack(index) {
  const data = lumberjackData[index];
  const lj = player.mine.lumberjacks[index];
  const cost = data.levelCost * (lj.level + 1);
  if (player.gold >= cost) {
    player.gold -= cost;
    lj.level++;
    notify(data.name + " ulepszony! (poziom " + lj.level + ")");
    loadScene("mine_lumberjacks");
    setupButtons();
  } else {
    notify("Za mało gold! Potrzebujesz " + cost + "g.");
  }
}
function startLumberjacks() {
    setInterval(function() {
        player.mine.lumberjacks.forEach(function(lj, i) {
            if (lj.unlocked) {
                player.wood = Math.min(player.wood + lumberjackData[i].woodPerSec * lj.level, player.mine.maxWood);
            }
        });
        const mineScene = document.getElementById('img-tree');
        if (mineScene) {
            loadScene("mine");
            setupButtons();
        }
    }, 1000);
}

function formatNum(n) {
    n = Math.floor(n);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
}
