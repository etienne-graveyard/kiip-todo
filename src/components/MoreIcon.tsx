import React from 'react';
import { Colors } from '../design/colors';

interface Props {
  size?: number;
  color?: string;
}

export const MoreIcon: React.FC<Props> = ({ size = 20, color = Colors.grey(500) }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      stroke="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-folder"
    >
      <circle cx="12" cy="8" r="2"></circle>
      <circle cx="12" cy="16" r="2"></circle>
    </svg>
  );
};
