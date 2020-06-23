import React from 'react';
import { Colors } from '../design/colors';

interface Props {
  size?: number;
  color?: string;
}

export const FolderIcon: React.FC<Props> = ({ size = 20, color = Colors.blue(700) }) => {
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
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path>
    </svg>
  );
};
