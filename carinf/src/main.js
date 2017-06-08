import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Companies from './components/Companies';
// import AddressEdit from './components/AddressEdit';
// import AddressList from './components/AddressList';
// import SubFrame from './components/SubFrame';
// import Enter from './components/Enter';
// import Recent from './components/Recent';
// import Car from './components/Car';
// import Model from './components/Model';
// import Plan from './components/Plan';
// import Results from './components/Results';
// import Confirm from './components/Confirm';
// import Final from './components/Final';

import App from './components/App';

const subFrame = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/SubFrame').default);
    }, 'subFrame');
}

const enter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Enter').default);
    }, 'enter');
}

const recent = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Recent').default);
    }, 'recent');
}

const car = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Car').default);
    }, 'car');
}

const model = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Model').default);
    }, 'model');
}

const plan = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Plan').default);
    }, 'plan');
}

const results = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Results').default);
    }, 'results');
}

const confirm = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Confirm').default);
    }, 'confirm');
}

const final = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Final').default);
    }, 'final');
}

const addressList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/AddressList').default);
    }, 'addressList');
}

const addressEdit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/AddressEdit').default);
    }, 'addressEdit');
}

render(
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
        <IndexRoute component={Companies}/>
        <Route path="/subFrame" getComponent={subFrame}/>
        <Route path="/enter" getComponent={enter}/>
        <Route path="/recent" getComponent={recent}/>
        <Route path="/car" getComponent={car}/>
        <Route path="/model" getComponent={model}/>
        <Route path="/plan" getComponent={plan}/>
        <Route path="/results" getComponent={results}/>
        <Route path="/confirm" getComponent={confirm}/>
        <Route path="/final" getComponent={final}/>
        <Route path="/addressList" getComponent={addressList}/>
        <Route path="/addressEdit(/:id/:name/:phone/:province/:region/:county/:address/:no)" getComponent={addressEdit}/>
    </Route>
  </Router>
  , document.getElementById('app'));