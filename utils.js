let d = []

d.push(`
## scale

<code>scale(value, start1, stop1, start2 = -2, stop2 = 2)</code>

Scales linearily the input <code>value</code>
from the input range between <code>start1</code> and <code>stop1</code>
to the output range  <code>start2</code> and <code>stop2</code>.

#### Example:

    scale(50, 0, 100, 0, 1)

#### Output:

    {{ scale(50, 0, 100, 0, 1) }}

  `)

const scale = (value, start1, stop1, start2 = -2, stop2 = 2) => {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}


d.push(`
## round

<code>round(value, decimals = 0)</code>

Rounds a number <code>value</code> to optional <code>decimals</code>.

Example:
    
    round(0.1234)
    round(0.1234, 2)

Output:
  
    {{ round(0.1234) }}
    {{ round(0.1234, 2) }}

`)

const round = (value, decimals = 0) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

d.push(`
## random

<code>random(from, to, float = false)</code>

Generates a random integer number between <code>from</code> and <code>to</code>. 
If <code>float = true</code>, the output value will be floating point number.

Example:
    
    random(0, 2)
    random(0, 2, true)

Output:
  
    {{ random(0, 2) }}
    {{ random(0, 2, true) }}
`)

const random = (from, to, float = false) => {
  const r = from + Math.random() * (to - from)
  return float ? r : Math.floor(r, 2)
}

d.push(`
## range

<code>range(from, to, step = 1)</code>

Generates an array of integer numbers in between <code>from</code> and <code>to</code> with optional <code>step</code> parameter.

Example

    range(-1, 1, 0.5)

Output

    {{ range(-1, 1, 0.5) }}

`)

const range = (from, to, step = 1) => {
  const length = Math.floor((to - from) / step) + 1
  return Array.from({ length }).map((_, i) => from + (i * step))
}

// Trigonometry

d.push(`
## cx cy

<code>cx(angle, radius)</code>
<code>cy(angle, radius)</code>

Return 2D x and y coordinates on point on the circle (_polar coordinates_) based on <code>angle</code> in degrees and circle's <code>radius</code>.

#### Example

    cx(90, 10) cy(90, 10)

#### Output

    {{ cx(90, 10) }} {{ cy(90, 10) }}


`)
const cx = (deg, radius) => {
  return Math.cos((deg - 90) * (Math.PI / 180)) * radius;
};

const cy = (deg, radius) => {
  return Math.sin((deg - 90) * (Math.PI / 180)) * radius;
};

d.push(`
## cpoints

<code>cpoints(count, radius)</code>

Based on <code>cx</code> and <code>cy</code> functions above calculates and <code>count</code> of <code>{ x, y }</code> points on the circle.

#### Example

    cpoints(4,10)

#### Output

    {{ cpoints(4,10) }}
`)
const cpoints = (count, radius) => {
  return Array.from({
    length: count
  })
  .map((p, i) => ({
    x: cx((360 / count) * i, radius),
    y: cy((360 / count) * i, radius)
  }));
}

d.push(`
## deg2rad

<code>deg2rad(angle)</code>

Converts angle in degrees to radians.

#### Example

<Math>
radians = \\frac{degrees \\cdot \\pi}{180} = \\frac{180 \\cdot \\pi}{180} = \\pi
</Math>

    deg2rad(180)

#### Output

    {{ deg2rad(180) }}
`)

const deg2rad = deg => (deg * Math.PI) / 180;

d.push(`
## rad2deg

<code>rad2deg(angle)</code>

Converts angle in radians to degrees.

#### Example

    rad2deg(Math.PI)

#### Output

    {{ rad2deg(Math.PI) }}
`)

const rad2deg = rad => (rad * 180) / Math.PI;

// Array

d.push(`
## shuffle

<code>shuffle(array)</code>

Sorts the array in random order.

#### Example

    shuffle(range(0,3))

#### Output

    {{ shuffle(range(0,3)) }}

`)

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

d.push(`
## any

<code>any(array)</code>

Picks a random element from the array.
Supports both array and function parameters syntax.

#### Example

    any([0,1,2])
    any(0,1,2)

#### Output

    {{ any([0,1,2]) }}
    {{ any(0,1,2) }}

`)

const any = function(arr) {
  return arr instanceof Array ? shuffle(arr)[0] : shuffle(Array.from(arguments))[0]
}

d.push(`
## flatten

<code>flatten(array)</code>

Flatten multidimensional array

#### Example

    flatten([0,1,[2,[3,4]]])

#### Output

    {{ flatten([0,1,[2,[3,4]]]) }}

`)
const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

// Color

d.push(`
## hsl

<code>hsl(h, s = 100, l = 50, a = 1)</code>

Generates CSS <code>hsl()</code> color string based on function parameters.

#### Example

    hsl(100,50,0,0.5)
    hsl(100)

#### Output

    {{ hsl(100,50,0,0.5) }}
    {{ hsl(100) }}

`)

const hsl = (h, s = 100, l = 50, a = 1) => `hsl(${h},${s}%,${l}%,${a})`

// Other utils

d.push(`
## snapToGrid

<code>snapToGrid(value, gridsize)</code>

Returns the value in the closest point of 2D grid.

#### Input

    snapToGrid(0.51,0.5)

#### Output

    {{ snapToGrid(0.51,0.5) }}
`)

const snapToGrid = (value, gridsize) => {
  return value % gridsize < gridsize / 2
    ? value - (value % gridsize)
    : value + gridsize - (value % gridsize);
};

d.push(`
## log

<code>log(message) = console.log(message) </code>


`)

const log = value => console.log(value)

// Google Sheets

const parseSheet = data => {
  return data.feed.entry.map(entry => {
    return Object.keys(entry)
      .map(field => {
        if (field.startsWith("gsx$")) {
          return [field.split("$")[1], entry[field].$t];
        }
      })
      .filter(field => field)
      .reduce((field, item) => {
        field[item[0]] = item[1];
        return field;
      }, {});
  });
};

const docs = () => d

export {
  scale,
  round,
  random,
  range,
  cx,
  cy,
  cpoints,
  deg2rad,
  rad2deg,
  shuffle,
  any,
  hsl,
  flatten,
  snapToGrid,
  log,
  parseSheet,
  docs
};
