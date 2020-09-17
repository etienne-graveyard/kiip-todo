import React from 'react';
import { Styled } from '../design/styled';
import { Grid } from '../design/grid';
import { Colors } from '../design/colors';
import { Tokens } from '../design/tokens';
import { Fonts } from '../design/fonts';
import { AppDocument, AppKiip, AppKiipDocumentStore } from '../logic/kiip';
import { EditableText } from '../components/EditableText';
import { AddServerForm } from './AddServerForm';
import Ky from 'ky';

interface Props {
  document: AppDocument;
  kiip: AppKiip;
}

export const DocumentSettings: React.FC<Props> = ({ document, kiip }) => {
  const [documentStore, setDocumentStore] = React.useState<AppKiipDocumentStore | null>(null);

  const [showAddServerForm, setShowAddServerForm] = React.useState(false);

  React.useEffect(() => {
    kiip.getDocumentStore(document.id).then((store) => {
      setDocumentStore(store);
    });
  }, [document.id, kiip]);

  const servers = document.meta.servers;

  return (
    <Styled.div
      zs={[
        {
          position: 'fixed',
          bottom: Grid.small(2),
          right: Grid.small(2),
          left: Grid.small(2),
        },
        Tokens.flexVertical(),
      ]}
    >
      <Styled.div
        zs={[
          {
            borderRadius: Grid.small(3),
            background: Colors.blue(700),
          },
          Tokens.flexVertical(),
        ]}
      >
        <Styled.div zs={[Tokens.margin({ all: 2, bottom: showAddServerForm ? 2 : 0 })]}>
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
        <div>
          {servers.map((server, index) => {
            return <div key={index}>{server.url}</div>;
          })}
        </div>
        {!showAddServerForm && (
          <Styled.div zs={[Tokens.padding(4), Tokens.flexCenter]}>
            <Styled.button
              onClick={() => {
                setShowAddServerForm(true);
              }}
              zs={[
                Fonts.SourceSansPro('SemiBold'),
                Fonts.lineHeight(4),
                Tokens.padding({ vertical: 2, horizontal: 3 }),
                {
                  background: Colors.blue(600),
                  borderRadius: Grid.small(4),
                  color: Colors.white,
                },
              ]}
            >
              Add Server
            </Styled.button>
          </Styled.div>
        )}
      </Styled.div>
      {showAddServerForm && (
        <>
          <Styled.div zs={{ height: Grid.small(2) }} />
          <AddServerForm
            onCancel={() => {
              setShowAddServerForm(false);
            }}
            onAdd={(address, password) => {
              if (documentStore) {
                setShowAddServerForm(false);
                console.log({
                  address,
                  password,
                });
                Ky.post(`${address}/register`, {
                  json: {
                    documentId: document.id,
                    password,
                  },
                })
                  .json()
                  .then((data) => {
                    console.log('success', data);

                    // documentStore.setMeta()
                    documentStore.setMeta({
                      ...document.meta,
                      servers: [
                        ...document.meta.servers,
                        {
                          url: address,
                          token: 'yolo',
                        },
                      ],
                    });
                  });
              }
            }}
          />
        </>
      )}
    </Styled.div>
  );
};
