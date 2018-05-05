import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceworker from './utils/registerServiceWorker'
registerServiceworker()

ReactDOM.render(<App />, document.getElementById('root'));
