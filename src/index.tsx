import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App';
import * as serviceWorker  from './serviceWorker';

import { stores } from './store';

ReactDOM.render(
    <Provider {...stores}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();