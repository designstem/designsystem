import { THREE, color, range } from "../../../fachwerk.js";
import Object3D from "./internal/Object3D.js";

const FInternalBox3 = {
  mixins: [Object3D],
  data() {
    const {
      width,
      height,
      depth,
      r,
      stroke,
      strokeWidth,
      fill,
      scale,
      position,
      rotation,
      opacity
    } = this.$attrs;
    let curObj = this.obj;
    if (!curObj) {
      var geometry = new THREE.BoxGeometry(
        r ? r * 2 : width,
        r ? r * 2 : height,
        r ? r * 2 : depth
      );
      const material = new THREE.LineBasicMaterial({
        linewidth: strokeWidth,
        color: stroke || color("primary"),
        opacity
      });

      if (!fill) {
        const edges = new THREE.EdgesGeometry(geometry);
        curObj = new THREE.LineSegments(edges, material);
      }

      if (fill == "auto") {
        curObj = new THREE.Mesh(
          geometry,
          new THREE.MeshNormalMaterial({
            opacity,
            side: THREE.DoubleSide
          })
        );
      }

      if (fill && fill !== "auto") {
        curObj = new THREE.Mesh(
          geometry,
          new THREE.MeshLambertMaterial({
            transparent: true,
            color: fill,
            opacity: opacity,
            side: THREE.DoubleSide
          })
        );
      }
    }
    curObj.name = curObj.name || curObj.type;
    return { curObj };
  }
};

export default {
  mixins: [Object3D],
  components: { FInternalBox3 },
  description: `
Displays a 3D box.

<f-scene3>
  <f-rotation3>
    <f-box3 />
  </f-rotation3>
</f-scene3>  

<f-scene3>
  <f-rotation3>
    <f-box3 :stroke="color('red')" />
  </f-rotation3>
</f-scene3>  

<f-scene3>
  <f-rotation3>
    <f-box3 :fill="color('red')" />
  </f-rotation3>
</f-scene3>  

<f-scene3>
  <f-rotation3>
    <f-box3 fill="auto" />
  </f-rotation3>
</f-scene3>  

`,
  props: {
    width: { default: 1, type: [Number, String] },
    height: { default: 1, type: [Number, String] },
    depth: { default: 1, type: [Number, String] },
    r: { default: "", type: [Number, String] },
    stroke: { default: "", type: String },
    strokeWidth: { default: 3, type: [String, Number] },
    fill: { default: "", type: String },
    scale: { default: "1 1 1", type: [String, Number, Array, Object] },
    position: { default: "0 0 0", type: [String, Number, Array, Object] },
    rotation: { default: "0 0 0", type: [String, Number, Array, Object] },
    opacity: { default: 1, type: [Number, String] },
    shading: { default: false, type: Boolean }
  },
  mounted() {
    console.log("p", this.$props);
  },
  template: `
  <f-group3
    :position="position"
    :rotation="rotation"
    :scale="scale"
  >
    <f-internal-box3 v-bind="$props"  />
  </f-group3>
  `
};

/*

  computed: {
    frontfacePoints() {
      return [
        [
          r ? r : this.width / 2,
          r ? r : this.height / 2,
          r ? r : this.depth / 2
        ],
        [
          r ? r : this.width / 2,
          r ? -r : this.height / -2,
          r ? r : this.depth / 2
        ],
        [
          r ? -r : this.width / -2,
          r ? -r : this.height / -2,
          r ? r : this.depth / 2
        ],
        [
          r ? -r : this.width / -2,
          r ? r : this.height / 2,
          r ? r : this.depth / 2
        ],
        [
          r ? r : this.width / 2,
          r ? r : this.height / 2,
          r ? r : this.depth / 2
        ]
      ];
    },
    backfacePoints() {
      return [
        [
          r ? r : this.width / 2,
          r ? r : this.height / 2,
          r ? -r : this.depth / -2
        ],
        [
          r ? r : this.width / 2,
          r ? -r : this.height / -2,
          r ? -r : this.depth / -2
        ],
        [
          r ? -r : this.width / -2,
          r ? -r : this.height / -2,
          r ? -r : this.depth / -2
        ],
        [
          r ? -r : this.width / -2,
          r ? r : this.height / 2,
          r ? -r : this.depth / -2
        ],
        [
          r ? r : this.width / 2,
          r ? r : this.height / 2,
          r ? -r : this.depth / -2
        ]
      ];
    },
    connectorPoints() {
      return range(0, 3).map(i => [
        this.frontfacePoints[i],
        this.backfacePoints[i]
      ]);
    }
  },
  template: `
    <f-group3
      :position="position"
      :rotation="rotation"
      :scale="scale"
    >
      <f-group3 v-if="stroke">
        <f-line3
          :points="frontfacePoints"
          :stroke="stroke"
          :stroke-with="strokeWidth"
        />
        <f-line3
          :points="backfacePoints"
          :stroke="stroke"
          :stroke-with="strokeWidth"
        />
        <f-line3
          v-for="(points,i) in connectorPoints"
          :key="i"
          :stroke="stroke"
          :points="points"
          :stroke-with="strokeWidth"
        />
      </f-group3>
      <InternalBox3
        v-if="fill" 
        :width="width"
        :height="height"
        :depth="depth"
        :r="r"
        :shading="shading"
        :fill="fill"
        :opacity="opacity"
      />
    </f-group3>
  `


  */
