import React from 'react';
import { Styled } from '../design/styled';
import { Grid } from '../design/grid';
import { Colors } from '../design/colors';
import { Tokens } from '../design/tokens';
import { TextInput } from '../components/TextInput';
import { Fonts } from '../design/fonts';

interface Props {
  onCancel: () => void;
  onAdd: (address: string, password: string) => void;
}

export const AddServerForm: React.FC<Props> = ({ onCancel, onAdd }) => {
  const [serverAddress, setServerAddress] = React.useState('');
  const [serverPassword, setServerPassword] = React.useState('');

  return (
    <Styled.div
      zs={[
        {
          borderRadius: Grid.small(3),
          background: Colors.blue(700),
        },
        Tokens.flexVertical(),
        Tokens.padding({ all: 2 }),
      ]}
    >
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
        Add Server
      </Styled.h3>
      <TextInput placeholder="Server address" value={serverAddress} onChange={setServerAddress} />
      <Styled.div placeholder="Server password" zs={{ height: Grid.small(2) }} />
      <TextInput value={serverPassword} onChange={setServerPassword} type="password" />
      <Styled.div zs={[Tokens.flexHorizontal('center'), Tokens.margin({ top: 2 })]}>
        <Styled.button
          onClick={onCancel}
          zs={[
            Fonts.SourceSansPro('SemiBold'),
            Fonts.lineHeight(4),
            Tokens.padding({ vertical: 2, horizontal: 3 }),
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
            onAdd(serverAddress, serverPassword);
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
          Add
        </Styled.button>
      </Styled.div>
    </Styled.div>
  );
};
