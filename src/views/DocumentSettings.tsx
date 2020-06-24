import React from 'react';
import { Styled } from '../design/styled';
import { Grid } from '../design/grid';
import { Colors } from '../design/colors';
import { AppDocument, AppKiip, AppKiipDocumentFacade } from '../logic/kiip';
import { Tokens } from '../design/tokens';
import { Fonts } from '../design/fonts';
import { EditableText } from '../components/EditableText';

interface Props {
  document: AppDocument;
  kiip: AppKiip;
}

export const DocumentSettings: React.FC<Props> = ({ document, kiip }) => {
  const [documentFacade, setDocumentFacade] = React.useState<AppKiipDocumentFacade | null>(null);

  React.useEffect(() => {
    kiip.getDocument(document.id).then((facade) => {
      setDocumentFacade(facade);
    });
  }, [document.id, kiip]);

  console.log(documentFacade);

  const servers = document.meta.servers;

  return (
    <Styled.div
      zs={[
        {
          position: 'fixed',
          bottom: Grid.small(2),
          right: Grid.small(2),
          left: Grid.small(2),
          borderRadius: Grid.small(3),
          background: Colors.blue(700),
        },
        Tokens.flexVertical(),
      ]}
    >
      <Styled.div zs={[Tokens.margin({ all: 2, bottom: 0 })]}>
        <EditableText
          value={document.meta.name}
          onChange={(newName) => {
            if (documentFacade) {
              documentFacade.setMeta({
                ...document.meta,
                name: newName,
              });
            }
          }}
        />
      </Styled.div>
      {servers.length === 0 ? (
        <Styled.div zs={[Tokens.padding(4), Tokens.flexCenter]}>
          <Styled.button
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
      ) : (
        <p>TODO</p>
      )}
    </Styled.div>
  );
};
