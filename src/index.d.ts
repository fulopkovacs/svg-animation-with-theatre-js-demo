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

interface SvgImageProps {
  armLeft: { path: ReactNode; control: ReactNode };
  handleMouseUp: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
}
