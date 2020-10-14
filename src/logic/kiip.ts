import { Kiip, KiipDocument, KiipDocumentState, KiipDocumentStore, KiipMemoryDb } from '@kiip/core';
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

  console.log('Create doc 1');
  const doc1 = await kiip.createDocument();
  const doc1Store = await kiip.getDocumentStore(doc1.id);
  await doc1Store.setMeta({ ...doc1.meta, name: 'My First Todo' });

  console.log('Insert Todo');
  await doc1Store.insert('todos', {
    shortId: cuid.slug(),
    title: 'Learn React',
    done: false,
    createdAt: new Date().toISOString(),
  });

  console.log('Create doc 2');
  const doc2 = await kiip.createDocument();
  const doc2Store = await kiip.getDocumentStore(doc2.id);

  console.log('Sync');
  await sync();

  console.log('Insert Todo 2');
  await doc1Store.insert('todos', {
    shortId: cuid.slug(),
    title: 'Do Stuff React',
    done: true,
    createdAt: new Date().toISOString(),
  });

  console.log('Sync');
  await sync();

  return kiip;

  async function sync() {
    console.log('===================');
    const prep = doc1Store.prepareSync();
    console.log('prep', prep);
    // console.log(MerkleTree.debug(prep.merkle));
    // remote
    const sync1 = await doc2Store.handleSync(prep);
    console.log('sync1', sync1);
    // console.log(MerkleTree.debug(sync1.merkle));
    // local
    const sync2 = await doc1Store.handleSync(sync1);
    console.log('sync2', sync2);
    // console.log(MerkleTree.debug(sync2.merkle));
    // remove
    const sync3 = await doc2Store.handleSync(sync2);
    console.log('sync3', sync3);
    // console.log(MerkleTree.debug(sync3.merkle));
  }
}
