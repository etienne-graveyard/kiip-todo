import React from 'react';
import { App } from './App';
import { RootView } from './RootView';

export const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <RootView isDev={false}>
        <App />
      </RootView>
    </React.StrictMode>
  );
};
