import "./App.css";
import React, { useEffect, useState } from "react";
import { initialState } from "./data";
import Path from "./Path";
import PathControlNodes from "./PathControlNodes";
import SvgImage from "./SvgImage";
import {
  convertNodesArrayToObj,
  convertNodesObjToArray,
  getSVGCoordinates,
} from "./utils";
import { getProject, ISheetObject } from "@theatre/core";
import studio from "@theatre/studio";
import { NodeC, NodeM /* PathDataObject */ } from ".";

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

  const [leftArmObject, setLeftArmObject] =
    useState<ISheetObject<{ [index: string]: number | string }>>();

  const [leftArmD, setLeftArmD] = useState(initialState.leftArm);
  const svgRef = React.createRef<SVGSVGElement>();

  useEffect(() => {
    studio.initialize();
    const proj = getProject("Bot animation");
    const botSheet = proj.sheet("Bot");
    const leftArmNodesObject = convertNodesArrayToObj(initialState.leftArm);
    const initialLeftArmObject = botSheet.object(
      "left arm",
      leftArmNodesObject
    );

    initialLeftArmObject.onValuesChange((nodesObj) => {
      const nodesArray = convertNodesObjToArray(nodesObj);
      setLeftArmD(nodesArray);
    });

    setLeftArmObject(initialLeftArmObject);
  }, []);

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

      if (selectedNode.name === "left-arm" && leftArmObject) {
        /* let updatedD = [...leftArmD];
        //TODO: Handle these false positive warnings
        // @ts-ignore
        updatedD[selectedNode.id]["x" + selectedNode.controlType] =
          x + offset.x;
        //TODO: Handle these false positive warnings
        // @ts-ignore
        updatedD[selectedNode.id]["y" + selectedNode.controlType] =
          y + offset.y;
        // setLeftArmD(updatedD);
        ); */
        /* const updatedDObj: {
          [index: string]: { [index: string]: number };
        } = {}; */
        const objId = `node_${selectedNode.id}`;
        const updatedValues = {
          ["x" + selectedNode.controlType]: x + offset.x,
          ["y" + selectedNode.controlType]: y + offset.y,
        };

        const difference = {
          x:
            leftArmD[selectedNode.id]["x" + selectedNode.controlType] -
            updatedValues["x" + selectedNode.controlType],
          y:
            leftArmD[selectedNode.id]["y" + selectedNode.controlType] -
            updatedValues["y" + selectedNode.controlType],
        };

        let secondaryNodeId;
        let secondaryControlType;
        let updatedSecondaryNodeValues;

        if (selectedNode.controlType === "") {
          // Move the control node with the node on the path.

          if (leftArmD[selectedNode.id]["type"] === "M") {
            secondaryNodeId = [selectedNode.id + 1];
            secondaryControlType = "1";
          }
          if (leftArmD[selectedNode.id]["type"] === "C") {
            secondaryNodeId = [selectedNode.id];
            secondaryControlType = "2";
          }

          updatedSecondaryNodeValues = {
            ["x" + secondaryControlType]:
              leftArmD[secondaryNodeId]["x" + secondaryControlType] -
              difference.x,
            ["y" + secondaryControlType]:
              leftArmD[secondaryNodeId]["y" + secondaryControlType] -
              difference.y,
          };
        }
        studio.transaction(({ set }) => {
          // const updatedDObj = convertNodesArrayToObj(updatedD);
          set(leftArmObject.props[objId], updatedValues);
          if (updatedSecondaryNodeValues) {
            set(
              leftArmObject.props[`node_${secondaryNodeId}`],
              updatedSecondaryNodeValues
            );
          }
          /* for (let [key, value] of updatedDObj) {
            set();
          } */
        });
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
