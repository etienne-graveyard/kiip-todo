import React from 'react';
import { Colors } from '../design/colors';

interface Props {
  size?: number;
  color?: string;
}

export const CheckIcon: React.FC<Props> = ({ size = 20, color = Colors.blue(700) }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-folder"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};
