import { NodeC, NodeM } from ".";
import { generateDString } from "./utils";

function Path(props: { className?: string; nodes: Array<NodeC | NodeM> }) {
  const dString = generateDString(props.nodes);

  return <path className={props.className} d={dString} />;
}

export default Path;
