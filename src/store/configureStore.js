import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions";
import rootReducer from "./reducers";

export default function configureStore(persistedState) {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunkMiddleware),
    );

    const store = createStore(
        rootReducer,
        persistedState,
        enhancer
    );
    store.dispatch(verifyAuth());
    return store;
}