import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './theme.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cssVars from 'css-vars-ponyfill';
cssVars({
  // Options...
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
