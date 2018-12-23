import basicReducer from 'basic-reducers';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { sevenReducer } from "../../util/Seven.redux";

export const ReduxContainer = (props:any) => {
    const history = createBrowserHistory();

    const reducers = {
        basic: basicReducer,
        router: connectRouter(history),
        seven: sevenReducer,
    };

    const store = createStore(
        combineReducers(reducers),
        {},
        applyMiddleware(routerMiddleware(history), thunk, createLogger())
    );

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <>{React.Children.map(props.children, a => a)}</>
            </ConnectedRouter>
        </Provider>
    );
}
