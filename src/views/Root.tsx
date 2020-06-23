import React from 'react';
import { App } from './App';
import { RootView } from './RootView';
import { OverlayProvider } from 'react-oot';

export const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <OverlayProvider>
        <RootView isDev={false}>
          <App />
        </RootView>
      </OverlayProvider>
    </React.StrictMode>
  );
};
