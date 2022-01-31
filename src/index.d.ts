import { ISheetObject } from "@theatre/core";
import { MouseEvent, ReactNode } from "react";

interface NodeBase {
  x: number;
  y: number;
  id: number;
}

interface NodeC extends NodeBase {
  // type: "C" | "C";
  type: `C`;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface NodeM extends NodeBase {
  // type: "C" | "C";
  type: `M`;
}

interface TransformData {
  rotation: number;
  translate: { x: number; y: number };
  transformOrigin: {
    x: "left" | "center" | "right";
    y: "top" | "center" | "bottom";
  };
}

interface Shadow extends {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

interface SvgImageProps {
  viewBox: number[];
  armLeft: { path: ReactNode; control: ReactNode };
  armRight: { path: ReactNode; control: ReactNode };
  eyeLeft: { path: ReactNode; control: ReactNode };
  eyeRight: { path: ReactNode; control: ReactNode };
  neck: { path: ReactNode; control: ReactNode };
  head: TransformData;
  botCharacter: TransformData;
  body: TransformData;
  shadow: Shadow;
  handleMouseUp: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
}
