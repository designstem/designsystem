
export default {
  description: `
Wrapper component, adding a set of buttons on below the content and passing the current button index as <code>data.value</code>.
  `,
  example: `
<ButtonsData :buttons="['Eins', 'Zwei', 'Polizei']">
  <h1 slot-scope="data" class="bullet">{{ data.value + 1 }}</h1>
</ButtonsData>
  `,
  props: {
    buttons: { default: [], type: Array },
    value: { default: 0, type: Number },
  },
  data: function() {
    return { innerValue: this.value };
  },
  template: `
    <div>
      <buttons
        v-model="innerValue"
        :buttons="buttons"
        style="margin-bottom: 1rem;"
      />
      <slot :value="innerValue" />
    </div>
  `
};
