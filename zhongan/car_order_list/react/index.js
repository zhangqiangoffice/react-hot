import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import thunk from 'redux-thunk'
import { initUrlDatas, askOrders } from './actions'
import Detail from './components/Detail'
import Main from './components/Main'
import TitleBarContainer from './containers/TitleBarContainer'
import reducer from './reducers'

const middleware = [ thunk ];
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(initUrlDatas())
store.dispatch(askOrders())

render(
  <Provider store={store}>
    <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={Main}/>
      <Route path="/detail" component={Detail}/>
    </Router>
  </Provider>,
  document.getElementById('app')
)