/*
A function to get a path's nodes in an object from its d attribute.
WARNING:
This script assumes the following structure:
```
<g id="some-id">
  <path d="..." />
</g>
```


USAGE:
1. Open the svg image in the browser
2. Copy this script to the browser's console and run it

EXAMPLE:
getPathDById("some-id")

*/

function getPathDById(id) {
  const path = document.querySelector("#" + id).querySelector("path");
  const dString = path.getAttribute("d");
  const dArray = dString
    .replaceAll(",", " ")
    .replaceAll(/[A-z]/g, " $& ")
    .trim()
    .split(/\s+/);
  let nodesArray = [];
  let nodeId = 1;
  for (let i = 0; i < dArray.length; i++) {
    const e = dArray[i];
    if (["C", "M"].includes(e)) {
      let node = {
        type: e,
      };
      if (e === "C") {
        node.x1 = Number(dArray[++i]);
        node.y1 = Number(dArray[++i]);
        node.x2 = Number(dArray[++i]);
        node.y2 = Number(dArray[++i]);
      }
      node.x = Number(dArray[++i]);
      node.y = Number(dArray[++i]);
      node.id = ++nodeId;
      nodesArray.push(node);
    }
  }
  return nodesArray;
}

// An example:
d = getPathDById("Arm_left");

d;
