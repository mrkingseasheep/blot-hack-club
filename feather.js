// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;
const t = new bt.Turtle();

setDocDimensions(width, height);

const draw_polygon = (sides, sideLen = 1) => {
  let pen = new bt.Turtle();
  let totalAngles = (sides - 2) * 180;
  let angle = totalAngles / sides;

  for (let i = 0; i < sides; ++i) pen.forward(sideLen).right(180 - angle);
  return pen.lines();
}

// store final lines here
const finalLines = [];

const spine = draw_polygon(3);
bt.scale(spine, [2, 150]);
bt.resample(spine, 1);

const vanes = draw_polygon(20);
//bt.resample(vanes, 4);
bt.scale(vanes, [5, 18]);
bt.translate(vanes, [0, bt.bounds(spine).cb[1] - bt.bounds(vanes).cb[1]]);

const barbs = [];
for (let i = 0; i < spine[0].length; ++i) {
  let [x, y] = spine[0][i];
  let parity = i > spine[0].length / 2 ? -1 : 1

  barbs.push(bt.catmullRom(
    [
      [x, y],
      [x + parity * 20, y - 2],
      [x + parity * 40, y]
    ]));
}
bt.translate(vanes, [0, bt.bounds(spine).cb[1] - bt.bounds(vanes).cb[1]]);
bt.cut(barbs, vanes);

//bt.iteratePoints(rect, ([x, y]) => [x - 0.002 * (width / 2 - y) ** 2, y]);

const feather = [...spine, ...barbs];
bt.resample(feather, 4);
bt.iteratePoints(feather, ([x, y]) => [x - 0.001 * (width / 2 - y) ** 2, y]);
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc);
bt.rotate(feather, 128);

finalLines.push(...feather);

drawLines(finalLines);
