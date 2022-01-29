import { NodeC, NodeM } from ".";
import { generateDString } from "./utils";

function Path(props: { nodes: Array<NodeC | NodeM> }) {
  const dString = generateDString(props.nodes);

  return <path d={dString} />;
}

export default Path;
