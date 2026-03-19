const enemies = [
  // Tier 1
  { name: "Szczur",        hp: 40,    maxHp: 40,    attack: 18,  timeAttack: 900,  image: "assets/images/Rat.jpg",          goldMin: 1,     goldMax: 4     },
  { name: "Goblin",        hp: 80,    maxHp: 80,    attack: 28,  timeAttack: 1100, image: "assets/images/Goblin.jpg",       goldMin: 4,     goldMax: 10    },
  { name: "Szkielet",      hp: 70,    maxHp: 70,    attack: 32,  timeAttack: 1000, image: "assets/images/Skeleton.jpg",     goldMin: 5,     goldMax: 12    },
  // Tier 2
  { name: "Troll",         hp: 150,   maxHp: 150,   attack: 45,  timeAttack: 1400, image: "assets/images/Troll.jpg",        goldMin: 12,    goldMax: 28    },
  { name: "Wilkołak",      hp: 130,   maxHp: 130,   attack: 55,  timeAttack: 900,  image: "assets/images/Werewolf.jpg",     goldMin: 15,    goldMax: 32    },
  { name: "Ork",           hp: 180,   maxHp: 180,   attack: 40,  timeAttack: 1500, image: "assets/images/Orc.jpg",          goldMin: 10,    goldMax: 25    },
  // Tier 3
  { name: "Demon",         hp: 280,   maxHp: 280,   attack: 70,  timeAttack: 1100, image: "assets/images/Demon.jpg",        goldMin: 30,    goldMax: 70    },
  { name: "Wampir",        hp: 250,   maxHp: 250,   attack: 80,  timeAttack: 900,  image: "assets/images/Vampire.jpg",      goldMin: 35,    goldMax: 80    },
  { name: "Ghul",          hp: 220,   maxHp: 220,   attack: 75,  timeAttack: 1000, image: "assets/images/Ghoul.jpg",        goldMin: 28,    goldMax: 65    },
  // Tier 4
  { name: "Licho",          hp: 500,   maxHp: 500,   attack: 110, timeAttack: 1200, image: "assets/images/Lich.jpg",         goldMin: 80,    goldMax: 180   },
  { name: "Golem",         hp: 700,   maxHp: 700,   attack: 90,  timeAttack: 1800, image: "assets/images/Golem.jpg",        goldMin: 70,    goldMax: 160   },
  { name: "Upiór",         hp: 450,   maxHp: 450,   attack: 130, timeAttack: 900,  image: "assets/images/Wraith.jpg",       goldMin: 90,    goldMax: 200   },
  // Tier 5
  { name: "Tytan",         hp: 1200,  maxHp: 1200,  attack: 160, timeAttack: 1600, image: "assets/images/Titan.jpg",        goldMin: 200,   goldMax: 450   },
  { name: "Archidemon",    hp: 1000,  maxHp: 1000,  attack: 190, timeAttack: 1000, image: "assets/images/Archidemon.jpg",    goldMin: 250,   goldMax: 550   },
  { name: "Widmo",         hp: 900,   maxHp: 900,   attack: 200, timeAttack: 800,  image: "assets/images/Specter.jpg",      goldMin: 220,   goldMax: 500   },
];

const bosses = [
  { name: "Szczuras",          hp: 200,    maxHp: 200,    attack: 40,  timeAttack: 1400, image: "assets/images/Szczuras.jpg",      isBoss: true, goldMin: 30,    goldMax: 60    },
  { name: "Król Goblinów",     hp: 600,    maxHp: 600,    attack: 65,  timeAttack: 1300, image: "assets/images/GoblinKing.jpg",    isBoss: true, goldMin: 100,   goldMax: 220   },
  { name: "Szaman Orków",      hp: 900,    maxHp: 900,    attack: 85,  timeAttack: 1200, image: "assets/images/OrcShaman.jpg",     isBoss: true, goldMin: 180,   goldMax: 380   },
  { name: "Smok",              hp: 1500,   maxHp: 1500,   attack: 110, timeAttack: 1500, image: "assets/images/Dragon.jpg",        isBoss: true, goldMin: 350,   goldMax: 700   },
  { name: "Wiedźma",           hp: 2200,   maxHp: 2200,   attack: 140, timeAttack: 1000, image: "assets/images/Witch.jpg",         isBoss: true, goldMin: 600,   goldMax: 1200  },
  { name: "Lord Wampirów",     hp: 3500,   maxHp: 3500,   attack: 180, timeAttack: 900,  image: "assets/images/VampireLord.jpg",   isBoss: true, goldMin: 1000,  goldMax: 2000  },
  { name: "Nekromanta",        hp: 5000,   maxHp: 5000,   attack: 220, timeAttack: 1100, image: "assets/images/Necromancer.jpg",   isBoss: true, goldMin: 1800,  goldMax: 3500  },
];

const floorData = [
  // Piętro 1-3 — Tier 1
  { enemies: [{ e: "Szczur", w: 100 }],                                                          boss: "Szczuras" },
  { enemies: [{ e: "Szczur", w: 70 }, { e: "Goblin", w: 30 }],                                  boss: "Szczuras" },
  { enemies: [{ e: "Szczur", w: 50 }, { e: "Goblin", w: 30 }, { e: "Szkielet", w: 20 }],        boss: "Król Goblinów" },
  // Piętro 4-6 — Tier 1→2
  { enemies: [{ e: "Goblin", w: 50 }, { e: "Szkielet", w: 30 }, { e: "Troll", w: 20 }],         boss: "Król Goblinów" },
  { enemies: [{ e: "Szkielet", w: 40 }, { e: "Troll", w: 40 }, { e: "Wilkołak", w: 20 }],       boss: "Szaman Orków" },
  { enemies: [{ e: "Troll", w: 40 }, { e: "Wilkołak", w: 40 }, { e: "Ork", w: 20 }],            boss: "Szaman Orków" },
  // Piętro 7-9 — Tier 2→3
  { enemies: [{ e: "Wilkołak", w: 40 }, { e: "Ork", w: 40 }, { e: "Demon", w: 20 }],            boss: "Smok" },
  { enemies: [{ e: "Ork", w: 30 }, { e: "Demon", w: 40 }, { e: "Wampir", w: 30 }],              boss: "Smok" },
  { enemies: [{ e: "Demon", w: 30 }, { e: "Wampir", w: 40 }, { e: "Ghul", w: 30 }],             boss: "Wiedźma" },
  // Piętro 10-12 — Tier 3→4
  { enemies: [{ e: "Wampir", w: 30 }, { e: "Ghul", w: 40 }, { e: "Lich", w: 30 }],              boss: "Wiedźma" },
  { enemies: [{ e: "Ghul", w: 20 }, { e: "Lich", w: 40 }, { e: "Golem", w: 40 }],               boss: "Lord Wampirów" },
  { enemies: [{ e: "Lich", w: 30 }, { e: "Golem", w: 40 }, { e: "Upiór", w: 30 }],              boss: "Lord Wampirów" },
  // Piętro 13-15 — Tier 4→5
  { enemies: [{ e: "Golem", w: 30 }, { e: "Upiór", w: 40 }, { e: "Tytan", w: 30 }],             boss: "Nekromanta" },
  { enemies: [{ e: "Upiór", w: 20 }, { e: "Tytan", w: 40 }, { e: "Archidemon", w: 40 }],        boss: "Nekromanta" },
  { enemies: [{ e: "Tytan", w: 30 }, { e: "Archidemon", w: 40 }, { e: "Widmo", w: 30 }],        boss: "Arcylich" },
  // Piętro 16-18 — Tier 5
  { enemies: [{ e: "Archidemon", w: 30 }, { e: "Widmo", w: 70 }],                               boss: "Arcylich" },
  { enemies: [{ e: "Tytan", w: 20 }, { e: "Archidemon", w: 30 }, { e: "Widmo", w: 50 }],        boss: "Demon Zagłady" },
  { enemies: [{ e: "Archidemon", w: 20 }, { e: "Widmo", w: 80 }],                               boss: "Demon Zagłady" },
  // Piętro 19-20 — Endgame
  { enemies: [{ e: "Widmo", w: 50 }, { e: "Archidemon", w: 50 }],                               boss: "Starożytny Tytan" },
  { enemies: [{ e: "Widmo", w: 40 }, { e: "Archidemon", w: 30 }, { e: "Tytan", w: 30 }],        boss: "Starożytny Tytan" },
];

const axeCosts = [
  2, 20, 40, 60, 100, 300, 700, 1500, 3300, 8000, 13000, 19000, 30000, 70000,
  120000, 300000, 700000,
];
const axeBonus = 4;
const treeCosts = [2000, 120000];
const treeBonus = [100, 1000];
const storageLevels = [
  { cost: 0,      capacity: 20      },
  { cost: 300,    capacity: 200     },
  { cost: 3000,   capacity: 2000    },
  { cost: 14000,  capacity: 20000   },
  { cost: 150000, capacity: 200000  },
  { cost: 400000, capacity: 2000000 },
];

const lumberjackData = [
  { name: "Drwal 1", unlockCost: 50,     levelCost: 30,     woodPerSec: 0.2  },
  { name: "Drwal 2", unlockCost: 500,    levelCost: 200,    woodPerSec: 2    },
  { name: "Drwal 3", unlockCost: 3000,   levelCost: 1500,   woodPerSec: 20   },
  { name: "Drwal 4", unlockCost: 15000,  levelCost: 8000,   woodPerSec: 50   },
  { name: "Drwal 5", unlockCost: 60000,  levelCost: 30000,  woodPerSec: 100  },
  { name: "Drwal 6", unlockCost: 200000, levelCost: 100000, woodPerSec: 300  },
  { name: "Drwal 7", unlockCost: 700000, levelCost: 350000, woodPerSec: 500  },
];

const upgradeCosts = [
  8, 16, 24, 32, 48, 72, 122, 160, 224, 300, 500, 900, 1300, 1500, 2100, 3200,
  8000, 16000, 32000, 64000, 128000, 256000, 512000, 1024000, 204800, 409600,
  819200, 1638400, 3276800, 6553600, 13107200, 26214400, 52428800, 104857600,
  209715200, 419430400, 838860800, 1677721600,
];

const tempBonuses = [
  { name: "+5% atak",            apply: function() { player.attack = Math.floor(player.attack * 1.05); } },
  { name: "+10% max HP",         apply: function() { player.maxHp *= 1.1; player.hp *= 1.1; } },
  { name: "+10% 💰 z walk",      apply: function() { player.skills.goldBonus += 10; } },
  { name: "+5% krytyk",          apply: function() { player.equipment.weapon.critChance += 5; } },
  { name: "Regeneracja +10 HP/s",apply: function() { player.equipment.accessory.regen += 10; } },
  { name: "+5% kontratak",       apply: function() { player.equipment.ringDefense.counterChance += 5; } },
];

function getRandomEnemy() {
  const floorIndex = Math.min(player.floor - 1, floorData.length - 1);
  const floor = floorData[floorIndex];
  const roll = Math.floor(Math.random() * 100) + 1;
  let cumulative = 0;
  for (const entry of floor.enemies) {
    cumulative += entry.w;
    if (roll <= cumulative) {
      return enemies.find(e => e.name === entry.e);
    }
  }
  return enemies[0];
}

function getBoss() {
  const floorIndex = Math.min(player.floor - 1, floorData.length - 1);
  const bossName = floorData[floorIndex].boss;
  return bosses.find(b => b.name === bossName);
}

let enemy = {};
let enemyInterval = null;
let playerInterval = null;
let combatActive = false;

function startCombat() {
  scene.innerHTML =
    "<h1>Przeciwnik: " +
    enemy.name +
    "</h1>" +
    "<img src='" +
    enemy.image +
    "' style='width:450px;height:450px;object-fit:contain;'>" +
    "<div class='hp-bar-container'><span>" +
    enemy.name +
    "</span><div class='hp-bar'><div class='hp-fill' style='width:" +
    (enemy.hp / enemy.maxHp) * 100 +
    "%; background-color:" +
    getHpColor(enemy.hp, enemy.maxHp) +
    "'></div></div><span>" +
    formatNum(enemy.hp) +
    "/" +
    formatNum(enemy.maxHp) +
    "</span></div>" +
    "<div class='hp-bar-container'><span>Gracz</span><div class='hp-bar'><div class='hp-fill' style='width:" +
    (player.hp / player.maxHp) * 100 +
    "%; background-color:" +
    getHpColor(player.hp, player.maxHp) +
    "'></div></div><span>" +
    formatNum(player.hp) +
    "/" +
    formatNum(player.maxHp) +
    "</span></div>";

  const btnEscape = document.getElementById("btn-explore");
  if (btnEscape) {
    btnEscape.onclick = function () {
      combatActive = false;
      clearInterval(enemyInterval);
      clearInterval(playerInterval);
      loadScene("explore");
      setupButtons();
    };
  }
}

function enemyAttack() {
  if (!combatActive) return;
  const counterChance = player.equipment.ringDefense
    ? player.equipment.ringDefense.counterChance
    : 0;
  const dodgeChance = player.equipment.armor
    ? player.equipment.armor.dodgeChance
    : 0;
  const counterLos = Math.floor(Math.random() * 100) + 1;
  const dodgeLos = Math.floor(Math.random() * 100) + 1;

  if (counterLos <= counterChance) {
    enemy.hp -= enemy.attack;
    notify("Oddałeś " + formatNum(enemy.attack) + " obrażeń!");
  } else if (dodgeLos <= dodgeChance) {
    player.hp -= enemy.attack * 0.5;
    notify("Uniknąłeś połowy obrażeń!");
  } else {
    player.hp -= enemy.attack;
  }

  checkCombatEnd();
  if (combatActive) startCombat();
}

function playerAttack() {
  if (!combatActive) return;
  const critChance = player.equipment.weapon
    ? player.equipment.weapon.critChance
    : 0;
  const doubleChance = player.equipment.ringAttack
    ? player.equipment.ringAttack.doubleAttackChance
    : 0;
  const regen = player.equipment.accessory
    ? player.equipment.accessory.regen
    : 0;
  const critLos = Math.floor(Math.random() * 100) + 1;
  const doubleLos = Math.floor(Math.random() * 100) + 1;

  if (critLos <= critChance) {
    enemy.hp -= player.attack * 2.5;
    notify("Krytyczne trafienie! -" + formatNum(Math.floor(player.attack * 2.5)) + " HP");
    showSlash();
    player.hp += regen;
    if (player.hp > player.maxHp) player.hp = player.maxHp;
  } else if (doubleLos <= doubleChance) {
    enemy.hp -= player.attack * 2;
    notify("Podwójny cios!");
    showSlash();
    player.hp += regen;
    if (player.hp > player.maxHp) player.hp = player.maxHp;
  } else {
    enemy.hp -= player.attack + player.skills.attackBonus;
    showSlash();
    player.hp += regen;
    if (player.hp > player.maxHp) player.hp = player.maxHp;
  }

  checkCombatEnd();
  if (combatActive) startCombat();
}

function checkCombatEnd() {
  if (!combatActive) return;
  if (player.hp <= 0) {
    combatActive = false;
    clearInterval(enemyInterval);
    clearInterval(playerInterval);
    if (player.hp < 0) player.hp = 0;
    notify("Zginąłeś!");
    player.floorCount = 1;
    player.hp = player.maxHp;
    player.gold = Math.floor(player.gold * 0.7);
    loadScene("explore");
    setupButtons();
    renderInventory();
    return;
  }
  if (enemy.hp <= 0) {
    combatActive = false;
    clearInterval(enemyInterval);
    clearInterval(playerInterval);
    const wasBoss = enemy.isBoss;
    dropLoot();
    if (!wasBoss) {
      player.floorCount++;
    }
    if (wasBoss) {
      player.floorCount = 1;
      showBossReward();
    } else {
      initCombat();
      setupButtons();
    }
    return;
  }
}

function initCombat() {
  combatActive = false;
  clearInterval(enemyInterval);
  clearInterval(playerInterval);

  if (player.floorCount === 8) {
    const bossTemplate = getBoss();
    enemy = { ...bossTemplate };
    notify("Boss: " + enemy.name + " pojawił się!");
  } else {
    const randomEnemy = getRandomEnemy();
    enemy = { ...randomEnemy };
  }

  combatActive = true;
  startCombat();

  enemyInterval = setInterval(function () {
    enemyAttack();
  }, enemy.timeAttack);

  const helmetTime = player.equipment.helmet
    ? player.equipment.helmet.timeAttack
    : 1000;
  playerInterval = setInterval(function () {
    playerAttack();
  }, helmetTime);
}

function dropLoot() {
  const goldLoot =
    Math.floor(Math.random() * (enemy.goldMax - enemy.goldMin + 1)) +
    enemy.goldMin;
  player.gold += goldLoot;
  notify("Zdobyłeś: " + formatNum(goldLoot) + " 💰!");

  if (enemy.isBoss) {
    const soulLoot = player.meta ? player.meta.soulMultiplier : 1;
    player.souls += soulLoot;
    notify("Zdobyłeś " + soulLoot + " 💀!");
  }

  const expLoot = Math.floor(Math.random() * 50) + 1;
  player.exp += expLoot;
  notify("Zdobyłeś " + formatNum(expLoot) + " XP!");
  checkLevelUp();
}

function showBossReward() {
  const indices = [];
  while (indices.length < 3) {
    const r = Math.floor(Math.random() * tempBonuses.length);
    if (!indices.includes(r)) indices.push(r);
  }

  const b0 = tempBonuses[indices[0]];
  const b1 = tempBonuses[indices[1]];
  const b2 = tempBonuses[indices[2]];

  scene.innerHTML =
    "<h1>Wybierz nagrodę</h1>" +
    "<button id='bonus-0'>" +
    b0.name +
    "</button>" +
    "<button id='bonus-1'>" +
    b1.name +
    "</button>" +
    "<button id='bonus-2'>" +
    b2.name +
    "</button>" +
    "<button id='btn-explore'>Uciekaj</button>";

  document.getElementById("bonus-0").onclick = function () {
    b0.apply();
    player.runBonuses.push(b0.name);
    notify("Wybrano: " + b0.name);
    player.floorCount = 1;
    player.floor++;
    initCombat();
  };
  document.getElementById("bonus-1").onclick = function () {
    b1.apply();
    player.runBonuses.push(b1.name);
    notify("Wybrano: " + b1.name);
    player.floorCount = 1;
    player.floor++;
    initCombat();
  };
  document.getElementById("bonus-2").onclick = function () {
    b2.apply();
    player.runBonuses.push(b2.name);
    notify("Wybrano: " + b2.name);
    player.floorCount = 1;
    player.floor++;
    initCombat();
  };
  document.getElementById("btn-explore").onclick = function () {
    loadScene("explore");
    setupButtons();
  };
}

function getHpColor(hp, maxHp) {
  const percent = (hp / maxHp) * 100;
  if (percent > 50) return "#2d8a2d";
  if (percent > 25) return "#cc7700";
  return "#8b0000";
}

function showSlash() {
  const img = document.querySelector("img");
  if (!img) return;
  const rect = img.getBoundingClientRect();
  const slash = document.createElement("div");
  slash.classList.add("slash");
  slash.style.position = "fixed";
  slash.style.left = rect.left + Math.random() * rect.width + "px";
  slash.style.top = rect.top + Math.random() * rect.height + "px";
  document.body.appendChild(slash);
  setTimeout(function () {
    slash.remove();
  }, 300);
}
