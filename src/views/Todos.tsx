import cuid from 'cuid';
import React from 'react';
import { AppKiipDocumentState, AppKiipDocumentStore } from '../logic/kiip';

interface Props {
  store: AppKiipDocumentStore;
  state: AppKiipDocumentState;
}

export const Todos: React.FC<Props> = ({ state, store }) => {
  const sortedTodos = React.useMemo(() => {
    return Object.keys(state.data.todos ?? {})
      .map((todoId) => state.data.todos[todoId])
      .sort((l, r) => l.createdAt.localeCompare(r.createdAt));
  }, [state.data.todos]);

  console.log(sortedTodos);

  return (
    <div>
      <button
        onClick={() => {
          store.insert('todos', {
            shortId: cuid.slug(),
            title: 'Test',
            done: false,
            createdAt: new Date().toISOString(),
          });
        }}
      >
        Add
      </button>
      <div>
        {sortedTodos.map((todo) => {
          return (
            <div key={todo.shortId}>
              <input type="checkbox" checked={todo.done} readOnly={true} />
              {todo.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
