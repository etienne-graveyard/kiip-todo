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
import { AppDocument, AppKiip } from '../logic/kiip';
import { addBetween, notNil } from '../utils';
import { DocumentSettings } from './DocumentSettings';

interface Props {
  kiip: AppKiip;
  documents: Array<AppDocument>;
  addDocument: () => void;
}

export const Documents: React.FC<Props> = ({ documents, addDocument, kiip }) => {
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<string | null>(null);

  const document = React.useMemo(() => {
    if (selectedDocumentId === null) {
      return null;
    }
    return notNil(documents.find((doc) => doc.id === selectedDocumentId));
  }, [documents, selectedDocumentId]);

  console.log({ selectedDocumentId, document });

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
          {addBetween(
            documents.map((doc) => (
              <Styled.div
                key={doc.id}
                zs={[
                  Tokens.flexHorizontal('center'),
                  { background: Colors.blueGrey(50), borderRadius: Grid.small(2) },
                ]}
              >
                <Styled.span
                  zs={[Tokens.flexHorizontalChild('center'), Tokens.padding({ left: 3 })]}
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
                    {doc.meta.name}
                  </Styled.span>
                </Styled.span>
                <Styled.button
                  zs={[
                    Tokens.flexCenter(),
                    {
                      border: 'none',
                      padding: 0,
                      margin: 0,
                    },
                    Tokens.margin({ right: 3 }),
                  ]}
                  onClick={() => {
                    setSelectedDocumentId((prev) => (prev === doc.id ? null : doc.id));
                  }}
                >
                  <MoreIcon size={Grid.small(4)} />
                </Styled.button>
              </Styled.div>
            )),
            (index) => (
              <Styled.div key={`spacer-${index}`} zs={{ height: Grid.small(2) }} />
            )
          )}
        </Styled.div>
      </Scrollbar>
      {document !== null ? (
        <Overlay
          key={document.id}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          onClose={() => {
            setSelectedDocumentId(null);
          }}
        >
          <DocumentSettings document={document} kiip={kiip} />
        </Overlay>
      ) : (
        <Overlay canEscapeKeyClose={false} canOutsideClickClose={false} key="add-doc">
          <Styled.button
            onClick={() => addDocument()}
            zs={[
              {
                border: 'none',
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
          </Styled.button>
        </Overlay>
      )}
    </Styled.div>
  );
};
