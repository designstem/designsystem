import { THREE } from "../../../dist/vendor.js";
import { color } from "../../../dist/utils.js"
import Object3D from "./internal/Object3D.js";

export default {
  mixins: [Object3D],
  description: `
Description to be written.

<f-scene3>
  <f-group3 :rotation="{ y: 45, x: 45 }">
    <f-grid3 />
    <f-regularpolygon3 opacity="0.5" />
    <f-regularpolygon3 :count="3" />
  </f-group3>
</f-scene3>
  `,
  props: {
    count: { default: 6, type: [String, Number] },
    r: { default: 1, type: [String, Number] },
    stroke: { default: "color('primary')", type: String },
    strokeWidth: { default: 3, type: [String, Number] },
    fill: { default: "", type: String },
    position: { default: "0 0 0", type: [String, Number, Array, Object] },
    rotation: { default: "0 0 0", type: [String, Number, Array, Object] },
    scale: { default: "1 1 1", type: [String, Number, Array, Object] },
    opacity: { default: 1, type: [Number,String] },
    shading: { default: false, type: Boolean },
  },
  computed: {
    strokeColor() {
      return this.stroke == "color('primary')" ? color('primary') : this.stroke
    }
  },
  template: `
  <f-hedron3
    :count="count"
    :r="r"
    :stroke="strokeColor"
    :stroke-width="strokeWidth"
    :fill="fill"
    :opacity="opacity"
    :shading="shading"
  />
  `
}