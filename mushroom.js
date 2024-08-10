const WIDTH = 125;
const HEIGHT = 125;

setDocDimensions(WIDTH, HEIGHT);

const finalLines = [];

function draw_poly(sides, sideLen = 1) {
  let pen = new bt.Turtle();
  let totalAng = (sides - 2) * 180;
  let angle = totalAng / sides;
  for (let i = 0; i < sides; ++i) {
    pen.forward(sideLen).right(180 - angle);
  }
  return pen.lines();
}

let groundLeft = [56, 12];
let groundRight = [78, 13];
let capLeft = [56, 51];
let capRight = [75, 45];

let mushBody = [bt.catmullRom([
  groundLeft,
  [57, 19],
  [58, 39],
  capLeft,
  [54, 54],
  [76, 52],
  [80, 49],
  capRight,
  [75, 21],
  groundRight
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
])];

let mushGillRing = [bt.catmullRom([
  capFarLeft,
  [57, 61],
  [92, 57],
  capFarRight,
])];

finalLines.push(...mushBody, ...mushCap, ...mushGillRing);
//bt.rotate(finalLines, 45);

drawLines(finalLines);
