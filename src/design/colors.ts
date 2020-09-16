import {
  ColorName,
  InterpolatedMaterialColors as MaterialColors,
} from 'interpolated-material-colors';

export const Colors = {
  black: MaterialColors.blueGrey(950),
  white: MaterialColors.blueGrey(0),
  ...MaterialColors,
  resolve: resolveTuple,
};

export type ColorTuple = ColorName | [ColorName, number];

function resolveTuple(tuple: ColorTuple): string {
  if (Array.isArray(tuple)) {
    return Colors[tuple[0]](tuple[1]);
  }
  return Colors[tuple](500);
}
