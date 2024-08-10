const WIDTH = 125;
const HEIGHT = 125;

setDocDimensions(WIDTH, HEIGHT);

const finalLines = [];
const rr = bt.randInRange;
const rir = bt.randIntInRange;
// change for more/less spots on mushroom
const MUSHROOM_SPOTS = 4;

function draw_poly(sides, sideLen = 1) {
  let pen = new bt.Turtle();
  let totalAng = (sides - 2) * 180;
  let angle = totalAng / sides;
  for (let i = 0; i < sides; ++i) {
    pen.forward(sideLen).right(180 - angle);
  }
  return pen.lines();
}

function centerPolylines(polylines, documentWidth, documentHeight) {
  const cc = bt.bounds(polylines).cc;
  bt.translate(polylines, [documentWidth / 2, documentHeight / 2], cc);
}

let groundLeft = [56, 12];
let groundRight = [78, 13];
let capLeft = [56, 47];
let capRight = [75, 45];

let mushStem = [bt.catmullRom([
  groundLeft,
  [57, 19],
  [58, 39],
  capLeft,
  [54, 54],
  [76, 52],
  [80, 49],
  capRight,
  [75, 21],
  groundRight,
  groundLeft
])];

let capFarLeft = [19, 56];
let capFarRight = [116, 48];

let mushCap = [bt.catmullRom([
  capLeft,
  capFarLeft,
  [25, 82],
  [43, 96],
  [72, 101],
  [107, 83],
  capFarRight,
  capRight,
  capLeft,
])];

bt.cover(mushCap, mushStem);

let mushGillRing = [bt.catmullRom([
  capFarLeft,
  [57, 61],
  [92, 57],
  capFarRight,
  [105, 39],
  [65, 38],
  [20, 46],
  capFarLeft,
])];

// change to 2 on final render
// too resource intensive rn
bt.resample(mushGillRing, 2);

let gillRing = [];
let gillCenter = [64, 50];
for (let i = 0; i < mushGillRing[0].length; ++i) {
  let [x, y] = mushGillRing[0][i];
  gillRing.push(bt.catmullRom([
    gillCenter,
    [(x + gillCenter[0]) / 2 + rr(-0.3, 0.3), (y + gillCenter[1]) / 2 + rr(-0.3, 0.3)],
    [x, y],
  ]));
}

bt.cut(mushGillRing, mushCap);
bt.cut(gillRing, mushCap);
bt.cover(gillRing, mushStem);

let mushCapPatterns = [];
for (let i = 0; i < MUSHROOM_SPOTS; ++i) {
  let x = rr(11, 111);
  let y = rr(60, 111);
  let newSpot = [
    [x, y]
  ];
  for (let i = 0; i < rir(4, 8); ++i) {
    x += rr(-5, 5);
    y += rr(-5, 5);
    newSpot.push([x, y]);
  }
  let spot = [bt.catmullRom(newSpot)];
  //let spot = [bt.catmullRom(draw_poly(3, 100))];
  //finalLines.push(...spot);
}










finalLines.push(...mushStem, ...mushCap, ...mushGillRing, ...gillRing);
centerPolylines(finalLines, WIDTH, HEIGHT);
//bt.rotate(finalLines, 45);

drawLines(finalLines);
