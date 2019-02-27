import { marked } from '../fachwerk.js'

export default {
  template: `
  <f-sidebar
    title="✍️Notes"
    width="33vw"
    style="
      position: fixed;
      z-index: 100000;
      right: var(--base3);
      top: var(--base3);
    "
  >
    <slot />
  <f-sidebar>
  `
};
