import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Root } from './views/Root';
import { AppKiip } from './logic/kiip';

AppKiip().then((kiip) => {
  ReactDOM.render(<Root kiip={kiip} />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
