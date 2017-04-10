import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Companies from './components/Companies/index';
import AddressEdit from './components/AddressEdit/index';
import AddressList from './components/AddressList/index';
import SubFrame from './components/SubFrame/index';
import Enter from './components/Enter/index';
import Recent from './components/Recent/index';
import Car from './components/Car/index';
import Model from './components/Model/index';
import Plan from './components/Plan/index';
import Results from './components/Results/index';
import Confirm from './components/Confirm/index';
import Final from './components/Final/index';

import App from './components/App';

render(
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
        <IndexRoute component={Companies}/>
        <Route path="/subFrame" component={SubFrame}/>
        <Route path="/enter" component={Enter}/>
        <Route path="/recent" component={Recent}/>
        <Route path="/car" component={Car}/>
        <Route path="/model" component={Model}/>
        <Route path="/plan" component={Plan}/>
        <Route path="/results" component={Results}/>
        <Route path="/confirm" component={Confirm}/>
        <Route path="/final" component={Final}/>
        <Route path="/addressList" component={AddressList}/>
        <Route path="/addressEdit(/:id/:name/:phone/:province/:region/:county/:address/:no)" component={AddressEdit}/>
    </Route>
  </Router>
  , document.getElementById('app'));