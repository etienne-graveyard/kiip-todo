import React from 'react';
import { Documents } from './Documents';
import { AppDocument, AppKiip } from '../logic/kiip';

interface Props {
  kiip: AppKiip;
}

export const App: React.FC<Props> = ({ kiip }) => {
  const [documents, setDocuments] = React.useState<Array<AppDocument> | null>(null);

  const updateDocuments = React.useCallback(() => {
    kiip.getDocuments().then((docs) => {
      setDocuments(docs);
    });
  }, [kiip]);

  React.useEffect(() => {
    updateDocuments();
  }, [updateDocuments]);

  return (
    <div>
      {documents === null ? (
        'Loading...'
      ) : (
        <Documents
          kiip={kiip}
          documents={documents}
          addDocument={() => {
            kiip.createDocument().then(() => {
              updateDocuments();
            });
          }}
        />
      )}
    </div>
  );
};
