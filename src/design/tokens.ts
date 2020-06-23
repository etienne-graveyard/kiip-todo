import { ZsItem } from './styled';
import { ZsObject } from 'zenstyle';
import { Grid } from './grid';

export type SpaceConfig = {
  all?: number;
  vertical?: number;
  horizontal?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

type SpaceConfigResolved = [number] | [number, number] | [number, number, number, number];

function resolveSpaceConfig(config: number | SpaceConfig): SpaceConfigResolved {
  if (typeof config === 'number') {
    return [config];
  }
  const top = config.top ?? config.vertical ?? config.all ?? 0;
  const bottom = config.bottom ?? config.vertical ?? config.all ?? 0;
  const left = config.left ?? config.horizontal ?? config.all ?? 0;
  const right = config.right ?? config.horizontal ?? config.all ?? 0;
  if (top === bottom && left === right) {
    return [top, left];
  }
  return [top, right, bottom, left];
}

function padding(size: number | SpaceConfig = 1): ZsObject {
  return {
    padding: resolveSpaceConfig(size)
      .map(Grid.small)
      .map((v) => v + `px`)
      .join(' '),
  };
}

function margin(size: number | SpaceConfig = 1): ZsObject {
  return {
    margin: resolveSpaceConfig(size)
      .map(Grid.small)
      .map((v) => v + `px`)
      .join(' '),
  };
}

const textAlignCenter: ZsItem = {
  textAlign: 'center',
};

export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

const flexVertical = (align: FlexAlign = 'stretch'): ZsObject => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: align,
});

const flexHorizontal = (align: FlexAlign = 'stretch'): ZsObject => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: align,
});

const flexChild: ZsObject = { flex: 1 };

const flexCenter = (): ZsObject => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Tokens = {
  textAlignCenter,
  padding,
  margin,
  flexVertical,
  flexHorizontal,
  flexChild,
  flexCenter,
  flexVerticalChild: (align?: FlexAlign) => ({ ...flexVertical(align), ...flexChild }),
  flexHorizontalChild: (align?: FlexAlign) => ({ ...flexHorizontal(align), ...flexChild }),
  flexCenterChild: () => ({ ...flexCenter(), ...flexChild }),
};
