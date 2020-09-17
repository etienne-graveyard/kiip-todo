import React from 'react';
import { AppDocument, AppKiip, AppKiipDocumentState, AppKiipDocumentStore } from '../logic/kiip';
import { Todos } from './Todos';

interface Props {
  kiip: AppKiip;
  document: AppDocument;
}

export const Document: React.FC<Props> = ({ document, kiip }) => {
  const [documentStore, setDocumentStore] = React.useState<AppKiipDocumentStore | null>(null);

  React.useEffect(() => {
    kiip.getDocumentStore(document.id).then((store) => {
      setDocumentStore(store);
    });
  }, [document.id, kiip]);

  const [db, setDb] = React.useState<AppKiipDocumentState | null>(null);

  console.log({ documentStore, db });

  React.useEffect(() => {
    if (documentStore) {
      setDb(documentStore.getState());
      return documentStore.subscribe((db) => {
        setDb(db);
      });
    }
  }, [documentStore]);

  if (documentStore === null || db === null) {
    return <div>Loading...</div>;
  }

  return <Todos state={db} store={documentStore} />;
};
