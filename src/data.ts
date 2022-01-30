import { NodeC, NodeM, TransformData } from ".";

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

const showControls = {
  leftArm: true,
  rightArm: true,
  neck: true,
};

const transformData: TransformData = {
  rotation: 0,
  translate: { x: 0, y: 0 },
  transformOrigin: { x: "center", y: "center" },
};

export const initialState = {
  leftArm,
  rightArm,
  neck,
  transformData,
  showControls,
};
