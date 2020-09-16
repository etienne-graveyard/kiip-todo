import React from 'react';
import { Styled } from '../design/styled';
import { Tokens } from '../design/tokens';
import { Fonts } from '../design/fonts';
import { Colors } from '../design/colors';
import { Grid } from '../design/grid';
import { CheckIcon } from './CheckIcon';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const EditableText: React.FC<Props> = ({ onChange, value }) => {
  const [editing, setEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(value);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  if (editing) {
    return (
      <Styled.div zs={[Tokens.flexVertical(), { position: 'relative' }]}>
        <Styled.input
          ref={inputRef}
          zs={[
            Fonts.SourceSansPro('Regular'),
            Fonts.lineHeight(4),
            Tokens.padding({ vertical: 1, horizontal: 2, right: 7 }),
            {
              background: Colors.white,
              borderRadius: Grid.small(1),
            },
          ]}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onChange(editValue);
              setEditing(false);
            }
          }}
          type="text"
        />
        <Styled.button
          onClick={(e) => {
            onChange(editValue);
            setEditing(false);
          }}
          zs={[
            Tokens.flexCenter(),
            {
              width: Grid.small(4),
              height: Grid.small(4),
              position: 'absolute',
              right: Grid.small(2),
              top: Grid.small(1),
              cursor: 'pointer',
              background: 'none',
            },
          ]}
        >
          <CheckIcon size={Grid.small(4)} color={Colors.black} />
        </Styled.button>
      </Styled.div>
    );
  }

  return (
    <Styled.div
      zs={[
        Fonts.SourceSansPro('Regular'),
        Fonts.lineHeight(4),
        Tokens.padding({ vertical: 1, horizontal: 2 }),
        {
          textAlign: 'center',
          background: Colors.blue(600),
          color: Colors.white,
          borderRadius: Grid.small(1),
        },
      ]}
      onClick={() => {
        setEditValue(value);
        setEditing(true);
      }}
    >
      {value}
    </Styled.div>
  );
};
