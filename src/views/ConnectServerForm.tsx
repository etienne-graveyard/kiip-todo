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
  onConfirm: (address: string, password: string) => void;
}

export const ConnectServerForm: React.FC<Props> = ({ onCancel, onConfirm: onAdd }) => {
  const [serverAddress, setServerAddress] = React.useState('');
  const [serverPasswordOrToken, setServerPasswordOrToken] = React.useState('');

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
        Connect Server
      </Styled.h3>
      <TextInput placeholder="Server address" value={serverAddress} onChange={setServerAddress} />
      <Styled.div placeholder="Server password" zs={{ height: Grid.small(2) }} />
      <TextInput
        placeholder={'Password'}
        value={serverPasswordOrToken}
        onChange={setServerPasswordOrToken}
        type="password"
      />
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
            onAdd(serverAddress, serverPasswordOrToken);
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
