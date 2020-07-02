import { Kiip, KiipDocument, KiipDocumentStore } from '@kiip/core';
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

export type AppKiipDocumentStore = KiipDocumentStore<Schema, Metadata>;

export async function AppKiip() {
  const db = await KiipIndexedDB('kiip-todo-v2');
  // const db = KiipMemoryDb();

  return Kiip<Schema, Metadata>(db, {
    getInitialMetadata: () => ({
      name: 'New Document',
      servers: [],
    }),
  });
}
