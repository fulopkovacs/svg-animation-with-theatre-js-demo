import "./App.css";
import React, { useState } from "react";
import { initialState } from "./data";
import Path from "./Path";
import PathControlNodes from "./PathControlNodes";
import SvgImage from "./SvgImage";
import { getSVGCoordinates } from "./utils";

function App() {
  const [selectedNode, setSelectedNode] = useState<{
    name: string;
    id: number;
    controlType: "" | "1" | "2";
  } | null>(null);

  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [leftArmD, setLeftArmD] = useState(initialState.leftArm);
  const svgRef = React.createRef<SVGSVGElement>();

  function handleMouseDown(
    event: React.MouseEvent,
    name: string,
    nodeId: number,
    controlType: "" | "1" | "2",
    nodeCoord: { x: number; y: number }
  ) {
    const clickCoordinates = getSVGCoordinates(
      event,
      svgRef.current as SVGSVGElement
    );
    setSelectedNode({ name: name, id: nodeId, controlType });
    setOffset({
      x: nodeCoord.x - clickCoordinates.x,
      y: nodeCoord.y - clickCoordinates.y,
    });
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (selectedNode) {
      const { x, y } = getSVGCoordinates(
        event,
        svgRef.current as SVGSVGElement
      );

      if (selectedNode.name === "left-arm") {
        let updatedD = [...leftArmD];
        //TODO: Handle these false positive warnings
        // @ts-ignore
        updatedD[selectedNode.id]["x" + selectedNode.controlType] =
          x + offset.x;
        //TODO: Handle these false positive warnings
        // @ts-ignore
        updatedD[selectedNode.id]["y" + selectedNode.controlType] =
          y + offset.y;
        setLeftArmD(updatedD);
      }
    }
  }

  function handleMouseUp(event: React.MouseEvent) {
    setSelectedNode(null);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div className="App">
      <SvgImage
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
        ref={svgRef}
        armLeft={{
          path: <Path nodes={leftArmD} />,
          control: (
            <PathControlNodes
              nodes={leftArmD}
              handleMouseDown={handleMouseDown}
              name="left-arm"
            />
          ),
        }}
      />
    </div>
  );
}

export default App;
