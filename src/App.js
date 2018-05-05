import React, { Fragment } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import reducers from './redux/reducers'
import HomePage from './components/HomePage'
import CakeCreatePage from './components/CakeCreatePage'
import CakePage from './components/CakePage'

const history = createHistory()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, routerMiddleware(history))
)

let App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="container">
        <Fragment>
          <Route exact path="/" component={HomePage} />
          <Switch>
            <Route exact path="/cake/create" component={CakeCreatePage} />
            <Route exact path="/cake/:id" component={CakePage} />
          </Switch>
        </Fragment>
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App
