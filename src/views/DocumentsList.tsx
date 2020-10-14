import React from 'react';
import { Styled } from '../design/styled';
import { Fonts } from '../design/fonts';
import { Tokens } from '../design/tokens';
import { bigButton, blueCard, fixedBottomOverlay } from '../design/composition';
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
import { ImportFromServerForm } from './ImportFromServerForm';
import { sync } from '../logic/KiipServer';

interface Props {
  kiip: AppKiip;
  documents: Array<AppDocument>;
  addDocument: () => void;
  openDocument: (docId: string) => void;
}

export const DocumentsList: React.FC<Props> = ({ documents, addDocument, kiip, openDocument }) => {
  const [overlayMode, setOverlayMode] = React.useState<
    null | { type: 'add' } | { type: 'import' } | { type: 'config'; documentId: string }
  >(null);

  const document = React.useMemo(() => {
    if (overlayMode && overlayMode.type === 'config') {
      return notNil(documents.find((doc) => doc.id === overlayMode.documentId));
    }
    return null;
  }, [documents, overlayMode]);

  console.log({ documents, selectedDocumentId: overlayMode, document });

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
          Documents
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
                  onClick={() => {
                    openDocument(doc.id);
                  }}
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
                    setOverlayMode((prev) => {
                      if (prev && prev.type === 'config' && prev.documentId === doc.id) {
                        return null;
                      }
                      return { type: 'config', documentId: doc.id };
                    });
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
      {(() => {
        if (overlayMode === null) {
          return (
            <Overlay canEscapeKeyClose={false} canOutsideClickClose={false} key="add-doc">
              <Styled.button
                onClick={() => {
                  setOverlayMode({ type: 'add' });
                }}
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
          );
        }
        if (overlayMode.type === 'config') {
          if (document) {
            return (
              <Overlay
                key={document.id}
                canEscapeKeyClose={true}
                canOutsideClickClose={true}
                onClose={() => {
                  setOverlayMode(null);
                }}
              >
                <DocumentSettings document={document} kiip={kiip} />
              </Overlay>
            );
          }
          return null;
        }
        if (overlayMode.type === 'add') {
          return (
            <Overlay>
              <Styled.div zs={[...fixedBottomOverlay, Tokens.flexVertical()]}>
                <Styled.div zs={[...blueCard, Tokens.padding(2)]}>
                  <Styled.button
                    onClick={() => {
                      addDocument();
                      setOverlayMode(null);
                    }}
                    zs={bigButton}
                  >
                    Create new
                  </Styled.button>
                  <Styled.div zs={{ height: Grid.small(2) }} />
                  <Styled.button
                    onClick={() => {
                      setOverlayMode({ type: 'import' });
                    }}
                    zs={bigButton}
                  >
                    Import from server
                  </Styled.button>
                </Styled.div>
              </Styled.div>
            </Overlay>
          );
        }
        if (overlayMode.type === 'import') {
          return (
            <Overlay>
              <Styled.div zs={[...fixedBottomOverlay, Tokens.flexVertical()]}>
                <Styled.div zs={blueCard}>
                  <ImportFromServerForm
                    onCancel={() => {
                      setOverlayMode(null);
                    }}
                    onConfirm={async (address, documentId, token) => {
                      console.log({
                        address,
                        documentId,
                        token,
                      });
                      // create doc
                      const doc = await kiip.getDocumentStore(documentId);
                      const docState = doc.getState();
                      doc.setMeta({
                        ...docState.meta,
                        server: {
                          url: address,
                          token,
                        },
                      });
                      const prep = doc.prepareSync();
                      const sync1 = await sync(doc.id, address, token, prep);
                      const sync2 = await doc.handleSync(sync1);
                      const sync3 = await sync(doc.id, address, token, sync2);
                      const sync4 = await doc.handleSync(sync3);
                      console.log({ sync1, sync2, sync3, sync4 });
                    }}
                  />
                </Styled.div>
              </Styled.div>
            </Overlay>
          );
        }
        throw new Error('Ooops');
      })()}
    </Styled.div>
  );
};
