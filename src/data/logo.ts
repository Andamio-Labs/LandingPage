export type Point = [number, number];
export type Tone = "teal" | "navy";

export interface LogoBox {
  id: "top" | "left" | "right" | "frame" | "core";
  tone: Tone;
  top: Point;
  left: Point;
  right: Point;
  height: number;
  solid?: boolean;
  belt?: number;
  frameOnly?: boolean;
}

export interface LogoGlyph {
  box: LogoBox["id"];
  text: string;
  at: Point;
  face: "top" | "left" | "right";
  tone: Tone;
  size: number;
}

export const brandColors = {
  teal: "#166462",
  navy: "#28313b",
};

export const logoStroke = 16;

export const logoBoxes: LogoBox[] = [
  { id: "top", tone: "teal", top: [512, 188], left: [-127, 72], right: [128, 72], height: 180 },
  { id: "left", tone: "teal", top: [435, 345], left: [-173, 100], right: [125, 73], height: 150 },
  { id: "right", tone: "navy", top: [588, 345], left: [-125, 73], right: [177, 100], height: 150 },
  { id: "frame", tone: "teal", top: [512, 336], left: [-102, 58], right: [103, 58], height: 58, frameOnly: true },
  { id: "core", tone: "navy", top: [513, 396], left: [-62, 35], right: [64, 36], height: 130, solid: true, belt: 68 },
];

export const logoGlyphs: LogoGlyph[] = [
  { box: "core", text: "</>", at: [513, 431], face: "top", tone: "navy", size: 24 },
  { box: "core", text: "{ }", at: [482, 470], face: "left", tone: "teal", size: 28 },
  { box: "core", text: "</>", at: [546, 470], face: "right", tone: "navy", size: 24 },
  { box: "core", text: "{1", at: [482, 536], face: "left", tone: "navy", size: 28 },
  { box: "core", text: "1{}", at: [546, 536], face: "right", tone: "navy", size: 26 },
  { box: "frame", text: "{", at: [432, 432], face: "left", tone: "teal", size: 30 },
  { box: "frame", text: "0", at: [456, 393], face: "left", tone: "teal", size: 26 },
  { box: "frame", text: "1", at: [566, 393], face: "right", tone: "navy", size: 26 },
  { box: "frame", text: "0", at: [591, 416], face: "right", tone: "navy", size: 26 },
  { box: "frame", text: "1", at: [591, 446], face: "right", tone: "navy", size: 26 },
];

export const faceMatrix: Record<LogoGlyph["face"], string> = {
  top: "0.87 0.5 -0.87 0.5",
  left: "0.87 0.5 0 1",
  right: "0.87 -0.5 0 1",
};

const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
const down = (p: Point, h: number): Point => [p[0], p[1] + h];
const toPoints = (points: Point[]) => points.map((p) => `${p[0]},${p[1]}`).join(" ");

export function boxGeometry(box: LogoBox) {
  const top = box.top;
  const left = add(top, box.left);
  const right = add(top, box.right);
  const front = add(left, box.right);
  const silhouette = [top, right, down(right, box.height), down(front, box.height), down(left, box.height), left];
  const xs = silhouette.map((p) => p[0]);
  const ys = silhouette.map((p) => p[1]);
  const pad = logoStroke;
  return {
    silhouette: toPoints(silhouette),
    inner: toPoints([left, front, right]),
    spine: toPoints([front, down(front, box.height)]),
    belt: box.belt ? toPoints([down(left, box.belt), down(front, box.belt), down(right, box.belt)]) : null,
    frameLeft: toPoints([down(left, box.height), left, add(left, [30, -17])]),
    frameRight: toPoints([down(right, box.height), right, add(right, [-30, -17])]),
    bounds: {
      x: Math.min(...xs) - pad,
      y: Math.min(...ys) - pad,
      width: Math.max(...xs) - Math.min(...xs) + pad * 2,
      height: Math.max(...ys) - Math.min(...ys) + pad * 2,
    },
  };
}

export const markBounds = { x: 252, y: 178, width: 521, height: 500 };
export const markCenter: Point = [markBounds.x + markBounds.width / 2, markBounds.y + markBounds.height / 2];
