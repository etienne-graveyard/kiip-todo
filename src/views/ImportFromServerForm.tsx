import React from 'react';
import { Styled } from '../design/styled';
import { Grid } from '../design/grid';
import { Colors } from '../design/colors';
import { Tokens } from '../design/tokens';
import { TextInput } from '../components/TextInput';
import { Fonts } from '../design/fonts';
import { baseButton, blueCard } from '../design/composition';

interface Props {
  onCancel: () => void;
  onConfirm: (address: string, documentId: string, token: string) => void;
}

export const ImportFromServerForm: React.FC<Props> = ({ onCancel, onConfirm }) => {
  const [serverAddress, setServerAddress] = React.useState('');
  const [token, setToken] = React.useState('');
  const [docId, setDocId] = React.useState('');

  return (
    <Styled.div zs={[...blueCard, Tokens.padding({ all: 2 })]}>
      <Styled.h3
        zs={[
          Fonts.lineHeight(4),
          Fonts.SourceSansPro('Bold'),
          { textAlign: 'center', color: Colors.white },
          Tokens.margin({
            bottom: 2,
          }),
        ]}
      >
        Import from Server
      </Styled.h3>
      <TextInput placeholder="Server address" value={serverAddress} onChange={setServerAddress} />
      <Styled.div zs={{ height: Grid.small(2) }} />
      <TextInput placeholder={'Document ID'} value={docId} onChange={setDocId} type="text" />
      <Styled.div zs={{ height: Grid.small(2) }} />
      <TextInput placeholder={'Token'} value={token} onChange={setToken} type="password" />
      <Styled.div zs={[Tokens.flexHorizontal('center'), Tokens.margin({ top: 2 })]}>
        <Styled.button
          onClick={onCancel}
          zs={[
            ...baseButton,
            {
              color: Colors.white,
              textDecoration: 'underline',
              background: 'none',
            },
          ]}
        >
          Cancel
        </Styled.button>
        <Styled.div zs={[Tokens.flexChild]} />
        <Styled.button
          onClick={() => {
            onConfirm(serverAddress, docId, token);
          }}
          zs={[
            Fonts.SourceSansPro('SemiBold'),
            Fonts.lineHeight(4),
            Tokens.padding({ vertical: 1, horizontal: 3 }),
            {
              background: Colors.blue(600),
              borderRadius: Grid.small(4),
              color: Colors.white,
            },
          ]}
        >
          Add
        </Styled.button>
      </Styled.div>
    </Styled.div>
  );
};
