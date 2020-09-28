import * as zenstyle from 'zenstyle';
import { Global as GlobalAny, GlobalProps } from '@emotion/core';

interface Theme {}

export const Global: React.FC<GlobalProps<Theme>> = GlobalAny;

export const { Styled, StyledTag, StyledTagWithProps } = zenstyle.createZenStyle<Theme>();

export type Zs = zenstyle.Zs<Theme>;
export type ZsFn = zenstyle.ZsFn<Theme>;
export type ZsItem = zenstyle.ZsItem<Theme>;

export function mergeZs(...zss: Array<zenstyle.Zs<Theme>>): zenstyle.ZsArray<Theme> {
  return zenstyle.mergeZs(...zss) as any;
}
