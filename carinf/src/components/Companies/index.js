import React, {Component} from 'react';

import TitleBar from './TitleBar';
import CompanyList from './CompanyList';

export default class Out extends Component {

    render() {
        return (
          <div>
              <TitleBar title="车险" />
              <CompanyList />
          </div>
        );
    };
}