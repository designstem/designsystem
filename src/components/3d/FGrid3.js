import { range } from "../../../fachwerk.js";
import Object3D from "./internal/Object3D.js";

export default {
  mixins: [Object3D],
  description: `
Displays a 3D rectangular grid.

Compared to \`<f-scene3 grid>\` it allows allows greater freedom to generate custom grids using transformation parameters.
  
<f-scene3 grid>
  <f-rotation3>
    <f-grid3 position="-1 0 0" scale="0.25" />
    <f-grid3 position="1 0 0"  scale="0.25" />
  </f-rotation3>
</f-scene3>
  `,
  props: {
    position: { default: "0 0 0", type: [String, Number, Array, Object] },
    rotation: { default: "0 0 0", type: [String, Number, Array, Object] },
    scale: { default: "1 1 1", type: [String, Number, Array, Object] },
    opacity: { default: 0.5, type: [Number, String] }
  },
  methods: { range },
  template: `
    <f-group3>
    <f-group3
      v-for="(rotation,i) in [[0,0,0],[90,0,0],[0,90,0]]"
      :key="i"
      :rotation="rotation"
    >
    <f-line3
      v-for="x,i in range(-2,2,1)"
      :key="'x' + i"
      :points="[{ x, y: -2},{ x, y: 2}]"
      :stroke-width="1"
      :opacity="x == 0 ? opacity * 1.25 : opacity"
    />
    <f-line3
      v-for="y,j in range(-2,2,1)"
      :key="'y' + j"
      :points="[{ x: -2, y },{ x: 2, y }]"
      :stroke-width="1"
      :opacity="y == 0 ? opacity * 1.25 : opacity"
    />
    </f-group3>
  </f-group3>
  `
};
