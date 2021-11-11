//import './wdyr.js';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './index.css';
import './theme.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cssVars from 'css-vars-ponyfill';
cssVars({
  // Options...
});

ReactGA.initialize(window.sideby.Config.gaTrackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
