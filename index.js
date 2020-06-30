const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

const cells = 3;
const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 600, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, 300, 40, 600, {
    isStatic: true,
  }),
  Bodies.rectangle(800, 300, 40, 600, {
    isStatic: true,
  }),
];
World.add(world, walls);

//Maze generation
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {
  // If I have visited the cell at [row,column], then return.
  if (grid[row][column]) {
    return;
  }
  //Mark this cell as being visited.
  grid[row][column] = true;
  //Assemble randomly-ordered list of neighbours.
  const neighbors = shuffle([
    [row - 1, column, 'up'], //above
    [row, column + 1, 'right'], //right
    [row + 1, column, 'down'], //below
    [row, column - 1, 'left'], //left
  ]);
  console.log(neighbors);
  //For each neighbour...
  for (let neighbor of neighbors) {
    //See if that neighbour is out of bounds.
    const [nextRow, nextColumn, direction] = neighbor;
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    )
      continue;
  }

  //If we have visited that neighbour, continue to next neighbour.
  if (grid[nextRow][nextColumn]) {
    continue;
  }

  //Remove a wall from either the verticals array or horizontals array.

  //Visit that next cell.
};

stepThroughCell(1, 1);
