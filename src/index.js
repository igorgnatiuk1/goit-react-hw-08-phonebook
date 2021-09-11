import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';

import 'modern-normalize/modern-normalize.css';


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
