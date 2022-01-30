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
import { getProject, ISheetObject, types as t } from "@theatre/core";
import studio from "@theatre/studio";
import { NodeC, NodeM } from ".";

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

  const [rightArmObject, setRightArmObject] =
    useState<ISheetObject<{ [index: string]: number | string }>>();

  const [neckObject, setNeckObject] =
    useState<ISheetObject<{ [index: string]: number | string }>>();

  const [leftArmD, setLeftArmD] = useState(initialState.leftArm);
  const [rightArmD, setRightArmD] = useState(initialState.rightArm);
  const [neckD, setNeckD] = useState(initialState.neck);

  const [headTransformData, setHeadTransformData] = useState(
    initialState.transformData
  );

  const [botTransformData, setBotTransformData] = useState(
    initialState.transformData
  );

  const [bodyTransformData, setBodyTransformData] = useState(
    initialState.transformData
  );

  const svgRef = React.createRef<SVGSVGElement>();

  useEffect(() => {
    studio.initialize();
    const proj = getProject("Bot animation");
    const botSheet = proj.sheet("Bot");

    // Paths
    for (let { name, data, setFn, setObjFn } of [
      {
        name: "left arm",
        data: initialState.leftArm,
        setFn: setLeftArmD,
        setObjFn: setLeftArmObject,
      },
      {
        name: "right arm",
        data: initialState.rightArm,
        setFn: setRightArmD,
        setObjFn: setRightArmObject,
      },
      {
        name: "neck",
        data: initialState.neck,
        setFn: setNeckD,
        setObjFn: setNeckObject,
      },
    ]) {
      const nodesObj = convertNodesArrayToObj(data);
      const initialObj = botSheet.object(name, nodesObj);
      initialObj.onValuesChange((nodesObjData) => {
        const newOpacity = nodesObjData.controls;
        delete nodesObjData.controls;
        const nodesArray = convertNodesObjToArray(nodesObjData);
        console.log(newOpacity);
        setFn(nodesArray);
      });

      setObjFn(initialObj);
    }

    // Transforms
    for (let { data, name, setFn } of [
      { name: "head", data: headTransformData, setFn: setHeadTransformData },
      {
        name: "bot character",
        data: botTransformData,
        setFn: setBotTransformData,
      },
      {
        name: "body",
        data: bodyTransformData,
        setFn: setBodyTransformData,
      },
    ]) {
      const transformOriginOpts = {
        x: t.stringLiteral(data.transformOrigin.x, {
          left: "left",
          center: "center",
          right: "right",
        }),
        y: t.stringLiteral(data.transformOrigin.y, {
          top: "top",
          center: "center",
          bottom: "bottom",
        }),
      };
      const transformObj = botSheet.object(
        name,
        Object.assign(data, { transformOrigin: transformOriginOpts })
      );
      transformObj.onValuesChange((newValues) => {
        setFn(newValues);
      });
    }
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

      let pathAttributeD: Array<NodeC | NodeM> | null = null;
      let selectedObject: ISheetObject | null = null;

      if (selectedNode.name === "left-arm" && leftArmObject) {
        pathAttributeD = leftArmD;
        selectedObject = leftArmObject;
      }

      if (selectedNode.name === "right-arm" && rightArmObject) {
        pathAttributeD = rightArmD;
        selectedObject = rightArmObject;
      }

      if (selectedNode.name === "neck" && neckObject) {
        pathAttributeD = neckD;
        selectedObject = neckObject;
      }

      if (pathAttributeD) {
        const objId = `node_${selectedNode.id}`;
        const updatedValues = {
          ["x" + selectedNode.controlType]: x + offset.x,
          ["y" + selectedNode.controlType]: y + offset.y,
        };

        const difference = {
          x:
            pathAttributeD[selectedNode.id]["x" + selectedNode.controlType] -
            updatedValues["x" + selectedNode.controlType],
          y:
            pathAttributeD[selectedNode.id]["y" + selectedNode.controlType] -
            updatedValues["y" + selectedNode.controlType],
        };

        let secondaryNodeId: number | null = null;
        let secondaryControlType: string | null = null;
        let updatedSecondaryNodeValues: { [index: string]: number };

        if (selectedNode.controlType === "") {
          // Move the control node with the node on the path.

          if (pathAttributeD[selectedNode.id]["type"] === "M") {
            secondaryNodeId = selectedNode.id + 1;
            secondaryControlType = "1";
          }
          if (pathAttributeD[selectedNode.id]["type"] === "C") {
            secondaryNodeId = selectedNode.id;
            secondaryControlType = "2";
          }

          if (secondaryNodeId && secondaryControlType) {
            updatedSecondaryNodeValues = {
              ["x" + secondaryControlType]:
                pathAttributeD[secondaryNodeId]["x" + secondaryControlType] -
                difference.x,
              ["y" + secondaryControlType]:
                pathAttributeD[secondaryNodeId]["y" + secondaryControlType] -
                difference.y,
            };
          }
        }
        studio.transaction(({ set }) => {
          // const updatedDObj = convertNodesArrayToObj(updatedD);
          if (selectedObject) {
            set(selectedObject.props[objId], updatedValues);
            if (
              updatedSecondaryNodeValues &&
              secondaryNodeId &&
              secondaryControlType
            ) {
              set(
                selectedObject.props[`node_${secondaryNodeId}`],
                updatedSecondaryNodeValues
              );
            }
          }
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
        viewBox={[0, 0, 400, 700]}
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
        armRight={{
          path: <Path nodes={rightArmD} />,
          control: (
            <PathControlNodes
              nodes={rightArmD}
              handleMouseDown={handleMouseDown}
              name="right-arm"
            />
          ),
        }}
        neck={{
          path: <Path nodes={neckD} />,
          control: (
            <PathControlNodes
              nodes={neckD}
              handleMouseDown={handleMouseDown}
              name="neck"
            />
          ),
        }}
        head={headTransformData}
        botCharacter={botTransformData}
        body={bodyTransformData}
      />
    </div>
  );
}

export default App;
