import { Kiip, KiipDocument, KiipDocumentFacade } from '@kiip/core';
import { KiipIndexedDB } from '@kiip/indexeddb';

export type AppDocument = KiipDocument<Metadata>;

type Schema = {
  todos: {
    shortId: string;
    title: string;
    done: boolean;
  };
};

interface Metadata {
  name: string;
  servers: Array<{
    url: string;
    token: string;
  }>;
}

export type AppKiip = Kiip<Schema, Metadata>;

export type AppKiipDocumentFacade = KiipDocumentFacade<Schema, Metadata>;

export async function AppKiip() {
  const db = await KiipIndexedDB('kiip-todo-v1');

  return Kiip<Schema, Metadata>(db, {
    getInitialMetadata: () => ({
      name: 'New Document',
      servers: [],
    }),
  });
}
