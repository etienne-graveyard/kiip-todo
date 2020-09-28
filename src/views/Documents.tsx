import React from 'react';
import { AppDocument, AppKiip } from '../logic/kiip';
import { notNil } from '../utils';
import { DocumentsList } from './DocumentsList';
import { Document } from './Document';

interface Props {
  kiip: AppKiip;
  documents: Array<AppDocument>;
  addDocument: () => void;
}

export const Documents: React.FC<Props> = ({ documents, addDocument, kiip }) => {
  const [selectedDocumentId, setSelectedDocumentId] = React.useState<string | null>(null);

  const document = React.useMemo(() => {
    if (selectedDocumentId === null) {
      return null;
    }
    return notNil(documents.find((doc) => doc.id === selectedDocumentId));
  }, [documents, selectedDocumentId]);

  if (document === null) {
    return (
      <DocumentsList
        documents={documents}
        kiip={kiip}
        addDocument={addDocument}
        openDocument={(docId) => {
          setSelectedDocumentId(docId);
        }}
      />
    );
  }
  return (
    <Document
      kiip={kiip}
      document={document}
      closeDocument={() => {
        setSelectedDocumentId(null);
      }}
    />
  );
};
