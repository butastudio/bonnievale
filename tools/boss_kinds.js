// Loại boss trên thẻ Cẩm Nang, theo balance/SO_BOSS.md cột Loại (NV13, kiểm 15-10 trên cây online 8e751c51b).
// Không đoán: thẻ không có trong bảng (dog-drowned-miner, dog-arch-gargoyle, dog-old-auger) không có nhãn, chờ NV13 xếp loại.
// Trial Dummy Elite là bù nhìn sân tập, không phải boss: ẩn khỏi Cẩm Nang.
// Chạy riêng được: node tools/boss_kinds.js cam-nang.html (idempotent)
const KIND = {
  "b-enemy-boss-old-tusk": "T",
  "b-enemy-boss-gloomcoil": "T",
  "b-enemy-boss-mistmother": "T",
  "b-enemy-boss-rustbone-warden": "T",
  "b-enemy-boss-hollow-herald": "T",
  "b-enemy-raider-captain": "T",
  "b-enemy-dog-boss-twisthorn": "T",
  "b-enemy-dog-boss-thornback": "T",
  "b-enemy-dog-boss-slag-king": "T",
  "b-enemy-dog-boss-copper-golem": "T",
  "b-enemy-dog-boss-lakebed-ancient": "T",
  "b-enemy-dog-boss-aqueduct-warden": "T",
  "b-enemy-dog-boss-violet-mark": "T",
  "b-enemy-dog-boss-frost-warden": "T",
  "b-enemy-dog-boss-blizzard-alpha": "T",
  "b-enemy-hw-old-gnawroot": "H",
  "b-enemy-hw-mossmantle": "H",
  "b-enemy-hw-queen-puffcap": "H",
  "b-enemy-hw-boss-nutcracker": "H",
  "b-enemy-hw-verdant-blade": "H",
  "b-enemy-hw-stormwing": "H",
  "b-enemy-hw-moth-matron": "H",
  "b-enemy-hw-old-resin": "H",
  "b-enemy-hw-thunderhead-owl": "D",
  "b-enemy-dog-boss-chain-warden": "H",
  "b-enemy-dog-boss-last-miner-shade": "H",
  "b-enemy-dog-boss-prism-queen": "H",
  "b-enemy-dog-boss-falls-keeper": "H",
  "b-enemy-dog-boss-great-pump": "H",
  "b-enemy-dog-boss-drowned-bishop": "H",
  "b-enemy-dog-boss-thirsting-root": "D",
  "b-enemy-hunt-old-tusk": "S",
  "b-enemy-hunt-rustbone-warden": "S",
  "b-enemy-hunt-mistmother": "S",
  "b-enemy-hunt-raider-captain": "S",
  "b-enemy-hunt-hollow-herald": "S",
  "b-enemy-hunt-dog-stormhorn": "S",
  "b-enemy-hunt-dog-pinestorm": "S",
  "b-enemy-hunt-dog-verdigris-colossus": "S",
  "b-enemy-hunt-dog-molten-slag-king": "S",
  "b-enemy-hunt-dog-avalanche-alpha": "S",
  "b-enemy-hunt-crackmarch-colossus": "S",
  "b-enemy-boss-bone-sovereign": "G",
  "b-enemy-boss-thornmaw-queen": "G",
  "b-enemy-boss-drill-queen": "G",
  "b-enemy-boss-storm-matriarch": "G",
  "b-enemy-grave-watcher": "M",
  "b-enemy-grubmother": "M",
  "b-enemy-dog-eyrie-sentinel": "M",
  "b-enemy-dog-great-drill-mole": "M",
};
const LABEL = { T: "Boss truyện", H: "Hộ Vệ", D: "Dạ Tướng", S: "Boss săn", G: "Boss hang", M: "Mini-boss" };
const HIDE = ["b-enemy-trial-dummy-elite"];
function fix(h) {
  const n = { label: 0, hide: 0 };
  for (const id of HIDE) {
    const i = h.indexOf(`id="${id}"`);
    if (i < 0) continue;
    const s = h.lastIndexOf("<article", i), e = h.indexOf("</article>", i) + "</article>".length;
    h = h.slice(0, s) + h.slice(e); n.hide++;
  }
  for (const [id, k] of Object.entries(KIND)) {
    const i = h.indexOf(`id="${id}"`);
    if (i < 0) continue;
    const j = h.indexOf("<h4>", i), e = h.indexOf("</h4>", j);
    if (j < 0 || e < 0 || h.slice(j, e).includes("b-kind")) continue;
    h = h.slice(0, e) + ` <span class="badge b-kind">${LABEL[k]}</span>` + h.slice(e); n.label++;
  }
  if (!h.includes(".b-kind {")) h = h.replace(".b-story {", ".b-kind { background: #5b6b3a; margin-left: 6px; }\n.b-story {");
  console.log(`boss kinds: ${n.label} labels, ${n.hide} hidden`);
  return h;
}
module.exports = { fix, KIND };
if (require.main === module) {
  const fs = require("fs"), f = process.argv[2];
  fs.writeFileSync(f, fix(fs.readFileSync(f, "utf8")));
}
