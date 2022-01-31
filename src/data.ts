import { NodeC, NodeM, Shadow, TransformData } from ".";

const leftArm: Array<NodeC | NodeM> = [
  {
    type: "M",
    x: 93,
    y: 352.531,
    id: 0,
  },
  {
    type: "C",
    x1: 26.337,
    y1: 361.408,
    x2: -4.508,
    y2: 336.327,
    x: 11.835,
    y: 272.094,
    id: 1,
  },
];

const rightArm: Array<NodeC | NodeM> = [
  {
    type: "M",
    x: 332.453,
    y: 345.899,
    id: 0,
  },
  {
    type: "C",
    x1: 381.734,
    y1: 360.687,
    x2: 398.544,
    y2: 394.364,
    x: 385.639,
    y: 445.326,
    id: 1,
  },
];

const neck: Array<NodeC | NodeM> = [
  {
    type: "M",
    x: 212.85,
    y: 258.245,
    id: 0,
  },
  {
    type: "C",
    x1: 212.85,
    y1: 258.245,
    x2: 217.966,
    y2: 277.733,
    x: 209.928,
    y: 302.51,
    id: 1,
  },
];

const leftEye: Array<NodeC | NodeM> = [
  {
    type: "M",
    x: 132.018,
    y: 141.438,
    id: 0,
  },
  {
    type: "C",
    x1: 132.018,
    y1: 141.438,
    x2: 146.032,
    y2: 134.41,
    x: 152.95,
    y: 119.133,
    id: 1,
  },
  {
    type: "C",
    x1: 157.057,
    y1: 133.887,
    x2: 169.818,
    y2: 149.837,
    x: 169.818,
    y: 149.837,
    id: 2,
  },
];
const rightEye: Array<NodeC | NodeM> = [
  {
    type: "M",
    x: 241.181,
    y: 169.469,
    id: 0,
  },
  {
    type: "C",
    x1: 241.181,
    y1: 169.469,
    x2: 261.205,
    y2: 160.528,
    x: 265.411,
    y: 143.751,
    id: 1,
  },
  {
    type: "C",
    x1: 268.14,
    y1: 159.491,
    x2: 287.894,
    y2: 180.172,
    x: 287.894,
    y: 180.172,
    id: 2,
  },
];

const showControls = {
  leftArm: true,
  rightArm: true,
  neck: true,
  leftEye: true,
  rightEye: true,
};

const transformData: TransformData = {
  rotation: 0,
  translate: { x: 0, y: 0 },
  transformOrigin: { x: "center", y: "center" },
};

const viewBox = [0, 0, 400, 900];

const shadow: Shadow = {
  cx: 210,
  cy: 620,
  rx: 100,
  ry: 50,
};

export const initialState = {
  leftArm,
  rightArm,
  neck,
  leftEye,
  rightEye,
  transformData,
  shadow,
  showControls,
  viewBox,
};
