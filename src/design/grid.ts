const GRID_SMALL = 6;
const GRID_BIG = 4 * GRID_SMALL; // 24

export const Grid = {
  small,
  size,
};

function small(small: number) {
  return small * GRID_SMALL;
}

function size(big: number, small: number = 0) {
  return big * GRID_BIG + small * GRID_SMALL;
}
