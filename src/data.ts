import { NodeC, NodeM } from ".";

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

export const initialState = {
  leftArm,
  rightArm,
};
