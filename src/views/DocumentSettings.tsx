import React from 'react';
import { Styled } from '../design/styled';
import { Grid } from '../design/grid';
import { Tokens } from '../design/tokens';
import { AppDocument, AppKiip, AppKiipDocumentStore } from '../logic/kiip';
import { EditableText } from '../components/EditableText';
import { ConnectServerForm } from './ConnectServerForm';
import { register, sync } from '../logic/KiipServer';
import { bigButton, blueCard, fixedBottomOverlay } from '../design/composition';

interface Props {
  document: AppDocument;
  kiip: AppKiip;
}

export const DocumentSettings: React.FC<Props> = ({ document, kiip }) => {
  const [documentStore, setDocumentStore] = React.useState<AppKiipDocumentStore | null>(null);

  const [currentForm, setCurrentForm] = React.useState<null | 'add'>(null);

  React.useEffect(() => {
    kiip.getDocumentStore(document.id).then((store) => {
      setDocumentStore(store);
    });
  }, [document.id, kiip]);

  const server = document.meta.server;

  return (
    <Styled.div zs={[...fixedBottomOverlay, Tokens.flexVertical()]}>
      <Styled.div zs={blueCard}>
        <Styled.div zs={[Tokens.margin({ all: 2, bottom: currentForm ? 2 : 0 })]}>
          <EditableText
            value={document.meta.name}
            onChange={(newName) => {
              if (documentStore) {
                documentStore.setMeta({
                  ...document.meta,
                  name: newName,
                });
              }
            }}
          />
        </Styled.div>
        {(() => {
          if (server) {
            return (
              <div>
                <p>{server.url}</p>
                <button
                  onClick={async () => {
                    if (!documentStore) {
                      return;
                    }
                    const data = documentStore.prepareSync();
                    // const document = documentStore.getState();
                    const res = await sync(document.id, server.url, server.token, data);
                    documentStore.handleSync(res);
                  }}
                >
                  Sync
                </button>
              </div>
            );
          }
          if (currentForm === null) {
            return (
              <Styled.div zs={[Tokens.padding(4), Tokens.flexCenter]}>
                <Styled.button
                  onClick={() => {
                    setCurrentForm('add');
                  }}
                  zs={bigButton}
                >
                  Add Server
                </Styled.button>
              </Styled.div>
            );
          }
          if (currentForm === 'add') {
            return (
              <>
                <Styled.div zs={{ height: Grid.small(2) }} />
                <ConnectServerForm
                  onCancel={() => {
                    setCurrentForm(null);
                  }}
                  onConfirm={async (address, password) => {
                    if (!documentStore) {
                      return;
                    }
                    setCurrentForm(null);
                    console.log({
                      address,
                      password,
                    });
                    const { token } = await register(document.id, address, password);

                    console.log('success', token);

                    // documentStore.setMeta()
                    documentStore.setMeta({
                      ...document.meta,
                      server: {
                        url: address,
                        token: token,
                      },
                    });
                  }}
                />
              </>
            );
          }
          throw new Error('Invalid');
        })()}
      </Styled.div>
    </Styled.div>
  );
};
