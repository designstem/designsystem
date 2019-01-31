export const shuffle_help = () => `

\`shuffle(array)\`

Sorts the array in random order.

#### Example

    shuffle(range(0,3))

#### Output

    {{ shuffle(range(0,3)) }}

`;

export const shuffle = arr => arr.sort(() => Math.random() - 0.5);

export const any_help = () => `

\`any(array)\`

Picks a random element from the array.
Supports both array and function argument syntax.

#### Example

    any([0,1,2])
    any(0,1,2)

#### Output

    {{ any([0,1,2]) }}
    {{ any(0,1,2) }}

`;

export const any = function(arr) {
  return arr instanceof Array
    ? shuffle(arr)[0]
    : shuffle(Array.from(arguments))[0];
};

export const flatten_help = () => `

\`flatten(array)\`

Flattens multidimensional array

#### Example

    flatten([0,1,[2,[3,4]]])

#### Output

    {{ flatten([0,1,[2,[3,4]]]) }}

`;

export const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const chunk_help = () => `

\`chunk(array, length)\`

Chunks \`array\` into smaller \`length\`-sized arrays

#### Example

    chunk([0,1,2,3],2)

#### Output

    {{ chunk([0,1,2,3],2) }}

`;

export const chunk = (arr, length) =>
  Array.from({ length: Math.ceil(arr.length / length) }).map((_, n) =>
    arr.slice(n * length, n * length + length)
  );

export const unique_help = () => `

\`unique(array)\`

Removes duplicates from the array

#### Example

    unique([0,0,1,2])

#### Output

    {{ unique([0,0,1,2]) }}

`;

export const unique = arr => [...new Set(arr)];
