import { Font } from 'ts-fonts';
import { Grid } from './grid';
import { ZsObject } from 'zenstyle';

const SourceSansProInternal = Font.create('Source Sans Pro', {
  200: {
    normal: '/fonts/SourceSansPro-ExtraLight',
    italic: '/fonts/SourceSansPro-ExtraLightItalic',
  },
  300: {
    normal: '/fonts/SourceSansPro-Light',
    italic: '/fonts/SourceSansPro-LightItalic',
  },
  400: {
    normal: '/fonts/SourceSansPro-Regular',
    italic: '/fonts/SourceSansPro-Italic',
  },
  600: {
    normal: '/fonts/SourceSansPro-SemiBold',
    italic: '/fonts/SourceSansPro-SemiBoldItalic',
  },
  700: {
    normal: '/fonts/SourceSansPro-Bold',
    italic: '/fonts/SourceSansPro-BoldItalic',
  },
  900: {
    normal: '/fonts/SourceSansPro-Black',
    italic: '/fonts/SourceSansPro-BlackItalic',
  },
});

function SourceSansPro<S extends keyof typeof SourceSansProInternal.styles>(
  weight: S = 'Regular' as any,
  italic: boolean = false
) {
  return italic
    ? SourceSansProInternal.styles[weight].Italic
    : SourceSansProInternal.styles[weight].Normal;
}

const LINE_HEIGHT_RATIO = 1.6;

function fontSize(fontSize: number, lineHeight?: number): ZsObject {
  const lHeight = lineHeight || Math.round(fontSize * LINE_HEIGHT_RATIO);
  return {
    fontSize: Grid.small(fontSize),
    lineHeight: `${Grid.small(lHeight)}px`,
  };
}

function lineHeight(lineHeight: number, fontSize?: number): ZsObject {
  const fSize = fontSize || Math.round(lineHeight / LINE_HEIGHT_RATIO);
  return {
    fontSize: Grid.small(fSize),
    lineHeight: `${Grid.small(lineHeight)}px`,
  };
}

function lineClamp(lineCount: number): ZsObject {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lineCount,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
}

export const Fonts = {
  fontFaces: [SourceSansProInternal.fontFaces].join('\n'),
  SourceSansPro,
  fontSize,
  lineHeight,
  lineClamp,
};
