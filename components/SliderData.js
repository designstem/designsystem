export default {
  description: `
Adds a slider next to the content and passing the slider value as <code>data.value</code> 
  `,
  example: `
<SliderData>
  <h1 class="bullet" slot-scope="data">
    {{ data.value }}
  </h1>
</SliderData>

<SliderData :values="[
  { title: 'X', from: -2, to: 2, value: 0, float: true },
  { title: 'Y', from: -2, to: 2, value: 0, float: true },
]">
  <TwoScene slot-scope="data">
    <TwoGrid />
    <TwoCircle :position="{
      x: data.values[0],
      y: data.values[1]
    }" />
  </TwoScene>
</SliderData>
  `,
  props: {
    title: { default: "Value", type: String },
    value: { default: 0, type: Number },
    from: { default: 0, type: Number },
    to: { default: 100, type: Number },
    step: { default: 1, type: Number },
    values: { default: () => [], type: [Array] },
    float: { default: false, type: Boolean }
  },
  data: function() {
    return {
      innerValue: this.value,
      innerValues: this.values.length
        ? this.values.map(v => (v.value ? v.value : 0))
        : null
    };
  },
  template: `
    <div>
      <div v-if="values.length" v-for="(v,i) in values" :key="i">
        <label>{{ v.title ? v.title : 'Values ' + i }} <code>{{ innerValues[i] }}</code></label>
        <input
          style="margin-bottom: 1rem;"
          type="range"
          v-model="innerValues[i]"
          :min="v.from"
          :max="v.to"
          :step="v.step ? v.step : v.float ? 0.000001 : 1"
        />
      </div>
      <slot v-if="values.length" :values="innerValues" />
      <div v-if="!values.length">
        <label>{{ title }} <code>{{ innerValue }}</code></label>
        <input style="margin-bottom: 1rem;" type="range" v-model="innerValue" :min="from" :max="to" :step="step ? step : float ? 0.01 : 1" />
      </div>
      <slot v-if="!values.length" :value="innerValue" />
    </div>
  `
};
