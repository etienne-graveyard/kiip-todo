import React from 'react';
import { Styled } from '../design/styled';
import { Fonts } from '../design/fonts';
import { Tokens } from '../design/tokens';
import { Colors } from '../design/colors';
import { Grid } from '../design/grid';

interface Props {
  value: string;
  onChange?: (val: string) => void;
  type?: 'text' | 'password';
  placeholder?: string;
}

export const TextInput: React.FC<Props> = ({ onChange, value, type = 'text', placeholder }) => {
  return (
    <Styled.input
      zs={[
        Fonts.SourceSansPro('Regular'),
        Fonts.lineHeight(4),
        Tokens.padding({ vertical: 1, horizontal: 2 }),
        {
          background: Colors.white,
          borderRadius: Grid.small(1),
        },
      ]}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      type={type}
    />
  );
};
