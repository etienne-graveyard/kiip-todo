import { mergeZs } from './styled';
import { Grid } from './grid';
import { Colors } from './colors';
import { Tokens } from './tokens';
import { Fonts } from './fonts';

export const fixedBottomOverlay = mergeZs({
  position: 'fixed',
  bottom: Grid.small(2),
  right: Grid.small(2),
  left: Grid.small(2),
});

export const blueCard = mergeZs(
  {
    borderRadius: Grid.small(3),
    background: Colors.blue(700),
  },
  Tokens.flexVertical()
);

export const baseButton = mergeZs(
  Fonts.SourceSansPro('SemiBold'),
  Fonts.lineHeight(4),
  Tokens.padding({ vertical: 2, horizontal: 3 })
);

export const bigButton = mergeZs(baseButton, {
  color: Colors.white,
  background: Colors.blue(600),
  borderRadius: Grid.small(4),
});
