import { NodeC, NodeM } from ".";
import Path from "./Path";

function PathControlNodes(props: {
  nodes: Array<NodeC | NodeM>;
  handleMouseDown: (
    event: React.MouseEvent,
    name: string,
    nodeId: number,
    controlType: "" | "1" | "2",
    nodeCoord: { x: number; y: number }
  ) => void;
  visible: boolean;
  name: string;
}) {
  let controlNodes: JSX.Element[] = [];
  let lines: JSX.Element[] = [];
  const r = 5;
  let lineStart: { x: number; y: number } | null = null;
  let lineCounter: number = 0;

  props.nodes.forEach((node) => {
    const controlTypes: Array<"1" | "2" | ""> = ["1", "2", ""];
    for (let i of controlTypes) {
      const x: "x1" | "x2" | "x" = `x${i}`;
      const y: "y1" | "y2" | "y" = `y${i}`;
      if (x in node && y in node) {
        controlNodes.push(
          <circle
            key={node.id + `,${i}`}
            className="control"
            r={r}
            //TODO: Handle these false positive warnings
            // @ts-ignore
            cx={node[x]}
            // @ts-ignore
            cy={node[y]}
            onMouseDown={(e) =>
              props.handleMouseDown(e, props.name, node.id, i, {
                // @ts-ignore
                x: node[x],
                // @ts-ignore
                y: node[y],
              })
            }
          />
        );
        if (lineStart) {
          lines.push(
            <line
              key={node.id + "," + ++lineCounter}
              className="control"
              x1={lineStart.x}
              y1={lineStart.y}
              //TODO: Handle these false positive warnings
              // @ts-ignore
              x2={node[x]}
              // @ts-ignore
              y2={node[y]}
            />
          );
          lineStart = null;
        } else {
          //TODO: Handle these false positive warnings
          // @ts-ignore
          lineStart = { x: node[x], y: node[y] };
        }
      }
    }
  });

  return (
    <g className={`control ${props.visible ? "visible" : "hidden"}`}>
      {lines}
      {controlNodes}
      <Path className="control" nodes={props.nodes} />
    </g>
  );
}

export default PathControlNodes;
