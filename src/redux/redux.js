import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './app.redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['loadData','updatePwdReducer','publishInfoReducer','teacherReducers','uploadReducers']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => { };
const store = createStore(persistedReducer, compose(applyMiddleware(thunk), reduxDevTools));
const persistor = persistStore(store);

export {
    store,
    persistor
}