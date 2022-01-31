# SVG Path animation demo in `Theatre.js`

Experimenting with using `Theatre.js` to animate SVG objects.

## Lessons learned

- It would be possible to create an extension for`Theatre.js` dedicated to SVG animation.
- The Extension should be able to import svg images, then it could extract the animatable properties into a JS object, and recreate the SVG elements as React Components.
- The controls should be on a separate layer.
- The objects need bounding boxes, etc...
- It should be possible to edit using only the sequence editor and the control nodes/bounding boxes of the svg elements.
