import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Dashboard />, document.getElementById('root'));
serviceWorker.unregister();
