import { Kiip, KiipDocument, KiipDocumentState, KiipDocumentStore } from '@kiip/core';
// import { KiipIndexedDB } from '@kiip/indexeddb';
import { KiipMemoryDb } from '@kiip/memorydb';
import cuid from 'cuid';

export type AppDocument = KiipDocument<Metadata>;

type Schema = {
  todos: {
    createdAt: string;
    shortId: string;
    title: string;
    done: boolean;
  };
};

interface Metadata {
  name: string;
  server: {
    url: string;
    token: string;
  } | null;
}

export type AppKiip = Kiip<Schema, Metadata>;

export type AppKiipDocumentStore = KiipDocumentStore<Schema, Metadata>;

export type AppKiipDocumentState = KiipDocumentState<Schema, Metadata>;

export async function AppKiip() {
  // const db = await KiipIndexedDB('kiip-todo-v2');
  const db = KiipMemoryDb();

  const kiip = Kiip<Schema, Metadata>(db, {
    getInitialMetadata: () => ({
      name: 'New Document',
      server: null,
    }),
  });

  const doc = await kiip.createDocument();

  const docStore = await kiip.getDocumentStore(doc.id);
  await docStore.setMeta({ ...doc.meta, name: 'My First Todo' });

  await docStore.insert('todos', {
    shortId: cuid.slug(),
    title: 'Learn React',
    done: false,
    createdAt: new Date().toISOString(),
  });

  return kiip;
}
