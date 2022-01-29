import React from "react";
import { NodeC, NodeM } from ".";

export function generateDString(nodeDataArray: Array<NodeC | NodeM>): string {
  let dString = "";
  for (let nodeData of nodeDataArray) {
    dString += nodeData.type;
    for (let [key, value] of Object.entries(nodeData)) {
      for (let nodeProperty of ["x1", "y1", "x2", "y2", "x", "y"]) {
        if (nodeProperty == key) dString += value.toString() + " ";
      }
    }
  }
  return dString;
}

export function getSVGCoordinates(
  event: React.MouseEvent,
  current: SVGSVGElement
): { x: number; y: number } {
  let ctm = current.getScreenCTM() as DOMMatrix;
  return {
    x: (event.clientX - ctm.e) / ctm.a,
    y: (event.clientY - ctm.f) / ctm.d,
  };
}
