import Css from "../mixins/Css.js";

export default {
  mixins: [Css],
  name: "TwoScene",
  description: `
A simple 2D scene with some tweaks to regular SVG document.

Note that **Y axis is flipped** and <code>x</code> and <code>y</code> span from <code>-2</code> to <code>2</code> to work same way as **ThreeScene**.
`,
  example: `
<TwoScene>
    <circle r="1" />
</TwoScene>
  `,
  props: { size: { default: 250 }},
  computed: {
    viewBox() {
      return `-2 -2 4 4`;
    }
  },
  template: `
    <svg
        :width="size"
        :height="size"
        :view-box.camel="viewBox"
        class="two"
    >
      <g transform="scale(1,-1)">
        <slot />
      </g>
    </svg>
  `,
  css: `
    .two * {
      vector-effect: non-scaling-stroke;
    }
    .two text {
      font-size: 12px;
    }
  `
};
