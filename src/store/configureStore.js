import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage';
import { verifyAuth } from "./actions";
import rootReducer from "./reducers";


const persistConfig = {
    key: 'products',
    storage: storage,
    whitelist: ['products', 'auth', 'user'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(persistedState) {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunkMiddleware, logger),
    );

    const store = createStore(
        pReducer,
        persistedState,
        enhancer
    );

    const persistor = persistStore(store);
    store.dispatch(verifyAuth());
    return store;
}