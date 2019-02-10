import Object2D from "../2d/internal/Object2D.js";
import { range, polarpoints } from "../../../fachwerk.js"
;

export default {
  mixins: [Object2D],
  description: `
Repeats the contents in a hexagonal grid.

<f-scene grid>
  <f-hex-pattern>
    <f-regularpolygon
      slot-scope="data"
      r="0.5"
      :stroke="color('red')"
    />
  </f-hex-pattern>
  <f-regularpolygon r="0.5" />
</f-scene>
  `,
  props: {
    step: { default: 1, type: [Number,String] },
    width: { default: 4, type: [Number,String] },
    height: { default: 4, type: [Number,String] },
    position: { default: '0 0', type: [String, Number, Object, Array] },
    rotation: { default: '0', type: [String, Number, Object, Array] },
    scale: { default: '1', type: [String, Number, Object, Array] },
    opacity: { default: 1, type: Number }
  },
  methods: { range, polarpoints },
  template: `
  <f-group
    :transform="transform"
    :opacity="opacity"
  >
    <f-group v-for="(y,j) in range(width / -2,width / 2, step)" :key="j">
      <f-group v-for="(x,i) in range(height / -2,height / 2, step)"
        :key="i"
        :position="{
          x: polarpoints(6,0.5)[1].x * 2 * x - (y % 2 ? polarpoints()[1].x * 0.5 : 0),
          y: (polarpoints(6,0.5)[1].y - 0.5) * y
        }"
      ><slot :value="[i, j, (i * j) + i]" />
      </f-group>
    </f-group>
  </f-group>
  `
}