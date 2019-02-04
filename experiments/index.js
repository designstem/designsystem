import { Init } from "../mixins.js";
import * as components from "../components.js";
import * as utils from "../utils.js";

for (const name in components) {
  Vue.component(name, components[name]);
}

import FImage from './src/components/FImage.js'

Vue.component('FImage', FImage)

new Vue({
  el: "#app",
  mixins: [Init],
  methods: { ...utils },
  template: `
<div>
<header>Test</header>
<f-fetch url="./index.md">
    <f-content
      slot-scope="data"
      :content="data.value"
      sstyle="
        --content-height: calc(100vh - var(--base10));
        --content-cell-height: 100%;
      "
    />
  </f-fetch>
</div>
  `
});