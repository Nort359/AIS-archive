import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import DevTools from './utils/DevTools';

function _applyMiddleware() {
    const middleware = [
        promise,
        thunk
    ];

    return applyMiddleware(...middleware);
}

export default function configureStore(initialState) {
    const store = compose(
        _applyMiddleware(),
        DevTools.instrument()
    )(createStore)(rootReducer, initialState);

    return store;
}
