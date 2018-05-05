import React from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import reducers from './redux/reducers'
import Routes from './components/Routes'
import dataLoader from './utils/data-loader'

const history = createHistory()

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(thunk,routerMiddleware(history)),
    persistState(['cakes'])
  )
)

dataLoader(store)

let App = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
)

export default App
