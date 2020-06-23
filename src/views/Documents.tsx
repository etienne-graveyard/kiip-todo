import React from 'react';
import { Styled } from '../design/styled';
import { Fonts } from '../design/fonts';
import { Tokens } from '../design/tokens';
import Scrollbar from 'react-scrollbars-custom';
import { Colors } from '../design/colors';
import { Grid } from '../design/grid';
import { FolderIcon } from '../components/FolderIcon';
import { MoreIcon } from '../components/MoreIcon';
import { PlusIcon } from '../components/PlusIcon';
import { Overlay } from 'react-oot';

export const Documents: React.FC = () => {
  return (
    <Styled.div
      zs={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
      }}
    >
      <Scrollbar style={{ width: '100%', height: '100%' }}>
        <Styled.h1
          zs={[
            Fonts.lineHeight(8),
            Fonts.SourceSansPro('Bold'),
            Tokens.textAlignCenter,
            Tokens.margin({ top: 4 }),
          ]}
        >
          Todo List
        </Styled.h1>
        <Styled.div zs={[Tokens.padding(2)]}>
          <Styled.div
            zs={[
              Tokens.padding({ horizontal: 3 }),
              Tokens.flexHorizontal('center'),
              { background: Colors.blueGrey(50), borderRadius: Grid.small(2) },
            ]}
          >
            <FolderIcon size={Grid.small(4)} />
            <Styled.span
              zs={[
                Fonts.SourceSansPro('Regular'),
                Fonts.lineHeight(4),
                Tokens.flexChild,
                Tokens.margin({ vertical: 3, horizontal: 1 }),
              ]}
            >
              My Document
            </Styled.span>
            <MoreIcon size={Grid.small(4)} />
          </Styled.div>
        </Styled.div>
      </Scrollbar>
      <Overlay canEscapeKeyClose={false} canOutsideClickClose={false}>
        <Styled.div
          zs={[
            {
              position: 'fixed',
              bottom: Grid.small(2),
              right: Grid.small(2),
              width: Grid.size(2),
              height: Grid.size(2),
              background: Colors.blue(700),
              borderRadius: Grid.small(4),
            },
            Tokens.flexCenter(),
          ]}
        >
          <PlusIcon size={Grid.small(4)} color={Colors.white} />
        </Styled.div>
      </Overlay>
    </Styled.div>
  );
};
