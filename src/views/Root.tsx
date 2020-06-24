import React from 'react';
import { App } from './App';
import { RootView } from './RootView';
import { OverlayProvider } from 'react-oot';
import { AppKiip } from '../logic/kiip';

interface Props {
  kiip: AppKiip;
}

export const Root: React.FC<Props> = ({ kiip }) => {
  return (
    // <React.StrictMode>
    <OverlayProvider>
      <RootView isDev={false}>
        <App kiip={kiip} />
      </RootView>
    </OverlayProvider>
    // </React.StrictMode>
  );
};
