import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import rootReducer from './store/reducers'
const store = createStore(rootReducer);

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);
