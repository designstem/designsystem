export default `# Playground

## 2D groups and rotations

<AnimeData :to="360">
<TwoScene slot-scope="{value}">
  <TwoGrid />
  <!-- Group and then rotate -->
  <TwoGroup :rotation="{ z: value } ">
    <TwoBox :x="x" v-for="x in [-1,0,1]" />
  </TwoGroup>
  <!-- Rotate and then group -->
  <TwoGroup
    v-for="x in [-1,0,1]"
    :rotation="{ z: value }"
    :position="{ x }"
  >
    <TwoBox fill="var(--color-red)" opacity="0.5" />
  </TwoGroup>
</TwoScene>
</AnimeData>

---

## Rotating spiral

<ThreeScene>
<ThreeGrid />
  <AnimeData
    :to="deg2rad(360)"
    duration="10000"
  >
  <ThreeGroup
    slot-scope="{value}"
    :rotation="{x: value, y: value}"
  >
    <ThreeLine
      v-for="(c,i) in 100"
      :key="i"
      :points="[
        {
          x: cx(500 / 100 * c, 2),
          y: i / 150 - 1,
          z: cy(500 / 100 * c, 2)
        },
        {
          x: cx(500 / 100 * (c + 1), 1),
          y: i / 5,
          z: cy(500 / 100 * (c + 1), 1)
        }
      ]"
    /><ThreeGrid />
  </ThreeGroup>
  </AnimeData>
</ThreeScene>

---

## Dynamic math equations

After [killing math](http://worrydream.com/KillMath/) it is time to [bring it back alive](https://beta.observablehq.com/@mbostock/colorized-math)!

<Slider>
<Math
  slot-scope="{value}"
  :value="value"
>
  a = 10
  b = a^2 + \\colorbox{c}{ {{ value }} }
  b = 10^2 + \\colorbox{c}{ {{ value }} }
  b = {{ Math.pow(10,2)+parseInt(value) }}
</Math>
</Slider>

---

## Polygon and slider

<Slider :max="360" title="Angle" >
  <ThreeScene slot-scope="{value}">
    <ThreeGroup
      :rotation="{
        x: deg2rad(value),
        y: deg2rad(value),
        z: deg2rad(value)
    }">
      <ThreeRegularPolygon />
    </ThreeGroup>
  </ThreeScene>  
</Slider>

---

## Spinning polygon

<ThreeScene>
  <AnimeData
    :to="deg2rad(360)"
    duration="10000"
  >
    <ThreeGroup
      slot-scope="{value}"
      :rotation="{z: value}"
    >
      <ThreeRegularPolygon />
    </ThreeGroup>
  </AnimeData>
</ThreeScene>  


`;