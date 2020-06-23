import React from 'react';
import { Global } from '../design/styled';
import { Fonts } from '../design/fonts';
import { Colors } from '../design/colors';

interface Props {
  isDev: boolean;
}

export const RootView: React.FC<Props> = ({ children, isDev }) => {
  return (
    <React.Fragment>
      <Global
        styles={[
          Fonts.fontFaces,
          {
            'html, body': {
              height: '100%',
              width: '100%',
              margin: '0',
              padding: '0',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              background: Colors.white,
              color: Colors.black,
              ...Fonts.fontSize(3),
              ...Fonts.SourceSansPro(),
            },
            body: {
              height: '100%',
              width: '100%',
            },
            '#root': {
              height: '100%',
              width: '100%',
              padding: '0.05px',
            },
            '*': {
              boxSizing: 'border-box',
              outlineOffset: 5,
              outlineColor: Colors.blue(500),
              // overflow: 'hidden',
            },
            // make native scrollbar ugly so we don't use them !
            // we should use <Scrollbars> instead
            ...(isDev
              ? {
                  '::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                  },
                  '::-webkit-scrollbar-track': {
                    backgroundColor: 'red',
                  },
                  '::-webkit-scrollbar-thumb': {
                    backgroundColor: 'blue',
                    borderRadius: '5px',
                  },
                }
              : {}),
          } as any,
        ]}
      />
      {children}
    </React.Fragment>
  );
};
